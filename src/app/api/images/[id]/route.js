// src/app/api/images/[id]/route.js
import { NextResponse } from 'next/server';
import { getImageById, updateImage, deleteImage } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    try {
        const { id } = params;
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
        const { id } = params;
        const body = await request.json();
        // TODO: Add support for changing url
        const { name } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const image = getImageById(id);
        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        const success = updateImage(id, { name });

        if (!success) {
            return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating image:', error);
        return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const image = getImageById(id);
        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        // Delete the file from the filesystem
        // Note: Adjust the path according to your file storage setup
        const publicDir = path.join(process.cwd(), 'public');
        const urlWithoutDomain = image.url.replace(/^https?:\/\/[^\/]+/, '');
        const filePath = path.join(publicDir, urlWithoutDomain);

        // Also delete thumbnail if it exists
        if (image.cover) {
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
