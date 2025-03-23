// src/app/page.jsx
import Layout from '@/components/Layout';
import PaginatedPostList from '@/components/PaginatedPostList';
import AuthorFilled from '@/components/AuthorFilled';
import Biography from '@/components/Biography';
import { Separator } from '@/components/ui/separator';
import { getPosts } from '@/lib/db';
import CV from '@/components/CV';

export default async function About() {
    // Await the asynchronous call to getPosts.
    const initialPosts = await getPosts();

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Author card in one column */}
                    <div className="md:col-span-1">
                        <AuthorFilled />
                    </div>
                    {/* Posts take up three columns */}
                    <div className="md:col-span-3">
                        <Biography showAbout={false}/>
                        <Separator className="my-2"/>
                        <CV/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
