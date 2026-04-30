import Link from 'next/link';
import AuthorHeader from '@/components/AuthorHeader';
import IntroParagraphs from '@/components/IntroParagraphs';
import Layout from '@/components/Layout';
import PageArticle from '@/components/PageArticle';
import PageSection from '@/components/PageSection';
import PublicationCard from '@/components/PublicationCard';
import ResearchCard from '@/components/ResearchCard';
import siteConfig from '@/config/siteConfig';

export const revalidate = 300;

export default async function HomePage() {
    const { biography, cv } = siteConfig;

    const selected = (cv?.publications || [])
        .filter((p) => p.selected)
        .sort((a, b) => (b.sortYear || b.year || 0) - (a.sortYear || a.year || 0));

    return (
        <Layout>
            <PageArticle>
                <AuthorHeader />

                <IntroParagraphs paragraphs={biography.paragraphs} count={2} />

                {cv?.selectedResearch?.length > 0 && (
                    <PageSection title="Selected Research">
                        <div className="space-y-4">
                            {cv.selectedResearch.map((item) => (
                                <ResearchCard key={item.title} item={item} />
                            ))}
                        </div>
                    </PageSection>
                )}

                {selected.length > 0 && (
                    <PageSection title="Publications" headingClassName="mb-5">
                        <div className="space-y-6">
                            {selected.map((pub, i) => (
                                <PublicationCard key={i} pub={pub} />
                            ))}
                        </div>
                        <p className="mt-6 text-sm">
                            <Link
                                href="/about#publications"
                                className="hover:underline underline-offset-2"
                            >
                                See all publications →
                            </Link>
                        </p>
                    </PageSection>
                )}
            </PageArticle>
        </Layout>
    );
}
