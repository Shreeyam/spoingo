import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ExternalLink } from 'lucide-react';
import SafeImage from '@/components/SafeImage';

const CustomMarkdown = ({ markdown }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                // Custom renderer for anchor tags.
                a: ({ node, children, ...props }) => (
                    <a {...props}>
                        {!node.properties.href.startsWith('/') ? (
                            <ExternalLink size={16} className="ml-1 inline" />
                        ) : null}
                        {children}
                    </a>
                ),
                p: ({ node, children }) => {
                    // Check if all children are image elements.
                    const nonEmptyChildren = node.children.filter(
                        child => !(child.type === 'text' && !child.value.trim())
                    );
                    const allImages =
                        nonEmptyChildren.length > 0 &&
                        nonEmptyChildren.every(
                            child => child.type === 'element' && child.tagName === 'img'
                        );

                    if (allImages) {
                        // Map each child to its src and alt from child.properties.
                        const images = nonEmptyChildren.map(child => ({
                            src: child.properties.src,
                            alt: child.properties.alt || ''
                        }));

                        // Determine the layout mode.
                        const isGallery = images.some(img => img.alt.startsWith('gallery:'));
                        const isFlex = images.some(img => img.alt.startsWith('flex:'));

                        if (isGallery) {
                            const formattedImages = images.map(img => ({
                                src: img.src,
                                alt: img.alt.replace('gallery:', '').trim()
                            }));
                            return (
                                <Carousel className="w-full h-full">
                                    <CarouselContent className="h-full">
                                        {formattedImages.map((img, idx) => (
                                            <CarouselItem key={idx} className="h-[550px] flex items-center justify-center">
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className="object-cover object-center h-full"
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>


                            );
                        }
                        if (isFlex) {
                            const formattedImages = images.map(img => ({
                                src: img.src,
                                alt: img.alt.replace('flex:', '').trim()
                            }));
                            return (
                                <div className="flex space-x-4 items-center">
                                    {formattedImages.map((img, idx) => (
                                        <div key={idx} className="flex-1">
                                            <img src={img.src} alt={img.alt} className="mx-auto" />
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                    }

                    // Fallback: render as a normal paragraph.
                    return <p>{children}</p>;
                },
                // Override the image renderer for standalone images.
                img: ({ node, ...props }) => (
                    <img
                        {...props}
                        alt={props.alt}
                        style={{ objectFit: 'contain' }}
                        className="mx-auto max-h-[550px]"
                    />
                )
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default CustomMarkdown;
