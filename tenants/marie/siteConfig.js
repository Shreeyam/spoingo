/**
 * Site Configuration — marie (typicalatom.com)
 */

const siteConfig = {
    // ===================
    // SITE METADATA
    // ===================
    site: {
        title: "Typical Atom",
        description: "A blog about radiation and brutalist architecture",
        language: "en",
    },

    // ===================
    // PERSONAL INFORMATION
    // ===================
    author: {
        name: "Marie Barton",
        firstName: "Marie",
        avatar: "/marie.jpg",
        location: "San Jose, California",
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
        intro: "Hey, I'm Marie. I love radiation, brutalist architecture, and abandoned buildings.",

        paragraphs: [
            "I started this blog to discuss how humans interact with radiation and the nuclear horizon. There will also be reports on Brutalist buildings from around the world and any other things that float into my realm of interest.",
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
                    { title: "B.A., Anthropology" },
                ],
            },
        ],

        // Work experience entries
        experience: [],

        // Skills
        skills: {
            languages: "English",
        },

        // Projects & extracurricular activities
        projects: [],

        // Awards
        awards: [],

        // Invited talks
        invitedTalks: [],

        // Publications - author name to highlight
        highlightAuthor: "Marie Barton",

        // Publications
        publications: [],
    },
};

export default siteConfig;
