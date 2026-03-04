import React from 'react';

const Sidebar = () => {
    return (
        <aside className="hidden lg:block lg:col-span-2 space-y-6 bg-white/40 dark:bg-primary/5 backdrop-blur-md border border-white/30 dark:border-primary/20 p-4 rounded-xl shadow-sm h-fit sticky top-24">
            <nav className="space-y-1">
                <a className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold" href="#">
                    <span className="material-symbols-outlined">home</span>
                    <span>Feed</span>
                </a>
                <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/5 transition-colors" href="#">
                    <span className="material-symbols-outlined">trending_up</span>
                    <span>Trending</span>
                </a>
                <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/5 transition-colors" href="#">
                    <span className="material-symbols-outlined">groups</span>
                    <span>Communities</span>
                </a>
            </nav>
            <div className="pt-4">
                <h3 className="px-4 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">My Communities</h3>
                <div className="space-y-1">
                    <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/5 text-sm" href="#">
                        <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold">W</span>
                        <span>ma/WebDev_MA</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/5 text-sm" href="#">
                        <span className="w-6 h-6 rounded bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs font-bold">A</span>
                        <span>ma/AI_Morocco</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/5 text-sm" href="#">
                        <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-bold">J</span>
                        <span>ma/JobHunting</span>
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
