// src/app/editor/page.jsx
import React from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';

export default function EditorPage() {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Markdown Editor</h1>
            <MarkdownEditor />
        </main>
    );
}
