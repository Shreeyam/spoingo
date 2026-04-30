import Image from 'next/image';
import siteConfig from '@/config/siteConfig';

export default function AuthorHeader() {
    const { author, biography, social } = siteConfig;
    const metaLinks = [
        social.googleScholar && { label: 'Scholar', href: social.googleScholar },
        social.github && { label: 'GitHub', href: social.github },
        social.linkedin && { label: 'LinkedIn', href: social.linkedin },
        social.orcid && { label: 'ORCID', href: social.orcid },
    ].filter(Boolean);

    return (
        <header className="flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-start">
            {author.avatar && (
                <Image
                    src={author.avatar}
                    alt={author.name}
                    width={144}
                    height={144}
                    priority
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shrink-0 border border-border"
                />
            )}
            <div className="space-y-3 flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    {author.name}
                </h1>
                {biography.intro && (
                    <p className="text-lg leading-relaxed text-foreground/90">
                        {biography.intro}
                    </p>
                )}
                <p className="text-sm text-muted-foreground">
                    {author.currentJob}
                    {' · '}
                    {author.education}
                    {' · '}
                    <span>{author.email}</span>
                </p>
                <p className="text-sm">
                    {metaLinks.map((link, i) => (
                        <span key={link.label}>
                            {i > 0 && <span className="text-muted-foreground"> · </span>}
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline underline-offset-2"
                            >
                                {link.label}
                            </a>
                        </span>
                    ))}
                </p>
            </div>
        </header>
    );
}
