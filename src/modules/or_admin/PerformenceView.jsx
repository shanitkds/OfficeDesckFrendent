import React, { useState } from "react";
import AllPerformenceView from "../../components/AllPerformenceView";
import PerformenceGenarater from "../../components/PerformenceGenarater";
import { Toaster } from "react-hot-toast"; 
import { FiPlusCircle, FiBarChart2 } from "react-icons/fi"; 

function PerformenceView() {
  const [active, setActive] = useState("generate");

  return (
    <div className="p-6 md:p-10 bg-slate-50/50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          Performance Management
        </h1>
        <p className="text-slate-500 text-sm font-medium mt-1">
          Generate analytics and review team performance reports.
        </p>
      </header>

      <div className="inline-flex p-1.5 bg-slate-200/50 rounded-[1.5rem] mb-8">
        <button
          onClick={() => setActive("generate")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
            active === "generate"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <FiPlusCircle size={18} />
          Generate Performance
        </button>

        <button
          onClick={() => setActive("view")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
            active === "view"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <FiBarChart2 size={18} />
          View Performance
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative">
          {active === "generate" && <PerformenceGenarater />}
          {active === "view" && <AllPerformenceView />}
        </div>
      </div>

      <footer className="mt-12 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
          Performance Intelligence Module
        </p>
      </footer>
    </div>
  );
}

export default PerformenceView;