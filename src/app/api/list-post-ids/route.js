// src/app/api/posts/route.js
import { NextResponse } from 'next/server';
import { getPostIDs } from '@/lib/db';

export async function GET(request) {
    const draft = request.url.includes('draft=include') ? null : (request.url.includes('draft=only') ? 1 : 0);
    const postIDs = await getPostIDs(draft);
    return new Response(JSON.stringify(postIDs), {
        headers: { 'Content-Type': 'application/json' },
    });
}