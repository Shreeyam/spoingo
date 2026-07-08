/**
 * Site Configuration — marie (typicalatom.com)
 *
 * Edit this file to customize the blog. All personal information,
 * social links, CV data, and site metadata are configured here.
 *
 * This started as a minimal scaffold — fill in the real content.
 */

const siteConfig = {
    // ===================
    // SITE METADATA
    // ===================
    site: {
        title: "Marie",
        description: "Marie",
        language: "en",
    },

    // ===================
    // PERSONAL INFORMATION
    // ===================
    author: {
        name: "Marie",
        firstName: "Marie",
        avatar: "/me.jpg",
        location: "",
        currentJob: "",
        education: "",
        email: "",
    },

    // ===================
    // SOCIAL LINKS
    // ===================
    // Set a link to null or remove it to hide that social link
    social: {
        linkedin: null,
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
        copyright: "Marie",
        poweredBy: {
            name: "Spoingo",
            url: "https://www.github.com/Shreeyam/spoingo",
        },
    },

    // ===================
    // BIOGRAPHY
    // ===================
    // Use HTML for formatting.
    biography: {
        intro: "",

        paragraphs: [
            `Hi, I'm Marie.`,
        ],
    },

    // ===================
    // CV DATA
    // ===================
    cv: {
        selectedResearch: [],

        researchInterests: [],

        // Education entries
        education: [],

        // Work experience entries
        experience: [],

        // Skills
        skills: {},

        // Projects & extracurricular activities
        projects: [],

        // Awards
        awards: [],

        // Invited talks
        invitedTalks: [],

        // Publications - author name to highlight
        highlightAuthor: "Marie",

        publications: [],
    },
};

export default siteConfig;
