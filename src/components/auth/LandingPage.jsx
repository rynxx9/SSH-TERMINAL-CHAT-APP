import React, { useState } from 'react';
import Antigravity from '../effects/Antigravity';

const LandingPage = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 flex items-center justify-center opacity-40">
                <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
                    <Antigravity
                        count={300}
                        magnetRadius={10}
                        ringRadius={10}
                        waveSpeed={0.4}
                        waveAmplitude={1}
                        particleSize={2}
                        lerpSpeed={0.1}
                        color="#5a0fe6"
                        autoAnimate={false}
                        particleVariance={1}
                        rotationSpeed={0}
                        depthFactor={1}
                        pulseSpeed={3}
                        particleShape="capsule"
                        fieldStrength={10}
                    />
                </div>
            </div>

            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-primary/40 blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-blue-500/30 blur-[150px]"></div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="bg-primary w-20 h-20 rounded-3xl text-background-dark flex items-center justify-center mx-auto mb-6 ios-glass-shadow">
                    <span className="material-symbols-outlined text-5xl">hive</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-white/50">
                    Welcome to DevHive
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                    The premium community for Moroccan developers to connect, share, and grow together.
                </p>
            </div>

            {/* Auth Card */}
            <div className="w-full max-w-md ios-glass ios-glass-border ios-glass-shadow rounded-3xl p-8 transition-all duration-500 hover:ios-glass-shadow relative group">
                {/* Refractive Top Edge for card */}
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"></div>

                <div className="flex justify-center mb-8 bg-slate-100/50 dark:bg-white/5 p-1 rounded-2xl w-fit mx-auto">
                    <button
                        onClick={() => setIsSignUp(false)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${!isSignUp ? 'bg-primary text-background-dark shadow-lg' : 'text-slate-500 hover:text-primary'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsSignUp(true)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${isSignUp ? 'bg-primary text-background-dark shadow-lg' : 'text-slate-500 hover:text-primary'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isSignUp ? 'Create your account' : 'Welcome back'}
                </h2>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                    {isSignUp && (
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Abderrahman ..."
                                className="w-full ios-input rounded-2xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="name@example.ma"
                            className="w-full ios-input rounded-2xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Password</label>
                            {!isSignUp && <button type="button" className="text-xs text-primary font-bold hover:underline">Forgot?</button>}
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full ios-input rounded-2xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-background-dark font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-6 text-lg"
                    >
                        {isSignUp ? 'Get Started' : 'Unlock Hive'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                    By continuing, you agree to our <button className="text-primary hover:underline">Terms</button> and <button className="text-primary hover:underline">Privacy Policy</button>.
                </p>
            </div>

            {/* Floating Info */}
            <div className="mt-12 flex gap-8 text-slate-500 text-sm font-medium opacity-60">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-lg">verified</span>
                    <span>Premium Privacy</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-lg">public</span>
                    <span>Global Reach</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-lg">rocket_launch</span>
                    <span>High Performance</span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
