import React from 'react';
import ExtLink from '@/components/ui/externallink';
import Link from 'next/link';

export default function Biography({showAbout = false}) {
    return (
        <div className="max-w-5xl mx-auto prose text-(--foreground)">
            Hey, I&apos;m Shreeyam. I build safe, verifiable autonomy that lets spacecraft think for themselves.
            <br />
            <br />
            I am a PhD candidate at MIT&apos;s <ExtLink href="https://aeroastro.mit.edu/starlab/" target="_blank">Space Telecommunications, Astronomy and Radiation Laboratory</ExtLink> with PI Prof. Kerri Cahoy. I work on space robotics, autonomous systems, instrumentation, and machine learning applied to spacecraft. Currently I work on dynamic tasking formulations for Earth-observing satellites funded by <ExtLink href="https://www.planet.com/" target="_blank">Planet Labs</ExtLink> so we can use existing satellites more effectively through improved perception, onboard planning, and edge computing. I specifically focus on safe and verifiable autonomy formulations that can be operationalized. I have also conducted research on reinforcement learning for electromagnetic formation flying spacecraft, vision models for remote sensing, and utilizing liquid lenses for laser communications. 
            <br />
            <br />
            I currently work at Planet Labs as an Edge Compute/Machine Learning Engineer. I have worked on Pelican&apos;s onboard compute system on the <ExtLink href="https://investors.planet.com/news/news-details/2024/Planet-Labs-PBC-Announces-Real-Time-Insights-Technology-Using-NVIDIA-Jetson-Platform/default.aspx">NVIDIA Jetson platform</ExtLink>, as the first employee on the Edge Compute team. My previous experience includes integrated photonics at <ExtLink href="https://x.company/" target="_blank">X, the moonshot factory</ExtLink> (formerly Google [x]), and I also led all onboard electronics development for <ExtLink href="https://imperialrocketry.com/" target="_blank">Imperial College London Rocketry</ExtLink>. {showAbout ? (
                <>
                    You can find my full CV at my <Link href="/about#education">about</Link> page.
                </>
            ) : null}
            <br />
            <br />
            I started this blog for technical sewing projects. There are countless blogs from the early to mid 2010s that have been invaluable to my sewing journey, and I hope to contribute to that body of knowledge. I might occasionally write about fashion, research, or other topics also.
            <br />
            <br />
            I wrote this blog platform called <ExtLink href="https://www.github.com/Shreeyam/spoingo">Spoingo</ExtLink>. I also host a tree-based productivity software called <ExtLink href="https://treetrack.xyz/">Treetrack</ExtLink>.
            <br />
            <br />
            Contact: shreeyam [at] mit [dot] edu
        </div>
    );
}
