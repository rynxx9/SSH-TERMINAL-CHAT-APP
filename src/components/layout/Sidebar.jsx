import React, { useState, useEffect } from 'react';

const Sidebar = ({ className = "" }) => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        fetch('/api/communities/sidebar')
            .then(res => res.json())
            .then(data => setCommunities(data.user || []))
            .catch(err => console.error("Error fetching communities:", err));
    }, []);

    return (
        <aside className={`hidden lg:block space-y-4 bg-white/40 dark:bg-primary/5 backdrop-blur-md border border-white/30 dark:border-primary/20 p-3 rounded-xl shadow-sm h-fit sticky top-24 ${className}`}>
            <nav className="space-y-1">
                <a className="flex items-center gap-3 p-2 rounded-lg bg-primary/10 text-primary font-bold" href="#">
                    <span className="material-symbols-outlined">home</span>
                    <span>Feed</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/5 transition-colors" href="#">
                    <span className="material-symbols-outlined">trending_up</span>
                    <span>Trending</span>
                </a>
                <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/5 transition-colors" href="#">
                    <span className="material-symbols-outlined">groups</span>
                    <span>Communities</span>
                </a>
            </nav>
            <div className="pt-2 border-t border-white/40 dark:border-primary/20">
                <h3 className="px-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 mt-2">My Communities</h3>
                <div className="space-y-1">
                    {communities.map(comm => (
                        <a key={comm.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/5 text-sm" href="#">
                            <span className={`w-8 h-8 rounded bg-${comm.color}-500/20 text-${comm.color}-500 flex items-center justify-center text-sm font-bold shrink-0`}>
                                {comm.iconChar}
                            </span>
                            <span className="truncate">{comm.name}</span>
                        </a>
                    ))}
                    {communities.length === 0 && <p className="px-2 text-xs text-slate-400">Loading...</p>}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
