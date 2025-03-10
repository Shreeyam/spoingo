// src/app/api/images/upload/route.js
import { NextResponse } from 'next/server';
import { createImage } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';


export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const originalName = file.name;
        const extension = path.extname(originalName);
        const baseName = path.basename(originalName, extension);
        const sanitizedName = `${baseName.replace(/[^a-zA-Z0-9]/g, '-')}${extension}`.toLowerCase();
        const filename = sanitizedName;

        // Set up directories
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const thumbnailDir = path.join(uploadDir, 'thumbnails');

        // Ensure directories exist
        await mkdir(uploadDir, { recursive: true });
        await mkdir(thumbnailDir, { recursive: true });

        // Check if file already exists
        try {
            // Check if the file exists; if it does, this won't throw.
            await fs.promises.access(path.join(uploadDir, filename));
            return NextResponse.json({ error: 'File already exists' }, { status: 409 });
        } catch (error) {
            // If the file doesn't exist, access will throw an error (e.g., ENOENT),
            // and we can continue with file creation.
        }

        // Write original file
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // Create thumbnail
        const thumbnailFilename = `thumb-${filename}`;
        const thumbnailPath = path.join(thumbnailDir, thumbnailFilename);

        // Get image metadata
        const metadata = await sharp(buffer).metadata();

        // Create thumbnail
        await sharp(buffer)
            .resize(300, 300, { fit: 'inside' })
            .toFile(thumbnailPath);

        // Save to database
        const imageUrl = `/uploads/${filename}`;
        const thumbnailUrl = `/uploads/thumbnails/${thumbnailFilename}`;

        const imageId = createImage({
            name: sanitizedName,
            url: imageUrl,
            thumbnailUrl: thumbnailUrl,
            size: file.size,
            width: metadata.width,
            height: metadata.height,
            mimeType: file.type
        });

        return NextResponse.json({
            id: imageId,
            name: baseName,
            url: imageUrl,
            thumbnailUrl: thumbnailUrl
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}