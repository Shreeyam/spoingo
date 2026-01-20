import React from 'react';
import AuthorBlock from '@/components/ui/authorcard';
import Link from 'next/link';
import { MapPin, Github, GraduationCap, Link2, Instagram, BriefcaseBusiness, Linkedin, Globe, Twitter, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import siteConfig from '@/config/siteConfig';

// Map social platform names to their icons
const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    googleScholar: GraduationCap,
    orcid: Globe,
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    website: Link2,
};

// Display names for social platforms
const socialNames = {
    linkedin: 'LinkedIn',
    github: 'Github',
    googleScholar: 'Google Scholar',
    orcid: 'ORCID',
    twitter: 'Twitter',
    instagram: 'Instagram',
    youtube: 'YouTube',
    website: 'Website',
};

export default function AuthorFilled() {
    const { author, social } = siteConfig;

    // Filter out null/undefined social links
    const activeSocials = Object.entries(social).filter(([_, url]) => url);

    return (
        <AuthorBlock avatarUrl={author.avatar} authorName={author.name}>
            {/* Info section */}
            <div className="flex flex-col space-y-2">
                {author.location && (
                    <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{author.location}</span>
                    </div>
                )}
                {author.currentJob && (
                    <div className="flex items-center space-x-2">
                        <BriefcaseBusiness size={16} />
                        <span>{author.currentJob}</span>
                    </div>
                )}
                {author.education && (
                    <div className="flex items-center space-x-2">
                        <GraduationCap size={16} />
                        <span>{author.education}</span>
                    </div>
                )}
            </div>

            {/* Separator */}
            {activeSocials.length > 0 && <Separator className="my-2" />}

            {/* Links section */}
            <div className="flex flex-col space-y-2">
                {activeSocials.map(([platform, url]) => {
                    const Icon = socialIcons[platform] || Link2;
                    const name = socialNames[platform] || platform;
                    return (
                        <Link
                            key={platform}
                            href={url}
                            target="_blank"
                            className="flex items-center space-x-2 hover:underline"
                        >
                            <Icon size={16} />
                            <span>{name}</span>
                        </Link>
                    );
                })}
            </div>
        </AuthorBlock>
    );
}
