import React from 'react';

export default function CV() {
    return (
        <div>
            <section>
                <h2 className="text-2xl font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold">Massachusetts Institute of Technology (MIT)</h3>
                        <p>PhD Spacecraft Systems and Sensors, minor in AI and Computer Vision (2024 - 2025)</p>
                        <p>
                            <strong>Thesis:</strong> Spacecraft Autonomy through Computer Vision and Onboard Planning
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold">SM Aeronautics and Astronautics</h3>
                        <p>2020 - 2022</p>
                        <p>
                            <strong>GPA:</strong> 5.0/5.0
                        </p>
                        <p>
                            <strong>Thesis:</strong> Optical Performance and Prototyping of a Liquid Lens Laser Communications
                            Transceiver
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold">Imperial College London</h3>
                        <p>MEng Aeronautical Engineering with a Year Abroad (2016 - 2020)</p>
                        <p>
                            <strong>Degree Classification:</strong> First Class Honours
                        </p>
                        <p>
                            <strong>Thesis:</strong> Design of low leakage MEMS valves for spacecraft applications
                        </p>
                    </div>
                </div>
            </section >

            {/* Experience Section */}
            < section >
                <h2 className="text-2xl font-semibold mb-4">Experience</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold">
                            MIT Space Telecommunications, Astronomy and Radiation Laboratory
                        </h3>
                        <p>
                            Research Assistant (PI: Prof. Kerri Cahoy) | Cambridge, MA (2020 - Present)
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>
                                Conducted space environment testing and prototyping with NASA for a novel lasercom pointing
                                and tracking system using liquid lenses.
                            </li>
                            <li>
                                Trained machine learning models and created a dataset for on-orbit cloud segmentation as part of
                                a computer vision pipeline to identify ocean fronts.
                            </li>
                            <li>
                                Tested and validated machine learning algorithms on ESA’s OPS-SAT mission.
                            </li>
                            <li>
                                Designed algorithms for dynamic alteration of spacecraft imaging schedules based on inputs from
                                external perception systems.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold">Planet Labs</h3>
                        <p>Edge Compute/Machine Learning Engineer | San Francisco, CA (2022 - 2024)</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>
                                Developed next-generation onboard compute platforms for Earth-observing satellite missions using
                                NVIDIA GPUs.
                            </li>
                            <li>
                                Designed, specified, and developed hardware for a low-power computer vision instrument.
                            </li>
                            <li>
                                Trained machine learning vision models for spacecraft perception and trajectory planning.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold">X Development LLC (formerly Google[x])</h3>
                        <p>Intern @X | Mountain View, CA (2021)</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>
                                Interned under Project Taara to provide low-cost free-space optical communications (FSOC) internet
                                access for underdeveloped countries.
                            </li>
                            <li>
                                Conducted communications architecture analysis for optically preamplified direct detection and
                                coherent
                                detection techniques.
                            </li>
                            <li>
                                Modeled integrated photonics components to assess the capabilities of each architecture.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold">Intelligent Environments Europe Ltd (ieDigital)</h3>
                        <p>Software Developer Intern | London, UK (2016)</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>
                                Worked as a full stack software developer intern writing C# across teams managed under agile
                                methodology.
                            </li>
                            <li>
                                Automated part of the workflow for business analysts using Python, saving tens of hours on importing
                                old functional specifications into JIRA.
                            </li>
                            <li>
                                Described by the Chief Architect as a “Senior Software Developer disguised as an Intern.”
                            </li>
                        </ul>
                    </div>
                </div>
            </section >

            {/* Skills Section */}
            < section >
                <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <strong>Programming Languages:</strong> Python, C, C++, C#, MATLAB, Verilog
                    </li>
                    <li>
                        <strong>Software:</strong> Microsoft Office, SolidWorks, Altium, PyTorch, Docker
                    </li>
                    <li>
                        <strong>Languages:</strong> English (Native), Hindi (Fluent), Korean (Intermediate)
                    </li>
                </ul>
            </section >

            {/* Projects & Extracurricular Activities Section */}
            < section >
                <h2 className="text-2xl font-semibold mb-4">Projects & Extracurricular Activities</h2>
                <div>
                    <h3 className="font-bold">Imperial College London Rocketry</h3>
                    <p>Electronics & Payload Team Lead | June 2019 - July 2020</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>One of four executive leads of an 80-member team.</li>
                        <li>
                            Led design and manufacture of all rocket electronics, including avionics systems, telemetry,
                            data acquisition, throttle control system, and payload.
                        </li>
                    </ul>
                </div>
            </section >

            {/* Publications Section */}
            < section >
                <h2 className="text-2xl font-semibold mb-4">Publications</h2>
                <div className="space-y-6 text-sm">
                    <div>
                        <p className="font-bold">
                            Leveraging Realtime Meteorological Data for Dynamic Tasking of Agile Earth-Observing Satellites (2025)
                        </p>
                        <p>S Kacker, S Chien, K Cahoy – International Workshop on Planning &amp; Scheduling for Space (forthcoming)
                        </p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Liquid Lenses for Aerospace Beam Steering and Communications: MOSAIC (2025)
                        </p>
                        <p>S Kacker, K Cahoy – Optica Optics Express 33 (1)</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Reinforcement-Learned Lookahead Heuristics for Earth-Observing Satellites (2024)
                        </p>
                        <p>S Kacker, K Cahoy – 38th Annual AIAA/USU Conference on Small Satellites</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Reinforcement-Learned Lookahead Heuristics for Earth-Observing Satellites (2024)
                        </p>
                        <p>S Kacker, K Cahoy – 38th Annual AIAA/USU Conference on Small Satellites</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            BeaverCube II: Using AI-Optimized Processors on Earth-Observing CubeSats for Autonomous Image Analysis
                            and Intelligent Data Handling (2024)
                        </p>
                        <p>
                            A Bahlous-Boldi, C Lisy, N Mondal, B Ferro, S Kacker, M Dahl, M Anderson, K Cahoy – SPIE Journal of
                            Optical Engineering
                        </p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Optical Performance of Commercial Liquid Lens Assemblies in Microgravity (2023)
                        </p>
                        <p>S Kacker, K Cahoy – SPIE Journal of Optical Engineering</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Systems and Methods for Cloud Avoidance (2023)
                        </p>
                        <p>K Devaraj, S Kacker – United States Patent and Trademark Office Application 18/345,883</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Fast Ocean Front Detection using Deep Learning Edge Detection Models (2023)
                        </p>
                        <p>V Felt, S Kacker, J Kusters, J Pendergrast, K Cahoy – IEEE Transactions on Geoscience and Remote Sensing
                        </p>
                    </div>
                    <div>
                        <p className="font-bold">
                            MOEMS-based Lens-Assisted Beam Steering for Free-Space Optical Communications (2022)
                        </p>
                        <p>D Goldman, P Serra, S Kacker, L Benney, D Vresilovic, S Spector, J Wachs, K Cahoy – IEEE Journal of
                            Lightwave Technology</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Machine Learning Image Processing Algorithms Onboard OPS-SAT (2022)
                        </p>
                        <p>S Kacker, A Meredith, G Labrèche, K Cahoy – 36th Annual AIAA/USU Conference on Small Satellites</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Satellite for Estimating Aquatic Salinity and Temperature (SEASALT) – A Payload and Instrumentation
                            Overview (2022)
                        </p>
                        <p>S Kacker, M Dahl, P Fucile, A Thieu, C Payne, S McCarthy, V Menezes, K Cahoy – 36th Annual AIAA/USU
                            Conference on Small Satellites</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Satellite for Estimating Aquatic Salinity and Temperature (SEASALT) – A Scientific Overview (2022)
                        </p>
                        <p>S McCarthy, V Menezes, K Cahoy, M Dahl, A Thieu, C Payne, S Kacker, P Fucile – 36th Annual AIAA/USU
                            Conference on Small Satellites</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Laser-Guided Space Interferometer (2022)
                        </p>
                        <p>L Pogorelyuk, P Serra, S Kacker, S Vlahakis, G Rau, K Carpenter, L Pueyo, J Monnier, E Douglas, K Cahoy –
                            SPIE Astronomical Telescopes + Instrumentation 2022</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Commercially Available Imaging Payloads for CubeSat Earth Observation Missions (2022)
                        </p>
                        <p>H Tomio, A Thieu, A Gagnon, S Vlahakis, S Kacker, J Kusters, K Cahoy – IEEE Aerospace Conference 2022</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            On-orbit rule-based and deep learning image segmentation strategies for the BeaverCube-2 mission (2022)
                        </p>
                        <p>S Kacker, A Meredith, V Felt, J Kusters, H Tomio, K Cahoy – AIAA SciTech Forum 2022</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Link analysis for a liquid lens beam steering system, the Miniature Optical Steered Antenna for
                            Intersatellite Communication (MOSAIC) (2021)
                        </p>
                        <p>S Kacker, O Čierny, J Boyer, K Cahoy – SPIE Free-Space Laser Communications XXXIII</p>
                    </div>
                    <div>
                        <p className="font-bold">
                            Folded Lightweight Actuator Positioning System (FLAPS) (2019)
                        </p>
                        <p>PV Pereira, K Chun, M Contreras, C Lindsay, S Kacker, R Huffman, C Haughwout, K Cahoy – 33rd Annual
                            AIAA/USU Conference on Small Satellites</p>
                    </div>
                </div>
            </section >
        </div >
    );
}