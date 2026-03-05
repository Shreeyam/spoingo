import React from 'react';
import ExtLink from '@/components/ui/externallink';
import Link from 'next/link';

export default function CVSection({title, children}) {
    return (
        <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
                {title}
            </h2>
            {children}
        </section>
    );
}
