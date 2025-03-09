// src/app/api/images/[id]/route.js
import { NextResponse } from 'next/server';
import { getImageById, updateImage, deleteImage } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const image = getImageById(id);

        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json(image);
    } catch (error) {
        console.error('Error fetching image:', error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name } = body; // expected to be the new base name without extension

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const image = getImageById(id);
        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        const publicDir = path.join(process.cwd(), 'public');
        // Main image file paths.
        const oldUrlWithoutDomain = image.url.replace(/^https?:\/\/[^\/]+/, '');
        const oldMainFilePath = path.join(publicDir, oldUrlWithoutDomain);
        // Extract the original file extension.
        const ext = path.extname(oldMainFilePath);
        // If the provided name doesn't already include the extension, add it.
        const newBaseName = name.endsWith(ext) ? name : name + ext;
        const newMainFilePath = path.join(path.dirname(oldMainFilePath), newBaseName);
        const newUrl = path.join(path.dirname(oldUrlWithoutDomain), newBaseName).replace(/\\/g, '/');

        // Prepare thumbnail paths if available.
        let oldThumbnailFilePath, newThumbnailFilePath, newThumbnailUrl;
        if (image.thumbnailUrl) {
            const oldThumbnailUrlWithoutDomain = image.thumbnailUrl.replace(/^https?:\/\/[^\/]+/, '');
            oldThumbnailFilePath = path.join(publicDir, oldThumbnailUrlWithoutDomain);
            // Extract the thumbnail extension.
            const thumbExt = path.extname(oldThumbnailFilePath);
            // New thumbnail name is prefixed with "thumb-" and should keep its extension.
            const newThumbBaseName = ('thumb-' + name).endsWith(thumbExt) ? ('thumb-' + name) : ('thumb-' + name + thumbExt);
            newThumbnailFilePath = path.join(path.dirname(oldThumbnailFilePath), newThumbBaseName);
            newThumbnailUrl = path.join(path.dirname(oldThumbnailUrlWithoutDomain), newThumbBaseName).replace(/\\/g, '/');
        }

        // Try renaming main file and thumbnail (if exists).
        try {
            // Rename main image file.
            await fs.promises.rename(oldMainFilePath, newMainFilePath);

            // Rename thumbnail if available.
            if (image.thumbnailUrl) {
                await fs.promises.rename(oldThumbnailFilePath, newThumbnailFilePath);
            }
        } catch (err) {
            console.error('File move failed:', err);
            // Rollback main image move if it succeeded.
            if (fs.existsSync(newMainFilePath) && !fs.existsSync(oldMainFilePath)) {
                try {
                    await fs.promises.rename(newMainFilePath, oldMainFilePath);
                } catch (rollbackErr) {
                    console.error('Rollback main image move failed:', rollbackErr);
                }
            }
            return NextResponse.json({ error: 'Failed to move file(s)' }, { status: 500 });
        }

        // Update database with new URLs.
        const updateData = { name: newBaseName, url: newUrl };
        if (image.thumbnailUrl) {
            updateData.thumbnailUrl = newThumbnailUrl;
        }
        const success = updateImage(id, updateData);

        // If DB update fails, rollback file moves.
        if (!success) {
            try {
                // Rollback main file rename.
                await fs.promises.rename(newMainFilePath, oldMainFilePath);
                // Rollback thumbnail rename if applicable.
                if (image.thumbnailUrl) {
                    await fs.promises.rename(newThumbnailFilePath, oldThumbnailFilePath);
                }
            } catch (rollbackErr) {
                console.error('Rollback file move failed:', rollbackErr);
            }
            return NextResponse.json({ error: 'Failed to update image in DB' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating image:', error);
        return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
    }
}


export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const image = getImageById(id);
        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        // Delete the file from the filesystem
        const publicDir = path.join(process.cwd(), 'public');
        const urlWithoutDomain = image.url.replace(/^https?:\/\/[^\/]+/, '');
        const filePath = path.join(publicDir, urlWithoutDomain);

        // Also delete thumbnail if it exists
        if (image.thumbnailUrl) {
            const thumbnailUrlWithoutDomain = image.thumbnailUrl.replace(/^https?:\/\/[^\/]+/, '');
            const thumbnailPath = path.join(publicDir, thumbnailUrlWithoutDomain);
            if (fs.existsSync(thumbnailPath)) {
                fs.unlinkSync(thumbnailPath);
            }
        }

        // Delete file if it exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete from database
        const success = deleteImage(id);

        if (!success) {
            return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
