import React, { useState, useEffect } from 'react';

const RightSidebar = ({ className = "" }) => {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        fetch('/api/communities/sidebar')
            .then(res => res.json())
            .then(data => setTrending(data.trending || []))
            .catch(err => console.error("Error fetching trending communities:", err));
    }, []);

    return (
        <aside className={`hidden lg:block space-y-6 ${className}`}>
            {/* Popular Communities */}
            <div className="bg-white/60 dark:bg-primary/5 backdrop-blur-md border border-white/40 dark:border-primary/20 shadow-sm rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/40 dark:border-primary/20 bg-primary/5 text-center">
                    <h3 className="font-bold">Trending Communities</h3>
                </div>
                <div className="p-2">
                    {trending.map((comm, index) => (
                        <div key={comm.id} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-primary/10 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-400">{index + 1}</span>
                                <div className="w-8 h-8 rounded-full bg-indigo-500"></div>
                                <div>
                                    <p className="text-sm font-bold">{comm.name}</p>
                                    <p className="text-[10px] text-slate-500">{comm.members} members</p>
                                </div>
                            </div>
                            <button className="bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full">Join</button>
                        </div>
                    ))}
                    {trending.length === 0 && <p className="text-center p-4 text-slate-500 text-sm">Loading...</p>}
                </div>
                <div className="p-4 border-t border-white/40 dark:border-primary/20 bg-slate-50 dark:bg-transparent">
                    <button className="w-full font-bold text-primary text-sm hover:underline">View All Communities</button>
                </div>
            </div>

            {/* Community Rules / Info */}
            <div className="bg-white/60 dark:bg-primary/5 backdrop-blur-md border border-white/40 dark:border-primary/20 shadow-sm rounded-xl p-4 flex flex-col items-center text-center">
                <h3 className="font-bold mb-4">DevHive Community</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    The hive for Moroccan developers. Share knowledge, find opportunities, and connect with peers across the Kingdom. 🇲🇦
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4 w-full">
                    <div>
                        <p className="text-lg font-bold">45.2k</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Members</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">128</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Online</p>
                    </div>
                </div>
                <button className="w-full bg-primary text-background-dark font-bold py-2 rounded-full mb-2">Create Post</button>
            </div>

            {/* Footer Links */}
            <div className="px-4 text-[11px] text-slate-500 space-y-1 flex flex-col items-center text-center">
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
                    <a className="hover:underline" href="#">User Agreement</a>
                    <a className="hover:underline" href="#">Privacy Policy</a>
                    <a className="hover:underline" href="#">Content Policy</a>
                    <a className="hover:underline" href="#">Moderator Code</a>
                </div>
                <p className="pt-2">DevHive Inc © 2026. All rights reserved.</p>
            </div>
        </aside>
    );
};

export default RightSidebar;
