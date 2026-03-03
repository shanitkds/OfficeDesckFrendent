import React from "react";

function Hero() {
  return (
    <section className="w-full min-h-screen bg-white flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Content */}
        <div className="z-10">
          {/* Version Badge */}
          <div className="inline-flex items-center gap-2 bg-[#E8F0FE] text-[#1967D2] text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#1967D2] rounded-full"></span>
            VERSION 2.0 NOW LIVE
          </div>

          <h1 className="text-6xl font-black leading-[1.1] text-[#1a1a1a] mb-8 tracking-tight">
            OfficeDesk – <span className="text-[#1A73E8]">Smart <br /> Office</span> Management System
          </h1>

          <p className="text-[#5f6368] text-xl leading-relaxed mb-10 max-w-lg font-medium">
            The all-in-one workspace solution to streamline employee performance,
            automate attendance, and coordinate complex tasks with role-based precision.
          </p>

          <div className="flex gap-4">
            {/* Get Started Button */}
            <button className="bg-[#1A73E8] hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-[0_10px_20px_rgba(26,115,232,0.3)] transition-all flex items-center gap-2">
              Get Started <span className="text-xl">→</span>
            </button>

            {/* View Demo Button */}
            <button className="flex items-center gap-3 bg-white border border-gray-100 text-[#3c4043] font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-[#1A73E8] rounded-full p-1.5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3 translate-x-[1px]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              View Demo
            </button>
          </div>
        </div>

        {/* Right UI Mockup Container */}
        <div className="relative lg:ml-10">
          {/* The Peach Rounded Container */}
          <div className="bg-[#FDF0E9] rounded-[40px] p-12 lg:p-20 flex justify-center items-center shadow-sm">
            
            {/* The Browser Window */}
            <div className="bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 w-full aspect-[4/3] relative flex flex-col p-6 overflow-hidden">
              
              {/* Browser Dots */}
              <div className="flex gap-1.5 mb-8">
                <div className="w-2.5 h-2.5 bg-[#FF5F57] rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-[#FEBC2E] rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-[#28C840] rounded-full"></div>
              </div>

              {/* Simplified Dashboard UI Elements (Replacing img for high fidelity) */}
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-4 w-24 bg-gray-100 rounded-md"></div>
                  <div className="flex gap-2">
                     <div className="h-4 w-4 bg-gray-50 rounded-full border border-gray-100"></div>
                     <div className="h-4 w-4 bg-gray-50 rounded-full border border-gray-100"></div>
                  </div>
                </div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 w-full border border-gray-50 rounded-lg flex items-center px-4 justify-between">
                     <div className="h-2 w-1/3 bg-gray-100 rounded"></div>
                     <div className="h-4 w-4 rounded-full border border-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;