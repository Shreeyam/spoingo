"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const isValidUrl = (url) => {
    // Allow relative URLs that start with '/'
    if (url.startsWith('/')) return true;
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch (err) {
        return false;
    }
};

const SafeImage = (props) => {
    const [hasError, setHasError] = useState(false);

    // Destructure className and other props for cleaner code
    const { className = '', alt = 'Image', ...otherProps } = props;

    // If URL is invalid or there's an error, show a placeholder that works inside paragraphs
    if (!props.src || !isValidUrl(props.src) || hasError) {
        // Option 1: Using span instead of div (spans can be inside paragraphs)
        return (
            <span
                className={`inline-block bg-gray-200 text-center p-4 ${className}`}
                style={{
                    width: props.width || '100%',
                    height: props.height || 'auto'
                }}
            >
                Image not available
            </span>
        );
    }

    return (
        <Image
            {...props}
            alt={alt}
            onError={() => setHasError(true)}
        />
    );
};

export default SafeImage;