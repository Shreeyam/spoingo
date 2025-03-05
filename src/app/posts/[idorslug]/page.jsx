// src/app/post/[id]/page.jsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getPostById, getPostBySlug } from '@/lib/db';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { Calendar, Clock, User, Tag, Share2, Bookmark, Heart, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import CustomMarkdown from '@/components/ui/custommarkdown';

export default async function PostPage({ params }) {
    const { idorslug } = await params; // assuming idorslug is an array
    console.log(idorslug);

    let post;
    const firstSegment = idorslug[0];

    // Check if the first character is a digit.
    if (/^\d/.test(firstSegment)) {
        // If it starts with a digit, it's an ID.
        post = getPostById(firstSegment);
    } else {
        // Otherwise, treat it as a slug.
        // If there are multiple segments, join them (adjust as needed).
        post = getPostBySlug(idorslug);
    }

    if (!post || post.draft) {
        notFound();
    }

    // Format date (assuming post has a publishedAt field)
    console.log(post.created_at)
    const publishedDate = post.created_at ? new Date(post.created_at) : new Date();
    const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

    // Estimate reading time (assuming post has content)
    const wordCount = post.content ? post.content.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.round(wordCount / 200)); // Assuming 200 words per minute

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Hero section with featured image */}
                {post.thumbnail && (
                    <div className="relative w-full h-96 mb-8 overflow-hidden rounded-2xl shadow-lg">
                        <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            {post.category && (
                                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-indigo-500 text-white mb-3">
                                    <Tag size={14} className="mr-1" />
                                    {post.category}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Title and meta section */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
                    <div className="flex flex-wrap items-center justify-center text-sm text-gray-500 gap-4">
                        {post.author && (
                            <div className="flex items-center">
                                <User size={16} className="mr-1" />
                                <span>{post.author}</span>
                            </div>
                        )}
                        <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            <span title={formattedDate}>{timeAgo}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>{readingTime} min read</span>
                        </div>
                    </div>
                </div>

                {/* Social sharing and actions */}
                {/* <div className="flex justify-center space-x-4 mb-8">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Share2 size={18} className="text-gray-700" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Bookmark size={18} className="text-gray-700" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Heart size={18} className="text-gray-700" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <MessageSquare size={18} className="text-gray-700" />
                    </button>
                </div> */}

                {/* Main content */}
                <article className="prose lg:prose-lg xl:prose-xl mx-auto prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
                    <CustomMarkdown markdown={post.content} />
                </article>
            </div>
        </Layout>
    );
}