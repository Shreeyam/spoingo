// src/components/postlist.js
import React from 'react';
import PostCard from './PostCard';

export default function PostList({ posts }) {
    return (
        <div>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
