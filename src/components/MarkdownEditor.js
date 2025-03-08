"use client";

import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import slugify from 'slugify';
// Shadcn-inspired UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CustomMarkdown from '@/components/ui/custommarkdown';
import Image from 'next/image';
// Lucide icons
import { UploadCloud, Eye, EyeOff, Send, HelpCircle, Save, FilePlus2 } from 'lucide-react';
// Custom components
import ImageSelector from '@/components/ImageSelector';
import PostSelector from '@/components/PostSelector';

export default function MarkdownEditor() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [markdown, setMarkdown] = useState('');
    const [showPreview, setShowPreview] = useState(true);
    const [cover, setCover] = useState('');
    const [isDraft, setIsDraft] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fileInputRef = useRef(null);

    // Update title and slug (if not manually edited)
    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (!slugManuallyEdited) {
            setSlug(slugify(newTitle, { lower: true, strict: true }));
        }
    };

    const handleTogglePreview = () => {
        setShowPreview((prev) => !prev);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            // Append an image markdown snippet to the content.
            const imageMarkdown = `![${file.name}](${data.url})`;
            setMarkdown((prev) => prev + "\n" + imageMarkdown);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const resetForm = () => {
        setTitle('');
        setSlug('');
        setSlugManuallyEdited(false);
        setMarkdown('');
        setCover('');
        setIsDraft(false);
        setCurrentPostId(null);
        setIsEditing(false);
    };

    const handleSelectPost = async (post) => {
        if (!post.draft) {
            const res = await fetch(`/api/posts/${post.id}`, {
                method: 'GET',
            });
            
            if (!res.ok) throw new Error('Failed to fetch post');
            const fetchedPost = await res.json();
            post = fetchedPost;}

        setTitle(post.title);
        setSlug(post.slug);
        setMarkdown(post.content);
        setCover(post.cover || '');
        setIsDraft(post.draft === 1);
        setCurrentPostId(post.id);
        setIsEditing(true);
        setSlugManuallyEdited(true); // Assume slug is already set correctly
    };

    const handleCreateNew = () => {
        resetForm();
    };

    const handleSubmit = async () => {
        if (!title || !markdown) {
            alert('Title and content are required');
            return;
        }

        setSubmitting(true);
        try {
            const endpoint = isEditing ? `/api/posts/${currentPostId}` : '/api/posts';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    slug,
                    content: markdown,
                    cover: cover,
                    draft: isDraft ? 1 : 0,
                }),
            });

            if (!res.ok) throw new Error('Submission failed');

            alert(`Post ${isEditing ? 'updated' : 'created'} successfully!`);

            if (!isEditing) {
                resetForm();
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} post:`, error);
            alert(`Error ${isEditing ? 'updating' : 'creating'} post`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-gray-800">

            <div className="flex flex-grow">
                {/* Left Panel: Editor */}
                <div
                    className={
                        showPreview
                            ? "w-1/2 p-4 border-r border-gray-200 dark:border-gray-700"
                            : "w-full p-4"
                    }
                >
                    <div className="mb-4">
                        <div className="flex-grow">
                            <label htmlFor="post" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Post
                            </label>
                            <PostSelector
                                onSelectPost={handleSelectPost}
                                onCreateNew={handleCreateNew}
                                className="w-full mt-1"
                            />
                        </div>
                    </div>
                    {/* Header with Title & Help */}
                    <div className="flex items-end mb-4">
                        <div className="flex-grow">
                            <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Title
                            </label>
                            <Input
                                id="post-title"
                                placeholder="Enter post title..."
                                value={title}
                                onChange={handleTitleChange}
                                className="mt-1 w-full"
                            />
                        </div>
                        <div className="ml-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" className="p-2">
                                        <HelpCircle className="h-5 w-5" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                    <h3 className="text-lg font-semibold mb-2">Markdown Help</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                        <li><strong>Headings:</strong> Use #, ##, ###, etc.</li>
                                        <li><strong>Lists:</strong> Use - or * for bullet lists.</li>
                                        <li><strong>Side-by-Side Images:</strong> Use <code>flex:</code> in the alt text.</li>
                                        <li><strong>Image Galleries:</strong> Use <code>gallery:</code> in the alt text.</li>
                                        <li><strong>Tables & More:</strong> GitHub-flavored Markdown (GFM) supported.</li>
                                    </ul>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    {/* Custom Slug Input */}
                    <div className="mb-4">
                        <label htmlFor="post-slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Slug (URL)
                        </label>
                        <Input
                            id="post-slug"
                            placeholder="Custom slug"
                            value={slug}
                            onChange={(e) => {
                                setSlug(e.target.value);
                                setSlugManuallyEdited(true);
                            }}
                            className="mt-1 w-full"
                        />
                    </div>
                    {/* Cover photo using ImageSelector */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Cover
                        </label>
                        {cover && (
                            <div className="mb-2 relative w-40 h-40 border rounded-md overflow-hidden">
                                <Image
                                    src={cover}
                                    alt="Cover"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <ImageSelector
                            value={cover}
                            onChange={setCover}
                            title="Select Cover"
                        />
                    </div>
                    {/* Draft Toggle using Shadcn Checkbox */}
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="draft-mode"
                            checked={isDraft}
                            onCheckedChange={(checked) => setIsDraft(checked)}
                            className="mr-2"
                        />
                        <label htmlFor="draft-mode" className="text-sm text-gray-700 dark:text-gray-300">
                            Save as Draft
                        </label>
                    </div>
                    {/* Content Editor */}
                    <div className="mb-4">
                        <label htmlFor="markdown-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Content
                        </label>
                        <Textarea
                            id="markdown-content"
                            className="w-full h-80 p-3 mt-1 border rounded-md resize-none dark:bg-gray-700 dark:text-gray-100"
                            placeholder="Write your markdown content here..."
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                        />
                        <div className="mt-3 flex justify-end">
                            <Button onClick={handleTogglePreview} variant="secondary">
                                {showPreview ? (
                                    <>
                                        <EyeOff size={16} /> Hide Preview
                                    </>
                                ) : (
                                    <>
                                        <Eye size={16} /> Show Preview
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Right Panel: Preview */}
                {showPreview && (
                    <div className="w-1/2 p-4 overflow-auto">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Preview
                            </label>
                        </div>
                        <div className="prose dark:prose-dark">
                            <CustomMarkdown markdown={markdown} />
                        </div>
                    </div>
                )}
            </div>
            {/* Submit Button */}
            <div className="flex justify-end mt-4 gap-2">
                {isEditing && (
                    <Button onClick={resetForm} variant="outline">
                        <FilePlus2 size={16} />New Post
                    </Button>
                )}
                <Button onClick={handleSubmit} disabled={submitting}>
                    {submitting ? 'Submitting...' : (
                        <>
                            {isEditing ? (
                                <>
                                    <Save size={16} /> Update Post
                                </>
                            ) : (
                                <>
                                    <Send size={16} /> Create Post
                                </>
                            )}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}