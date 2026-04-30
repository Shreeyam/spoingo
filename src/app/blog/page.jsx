import Link from 'next/link';
import Layout from '@/components/Layout';
import { getPostsPaginated } from '@/lib/db';

export const revalidate = 300;

function formatDate(value) {
    if (!value) return '';
    return new Date(value).toISOString().split('T')[0];
}

export default async function BlogPage() {
    const posts = await getPostsPaginated();

    return (
        <Layout>
            <article className="max-w-[42rem] mx-auto px-4 py-10 sm:py-16 space-y-10">
                <header className="space-y-3">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Blog
                    </h1>
                    <p className="text-lg leading-relaxed text-foreground/90">
                        Notes on technical sewing, research, software, and other projects.
                    </p>
                </header>

                {posts.length > 0 ? (
                    <div className="space-y-7">
                        {posts.map((post) => (
                            <article key={post.id}>
                                <Link
                                    href={`/posts/${post.slug}`}
                                    className="text-xl font-bold leading-snug hover:underline underline-offset-2"
                                >
                                    {post.title}
                                </Link>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {formatDate(post.published_at)}
                                </p>
                                {post.preview && (
                                    <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/80">
                                        {post.preview}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                        No posts published yet.
                    </p>
                )}
            </article>
        </Layout>
    );
}
