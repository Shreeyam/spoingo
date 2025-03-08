// src/app/editor/page.jsx
import React from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';

export default function EditorPage() {
    return (
        <main className="p-4">
            <MarkdownEditor />
        </main>
    );
}
