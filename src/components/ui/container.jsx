import React from 'react';

export function Container({ children, className = "", ...props }) {
    return (
        <div className={`container mx-auto px-4 ${className}`} {...props}>
            {children}
        </div>
    );
}