"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageIcon, Search, X, RefreshCcw, UploadCloud, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ImageSelector({ value, onChange, title = "Select Image" }) {
    const [images, setImages] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    // Fetch images when popover opens
    useEffect(() => {
        if (isOpen && images === null) {
            fetchImages();
        }
    }, [isOpen, images]);

    const fetchImages = async () => {
        setIsLoading(true);
        setImages([]);
        try {
            const response = await fetch('/api/images');
            if (response.ok) {
                const data = await response.json();
                setImages(data);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredImages = images ? images.filter(image =>
        image.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const handleImageSelect = (imageUrl) => {
        onChange(imageUrl);
        setIsOpen(false);
    };

    // Upload straight from the picker and select the result, so adding an
    // image never navigates away from (and loses) the post being edited.
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        e.target.value = null;
        if (!file) return;
        setIsUploading(true);
        setUploadError('');
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/images/upload', {
                method: 'POST',
                body: formData,
            });
            const body = await res.json();
            if (!res.ok) {
                setUploadError(res.status === 409
                    ? 'An image with that name already exists. Rename the file or pick it from the list.'
                    : `Upload failed: ${body.error}`);
                return;
            }
            setImages(null); // refetch next time the picker opens
            handleImageSelect(body.url);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadError('Upload failed');
        } finally {
            setIsUploading(false);
        }
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
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                    />
                    <Button
                        className="w-full"
                        onClick={() => fileInputRef.current.click()}
                        disabled={isUploading}
                    >
                        <UploadCloud size={16} /> {isUploading ? 'Uploading...' : 'Upload new image'}
                    </Button>
                    {uploadError && (
                        <p className="text-sm text-red-600">{uploadError}</p>
                    )}
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
                                            <img
                                                src={image.thumbnailUrl || image.url}
                                                alt={image.name}
                                                className="object-cover w-full h-full"
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
                    <Button variant="secondary" className="w-full" asChild>
                        <a href="/cms" target="_blank" rel="noopener">
                            Manage Images <ExternalLink size={16} />
                        </a>
                    </Button>
                    <Button variant="secondary" className="w-full" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}