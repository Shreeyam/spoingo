// src/cms/page.jsx
"use client";

import React from 'react';
import ImageManagement from '@/components/ImageManagement';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ImageManagementPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <ImageManagement />
            </div>
        </div>
    );
}