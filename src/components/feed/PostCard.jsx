import React, { useState } from 'react';

const PostCard = ({ post }) => {
    const [votes, setVotes] = useState(post.votes);

    return (
        <article className="bg-white/60 dark:bg-primary/5 backdrop-blur-md border border-white/40 dark:border-primary/20 shadow-sm rounded-xl overflow-hidden hover:border-primary/40 transition-colors">
            <div className="flex">
                {/* Voting Column */}
                <div className="w-12 bg-slate-50/30 dark:bg-primary/5 backdrop-blur-sm flex flex-col items-center py-4 gap-1 border-r border-white/20 dark:border-transparent">
                    <button className="text-slate-400 hover:text-primary" onClick={() => setVotes(v => v + 1)}>
                        <span className="material-symbols-outlined text-3xl leading-none">expand_less</span>
                    </button>
                    <span className="text-sm font-bold">{votes > 999 ? (votes / 1000).toFixed(1) + 'k' : votes}</span>
                    <button className="text-slate-400 hover:text-red-400" onClick={() => setVotes(v => v - 1)}>
                        <span className="material-symbols-outlined text-3xl leading-none">expand_more</span>
                    </button>
                </div>
                <div className="flex-1 p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="font-bold text-slate-900 dark:text-slate-200">{post.tag}</span>
                        <span>•</span>
                        <span>Posted by u/{post.author}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                    </div>

                    <h2 className="text-lg font-bold mb-2">{post.title}</h2>

                    {post.image ? (
                        <div className="rounded-lg overflow-hidden mb-4 bg-slate-200 dark:bg-primary/20 aspect-video">
                            <img alt="Post content" className="w-full h-full object-cover" src={post.image} />
                        </div>
                    ) : (
                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                        <button className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-primary/10 px-2 py-1 rounded">
                            <span className="material-symbols-outlined text-lg">mode_comment</span>
                            {post.comments} Comments
                        </button>
                        <button className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-primary/10 px-2 py-1 rounded">
                            <span className="material-symbols-outlined text-lg">share</span>
                            Share
                        </button>
                        <button className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-primary/10 px-2 py-1 rounded">
                            <span className="material-symbols-outlined text-lg">bookmark</span>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
