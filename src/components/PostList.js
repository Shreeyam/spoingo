import React from 'react';
import Masonry from 'react-masonry-css';
import PostCard from './PostCard';

export default function PostList({ posts, galleryMode }) {
    if (galleryMode) {
        const breakpointColumnsObj = {
            default: 2,
            1100: 2,
            700: 1,
        };

        return (
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {posts.map(post => (
                    <PostCard key={post.id} post={post} galleryMode={true} />
                ))}
            </Masonry>
        );
    } else {
        return (
            <div>
                {posts.map(post => (
                    <PostCard key={post.id} post={post} galleryMode={false} />
                ))}
            </div>
        );
    }
}
