// src/cms/page.jsx
"use client";

import React from 'react';
import ImageManagement from '@/components/ImageManagement';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ImageManagementPage() {
    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center mb-6">
                <Link href="/admin" className="mr-4">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Image Management</h1>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <ImageManagement />
            </div>
        </div>
    );
}