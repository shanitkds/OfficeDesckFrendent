import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigation=useNavigate()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className={`flex items-center justify-between px-4 py-2 rounded-2xl transition-all duration-500 border ${scrolled
                        ? 'bg-white/80 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]'
                        : 'bg-transparent border-transparent'
                    }`}>

                    {/* Brand - Modern Minimalist */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-[10deg] transition-all duration-300 shadow-lg shadow-blue-500/30">
                            <img src="/logo.png" alt="" />
                            <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse"></div>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-slate-900">
                            Office<span className="text-blue-600">Desk</span>
                        </span>
                    </div>

                    {/* Navigation - The "Pill" Menu */}
                    <div className="hidden md:flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">

                        <a
                            href="#features"
                            className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-white rounded-full transition"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-white rounded-full transition"
                        >
                            How It Works
                        </a>

                        <a
                            href="#roles"
                            className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-white rounded-full transition"
                        >
                            Roles
                        </a>

                        <a
                            href="#contact"
                            className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-white rounded-full transition"
                        >
                            Contact
                        </a>

                    </div>


                    {/* Actions - Depth & Contrast */}
                    <div className="flex items-center gap-2">
                        <button className="px-5 py-2 text-[13px] font-bold text-slate-700 hover:text-blue-600 transition-colors" onClick={() => navigation('/login')}>
                            Login
                        </button>
                        <button className="relative group overflow-hidden bg-slate-900 text-white text-[13px] font-bold px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-95" onClick={() => navigation('/registration')}>
                            <span className="relative z-10">Register</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;