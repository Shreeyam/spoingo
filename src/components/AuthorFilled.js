import React from 'react';
import AuthorBlock from '@/components/ui/authorcard';
import Link from 'next/link';
import { MapPin, Github, GraduationCap, Link2, Instagram, BriefcaseBusiness } from 'lucide-react';
import { Separator } from '@/components/ui/separator'; // shadcn separator component

export default function AuthorFilled() {
    return (
        <AuthorBlock avatarUrl="/me.jpg" authorName="Shreeyam Kacker">
            {/* Info section */}
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2">
                    <BriefcaseBusiness size={16} />
                    <span>Planet Labs</span>
                </div>
                <div className="flex items-center space-x-2">
                    <GraduationCap size={16} />
                    <span>MIT</span>
                </div>
            </div>

            {/* Separator */}
            <Separator className="my-2" />

            {/* Links section */}
            <div className="flex flex-col space-y-2">
                <Link
                    href="https://github.com/shreeyam"
                    className="flex items-center space-x-2 hover:underline"
                >
                    <Github size={16} />
                    <span>Github</span>
                </Link>
                <Link
                    href="https://scholar.google.com/citations?user=qkepsdMAAAAJ&amp;hl=en"
                    className="flex items-center space-x-2 hover:underline"
                >
                    <GraduationCap size={16} />
                    <span>Google Scholar</span>
                </Link>
                <Link
                    href="https://orcid.org/0000-0002-7227-4946"
                    className="flex items-center space-x-2 hover:underline"
                >
                    <Link2 size={16} />
                    <span>ORCID</span>
                </Link>
                <Link
                    href="https://instagram.com/shreebee_"
                    className="flex items-center space-x-2 hover:underline"
                >
                    <Instagram size={16} />
                    <span>Instagram</span>
                </Link>
            </div>
        </AuthorBlock>
    );
}
