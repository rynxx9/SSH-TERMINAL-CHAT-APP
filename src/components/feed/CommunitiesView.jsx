import React from 'react';


const CommunitiesView = ({ communities, onCommunityClick }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl font-extrabold tracking-tight">Browse Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {communities.map(comm => (
                    <div
                        key={comm.id}
                        onClick={() => onCommunityClick(comm)}
                        className="ios-glass ios-glass-border ios-glass-shadow p-6 rounded-[2.5rem] flex flex-col cursor-pointer ios-hover transition-all group border-transparent hover:border-white/20 h-full"
                    >
                        {/* Top: Icon & Title */}
                        <div className="flex items-center gap-4 mb-5">
                            <div className={`w-16 h-16 rounded-full ${comm.color} flex items-center justify-center text-3xl font-bold shadow-2xl shrink-0 border border-white/20`}>
                                {comm.id.split('/')[1][0]}
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-black text-xl truncate leading-none">{comm.id}</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2 opacity-60">Verified Hive</p>
                            </div>
                        </div>

                        {/* Description - Middle */}
                        <div className="flex-1 mb-6 pr-2">
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-2 italic">
                                "{comm.description}"
                            </p>
                        </div>

                        {/* Stats - Bottom Row */}
                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/20 dark:border-white/5">
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col">
                                    <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest opacity-60">Hivers</span>
                                    <span className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tighter">{comm.members}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] text-primary font-black uppercase tracking-widest">Hives</span>
                                    <span className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tighter">{comm.posts}</span>
                                </div>
                            </div>

                            <button
                                onClick={(e) => { e.stopPropagation(); }}
                                className="bg-primary hover:bg-primary/90 text-background-dark font-black px-8 py-3 rounded-2xl text-[12px] shadow-xl shadow-primary/20 transition-all active:scale-90 hover:shadow-primary/40"
                            >
                                JOIN
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunitiesView;
