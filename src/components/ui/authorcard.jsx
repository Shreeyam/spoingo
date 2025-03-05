import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function AuthorBlock({
    avatarUrl,
    authorName,
    onFollowClick,
    children,
}) {
    return (
        <div
            itemScope
            itemType="http://schema.org/Person"
            className="flex flex-col space-y-4 p-4 border rounded-md"
        >
            {/* Full-width avatar */}
            <div className="relative w-full">
                <Avatar className="w-full h-full">
                    <AvatarImage
                        src={avatarUrl}
                        alt={authorName}
                        className="w-full h-full object-cover"
                    />
                    <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
            {/* Author name centered underneath */}
            <h3 className="text-lg font-bold text-center" itemProp="name">
                <Link href="/about" className="hover:underline block">
                    {authorName}
                </Link>
            </h3>
            {children && (
                <ul className="flex flex-col space-y-2">
                    {React.Children.map(children, (child, idx) => (
                        <li key={idx}>{child}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
