"use client";
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CV() {
    // A smarter highlightName that returns an array of strings/React elements.
    const highlightName = (authors) => {
        return authors.replace("Shreeyam Kacker", "<strong>Shreeyam Kacker</strong>");
    };

    // Updated publications JSON with authors as a single string.
    const publications = [
        {
            title: "Folded Lightweight Actuator Positioning System (FLAPS)",
            authors:
                "Paula do Vale Pereira, Katherine S Chun, Mario M Contreras, Charles Lindsay, Shreeyam Kacker, Raymond Huffman, Christian Haughwout, Kerri Cahoy",
            note: "33rd Annual AIAA/USU Conference on Small Satellites",
            year: 2019,
            url: "https://digitalcommons.usu.edu/smallsat/2019/all2019/132/",
        },
        {
            title:
                "Link analysis for a liquid lens beam steering system, the miniature optical steered antenna for intersatellite communication: MOSAIC",
            authors: "Shreeyam Kacker, Ondrej Cierny, Jared Boyer, Kerri Cahoy",
            note: "SPIE Free-Space Laser Communications XXXIII 11678",
            year: 2021,
            url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/11678/116780T/Link-analysis-for-a-liquid-lens-beam-steering-system-the/10.1117/12.2582607.short",
        },
        {
            title: "On-orbit rule-based and deep learning image segmentation strategies",
            authors: "Shreeyam Kacker, Alex Meredith, Joe Kusters, Hannah Tomio, Violet Felt, Kerri Cahoy",
            note: "AIAA SCITECH 2022 Forum",
            year: 2022,
            url: "https://arc.aiaa.org/doi/10.2514/6.2022-0646",
        },
        {
            title:
                "MOEMS-based lens-assisted beam steering for free-space optical communications",
            authors:
                "Daniel A Goldman, Paul Serra, Shreeyam Kacker, Lucas Benney, Daniel Vresilovic, Steven J Spector, Kerri Cahoy, Jordan S Wachs",
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
            title:
                "Satellite for Estimating Aquatic Salinity and Temperature (SEASALT) a Payload and Instrumentation Overview",
            authors:
                "Shreeyam Kacker, Mary Dahl, Albert Thieu, Cadence Payne, Kerri Cahoy, Paul Fucile, Viviane Menezes, Sean McCarthy",
            note: "36th Annual AIAA/USU Conference on Small Satellites",
            year: 2022,
            url: "https://digitalcommons.usu.edu/smallsat/2022/all2022/226/",
        },
        {
            title:
                "Satellite for Estimating Aquatic Salinity and Temperature (SEASALT)-A Scientific Overview",
            authors:
                "Sean McCarthy, Viviane Menezes, Paul Fucile, Kerri Cahoy, Mary Dahl, Albert Thieu, Cadence Payne, Charles Lindsay, Shreeyam Kacker",
            note: "36th Annual AIAA/USU Conference on Small Satellites",
            year: 2022,
            url: "https://digitalcommons.usu.edu/smallsat/2022/all2022/87/",
        },
        {
            title: "Machine Learning Image Processing Algorithms onboard OPS-SAT",
            authors: "Shreeyam Kacker, Alex Meredith, Kerri Cahoy, Georges Labreche",
            note: "36th Annual AIAA/USU Conference on Small Satellites",
            year: 2022,
            url: "https://digitalcommons.usu.edu/smallsat/2022/all2022/65/",
        },
        {
            title:
                "Commercially Available Imaging Payloads for CubeSat Earth Observation Missions",
            authors:
                "Hannah Tomio, Albert Thieu, Amelia Gagnon, Sophia K Vlahakis, Shreeyam Kacker, Joe Kusters, Kerri Cahoy",
            note:
                "2022 IEEE Aerospace Conference (AERO)",
            year: 2022,
            url: "https://ieeexplore.ieee.org/document/9843446",
        },
        {
            title: "Laser-guided space interferometer",
            authors:
                "Leonid Pogorelyuk, Paul Serra, Shreeyam Kacker, Sophia Vlahakis, Nicholas Belsten, Gioia Rau, Kenneth G Carpenter, Laurent Pueyo, John D Monnier, Ewan S Douglas, others",
            note:
                "SPIE Optical and Infrared Interferometry and Imaging VIII Vol.12183",
            year: 2022,
            url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12183/121831E/Laser-guided-space-interferometer/10.1117/12.2630605.short",
        },
        {
            title:
                "Optical Performance and Prototyping of a Liquid Lens Laser Communications Transceiver",
            authors: "Shreeyam Kacker",
            note: "SM Thesis, Massachusetts Institute of Technology",
            year: 2022,
            url: "https://dspace.mit.edu/handle/1721.1/145576",
        },
        {
            title: "Fast ocean front detection using deep learning edge detection models",
            authors:
                "Violet Felt, Shreeyam Kacker, Joe Kusters, John Pendergrast, Kerri Cahoy",
            note:
                "IEEE Transactions on Geoscience and Remote Sensing 61",
            year: 2023,
            url: "https://ieeexplore.ieee.org/document/10124788",
        },
        {
            title:
                "Optical Performance of Commercial Liquid Lens Assemblies in Microgravity",
            authors: "Shreeyam Kacker, Kerri L Cahoy",
            note:
                "SPIE Optical Engineering, Vol.62(11)",
            year: 2023,
            url: "https://www.spiedigitallibrary.org/journals/optical-engineering/volume-62/issue-11/113106/Optical-performance-of-commercial-liquid-lens-assemblies-in-microgravity/10.1117/1.OE.62.11.113106.short",
        },
        {
            title:
                "BeaverCube II: Using AI-Optimized Processors on Earth-Observing CubeSats for Autonomous Image Analysis and Intelligent Data Handling",
            authors:
                "Adam Bahlous-Boldi, Celvi Lisy, Neelambar Mondal, Brianna Ferro, Shreeyam Kacker, Mary Dahl, Madeline Anderson, Kerri Cahoy",
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
            title:
                "Liquid lenses for aerospace beam steering and communications: MOSAIC",
            authors: "Shreeyam Kacker, Kerri Cahoy",
            note:
                "Optica Optics Express, Vol.33(1)",
            year: 2025,
            url: "https://opg.optica.org/oe/fulltext.cfm?uri=oe-33-1-1296&id=566864",
        },
        {
            title:
                "Leveraging Realtime Meteorological Data for Dynamic Tasking of Agile Earth-Observing Satellites",
            authors: "Shreeyam Kacker, Steve Chien, Kiruthika Devaraj, Işil Demir, Kerri Cahoy",
            note:
                "International Workshop on Planning & Scheduling for Space (IWPSS) 2025",
            year: 2025,
            url: "https://ai.jpl.nasa.gov/public/documents/papers/kacker-iwpss-2025.pdf",
        },
        {
            title:
                "Vision-Based Dynamic Tasking for Earth-Observing Satellite Constellations",
            authors: "Shreeyam Kacker, Kiruthika Devaraj, Işil Demir, Steve Chien, Kerri Cahoy",
            note:
                "39th Annual AIAA/USU Conference on Small Satellites (forthcoming)",
            year: 2025,
            url: "https://digitalcommons.usu.edu/",
        },
    ];

    // State to toggle showing all publications or a subset.
    const [showAll, setShowAll] = React.useState(false);

    // Get unique years sorted in descending order.
    const uniqueYears = Array.from(new Set(publications.map(pub => pub.year))).sort((a, b) => b - a);

    // Group publications by year.
    const groupedPublications = uniqueYears.map(year => ({
        year,
        pubs: publications.filter(pub => pub.year === year),
    }));

    // If not showing all, display only the first 3 groups.
    const displayGroups = showAll ? groupedPublications : groupedPublications.slice(0, 3);

    return (
        <>
            {/* Education Section */}
            <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-4 border-gray-200 text-gray-800" id="education">Education</h2>
                <div className="space-y-4">
                    {/* Combined MIT Education */}
                    <div>
                        <h3 className="font-bold text-gray-800">Massachusetts Institute of Technology (MIT)</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-start">
                                    <p className="font-medium text-gray-700">
                                        PhD Spacecraft Systems and Sensors, minor in AI and Computer Vision
                                    </p>
                                    <span className="text-gray-600 text-sm">2024 - 2025</span>
                                </div>
                                <p className="text-gray-700">
                                    <span className="font-medium">Thesis:</span> Spacecraft Autonomy through Computer Vision and Onboard Planning
                                </p>
                            </div>

                            <div>
                                <div className="flex justify-between items-start">
                                    <p className="font-medium text-gray-700">SM Aeronautics and Astronautics</p>
                                    <span className="text-gray-600 text-sm">2020 - 2022</span>
                                </div>
                                <p className="text-gray-700 mb-1">
                                    <span className="font-medium">GPA:</span> 5.0/5.0
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Thesis:</span> Optical Performance and Prototyping of a Liquid Lens Laser Communications Transceiver
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-800">Imperial College London</h3>
                            <span className="text-gray-600 text-sm">2016 - 2020</span>
                        </div>
                        <p className="font-medium text-gray-700 mb-1">MEng Aeronautical Engineering with a Year Abroad</p>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium">Degree Classification:</span> First Class Honours
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Thesis:</span> Design of low leakage MEMS valves for spacecraft applications
                        </p>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 border-gray-200 text-gray-800">Experience</h2>
                <div className="space-y-6">
                    {/* MIT STAR Lab */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                            <h3 className="font-bold text-gray-800">MIT Space Telecommunications, Astronomy and Radiation Laboratory</h3>
                            <span className="text-gray-600 text-sm">2020 - Present</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                            <p className="text-gray-700 font-medium">Research Assistant (PI: Prof. Kerri Cahoy)</p>
                            <span className="text-gray-600 text-sm">Cambridge, MA</span>
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                            <li>Conducted space environment testing and prototyping with NASA for a novel lasercom pointing and tracking system using liquid lenses.</li>
                            <li>Trained machine learning models and created a dataset for on-orbit cloud segmentation as part of a computer vision pipeline to identify ocean fronts.</li>
                            <li>Tested and validated machine learning algorithms on ESA&apos;s OPS-SAT mission.</li>
                            <li>Designed algorithms for dynamic alteration of spacecraft imaging schedules based on inputs from external perception systems.</li>
                        </ul>
                    </div>

                    {/* Planet Labs */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                            <h3 className="font-bold text-gray-800">Planet Labs</h3>
                            <span className="text-gray-600 text-sm">2022 - 2024</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                            <p className="text-gray-700 font-medium">Edge Compute/Machine Learning Engineer</p>
                            <span className="text-gray-600 text-sm">San Francisco, CA</span>
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                            <li>Developed next-generation onboard compute platforms for Earth-observing satellite missions using NVIDIA GPUs.</li>
                            <li>Designed, specified, and developed hardware for a low-power computer vision instrument.</li>
                            <li>Trained machine learning vision models for spacecraft perception and trajectory planning.</li>
                        </ul>
                    </div>

                    {/* X Development */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                            <h3 className="font-bold text-gray-800">X Development LLC (formerly Google[x])</h3>
                            <span className="text-gray-600 text-sm">2021</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                            <p className="text-gray-700 font-medium">Intern @X</p>
                            <span className="text-gray-600 text-sm">Mountain View, CA</span>
                        </div>

                        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                            <li>Interned under Project Taara to provide low-cost free-space optical communications (FSOC) internet access for underdeveloped countries.</li>
                            <li>Conducted communications architecture analysis for optically preamplified direct detection and coherent detection techniques.</li>
                            <li>Modeled integrated photonics components to assess the capabilities of each architecture.</li>
                        </ul>
                    </div>

                    {/* ieDigital */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                            <h3 className="font-bold text-gray-800">Intelligent Environments Europe Ltd (ieDigital)</h3>
                            <span className="text-gray-600 text-sm">2016</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                            <p className="text-gray-700 font-medium">Software Developer Intern</p>
                            <span className="text-gray-600 text-sm">London, UK</span>
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                            <li>Worked as a full stack software developer intern writing C# across teams managed under agile methodology.</li>
                            <li>Automated part of the workflow for business analysts using Python, saving tens of hours on importing old functional specifications into JIRA.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 border-gray-200 text-gray-800">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-medium text-gray-800 mb-2">Programming Languages</p>
                        <p className="text-gray-700">Python, C, C++, C#, MATLAB, Verilog</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-800 mb-2">Software</p>
                        <p className="text-gray-700">Microsoft Office, SolidWorks, Altium, PyTorch, Docker</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-800 mb-2">Languages</p>
                        <p className="text-gray-700">English (Native), Hindi (Fluent), Korean (Intermediate)</p>
                    </div>
                </div>
            </section>

            {/* Projects & Extracurricular Activities Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 border-gray-200 text-gray-800">Projects & Extracurricular Activities</h2>
                <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                        <h3 className="font-bold text-gray-800">Imperial College London Rocketry</h3>
                        <span className="text-gray-600 text-sm">June 2019 - July 2020</span>
                    </div>
                    <p className="text-gray-700 font-medium mb-3">Electronics & Payload Team Lead</p>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                        <li>One of four executive leads of an 80-member team.</li>
                        <li>Led design and manufacture of all rocket electronics, including avionics systems, telemetry, data acquisition, throttle control system, and payload.</li>
                    </ul>
                </div>
            </section>

            {/* Publications Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Publications
                </h2>
                <div className="space-y-4">
                    {displayGroups.map((group) => (
                        <div key={group.year}>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">{group.year}</h3>
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
                {!showAll && (
                    <div className="text-right mt-4">
                        <Button onClick={() => setShowAll(true)} variant="outline">
                            Show {publications.length - displayGroups.reduce((acc, group) => acc + group.pubs.length, 0)} more publications
                        </Button>
                    </div>
                )}
            </section>
        </>
    );
}
