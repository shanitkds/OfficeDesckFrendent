import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { 
  HiOutlineUserGroup, 
  HiOutlineCalendar, 
  HiOutlineClipboardCheck, 
  HiOutlineCurrencyDollar, 
  HiOutlineDocumentText,
  HiOutlineCreditCard
} from 'react-icons/hi';

function TeamLeadHome() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { 
      name: 'Mark Attendance', 
      path: 'teamleatattentance', 
      icon: <HiOutlineClipboardCheck size={28} />, 
      color: 'bg-blue-50 text-blue-600' 
    },
    { 
      name: 'My Expenses', 
      path: 'myexpenses', 
      icon: <HiOutlineCreditCard size={28} />, 
      color: 'bg-orange-50 text-orange-600' 
    },
    { 
      name: 'My Team', 
      path: 'myteam', 
      icon: <HiOutlineUserGroup size={28} />, 
      color: 'bg-purple-50 text-purple-600' 
    },
    { 
      name: 'My Attendance', 
      path: 'myattentance', 
      icon: <HiOutlineCalendar size={28} />, 
      color: 'bg-emerald-50 text-emerald-600' 
    },
    { 
      name: 'Payment History', 
      path: 'mysalary', 
      icon: <HiOutlineCurrencyDollar size={28} />, 
      color: 'bg-cyan-50 text-cyan-600' 
    },
    { 
      name: 'Leave Request', 
      path: 'mysalary', 
      icon: <HiOutlineDocumentText size={28} />, 
      color: 'bg-rose-50 text-rose-600' 
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 lg:p-12 min-h-screen">
      
      {/* HEADER WITH LIVE CLOCK */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Team Lead Console</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Quick access to management tools and personal records</p>
        </div>

        {/* TIME WIDGET */}
        <div className="bg-white border border-slate-100 px-6 py-4 rounded-[2rem] shadow-sm flex items-center gap-5 self-start md:self-auto">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <FiClock size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800 tracking-tighter tabular-nums">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' })}
            </div>
          </div>
        </div>
      </header>

      {/* MENU GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-center min-h-[180px]"
          >
            {/* Icon Container */}
            <div className={`mb-4 p-5 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
              {item.icon}
            </div>

            {/* Label */}
            <h3 className="text-sm font-bold text-slate-700 tracking-tight group-hover:text-slate-900 px-2">
              {item.name}
            </h3>

            {/* Subtle Decoration */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300">
               <span className="text-[9px] font-black uppercase tracking-widest">Open</span>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 text-center text-slate-400">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">OFFICE DESCK </p>
      </footer>
    </div>
  );
}

export default TeamLeadHome;