import React, { useState } from 'react';

const PostCard = ({ post }) => {
    const [votes, setVotes] = useState(post.votes);

    return (
        <article className="post-card card">
            <div className="post-votes">
                <button className="vote-btn up" onClick={() => setVotes(v => v + 1)}>▲</button>
                <span>{votes}</span>
                <button className="vote-btn down" onClick={() => setVotes(v => v - 1)}>▼</button>
            </div>
            <div className="post-content">
                <div className="post-meta">
                    <span className="tag">{post.tag}</span>
                    <span className="author">u/{post.author}</span>
                    <span className="time">• {post.time}</span>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-actions">
                    <button>💬 {post.comments} Comments</button>
                    <button>↗ Share</button>
                    <button>🔖 Save</button>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
