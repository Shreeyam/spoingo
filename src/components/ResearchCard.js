import Image from 'next/image';

function isVideoMedia(src = '') {
    return /\.(webm|mp4|mov)$/i.test(src);
}

function ResearchMedia({ media }) {
    if (!media?.src) return null;

    const className = "aspect-square w-full object-contain bg-background";

    if (isVideoMedia(media.src)) {
        return (
            <video
                className={className}
                poster={media.poster}
                autoPlay
                loop
                muted
                playsInline
                aria-label={media.alt || undefined}
            >
                <source src={media.src} />
            </video>
        );
    }

    return (
        <Image
            src={media.src}
            alt={media.alt || ''}
            width={340}
            height={316}
            unoptimized
            className={className}
        />
    );
}

export default function ResearchCard({ item }) {
    return (
        <article className="grid gap-4 border border-border p-4 sm:grid-cols-[10rem_1fr]">
            <ResearchMedia media={item.media} />
            <div className="min-w-0">
                <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/80">
                    {item.description}
                </p>
                {item.links?.length > 0 && (
                    <p className="mt-3 text-sm">
                        {item.links.map((link, i) => (
                            <span key={link.href}>
                                {i > 0 && <span className="text-muted-foreground"> · </span>}
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline underline-offset-2"
                                >
                                    [{link.label}]
                                </a>
                            </span>
                        ))}
                    </p>
                )}
            </div>
        </article>
    );
}
