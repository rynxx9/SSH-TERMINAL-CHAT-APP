import React from 'react';

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/10 px-4 md:px-10 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="bg-primary p-2 rounded-lg text-background-dark flex items-center justify-center">
                        <span className="material-symbols-outlined block text-2xl">hive</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight hidden sm:block">DevHive</h1>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl px-4">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input className="w-full bg-slate-100 dark:bg-primary/5 border-transparent focus:border-primary focus:ring-0 rounded-full pl-10 pr-4 py-2 text-sm transition-all outline-none" placeholder="Search communities, posts, or developers..." type="text" />
                    </div>
                </div>

                {/* Nav Actions */}
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-primary/10 transition-colors hidden md:flex">
                        <span className="material-symbols-outlined">explore</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-primary/10 transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined">chat_bubble</span>
                    </button>
                    <div className="h-8 w-px bg-slate-200 dark:bg-primary/10 mx-1"></div>
                    <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                        <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_T-BjcZSFJJBfBQqLtx-0PGn3TZFFFw6YQ2yKDjYQNQJkoliW1C-gbLjHdQD38F1VWgXPGZ_bmAB-2u5lOODfwiqJMBAZpAtQ7dHouyPeK2WWJIk4C3NW4Qf09Y4_py2lIRkZKi7030R9wGyfhUd03R04_oCxRkZTiGjgxI4ZJeqDln7rfWmPZrDEaJgW8Bv-sL5DHZQokjOG70zVk6tbLV1Ff499Q-9pVaOM6vypHq1p7OFZt6C7uyEBPKtecrmqhLLOw8IGcXD1" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
