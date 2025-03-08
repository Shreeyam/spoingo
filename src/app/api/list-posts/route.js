// src/app/api/posts/route.js
import { NextResponse } from 'next/server';
import { getPostList } from '@/lib/db';

export async function GET(request) {
    const posts = getPostList();
    return new Response(JSON.stringify(posts), {
        headers: { 'Content-Type': 'application/json' },
    });
}