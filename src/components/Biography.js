import React from 'react';
import Link from 'next/link';
import siteConfig from '@/config/siteConfig';

export default function Biography({ showAbout = false }) {
    const { author, biography } = siteConfig;

    return (
        <div className="max-w-5xl mx-auto prose text-foreground">
            {biography.intro}
            <br />
            <br />
            {biography.paragraphs.map((paragraph, index) => (
                <React.Fragment key={index}>
                    <span dangerouslySetInnerHTML={{ __html: paragraph }} />
                    {index === 1 && showAbout && (
                        <>
                            {' '}You can find my full CV at my <Link href="/about#education">about</Link> page.
                        </>
                    )}
                    {index < biography.paragraphs.length - 1 && (
                        <>
                            <br />
                            <br />
                        </>
                    )}
                </React.Fragment>
            ))}
            <br />
            <br />
            Contact: {author.email}
        </div>
    );
}
