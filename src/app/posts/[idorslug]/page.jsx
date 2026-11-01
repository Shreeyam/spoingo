import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostById, getPostBySlug, getPostIDs, getPostMetadataByID, getPostMetadataBySlug } from '@/lib/db';
import Layout from '@/components/Layout';
import PageArticle from '@/components/PageArticle';
import CustomMarkdown from '@/components/ui/custommarkdown';

export async function generateMetadata({ params }) {
    const { idorslug } = await params;
    let post;
    const firstSegment = idorslug[0];

    if (/^\d/.test(firstSegment)) {
        post = await getPostMetadataByID(firstSegment);
    } else {
        post = await getPostMetadataBySlug(idorslug);
    }

    return { title: post.title };
}

export default async function PostPage({ params }) {
    const { idorslug } = await params; // assuming idorslug is an array

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

    const all_post_ids = getPostIDs();
    // Get previous and next posts
    const current_index = all_post_ids.indexOf(post.id);
    const prevPostID = current_index > 0 ? all_post_ids[current_index - 1] : null;
    const nextPostID = current_index < all_post_ids.length - 1 ? all_post_ids[current_index + 1] : null;

    const publishedDate = post.published_at ? new Date(post.published_at) : new Date();
    const wordCount = post.content ? post.content.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.round(wordCount / 200)); // Assuming 200 words per minute

    return (
        <Layout>
            <PageArticle>
                {/* Title and meta section */}
                <header className="space-y-3">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{post.title}</h1>
                    <p className="text-sm text-muted-foreground">
                        {post.author && <>{post.author} · </>}
                        <span title={publishedDate}>{publishedDate.toISOString().split("T")[0]}</span>
                        {' · '}{readingTime} min read
                    </p>
                </header>

                {/* Main content */}
                <article className="prose text-[1.0625rem] leading-relaxed prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/90">
                    <CustomMarkdown markdown={post.content} />
                </article>

                {/* Post navigation */}
                <nav className="flex justify-between text-sm">
                    {prevPostID ? (
                        <Link href={`/posts/${prevPostID}`} className="hover:underline underline-offset-2">
                            ← Previous
                        </Link>
                    ) : (
                        <span />
                    )}
                    {nextPostID ? (
                        <Link href={`/posts/${nextPostID}`} className="hover:underline underline-offset-2">
                            Next →
                        </Link>
                    ) : (
                        <span />
                    )}
                </nav>
            </PageArticle>
        </Layout>
    );
}