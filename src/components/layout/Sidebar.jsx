import React from 'react';

const Sidebar = ({ className = "", activeTab, setActiveTab }) => {
    return (
        <aside className={`hidden lg:block space-y-6 ios-glass ios-glass-border ios-glass-shadow p-6 rounded-xl h-fit sticky top-24 ${className}`}>
            <nav className="space-y-2">
                <button
                    onClick={() => setActiveTab('feed')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'feed' ? 'ios-hover-active text-primary font-bold' : 'ios-hover'
                        }`}
                >
                    <span className="material-symbols-rounded">dynamic_feed</span>
                    <span>Feed</span>
                </button>
                <button
                    onClick={() => setActiveTab('trending')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'trending' ? 'ios-hover-active text-primary font-bold' : 'ios-hover'
                        }`}
                >
                    <span className="material-symbols-rounded">local_fire_department</span>
                    <span>Trending</span>
                </button>
                <button
                    className="w-full flex items-center gap-3 p-3 rounded-lg ios-hover transition-colors"
                >
                    <span className="material-symbols-rounded">groups_2</span>
                    <span>Communities</span>
                </button>
            </nav>
            <div className="pt-4 border-t border-white/40 dark:border-primary/20">
                <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 mt-2">My Communities</h3>
                <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 p-2 rounded-lg ios-hover transition-colors text-sm text-left">
                        <span className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-sm font-bold shrink-0">W</span>
                        <span className="truncate">ma/WebDev_MA</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 rounded-lg ios-hover transition-colors text-sm text-left">
                        <span className="w-8 h-8 rounded bg-orange-500/20 text-orange-500 flex items-center justify-center text-sm font-bold shrink-0">A</span>
                        <span className="truncate">ma/AI_Morocco</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 rounded-lg ios-hover transition-colors text-sm text-left">
                        <span className="w-8 h-8 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center text-sm font-bold shrink-0">J</span>
                        <span className="truncate">ma/JobHunting</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
