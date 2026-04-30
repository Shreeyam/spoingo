import AuthorHeader from '@/components/AuthorHeader';
import IntroParagraphs from '@/components/IntroParagraphs';
import Layout from '@/components/Layout';
import PageArticle from '@/components/PageArticle';
import PageSection from '@/components/PageSection';
import PublicationCard from '@/components/PublicationCard';
import siteConfig from '@/config/siteConfig';

export default function About() {
    const { biography, cv } = siteConfig;
    const publications = [...(cv?.publications || [])]
        .sort((a, b) => (b.sortYear || b.year || 0) - (a.sortYear || a.year || 0));
    const otherParagraphs = biography.paragraphs.slice(2);

    return (
        <Layout>
            <PageArticle>
                <AuthorHeader />

                <IntroParagraphs paragraphs={biography.paragraphs} count={2} />

                {cv?.education?.length > 0 && (
                    <PageSection title="Education">
                        <div className="space-y-6">
                            {cv.education.map((edu) => (
                                <article key={edu.institution}>
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                        <h3 className="font-bold">{edu.institution}</h3>
                                        {edu.years && <span className="text-sm text-muted-foreground">{edu.years}</span>}
                                    </div>
                                    <div className="mt-3 space-y-4">
                                        {edu.degrees.map((degree) => (
                                            <div key={degree.title}>
                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                                    <p className="font-bold text-foreground/85">{degree.title}</p>
                                                    {degree.years && <span className="text-sm text-muted-foreground">{degree.years}</span>}
                                                </div>
                                                {degree.gpa && <p className="text-sm text-foreground/80">GPA: {degree.gpa}</p>}
                                                {degree.classification && <p className="text-sm text-foreground/80">Degree Classification: {degree.classification}</p>}
                                                {degree.thesis && <p className="text-sm text-foreground/80">Thesis: {degree.thesis}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </PageSection>
                )}

                {cv?.experience?.length > 0 && (
                    <PageSection title="Experience">
                        <div className="space-y-7">
                            {cv.experience.map((exp) => (
                                <article key={`${exp.company}-${exp.years}`}>
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                        <h3 className="font-bold">{exp.company}</h3>
                                        <span className="text-sm text-muted-foreground">{exp.years}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                        <p className="text-sm font-bold text-foreground/80">{exp.title}</p>
                                        <span className="text-sm text-muted-foreground">{exp.location}</span>
                                    </div>
                                    <ul className="mt-3 list-disc list-outside ml-5 space-y-2 text-[0.95rem] leading-relaxed text-foreground/80">
                                        {exp.bullets.map((bullet) => (
                                            <li key={bullet}>{bullet}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </PageSection>
                )}

                {cv?.skills && (
                    <PageSection title="Skills">
                        <div className="space-y-2 text-[0.95rem] leading-relaxed text-foreground/80">
                            {cv.skills.mlFrameworksAndTools && <p><strong>ML Frameworks & Tools:</strong> {cv.skills.mlFrameworksAndTools}</p>}
                            {cv.skills.programmingLanguages && <p><strong>Programming Languages:</strong> {cv.skills.programmingLanguages}</p>}
                            {cv.skills.methods && <p><strong>Methods:</strong> {cv.skills.methods}</p>}
                        </div>
                    </PageSection>
                )}

                {publications.length > 0 && (
                    <PageSection id="publications" title="Publications" headingClassName="mb-5">
                        <div className="space-y-6">
                            {publications.map((pub) => (
                                <PublicationCard key={`${pub.title}-${pub.year}`} pub={pub} />
                            ))}
                        </div>
                    </PageSection>
                )}

                {otherParagraphs.length > 0 && (
                    <PageSection title="Other Projects">
                        <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground/80">
                            {otherParagraphs.map((paragraph, i) => (
                                <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                            ))}
                        </div>
                    </PageSection>
                )}
            </PageArticle>
        </Layout>
    );
}
