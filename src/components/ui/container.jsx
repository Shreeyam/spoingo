import React from 'react';

export function Container({ children, className = "", ...props }) {
    return (
        <div className="px-4">
            <div className={`container mx-auto ${className}`} {...props}>
                {children}
            </div>
        </div>
    );
}