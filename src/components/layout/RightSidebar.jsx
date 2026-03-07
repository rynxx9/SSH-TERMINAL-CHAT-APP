import React from 'react';

const RightSidebar = ({ className = "", onCommunityClick, communities = [], selectedCommunity = null }) => {
    return (
        <aside className={`hidden lg:block space-y-6 ${className}`}>
            {/* Community-Specific Sections */}
            {selectedCommunity && (
                <>
                    <div className="ios-glass ios-glass-border ios-glass-shadow rounded-[1.5rem] overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="p-4 border-b border-white/20 dark:border-white/5 bg-primary/10">
                            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <span className="material-symbols-rounded text-sm">shield</span>
                                Hive Beekeepers
                            </h3>
                        </div>
                        <div className="p-2 space-y-1">
                            {selectedCommunity.beekeepers.map(mod => (
                                <div key={mod.name} className="flex items-center justify-between p-2.5 ios-hover rounded-xl transition-all cursor-pointer group">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                                            <span className="material-symbols-rounded text-primary text-xs">eco</span>
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-xs font-bold truncate">{mod.name}</span>
                                            <span className="text-[9px] text-primary/60 font-medium truncate uppercase tracking-wider">{mod.role || 'Beekeeper'}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end shrink-0 gap-0.5">
                                        <span className="text-[9px] font-black text-primary/70 uppercase tracking-tighter bg-primary/5 px-2 py-1 rounded-lg shrink-0 group-hover:bg-primary/20 transition-colors">
                                            {mod.stats}
                                        </span>
                                        {mod.activity && <span className="text-[8px] text-slate-400 font-medium italic truncate max-w-[60px]">{mod.activity}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="ios-glass ios-glass-border ios-glass-shadow rounded-[1.5rem] overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
                        <div className="p-4 border-b border-white/20 dark:border-white/5 bg-slate-500/5">
                            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                <span className="material-symbols-rounded text-sm">stars</span>
                                Top Hivers
                            </h3>
                        </div>
                        <div className="p-2 space-y-1">
                            {selectedCommunity.topHivers.map(hiver => (
                                <div key={hiver.name} className="flex items-center justify-between p-2.5 ios-hover rounded-xl transition-all cursor-pointer group">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-rounded text-slate-500 text-xs">person</span>
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-xs font-bold truncate">{hiver.name}</span>
                                            <span className="text-[9px] text-slate-500/60 font-medium truncate uppercase tracking-wider">{hiver.role || 'Hiver'}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end shrink-0 gap-0.5">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                                            {hiver.stats}
                                        </span>
                                        {hiver.activity && <span className="text-[8px] text-slate-400 font-medium italic truncate max-w-[60px]">{hiver.activity}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Popular Communities */}
            <div className="ios-glass ios-glass-border ios-glass-shadow rounded-[1.5rem] overflow-hidden">
                <div className="p-4 border-b border-white/20 dark:border-white/5 bg-primary/5 text-center">
                    <h3 className="font-extrabold text-xs uppercase tracking-[0.1em]">Trending Communities</h3>
                </div>
                <div className="p-2 space-y-1">
                    {communities.slice(0, 5).map((comm, index) => (
                        <div
                            key={comm.id}
                            onClick={() => onCommunityClick(comm)}
                            className="flex items-center justify-between p-2.5 ios-hover rounded-xl cursor-pointer transition-all group"
                        >
                            <div className="flex items-center gap-3 overflow-hidden flex-1">
                                <span className="font-black text-slate-400 shrink-0 w-4 font-mono text-[10px]">{index + 1}</span>
                                <div className={`w-9 h-9 rounded-xl ${comm.color} shrink-0 shadow-md flex items-center justify-center text-xs font-black`}>
                                    {comm.id.split('/')[1][0]}
                                </div>
                                <div className="overflow-hidden flex-1">
                                    <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{comm.id}</p>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{comm.posts} Fresh Pollen</p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); }}
                                className="bg-primary text-background-dark text-[10px] font-black px-4 py-1.5 rounded-lg shrink-0 ml-3 shadow-lg shadow-primary/10 hover:scale-105 active:scale-95 transition-all"
                            >
                                JOIN
                            </button>
                        </div>
                    ))}
                </div>
                {!selectedCommunity && (
                    <div className="p-3 text-center border-t border-white/10">
                        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Explore All Hives</button>
                    </div>
                )}
            </div>

            {/* Footer Links */}
            <div className="px-4 py-2 space-y-4">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <a href="#" className="text-[10px] text-slate-500 hover:underline">User Agreement</a>
                    <a href="#" className="text-[10px] text-slate-500 hover:underline">Privacy Policy</a>
                    <a href="#" className="text-[10px] text-slate-500 hover:underline">Content Policy</a>
                    <a href="#" className="text-[10px] text-slate-500 hover:underline">Moderator Code</a>
                </div>
                <div className="pt-4 border-t border-white/20 dark:border-white/5 text-[10px] text-slate-500">
                    DevHive © 2026. Made with ❤️ in Morocco.
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;
