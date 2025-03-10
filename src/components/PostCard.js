import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { User, ImageOff } from 'lucide-react';

export default function PostCard({ post, galleryMode = false }) {
    if (galleryMode) {
        return (
            <Link href={`/posts/${post.slug}`} className="block">
                <Card className="mb-4 hover:border-neutral-500 cursor-pointer rounded-sm overflow-hidden p-4">
                    <div className="flex flex-col">
                        {/* Remove fixed height so the image uses its intrinsic/responsive dimensions */}
                        <div className="relative w-full">
                            {post.cover ? (
                                <img
                                    src={post.cover}
                                    alt={post.title}
                                    // Instead of using fill with a fixed height,
                                    // supply width/height to enable responsive behavior.
                                    width={post.imageWidth || 800} // optional: use your own logic or defaults
                                    height={post.imageHeight || 450}
                                    className="object-cover w-full h-auto"
                                />
                            ) : (
                                <div className="w-full flex items-center justify-center py-8">
                                    <ImageOff size={48} />
                                </div>
                            )}
                        </div>
                        <CardContent className="flex flex-col justify-start mt-2 p-0">
                            {/* Date on top */}
                            <p className="text-sm text-gray-500 mb-1">
                                {new Date(post.published_at).toISOString().split('T')[0]}
                            </p>
                            {/* Title with two lines max */}
                            <CardTitle
                                className="text-xl font-bold"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                {post.title}
                            </CardTitle>
                            {post.author && (
                                <div className="mt-2 flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    <span className="text-sm text-gray-500">{post.author}</span>
                                </div>
                            )}
                        </CardContent>
                    </div>
                </Card>
            </Link>
        );
    } else {
        // NORMAL MODE: Horizontal layout with image on the left
        return (
            <Link href={`/posts/${post.slug}`} className="block">
                <Card className="mb-4 hover:border-neutral-500 cursor-pointer rounded-sm overflow-hidden p-4">
                    <div className="flex min-w-0">
                        <div className="relative flex-none w-24 h-24">
                            {post.cover ? (
                                <img
                                    src={post.cover.replace('/uploads/', '/uploads/thumbnails/thumb-')}
                                    alt={post.title}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-24 h-24 flex items-center justify-center">
                                    <ImageOff size={24} />
                                </div>
                            )}
                        </div>
                        <CardContent className="flex flex-col justify-start px-4 min-w-0">
                            {/* Title and date on a single line with truncation for the title */}
                            <div className="flex items-center justify-between space-x-2">
                                <CardTitle
                                    className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap flex-1"
                                >
                                    {post.title}
                                </CardTitle>
                                <p className="text-sm text-gray-500 flex-shrink-0">
                                    {new Date(post.published_at).toISOString().split('T')[0]}
                                </p>
                            </div>
                            {/* Preview text */}
                            {post.preview && (
                                <p className="mt-2 text-gray-700 text-sm">
                                    {post.preview}
                                </p>
                            )}
                            {/* Author info */}
                            {post.author && (
                                <div className="mt-2 flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    <span className="text-sm text-gray-500">{post.author}</span>
                                </div>
                            )}
                        </CardContent>
                    </div>
                </Card>
            </Link>
        );
    }
}
