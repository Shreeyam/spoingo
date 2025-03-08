'use client';
import React, { useState } from 'react';
import PaginatedPostList from '@/components/PaginatedPostList';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function PostGallery({ initialPosts }) {
    const [galleryMode, setGalleryMode] = useState(true);

    const toggleGalleryMode = () => {
        setGalleryMode(prevMode => !prevMode);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">All Posts</h1>
                <Label className="flex items-center">
                    <Switch checked={galleryMode} onCheckedChange={toggleGalleryMode} />
                    <span className="ml-2">Gallery Mode</span>
                </Label>
            </div>
            {/* <Separator className="my-4" /> */}
            <PaginatedPostList initialPosts={initialPosts} galleryMode={galleryMode} />
        </>
    );
}
