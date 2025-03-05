import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// Import your carousel components – update the path as necessary.
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const CustomMarkdown = ({ markdown }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
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
                                <Carousel className="w-full">
                                    <CarouselContent>
                                        {formattedImages.map((img, idx) => (
                                            <CarouselItem key={idx}>
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className="object-cover w-full h-auto"
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
                                <div className="flex space-x-4">
                                    {formattedImages.map((img, idx) => (
                                        <div key={idx} className="flex-1">
                                            <img src={img.src} alt={img.alt}  />
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                    }

                    // Fallback: render as a normal paragraph.
                    return <p>{children}</p>;
                },
                // Optionally, override the image renderer for consistent styling.
                img: ({ node, ...props }) => (
                    <img {...props} alt={props.alt} />
                )
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default CustomMarkdown;
