"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageIcon, Search, X, RefreshCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

export default function ImageSelector({ value, onChange, title = "Select Image" }) {
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch images when popover opens
    useEffect(() => {
        if (isOpen) {
            fetchImages();
        }
    }, [isOpen]);

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/images');
            if (response.ok) {
                const data = await response.json();
                setImages(data);
                console.log(data)
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredImages = images.filter(image =>
        image.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageSelect = (imageUrl) => {
        onChange(imageUrl);
        setIsOpen(false);
    };

    const handleClearImage = (e) => {
        e.stopPropagation();
        onChange('');
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="secondary" className="w-full flex justify-between items-center">
                    <div className="flex items-center">
                        <ImageIcon className="mr-2" size={16} />
                        <span>{value ? 'Change Image' : title}</span>
                    </div>
                    {value && (
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 ml-2"
                            onClick={handleClearImage}
                        >
                            <span>
                                <X size={16} />
                            </span>
                        </Button>
                    )}
                </Button>

            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search images..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1"
                        />
                        <Button variant="ghost" onClick={fetchImages}>
                            <RefreshCcw size={16} />
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-4">Loading...</div>
                    ) : (
                        <ScrollArea className="h-64">
                            <div className="grid grid-cols-2 gap-2">
                                {filteredImages.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`
                      relative border rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity
                      ${value === image.url ? 'border-gray-500' : ''}
                    `}
                                        onClick={() => handleImageSelect(image.url)}
                                    >
                                        <div className="aspect-square relative">
                                            <Image
                                                src={image.thumbnail || image.url}
                                                alt={image.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                                            <p className="text-white text-xs truncate">{image.filename}</p>
                                        </div> */}
                                    </div>
                                ))}
                                {filteredImages.length === 0 && (
                                    <div className="col-span-2 py-4 text-center text-sm text-gray-500">
                                        No images found
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    )}
                    <Button variant="secondary" className="w-full" onClick={() => setIsOpen(false)}>
                        <Link href="/admin/images">Manage Images</Link>
                    </Button>
                    <Button variant="secondary" className="w-full" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}