// src/components/ImageManagement.js
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Search, UploadCloud, Trash2, Edit2, Check, X, RefreshCw } from 'lucide-react';
// import { debounce } from 'lodash';

export default function ImageManagement({ onSelectImage, showSelectOption = false }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [newImageName, setNewImageName] = useState('');
    const [filteredImages, setFilteredImages] = useState([]);

    // Fetch images from the API
    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/images');
            if (!res.ok) throw new Error('Failed to fetch images');
            const data = await res.json();
            setImages(data);
            setFilteredImages(data);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    // Filter images based on search term
    const debouncedSearch = useCallback(
        (term) => {
            const filtered = images.filter(image =>
                image.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredImages(filtered);
        },
        [images]
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    // Handle image upload
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Simulate progress (in a real app, you'd use a proper upload progress event)
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const res = await fetch('/api/images/upload', {
                method: 'POST',
                body: formData,
            });

            clearInterval(interval);
            setUploadProgress(100);

            if (!res.ok) throw new Error('Upload failed');

            // Refresh image list
            fetchImages();
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setTimeout(() => {
                setIsUploading(false);
                setUploadProgress(0);
            }, 500);
        }
    };

    // Handle image selection
    const handleSelectImage = (image) => {
        if (showSelectOption && onSelectImage) {
            onSelectImage(image);
        } else {
            setSelectedImage(image);
            setDialogOpen(true);
        }
    };

    // Handle image rename
    const handleRename = async () => {
        if (!selectedImage || !newImageName.trim()) return;

        try {
            const res = await fetch(`/api/images/${selectedImage.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newImageName }),
            });

            if (!res.ok) throw new Error('Rename failed');

            // Refresh image list
            fetchImages();
            setRenameDialogOpen(false);
        } catch (error) {
            console.error('Error renaming image:', error);
        }
    };

    // Handle image delete
    const handleDelete = async () => {
        if (!selectedImage) return;

        try {
            const res = await fetch(`/api/images/${selectedImage.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Delete failed');

            // Refresh image list
            fetchImages();
            setDeleteDialogOpen(false);
            setDialogOpen(false);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    // Open rename dialog
    const openRenameDialog = () => {
        setNewImageName(selectedImage.name);
        setRenameDialogOpen(true);
        setDialogOpen(false);
    };

    // Open delete dialog
    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
        setDialogOpen(false);
    };

    return (
        <div className="w-full">
            <Tabs defaultValue="grid" className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="grid">Grid View</TabsTrigger>
                        <TabsTrigger value="list">List View</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search size={16} className="absolute left-2 top-2.5 text-gray-500" />
                            <Input
                                placeholder="Search images..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Button variant="default" onClick={() => document.getElementById('image-upload').click()}>
                                <UploadCloud className="mr-2" size={16}  /> Upload
                            </Button>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </div>
                        <Button variant="ghost" onClick={fetchImages}>
                            <RefreshCw size={16}  />
                        </Button>
                    </div>
                </div>

                {isUploading && (
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                )}

                <TabsContent value="grid" className="w-full">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p>Loading images...</p>
                        </div>
                    ) : filteredImages.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <p>No images found. Upload some images to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredImages.map((image) => (
                                <Card
                                    key={image.id}
                                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow p-2"
                                    onClick={() => handleSelectImage(image)}
                                >
                                    <CardContent className="p-2">
                                        <div className="relative aspect-square">
                                            <Image
                                                src={image.thumbnailUrl || image.url}
                                                alt={image.name}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <p className="mt-2 text-sm font-medium truncate">{image.name}</p>
                                        <p className="text-xs text-gray-500">{new Date(image.uploadedAt).toLocaleDateString()}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="list" className="w-full">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p>Loading images...</p>
                        </div>
                    ) : filteredImages.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <p>No images found. Upload some images to get started.</p>
                        </div>
                    ) : (
                        <div className="border rounded-md">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-3">Preview</th>
                                        <th className="text-left p-3">Name</th>
                                        <th className="text-left p-3">Date Added</th>
                                        <th className="text-left p-3">Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredImages.map((image) => (
                                        <tr
                                            key={image.id}
                                            className="border-b hover:bg-gray-50 cursor-pointer"
                                            onClick={() => handleSelectImage(image)}
                                        >
                                            <td className="p-3">
                                                <div className="relative h-12 w-12">
                                                    <Image
                                                        src={image.thumbnailUrl || image.url}
                                                        alt={image.name}
                                                        fill
                                                        className="object-cover rounded-md"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-3">{image.name}</td>
                                            <td className="p-3">{new Date(image.uploadedAt).toLocaleDateString()}</td>
                                            <td className="p-3">{image.size ? `${Math.round(image.size / 1024)} KB` : 'Unknown'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Image Detail Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Image Details</DialogTitle>
                    </DialogHeader>
                    {selectedImage && (
                        <div className="space-y-4">
                            <div className="relative h-64 w-full">
                                <Image
                                    src={selectedImage.url}
                                    alt={selectedImage.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <p className="font-medium">Name:</p>
                                    <p>{selectedImage.name}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-medium">Uploaded:</p>
                                    <p>{new Date(selectedImage.uploadedAt).toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-medium">Size:</p>
                                    <p>{selectedImage.size ? `${Math.round(selectedImage.size / 1024)} KB` : 'Unknown'}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-medium">URL:</p>
                                    <p className="truncate max-w-[200px]">{selectedImage.url}</p>
                                </div>
                            </div>
                            <DialogFooter className="flex justify-end">
                                <div className="flex space-x-2">
                                    <Button variant="outline" onClick={openRenameDialog}>
                                        <Edit2 size={16} /> Rename
                                    </Button>
                                    <Button variant="destructive" onClick={openDeleteDialog}>
                                        <Trash2 size={16} /> Delete
                                    </Button>
                                </div>
                                {showSelectOption && (
                                    <Button onClick={() => {
                                        onSelectImage(selectedImage);
                                        setDialogOpen(false);
                                    }}>
                                        <Check size={16} /> Select Image
                                    </Button>
                                )}
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Rename Dialog */}
            <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Rename Image</DialogTitle>
                        <DialogDescription>
                            Enter a new name for the image.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Label htmlFor="image-name">Name</Label>
                        <Input
                            id="image-name"
                            value={newImageName}
                            onChange={(e) => setNewImageName(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleRename}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the image.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

// ImageSelector component for use in other parts of the app
export function ImageSelector({ onSelectImage, value }) {
    const [selectorOpen, setSelectorOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(value || null);

    const handleSelect = (image) => {
        setSelectedImage(image);
        onSelectImage(image);
        setSelectorOpen(false);
    };

    return (
        <div>
            <div className="mb-2 flex items-center gap-2">
                {selectedImage && (
                    <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                        <Image
                            src={selectedImage.thumbnailUrl || selectedImage.url}
                            alt={selectedImage.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <Button variant="outline" onClick={() => setSelectorOpen(true)}>
                    {selectedImage ? 'Change Image' : 'Select Image'}
                </Button>
                {selectedImage && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => {
                            setSelectedImage(null);
                            onSelectImage(null);
                        }}
                    >
                        <X size={16}  />
                    </Button>
                )}
            </div>
            <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
                <DialogContent className="sm:max-w-5xl max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>Select Image</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh]">
                        <ImageManagement onSelectImage={handleSelect} showSelectOption={true} />
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
}