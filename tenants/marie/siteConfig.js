/**
 * Site Configuration — marie (typicalatom.com)
 */

const siteConfig = {
    // ===================
    // SITE METADATA
    // ===================
    site: {
        title: "Typical Atom",
        description: "A blog about radiation",
        language: "en",
    },

    // ===================
    // PERSONAL INFORMATION
    // ===================
    author: {
        name: "Marie Barton",
        firstName: "Marie",
        avatar: "/marie.jpg",
        location: "Palo Alto, California",
        currentJob: "",
        education: "San Jose State University",
        email: "typicalatom [at] gmail [dot] com",
    },

    // ===================
    // SOCIAL LINKS
    // ===================
    // Set a link to null or remove it to hide that social link
    social: {
        linkedin: "https://www.linkedin.com/in/mariebarton/",
        github: null,
        googleScholar: null,
        orcid: null,
        twitter: null,
        instagram: null,
        youtube: null,
        website: null,
    },

    // ===================
    // FOOTER
    // ===================
    footer: {
        copyright: "Typical Atom",
        poweredBy: {
            name: "Spoingo",
            url: "https://www.github.com/Shreeyam/spoingo",
        },
    },

    // ===================
    // BIOGRAPHY
    // ===================
    // Use HTML for formatting and links
    biography: {
        intro: "Hello, I'm Marie. I love radiation.",

        paragraphs: [
            "I am fascinated by radiation and the history around interactions with radioactive materials. The other half of this blog will be dedicated to brutalist architecture and abandoned buildings.",
            "I am an anthropology graduate. I am currently studying to apply to law school.",
        ],
    },

    // ===================
    // CV DATA
    // ===================
    cv: {
        // Education entries
        education: [
            {
                institution: "San Jose State University",
                years: "2023 - 2026",
                degrees: [
                    { title: "B.A., Anthropology, Magna Cum Laude" },
                ],
            },
        ],

        // Work experience entries
        experience: [],

        // Skills
        skills: {
            languages: "English",
            research: [
                "Archival research",
                "Qualitative analysis",
                "Ethnographic research",
                "Site documentation",
            ],
            subjectAreas: [
                "Radiological disaster studies",
                "Nuclear history",
                "Radioactive antiques",
                "Urban decay",
                "Soviet architecture",
            ],
        },

        // Projects & extracurricular activities
        projects: [],

        // Awards
        awards: [
            "President's Scholar, San Jose State University (2023 - 2026)",
            "Phi Kappa Phi, San Jose State University (inducted 2026)",
        ],

        // Invited talks
        invitedTalks: [],

        // Publications - author name to highlight
        highlightAuthor: "Marie Barton",

        // Publications
        publications: [],
    },
};

export default siteConfig;
