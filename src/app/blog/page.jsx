// src/app/blog/page.jsx
export const revalidate = 300;

import Layout from '@/components/Layout';
import { getPostsPaginated } from '@/lib/db';
import PostGallery from '@/components/PostGallery';

export default async function HomePage() {
    const initialPosts = await getPostsPaginated();
    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <PostGallery initialPosts={initialPosts} />
            </div>
        </Layout>
    );
}
