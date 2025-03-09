import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostById, getPostBySlug, getPreviousPost, getNextPost } from '@/lib/db';
import Layout from '@/components/Layout';
import { Dot, User, MoveLeft, MoveRight } from 'lucide-react';
import CustomMarkdown from '@/components/ui/custommarkdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

    // Get previous and next posts
    const prevPost = { id: post.id - 1 }
    const nextPost = { id: post.id + 1 }

    const publishedDate = post.created_at ? new Date(post.created_at) : new Date();
    const wordCount = post.content ? post.content.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.round(wordCount / 200)); // Assuming 200 words per minute

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 py-8">

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
                            <span title={publishedDate}>{publishedDate.toISOString().split("T")[0]}</span>
                            <Dot size={16} className="mx-1" />
                            <span>{readingTime} min read</span>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <article className="prose lg:prose-lg xl:prose-xl mx-auto prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
                    <CustomMarkdown markdown={post.content} />
                </article>

                {/* Post navigation */}
                <div className="flex justify-between items-center">
                    {prevPost ? (
                        <Link href={`/post/${prevPost.slug || prevPost.id}`} passHref>
                            <Button variant="ghost" className="flex items-center text-left group">
                                <MoveLeft size={20} className="mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                                <div>
                                    <div className="text-xs text-gray-700">Previous</div>
                                </div>
                            </Button>
                        </Link>
                    ) : (
                        <div className="invisible">Placeholder</div>
                    )}

                    {nextPost ? (
                        <Link href={`/post/${nextPost.slug || nextPost.id}`} passHref>
                            <Button variant="ghost" className="flex items-center text-right group">
                                <div>
                                    <div className="text-xs text-gray-700">Next</div>
                                </div>
                                <MoveRight size={20} className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    ) : (
                        <div className="invisible">Placeholder</div>
                    )}
                </div>
            </div>
        </Layout>
    );
}