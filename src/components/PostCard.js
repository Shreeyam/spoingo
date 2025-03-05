import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { User, ImageOff } from 'lucide-react';

export default function PostCard({ post }) {
    // const thumbnailUrl = post.thumbnail || '/placeholder.webp';

    return (
        <Link href={`/posts/${post.slug}`} className="block">
            <Card className="mb-4 hover:border-neutral-500 cursor-pointer rounded-sm overflow-hidden p-4">
                <div className="flex">
                    <div className="relative flex-none w-24 h-24">
                        {post.thumbnail ? (
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 flex items-center justify-center">
                                <ImageOff size={24}/>
                            </div>
                        )
                        }
                    </div>
                    <CardContent className="flex flex-col justify-start px-4">
                        {/* Title and date on the same line */}
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold truncate">
                                {post.title}
                            </CardTitle>
                            <p className="text-sm text-gray-500 whitespace-nowrap ml-4">
                                {new Date(post.created_at).toISOString().split('T')[0]}
                            </p>
                        </div>
                        {/* Dynamic preview of post content */}
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
