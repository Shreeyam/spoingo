// src/app/api/posts/route.js
import { NextResponse } from 'next/server';
import { createPost, getPosts, getPostsPaginated } from '@/lib/db';

export async function POST(request) {
    try {
        const body = await request.json();
        const { title, slug, content, thumbnail, draft } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
        }

        const postId = createPost({ title, slug, content, thumbnail, draft });
        return NextResponse.json({ id: postId });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const offset = Number(searchParams.get('offset')) || 0;
    const limit = Number(searchParams.get('limit')) || 5;
    const posts = getPostsPaginated({ limit, offset });
    return new Response(JSON.stringify(posts), {
        headers: { 'Content-Type': 'application/json' },
    });
}

