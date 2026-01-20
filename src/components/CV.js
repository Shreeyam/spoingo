"use client";
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CVSection from '@/components/CVSection';
import siteConfig from '@/config/siteConfig';

export default function CV() {
    const { cv } = siteConfig;

    // State to toggle showing all publications or a subset
    const [showAll, setShowAll] = React.useState(false);

    // If no CV data, render nothing
    if (!cv) {
        return null;
    }

    // Highlight the author's name in publication author lists
    const highlightName = (authors) => {
        if (!cv.highlightAuthor) return authors;
        return authors.replace(cv.highlightAuthor, `<strong>${cv.highlightAuthor}</strong>`);
    };

    const publications = cv.publications || [];

    // Get unique years sorted in descending order
    const uniqueYears = Array.from(new Set(publications.map(pub => pub.year))).sort((a, b) => b - a);

    // Group publications by year
    const groupedPublications = uniqueYears.map(year => ({
        year,
        pubs: publications.filter(pub => pub.year === year),
    }));

    // If not showing all, display only the first 3 groups
    const displayGroups = showAll ? groupedPublications : groupedPublications.slice(0, 3);

    // Check if there's any CV content to display
    const hasEducation = cv.education && cv.education.length > 0;
    const hasExperience = cv.experience && cv.experience.length > 0;
    const hasSkills = cv.skills && (cv.skills.programmingLanguages || cv.skills.software || cv.skills.languages);
    const hasProjects = cv.projects && cv.projects.length > 0;
    const hasAwards = cv.awards && cv.awards.length > 0;
    const hasTalks = cv.invitedTalks && cv.invitedTalks.length > 0;
    const hasPublications = publications.length > 0;

    // If nothing to show, return null
    if (!hasEducation && !hasExperience && !hasSkills && !hasProjects && !hasAwards && !hasTalks && !hasPublications) {
        return null;
    }

    return (
        <>
            {/* Education Section */}
            {hasEducation && (
            <CVSection title="Education">
                <div className="space-y-4">
                    {cv.education.map((edu, eduIndex) => (
                        <div key={eduIndex}>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                                {edu.years && <span className="text-gray-600 text-sm">{edu.years}</span>}
                            </div>
                            <div className="space-y-4">
                                {edu.degrees.map((degree, degIndex) => (
                                    <div key={degIndex}>
                                        <div className="flex justify-between items-start">
                                            <p className="font-medium text-gray-700">{degree.title}</p>
                                            {degree.years && <span className="text-gray-600 text-sm">{degree.years}</span>}
                                        </div>
                                        {degree.gpa && (
                                            <p className="text-gray-700">
                                                <span className="font-medium">GPA:</span> {degree.gpa}
                                            </p>
                                        )}
                                        {degree.classification && (
                                            <p className="text-gray-700">
                                                <span className="font-medium">Degree Classification:</span> {degree.classification}
                                            </p>
                                        )}
                                        {degree.thesis && (
                                            <p className="text-gray-700">
                                                <span className="font-medium">Thesis:</span> {degree.thesis}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CVSection>
            )}

            {/* Experience Section */}
            {hasExperience && (
            <CVSection title="Experience">
                <div className="space-y-6">
                    {cv.experience.map((exp, index) => (
                        <div key={index}>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                <h3 className="font-bold text-gray-800">{exp.company}</h3>
                                <span className="text-gray-600 text-sm">{exp.years}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                <p className="text-gray-700 font-medium">{exp.title}</p>
                                <span className="text-gray-600 text-sm">{exp.location}</span>
                            </div>
                            <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                                {exp.bullets.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </CVSection>
            )}

            {/* Skills Section */}
            {hasSkills && (
            <CVSection title="Skills">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cv.skills.programmingLanguages && (
                        <div>
                            <p className="font-medium text-gray-800">Programming Languages</p>
                            <p className="text-gray-700">{cv.skills.programmingLanguages}</p>
                        </div>
                    )}
                    {cv.skills.software && (
                        <div>
                            <p className="font-medium text-gray-800">Software</p>
                            <p className="text-gray-700">{cv.skills.software}</p>
                        </div>
                    )}
                    {cv.skills.languages && (
                        <div>
                            <p className="font-medium text-gray-800">Languages</p>
                            <p className="text-gray-700">{cv.skills.languages}</p>
                        </div>
                    )}
                </div>
            </CVSection>
            )}

            {/* Projects & Extracurricular Activities Section */}
            {hasProjects && (
                <CVSection title="Projects & Extracurricular Activities">
                    {cv.projects.map((project, index) => (
                        <div key={index}>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                <h3 className="font-bold text-gray-800">{project.name}</h3>
                                <span className="text-gray-600 text-sm">{project.years}</span>
                            </div>
                            <p className="text-gray-700 font-medium">{project.role}</p>
                            <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                                {project.bullets.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </CVSection>
            )}

            {/* Awards Section */}
            {hasAwards && (
                <CVSection title="Awards">
                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                        {cv.awards.map((award, index) => (
                            <li key={index}>{award}</li>
                        ))}
                    </ul>
                </CVSection>
            )}

            {/* Invited Talks Section */}
            {hasTalks && (
                <CVSection title="Invited Talks">
                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                        {cv.invitedTalks.map((talk, index) => (
                            <li key={index}>{talk}</li>
                        ))}
                    </ul>
                </CVSection>
            )}

            {/* Publications Section */}
            {hasPublications && (
                <CVSection title="Publications">
                    <div className="space-y-4">
                        {displayGroups.map((group) => (
                            <div key={group.year}>
                                <h3 className="text-lg font-semibold text-gray-700">{group.year}</h3>
                                <div className="space-y-4">
                                    {group.pubs.map((pub, index) => (
                                        <a
                                            key={index}
                                            href={pub.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block relative group"
                                        >
                                            {/* External link icon appears on hover */}
                                            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100">
                                                <ExternalLink size={16} />
                                            </div>
                                            <p className="font-medium text-gray-800 mb-1">{pub.title}</p>
                                            <p className="text-gray-700 mb-1" dangerouslySetInnerHTML={{ __html: highlightName(pub.authors) }}></p>
                                            <p className="text-gray-600 text-sm italic">{pub.note}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    {!showAll && cv.publications.length > displayGroups.reduce((acc, group) => acc + group.pubs.length, 0) && (
                        <div className="text-right mt-4">
                            <Button onClick={() => setShowAll(true)} variant="outline">
                                Show {cv.publications.length - displayGroups.reduce((acc, group) => acc + group.pubs.length, 0)} more publications
                            </Button>
                        </div>
                    )}
                </CVSection>
            )}
        </>
    );
}
