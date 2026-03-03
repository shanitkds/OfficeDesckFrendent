import React from "react";
import { HiArrowRight, HiOutlinePlay } from "react-icons/hi";

function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-white flex items-center overflow-hidden">
      {/* Structural Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-start">
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
           
          </div>

          <h1 className="text-6xl xl:text-7xl font-bold leading-[1.05] text-[#0f172a] mb-8 tracking-tighter">
            Smart Office <br />
            <span className="text-blue-600">Management.</span>
          </h1>

          <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-lg font-medium">
            Streamline employee performance, automate attendance, and coordinate 
            complex tasks with a unified, role-based command center.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-2 group">
              Start Building <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="flex items-center gap-3 bg-white border border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
              <HiOutlinePlay className="text-blue-600 text-xl" />
              Watch Demo
            </button>
          </div>

          {/* Integration Proof */}
          
        </div>

        {/* Right UI Mockup */}
        <div className="relative">
          {/* Main Frame Background */}
          <div className="absolute -inset-4 bg-blue-50/50 rounded-[40px] blur-2xl" />
          
          <div className="relative bg-white border border-gray-100 rounded-[32px] shadow-[0_40px_80px_-15px_rgba(15,23,42,0.08)] overflow-hidden">
            {/* Window Header */}
            <div className="bg-gray-50/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
              </div>
              <div className="h-2 w-32 bg-gray-200 rounded-full" />
              <div className="w-8 h-8 rounded-full bg-blue-100" />
            </div>

            {/* Dashboard Mockup Content */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-blue-50/50 rounded-2xl border border-blue-100/50 p-4">
                    <div className="h-2 w-12 bg-blue-200 rounded mb-4" />
                    <div className="h-4 w-20 bg-blue-600 rounded" />
                </div>
                <div className="h-24 bg-gray-50 rounded-2xl border border-gray-100 p-4">
                    <div className="h-2 w-12 bg-gray-200 rounded mb-4" />
                    <div className="h-4 w-20 bg-gray-900 rounded" />
                </div>
              </div>
              
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-50 rounded-xl hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                      <div className="space-y-2">
                        <div className="h-2 w-24 bg-gray-200 rounded" />
                        <div className="h-1.5 w-16 bg-gray-100 rounded" />
                      </div>
                    </div>
                    <div className="h-2 w-12 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Performance Indicator */}
          <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-2xl border border-blue-50 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin-slow" />
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Efficiency</p>
                <p className="text-xl font-bold text-gray-900">98.4%</p>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;