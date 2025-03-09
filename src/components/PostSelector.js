"use client";

import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Plus, File, FileText, RefreshCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from './ui/button';

export default function PostSelector({ onSelectPost, onCreateNew, className }) {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch posts when popover opens
    useEffect(() => {
        if (isOpen && posts.length === 0) {
            fetchPosts();
        }
    }, [isOpen]);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/list-posts?draft=include');
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (value) => {
        if (value === 'new') {
            onCreateNew();
        } else {
            const selectedPost = posts.find(post => post.id.toString() === value);
            if (selectedPost) {
                onSelectPost(selectedPost);
            }
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <Select onValueChange={handleSelect} onOpenChange={setIsOpen} defaultValue="new">
                <SelectTrigger className="w-full cursor-pointer flex flex-grow">
                    <SelectValue placeholder="Select a post to edit" />
                </SelectTrigger>
                <SelectContent>
                    <div className="p-2">
                        <div className="flex items-center space-x-2 mb-2">
                            <Search className="h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value) & e.stopPropagation()}
                                onClick={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                                className="flex-1"
                            />
                            <Button variant="ghost" onClick={fetchPosts}>
                                <RefreshCcw size={16} />
                            </Button>
                        </div>
                        <ScrollArea className="h-64">
                            <SelectItem value="new" className="flex items-center">
                                <Plus className="mr-1 " size={16} /> Create New Post
                            </SelectItem>
                            <div className="pt-2 pb-1">
                                <div className="text-sm font-medium text-gray-500 px-2">Existing Posts</div>
                            </div>
                            {isLoading ? (
                                <div className="flex justify-center py-4">Loading...</div>
                            ) : (
                                filteredPosts.map((post) => (
                                    <SelectItem key={post.id} value={post.id.toString()} className="flex items-center">
                                        {post.draft ? <File className="mr-1" size={16} /> : <FileText className="mr-1" size={16} />}
                                        <div className="truncate">
                                            {post.title} {post.draft === 1 && <span className="text-xs text-gray-500">(Draft)</span>}
                                        </div>
                                    </SelectItem>
                                ))
                            )}
                            {filteredPosts.length === 0 && !isLoading && (
                                <div className="py-4 text-center text-sm text-gray-500">
                                    No posts found
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </SelectContent>
            </Select>
        </div>
    );
}