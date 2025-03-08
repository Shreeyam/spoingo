// src/app/api/posts/[id]/route.js
import { NextResponse } from 'next/server';
import { getPostById, updatePost } from '@/lib/db';

export async function GET(request, { params }) {
    try {
        const id = params.id;
        const post = getPostById(id);

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const id = params.id;
        const body = await request.json();
        const { title, slug, content, cover, draft } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
        }

        const post = getPostById(id);
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        updatePost(id, { title, slug, content, cover, draft });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = params.id;
        const post = getPostById(id);

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        deletePost(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}