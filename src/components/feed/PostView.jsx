import React from 'react';

const PostView = ({ post, onBack }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-primary font-bold ios-hover px-4 py-2 rounded-xl transition-all"
            >
                <span className="material-symbols-rounded">arrow_back</span>
                Back to Feed
            </button>

            <article className="ios-glass ios-glass-border ios-glass-shadow rounded-2xl overflow-hidden p-6">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <span className="font-bold text-primary">{post.tag}</span>
                    <span>•</span>
                    <span>Posted by u/{post.author}</span>
                    <span>•</span>
                    <span>{post.time}</span>
                </div>

                <h1 className="text-3xl font-extrabold mb-6 tracking-tight leading-tight">{post.title}</h1>

                {post.image && (
                    <div className="rounded-2xl overflow-hidden mb-6 bg-slate-200 dark:bg-primary/20 shadow-xl">
                        <img alt="Post content" className="w-full h-auto object-cover" src={post.image} />
                    </div>
                )}

                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8">
                    {post.excerpt}
                </p>

                <div className="flex items-center gap-6 pt-6 border-t border-white/20 dark:border-primary/20 text-slate-500">
                    <div className="flex items-center gap-2 font-bold text-primary">
                        <span className="material-symbols-rounded">keyboard_arrow_up</span>
                        <span>{post.votes}</span>
                        <span className="material-symbols-rounded text-slate-400">keyboard_arrow_down</span>
                    </div>
                </div>
            </article>

            {/* Comments Section */}
            <div className="ios-glass ios-glass-border ios-glass-shadow rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <span className="material-symbols-rounded text-primary">chat_bubble</span>
                    Comments
                </h3>

                <div className="space-y-6">
                    {(post.comments_list || []).map(comment => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-primary/20 shrink-0"></div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold">u/{comment.author}</span>
                                    <span className="text-[10px] text-slate-500">{comment.time}</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {comment.text}
                                </p>
                            </div>
                        </div>
                    ))}
                    {(!post.comments_list || post.comments_list.length === 0) && (
                        <p className="text-sm text-slate-500 italic">No nectar here yet... be the first to comment!</p>
                    )}
                </div>

                {/* Comment Input Mock */}
                <div className="mt-8 pt-6 border-t border-white/20 dark:border-primary/20">
                    <input
                        className="w-full ios-input rounded-2xl px-6 py-4 text-sm outline-none transition-all placeholder:text-slate-500"
                        placeholder="Add a comment as a member of the hive..."
                    />
                </div>
            </div>
        </div>
    );
};

export default PostView;
