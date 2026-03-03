import React, { useState } from "react";
import AdminFileView from "../../components/AdminFileView";
import FileUpload from "../../components/FileUpload";
import FileShareView from "../../components/FileShareView";
import FileShaereHistory from "../../components/FileShaereHistory";

import { 
  FiFolder, 
  FiShare2, 
  FiClock, 
  FiUploadCloud, 
  FiGrid, 
  FiHardDrive 
} from "react-icons/fi";

function AdminFileManage() {
  const [tab, setTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Files", icon: <FiFolder />, color: "blue" },
    { id: "share", label: "Shared Files", icon: <FiShare2 />, color: "emerald" },
    { id: "history", label: "History", icon: <FiClock />, color: "amber" },
    { id: "upload", label: "Upload New", icon: <FiUploadCloud />, color: "indigo" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 text-white">
              <FiHardDrive size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                File Manager
              </h2>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
                Storage & Distribution
              </p>
            </div>
          </div>

        
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                tab === t.id
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105"
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200/50"
              }`}
            >
              <span className={tab === t.id ? "text-indigo-400" : "text-slate-400"}>
                {t.icon}
              </span>
              {t.label}
            </button>
          ))}
        </div>

        <main className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden min-h-[500px]">
          <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FiGrid className="text-indigo-500" /> 
              {tabs.find(t => t.id === tab)?.label} View
            </h3>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-slate-200"></div>
               <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            </div>
          </div>

          <div className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {tab === "all" && <AdminFileView />}
            {tab === "share" && <FileShareView />}
            {tab === "history" && <FileShaereHistory />}
            {tab === "upload" && <FileUpload />}
          </div>
        </main>

        <p className="mt-6 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          End-to-End Encrypted File Storage System
        </p>
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default AdminFileManage;