/**
 * Site Configuration
 *
 * Edit this file to customize your blog. All personal information,
 * social links, CV data, and site metadata are configured here.
 */

const siteConfig = {
    // ===================
    // SITE METADATA
    // ===================
    site: {
        title: "Shreeyam Kacker",
        description: "Shreeyam Kacker",
        language: "en",
    },

    // ===================
    // PERSONAL INFORMATION
    // ===================
    author: {
        name: "Shreeyam Kacker",
        firstName: "Shreeyam",
        avatar: "/me.jpg",
        location: "San Francisco",
        currentJob: "Planet Labs",
        education: "MIT",
        email: "shreeyam [at] mit [dot] edu",
    },

    // ===================
    // SOCIAL LINKS
    // ===================
    // Set a link to null or remove it to hide that social link
    social: {
        linkedin: "https://linkedin.com/in/shreeyam",
        github: "https://github.com/shreeyam",
        googleScholar: "https://scholar.google.com/citations?user=qkepsdMAAAAJ&hl=en",
        orcid: "https://orcid.org/0000-0002-7227-4946",
        twitter: null,
        instagram: null,
        youtube: null,
        website: null,
    },

    // ===================
    // FOOTER
    // ===================
    footer: {
        copyright: "Shreeyam Kacker",
        poweredBy: {
            name: "Spoingo",
            url: "https://www.github.com/Shreeyam/spoingo",
        },
    },

    // ===================
    // BIOGRAPHY
    // ===================
    // Use HTML for formatting. Available placeholders: none (write full HTML)
    biography: {
        intro: "",

        paragraphs: [
            `Hey, I'm Shreeyam. I am a machine learning researcher working on representation learning and planning for autonomous systems. I received my PhD from MIT's <a href="https://aeroastro.mit.edu/starlab/" target="_blank" class="underline hover:text-primary">STAR Lab</a>, with PI Prof. Kerri Cahoy, where my research focused on autonomous tasking formulations for Earth-observing satellites using computer vision, onboard planning, and edge ML.`,

            `At Planet, I work on onboard ML and edge compute and autonomy for high resolution Earth-observing satellites. My previous experience also includes photonics at <a href="https://x.company/" target="_blank" class="underline hover:text-primary">X, the moonshot factory</a> (formerly Google [x]).`,

            `I started this blog for technical sewing projects. There are countless blogs from the early to mid 2010s that have been invaluable to my sewing journey, and I hope to contribute to that body of knowledge. I might occasionally write about fashion, research, or other topics also.`,

            `I wrote this blog platform called <a href="https://www.github.com/Shreeyam/spoingo" target="_blank" class="underline hover:text-primary">Spoingo</a>. I also host a tree-based productivity software called <a href="https://treetrack.xyz/" target="_blank" class="underline hover:text-primary">Treetrack</a>.`,
        ],
    },

    // ===================
    // CV DATA
    // ===================
    cv: {
        selectedResearch: [
            {
                title: "Differentiable Satellite Constellation Configuration",
                subtitle: "Relaxed coverage and revisit objectives for Earth-observing satellite design",
                description: "A composition of differentiable orbit propagation and relaxed variants of mission metrics can be used to directly optimize mission-level objectives.",
                media: {
                    src: "/blue-globe.webm",
                    poster: "/blue-globe-poster.png",
                    alt: "Animated satellite constellation optimization around a blue globe",
                },
                links: [
                    { label: "paper", href: "https://arxiv.org/abs/2604.19062" },
                    { label: "code", href: "https://github.com/Shreeyam/differentiable_eo" },
                ],
            },
        ],

        researchInterests: [
            "Self-supervised representation learning and representation geometry",
            "Reliable computer vision under distribution shift",
            "Vision foundation models and visual-spatial reasoning",
            "Reinforcement learning and learning-guided planning",
            "Edge ML and efficient inference for autonomous systems",
            "Physical-world AI, remote sensing, and embodied autonomy",
        ],

        // Education entries
        education: [
            {
                institution: "Massachusetts Institute of Technology (MIT)",
                degrees: [
                    {
                        title: "PhD Spacecraft Systems and Sensors, minor in AI and Computer Vision",
                        years: "2024 - 2025",
                        thesis: "Spacecraft Autonomy through Computer Vision and Onboard Planning",
                    },
                    {
                        title: "SM Aeronautics and Astronautics",
                        years: "2020 - 2022",
                        gpa: "5.0/5.0",
                    },
                ],
            },
            {
                institution: "Imperial College London",
                years: "2016 - 2020",
                degrees: [
                    {
                        title: "MEng Aeronautical Engineering with a Year Abroad",
                        years: "2016 - 2020",
                        classification: "First Class Honours",
                    },
                ],
            },
        ],

        // Work experience entries
        experience: [
            {
                company: "Planet Labs",
                title: "ML Research Engineer",
                location: "San Francisco, CA",
                years: "2022 - 2024, 2025 - Present",
                bullets: [
                    "Fine-tuned DINOv2 vision transformer (ViT) foundation model on Planet satellite imagery for scene classification and change detection",
                    "Distilled CLIP-style vision-language models to 8M parameters for lightweight onboard semantic filtering of satellite data",
                    "Designed and implemented algorithms for onboard dynamic task rescheduling using vision model outputs as inputs to a constraint-based planner",
                    "Deployed end-to-end inference pipeline for autonomous satellite operations, including model serving, camera drivers, and integration with the main flight computer",
                    "Architected next-generation onboard compute platform using NVIDIA GPUs as the first hire on the edge compute team",
                    "Radiation tested NVIDIA Jetson Orin and Thor at UC Davis cyclotron to qualify ML hardware for space operations; Thor results announced at NVIDIA GTC 2026",
                ],
            },
            {
                company: "MIT Space Telecommunications, Astronomy and Radiation Laboratory",
                title: "PhD Student (PI: Prof. Kerri Cahoy)",
                location: "Cambridge, MA",
                years: "2020 - 2025",
                bullets: [
                    "Trained multi-agent reinforcement learning policies for electromagnetic formation flight, treating spacecraft as collaborative embodied agents performing continuous control in simulation",
                    "Developed reinforcement learning-based lookahead heuristics for dynamic task scheduling, outperforming greedy and analytic baselines on agile Earth-observing satellite constellations",
                    "Designed, trained, and validated deep learning models for cloud segmentation deployed onboard ESA's OPS-SAT satellite; validated on-orbit with real imagery",
                    "Created labeled dataset and trained edge detection models for ocean front detection from multi-spectral satellite imagery, published in IEEE TGRS",
                ],
            },
            {
                company: "X Development LLC (formerly Google[x])",
                title: "Intern @X",
                location: "Mountain View, CA",
                years: "2021",
                bullets: [
                    "Interned under Taara, a free-space optical communications project; conducted architecture analysis and modeled integrated photonics for link budget optimization",
                ],
            },
            // {
            //     company: "Intelligent Environments Europe Ltd (ieDigital)",
            //     title: "Software Developer Intern",
            //     location: "London, UK",
            //     years: "2016",
            //     bullets: [
            //         "Worked as a full stack software developer intern writing C# across teams managed under agile methodology.",
            //         "Automated part of the workflow for business analysts using Python, saving tens of hours on importing old functional specifications into JIRA.",
            //     ],
            // },
        ],

        // Skills
        skills: {
            mlFrameworksAndTools: "PyTorch, JAX, CUDA, NumPy, SciPy, Pandas, Git, GCP, Docker",
            programmingLanguages: "Python, C, C++",
            methods: "DL, RL, CV, transformers, LLMs, VLMs, foundation models",
        },

        // Projects & extracurricular activities
        projects: [
            {
                name: "Imperial College London Rocketry",
                role: "Electronics & Payload Team Lead",
                years: "2019 - 2020",
                bullets: [
                    "One of four executive leads of an 80-member team.",
                    "Led design and manufacture of all rocket electronics, including avionics systems, telemetry, data acquisition, throttle control system, and payload.",
                ],
            },
        ],

        // Awards
        awards: [
            "Best Paper Award in Small Satellites at AIAA SciTech Forum (2022)",
            "Imperial College London Dean's List (2019)",
        ],

        // Invited talks
        invitedTalks: [
            'NASA Jet Propulsion Laboratory, "Dynamic Tasking with Agile Lookahead for Tasked Earth-Observing Satellites" (2025)',
        ],

        // Publications - author name to highlight
        highlightAuthor: "Shreeyam Kacker",

        publications: [
            {
                title: "Continuous Attitude Planning for Agile Earth-Observing Satellite Collection Scheduling using Graphs of Convex Sets",
                authors: "Shreeyam Kacker, Kerri Cahoy",
                note: "in prep.",
                sortYear: 2027,
                selected: true,
            },
            {
                title: "Multi-Agent Reinforcement Learning for Spacecraft Electromagnetic Formation Flight with Transformer Policies",
                authors: "Josef Biberstein, Shreeyam Kacker, Kerri Cahoy, Sertac Karaman",
                note: "in prep.; targeting ICRA 2027",
                sortYear: 2027,
                selected: true,
            },
            {
                title: "Gaussian KL-Matching Regularization for Self-Supervised Learning",
                authors: "Shreeyam Kacker, Miles Shepherd, Kerri Cahoy",
                note: "in prep.",
                sortYear: 2027,
                selected: true,
            },
            {
                title: "Folded Lightweight Actuator Positioning System (FLAPS)",
                authors: "Paula do Vale Pereira, Katherine S Chun, Mario M Contreras, Charles Lindsay, Shreeyam Kacker, Raymond Huffman, Christian Haughwout, Kerri Cahoy",
                note: "33rd Annual AIAA/USU Conference on Small Satellites",
                year: 2019,
                url: "https://digitalcommons.usu.edu/smallsat/2019/all2019/132/",
            },
            {
                title: "Link analysis for a liquid lens beam steering system, the miniature optical steered antenna for intersatellite communication: MOSAIC",
                authors: "Shreeyam Kacker, Ondrej Cierny, Jared Boyer, Kerri Cahoy",
                note: "SPIE Free-Space Laser Communications XXXIII 11678",
                year: 2021,
                url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/11678/116780T/Link-analysis-for-a-liquid-lens-beam-steering-system-the/10.1117/12.2582607.short",
            },
            {
                title: "On-orbit rule-based and deep learning image segmentation strategies for the BeaverCube-2 mission",
                authors: "Shreeyam Kacker, Alex Meredith, Violet Felt, Joe Kusters, Hannah Tomio, Kerri Cahoy",
                note: "AIAA SCITECH 2022 Forum",
                year: 2022,
                url: "https://arc.aiaa.org/doi/10.2514/6.2022-0646",
                selected: true,
            },
            {
                title: "MOEMS-based lens-assisted beam steering for free-space optical communications",
                authors: "Daniel A Goldman, Paul Serra, Shreeyam Kacker, Lucas Benney, Daniel Vresilovic, Steven J Spector, Kerri Cahoy, Jordan S Wachs",
                note: "IEEE Journal of Lightwave Technology, Vol.41(9)",
                year: 2023,
                url: "https://ieeexplore.ieee.org/document/10015011",
            },
            {
                title: "Systems and Methods for Cloud Avoidance",
                authors: "Kiruthika Devaraj, Shreeyam Kacker",
                note: "United States Patent and Trademark Office Application 18/345,883",
                year: 2023,
                url: "https://patents.google.com/patent/US20250002178A1/en",
            },
            {
                title: "Satellite for Estimating Aquatic Salinity and Temperature (SEASALT) a Payload and Instrumentation Overview",
                authors: "Shreeyam Kacker, Mary Dahl, Albert Thieu, Cadence Payne, Kerri Cahoy, Paul Fucile, Viviane Menezes, Sean McCarthy",
                note: "36th Annual AIAA/USU Conference on Small Satellites",
                year: 2022,
                url: "https://digitalcommons.usu.edu/smallsat/2022/all2022/226/",
            },
            {
                title: "Satellite for Estimating Aquatic Salinity and Temperature (SEASALT)-A Scientific Overview",
                authors: "Sean McCarthy, Viviane Menezes, Paul Fucile, Kerri Cahoy, Mary Dahl, Albert Thieu, Cadence Payne, Charles Lindsay, Shreeyam Kacker",
                note: "36th Annual AIAA/USU Conference on Small Satellites",
                year: 2022,
                url: "https://digitalcommons.usu.edu/smallsat/2022/all2022/87/",
            },
            {
                title: "Machine Learning Image Processing Algorithms Onboard OPS-SAT",
                authors: "Shreeyam Kacker, Alex Meredith, Kerri Cahoy, Georges Labreche",
                note: "36th Annual AIAA/USU Conference on Small Satellites",
                year: 2022,
                url: "https://digitalcommons.usu.edu/smallsat/2022/all2022/65/",
                selected: true,
            },
            {
                title: "Commercially Available Imaging Payloads for CubeSat Earth Observation Missions",
                authors: "Hannah Tomio, Albert Thieu, Amelia Gagnon, Sophia K Vlahakis, Shreeyam Kacker, Joe Kusters, Kerri Cahoy",
                note: "2022 IEEE Aerospace Conference (AERO)",
                year: 2022,
                url: "https://ieeexplore.ieee.org/document/9843446",
            },
            {
                title: "Laser-guided space interferometer",
                authors: "Leonid Pogorelyuk, Paul Serra, Shreeyam Kacker, Sophia Vlahakis, Nicholas Belsten, Gioia Rau, Kenneth G Carpenter, Laurent Pueyo, John D Monnier, Ewan S Douglas, others",
                note: "SPIE Optical and Infrared Interferometry and Imaging VIII Vol.12183",
                year: 2022,
                url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12183/121831E/Laser-guided-space-interferometer/10.1117/12.2630605.short",
            },
            {
                title: "Optical Performance and Prototyping of a Liquid Lens Laser Communications Transceiver",
                authors: "Shreeyam Kacker",
                note: "SM Thesis, Massachusetts Institute of Technology",
                year: 2022,
                url: "https://dspace.mit.edu/handle/1721.1/145576",
            },
            {
                title: "Fast ocean front detection using deep learning edge detection models",
                authors: "Violet Felt, Shreeyam Kacker, Joe Kusters, John Pendergrast, Kerri Cahoy",
                note: "IEEE Transactions on Geoscience and Remote Sensing 61",
                year: 2023,
                url: "https://ieeexplore.ieee.org/document/10124788",
                selected: true,
            },
            {
                title: "Optical Performance of Commercial Liquid Lens Assemblies in Microgravity",
                authors: "Shreeyam Kacker, Kerri L Cahoy",
                note: "SPIE Optical Engineering, Vol.62(11)",
                year: 2023,
                url: "https://www.spiedigitallibrary.org/journals/optical-engineering/volume-62/issue-11/113106/Optical-performance-of-commercial-liquid-lens-assemblies-in-microgravity/10.1117/1.OE.62.11.113106.short",
            },
            {
                title: "BeaverCube II: Using AI-Optimized Processors on Earth-Observing CubeSats for Autonomous Image Analysis and Intelligent Data Handling",
                authors: "Adam Bahlous-Boldi, Celvi Lisy, Neelambar Mondal, Brianna Ferro, Shreeyam Kacker, Mary Dahl, Madeline Anderson, Kerri Cahoy",
                note: "38th Annual AIAA/USU Conference on Small Satellites",
                year: 2024,
                url: "https://digitalcommons.usu.edu/smallsat/2024/all2024/117/",
            },
            {
                title: "Reinforcement-Learned Lookahead Heuristics for Earth-Observing Satellites",
                authors: "Shreeyam Kacker, Kerri Cahoy",
                note: "38th Annual AIAA/USU Conference on Small Satellites",
                year: 2024,
                url: "https://digitalcommons.usu.edu/smallsat/2024/all2024/60/",
            },
            {
                title: "Liquid lenses for aerospace beam steering and communications: MOSAIC",
                authors: "Shreeyam Kacker, Kerri Cahoy",
                note: "Optica Optics Express, Vol.33(1)",
                year: 2025,
                url: "https://opg.optica.org/oe/fulltext.cfm?uri=oe-33-1-1296&id=566864",
            },
            {
                title: "Leveraging Realtime Meteorological Data for Dynamic Tasking of Agile Earth-Observing Satellites",
                authors: "Shreeyam Kacker, Steve Chien, Kiruthika Devaraj, Işil Demir, Kerri Cahoy",
                note: "International Workshop on Planning & Scheduling for Space (IWPSS) 2025",
                year: 2025,
                url: "https://ai.jpl.nasa.gov/public/documents/papers/kacker-iwpss-2025.pdf",
            },
            {
                title: "Vision-Based Dynamic Tasking for Earth-Observing Satellite Constellations",
                authors: "Shreeyam Kacker, Kiruthika Devaraj, Işil Demir, Steve Chien, Kerri Cahoy",
                note: "39th Annual AIAA/USU Conference on Small Satellites",
                year: 2025,
                url: "https://digitalcommons.usu.edu/",
                selected: true,
            },
            {
                title: "Deep Reinforcement Learning for Multi-Agent Spacecraft Electromagnetic Formation Flight",
                authors: "Josef Biberstein, Shreeyam Kacker, Kerri Cahoy, Sertac Karaman",
                note: "International Conference on Space Robotics",
                year: 2025,
                url: "https://ieeexplore.ieee.org/abstract/document/11436505/",
                selected: true,
            },
            {
                title: "Differentiable Satellite Constellation Design via Relaxed Coverage and Revisit Objectives",
                authors: "Shreeyam Kacker, Kerri Cahoy",
                note: "arXiv:2604.19062",
                year: 2026,
                url: "https://arxiv.org/abs/2604.19062",
                selected: true,
            },
        ],
    },
};

export default siteConfig;
