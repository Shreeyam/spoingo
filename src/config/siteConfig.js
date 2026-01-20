/**
 * Site Configuration - EXAMPLE TEMPLATE
 *
 * Copy this file to siteConfig.js and customize the values below.
 * Replace the placeholder text with your own information.
 */

const siteConfig = {
    // ===================
    // SITE METADATA
    // ===================
    site: {
        title: "Jane's Blog",
        description: "A personal blog about cooking, crafts, and life",
        language: "en",
    },

    // ===================
    // PERSONAL INFORMATION
    // ===================
    author: {
        name: "Jane Doe",
        firstName: "Jane",
        avatar: "/me.jpg", // Place your photo in the public folder
        location: "New York",
        currentJob: "Software Engineer",
        education: "Stanford University",
        email: "jane [at] example [dot] com",
    },

    // ===================
    // SOCIAL LINKS
    // ===================
    // Set a link to null or remove it to hide that social link
    social: {
        linkedin: "https://linkedin.com/in/janedoe",
        github: "https://github.com/janedoe",
        googleScholar: null, // Remove or set to null if not needed
        orcid: null,
        twitter: "https://twitter.com/janedoe",
        instagram: "https://instagram.com/janedoe",
        youtube: null,
        website: "https://janedoe.com",
    },

    // ===================
    // FOOTER
    // ===================
    footer: {
        copyright: "Jane Doe",
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
        intro: "Hey, I'm Jane! I love cooking, crafts, and sharing my adventures.",

        paragraphs: [
            `I'm a software engineer by day and a passionate home cook by night. I love experimenting with recipes from around the world and putting my own spin on classic dishes.`,

            `When I'm not coding or cooking, you can find me working on various craft projects. I especially enjoy <a href="https://example.com/knitting" target="_blank" class="underline hover:text-primary">knitting</a> and <a href="https://example.com/pottery" target="_blank" class="underline hover:text-primary">pottery</a>.`,

            `I started this blog to document my culinary experiments and share them with friends and family. I hope you find something here that inspires you to try something new in your own kitchen!`,
        ],
    },

    // ===================
    // CV DATA
    // ===================
    // Remove or empty sections you don't need
    // cv: {
    //     // Education entries
    //     education: [
    //         {
    //             institution: "Stanford University",
    //             years: "2010 - 2014",
    //             degrees: [
    //                 {
    //                     title: "BS Computer Science",
    //                     classification: "Magna Cum Laude",
    //                 },
    //             ],
    //         },
    //     ],

    //     // Work experience entries
    //     experience: [
    //         {
    //             company: "Tech Company",
    //             title: "Senior Software Engineer",
    //             location: "San Francisco, CA",
    //             years: "2018 - Present",
    //             bullets: [
    //                 "Led development of key product features",
    //                 "Mentored junior engineers",
    //                 "Improved system performance by 40%",
    //             ],
    //         },
    //         {
    //             company: "Startup Inc",
    //             title: "Software Engineer",
    //             location: "New York, NY",
    //             years: "2014 - 2018",
    //             bullets: [
    //                 "Built full-stack web applications",
    //                 "Implemented CI/CD pipelines",
    //             ],
    //         },
    //     ],

    //     // Skills - customize the categories as needed
    //     skills: {
    //         programmingLanguages: "JavaScript, Python, Go",
    //         software: "VS Code, Docker, AWS",
    //         languages: "English (Native), Spanish (Conversational)",
    //     },

    //     // Projects & extracurricular activities - can be empty
    //     projects: [],

    //     // Awards - can be empty
    //     awards: [],

    //     // Invited talks - can be empty
    //     invitedTalks: [],

    //     // Name to highlight in publications
    //     highlightAuthor: "Jane Doe",

    //     // Publications - can be empty
    //     publications: [],
    // },
};

export default siteConfig;
