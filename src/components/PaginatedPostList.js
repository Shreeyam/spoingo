// src/components/PaginatedPostList.js
'use client';

import React, { useState } from 'react';
import PostList from '@/components/PostList';
import { Button } from '@/components/ui/button';
import { ChevronDown, LoaderCircle } from 'lucide-react';

export default function PaginatedPostList({ initialPosts, galleryMode}) {
    const [posts, setPosts] = useState(initialPosts || []);
    const [offset, setOffset] = useState(initialPosts.length);
    const [hasMore, setHasMore] = useState(initialPosts.length === 10);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    async function loadPosts() {
        setLoading(true);
        const res = await fetch(`/api/posts?offset=${offset}&limit=${limit}`);
        const data = await res.json();
        if (data.length < limit) {
            setHasMore(false);
        }
        setPosts((prev) => [...prev, ...data]);
        setOffset((prev) => prev + limit);
        setLoading(false);
    }

    return (
        <div>
            <PostList posts={posts} galleryMode={galleryMode} />
            <div className="flex justify-center">
                {hasMore && (
                    <Button
                        onClick={loadPosts}
                        variant="outline"
                        disabled={loading}
                    >
                        {loading ? <LoaderCircle className="animate-spin"/> : <ChevronDown />}Load More
                    </Button>
                )}
            </div>
        </div>
    );
}
