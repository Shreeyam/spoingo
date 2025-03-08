"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ImageCMS({ onSelect, selectorMode = false }) {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [newFile, setNewFile] = useState(null);
    const [renamingId, setRenamingId] = useState(null);
    const [renameValue, setRenameValue] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch('/api/images');
            const data = await res.json();
            setImages(data.images || []);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!newFile) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', newFile);
        try {
            const res = await fetch('/api/images', {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Upload failed');
            await fetchImages();
            setNewFile(null);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleRename = (image) => {
        setRenamingId(image.name);
        setRenameValue(image.name);
    };

    const submitRename = async (image) => {
        try {
            const res = await fetch(
                `/api/images?name=${encodeURIComponent(image.name)}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newName: renameValue }),
                }
            );
            if (!res.ok) throw new Error('Rename failed');
            setRenamingId(null);
            await fetchImages();
        } catch (error) {
            console.error('Error renaming image:', error);
        }
    };

    const handleDelete = async (image) => {
        try {
            const res = await fetch(
                `/api/images?name=${encodeURIComponent(image.name)}`,
                { method: 'DELETE' }
            );
            if (!res.ok) throw new Error('Delete failed');
            await fetchImages();
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleSelect = (image) => {
        if (onSelect) {
            onSelect(image.url);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Image Manager</h2>
            <div className="mb-4">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <Button onClick={handleUpload} disabled={uploading || !newFile}>
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {images.map((image) => (
                    <div key={image.name} className="border p-2 rounded">
                        <div
                            className={`cursor-pointer ${selectorMode ? 'hover:opacity-75' : ''
                                }`}
                            onClick={() => selectorMode && handleSelect(image)}
                        >
                            <Image
                                src={image.url}
                                alt={image.name}
                                width={150}
                                height={100}
                                className="object-cover rounded"
                            />
                        </div>
                        <div className="mt-2">
                            {renamingId === image.name ? (
                                <div className="flex gap-2">
                                    <Input
                                        value={renameValue}
                                        onChange={(e) => setRenameValue(e.target.value)}
                                        className="flex-grow"
                                    />
                                    <Button size="sm" onClick={() => submitRename(image)}>
                                        Save
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => setRenamingId(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">{image.name}</span>
                                    <div className="flex gap-1">
                                        <Button size="sm" onClick={() => handleRename(image)}>
                                            Rename
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(image)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
