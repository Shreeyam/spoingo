import React from 'react';
import siteConfig from '@/config/siteConfig';

function highlightAuthor(authors) {
    const target = siteConfig.cv?.highlightAuthor;
    if (!target) return authors;
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return authors.replace(new RegExp(escaped, 'g'), `<strong>${target}</strong>`);
}

export default function PublicationCard({ pub }) {
    const hasThumb = Boolean(pub.thumbnail);
    const hasUrl = Boolean(pub.url);

    const titleEl = hasUrl ? (
        <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold leading-snug hover:underline underline-offset-2"
        >
            {pub.title}
        </a>
    ) : (
        <span className="font-bold leading-snug">{pub.title}</span>
    );

    const body = (
        <div className="flex-1 min-w-0">
            <div className="text-[1.05rem]">{titleEl}</div>
            <p
                className="mt-1 text-sm text-foreground/80"
                dangerouslySetInnerHTML={{ __html: highlightAuthor(pub.authors) }}
            />
            <p className="mt-0.5 text-sm text-muted-foreground italic">
                {pub.note}
                {pub.year ? `, ${pub.year}` : ''}
            </p>
        </div>
    );

    if (!hasThumb) {
        return <article>{body}</article>;
    }

    return (
        <article className="flex gap-5 items-start">
            <div className="shrink-0 w-28 aspect-[4/3] overflow-hidden border border-border bg-muted">
                <img
                    src={pub.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            {body}
        </article>
    );
}
