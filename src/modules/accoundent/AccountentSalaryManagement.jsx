import React, { useState } from 'react';
import { 
  HiOutlineUserCircle, 
  HiOutlineCurrencyDollar, 
  HiOutlineClipboardList, 
  HiOutlineCreditCard, 
  HiOutlineRefresh,
  HiOutlineArrowNarrowRight,
  HiOutlineShieldCheck
} from 'react-icons/hi';

// Your existing imports
import SalaryView from '../../components/SalaryView';
import AccountentuserView from './AccountentuserView';
import AllPaimentViewList from '../../components/AllPaimentViewList';
import PaymentUpdateComponent from '../../components/PaymentUpdateComponent';
import AllAttentanceView from '../../components/AllAttentanceView';

function AccountentSalaryManagement() {
  const [activeTab, setActiveTab] = useState('profile');
  const [hoveredTab, setHoveredTab] = useState(null);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <HiOutlineUserCircle size={20} />, component: <AccountentuserView />, color: 'blue' },
    { id: 'salary', label: 'Salaries', icon: <HiOutlineCurrencyDollar size={20} />, component: <SalaryView />, color: 'emerald' },
    { id: 'attendance', label: 'Attendance', icon: <HiOutlineClipboardList size={20} />, component: <AllAttentanceView />, color: 'amber' },
    { id: 'payments', label: 'Payments', icon: <HiOutlineCreditCard size={20} />, component: <AllPaimentViewList />, color: 'indigo' },
    { id: 'update-pay', label: 'Updates', icon: <HiOutlineRefresh size={20} />, component: <PaymentUpdateComponent />, color: 'rose' },
  ];

  const activeContent = menuItems.find(item => item.id === activeTab);

  return (
    <div className="p-6 md:p-10 bg-[#fdfdff] min-h-screen">
      
      {/* Interactive Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Live System</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Portal</span>
          </h1>
        </div>
        
        
      </div>

      {/* Main Glassmorphism Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        
        {/* Navigation Bar with Animated Hover States */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-50/50 border-b border-slate-100">
          <div className="flex bg-slate-200/50 p-1.5 rounded-2xl space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden ${
                  activeTab === item.id 
                  ? 'bg-white text-indigo-600 shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className={`transition-transform duration-300 ${activeTab === item.id || hoveredTab === item.id ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className="relative z-10">{item.label}</span>
                
                {/* Visual indicator for active tab */}
                {activeTab === item.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center text-slate-400 text-xs gap-2">
            Quick Toggle <HiOutlineArrowNarrowRight />
          </div>
        </div>

        {/* Dynamic Content Area with Slide Animation */}
        <div className="relative p-6 md:p-12 min-h-[600px]">
          {/* Subtle Background Decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500 ease-out">
            {/* Header within the content */}
            <div className="flex items-center gap-4 mb-8">
               <div className={`p-3 rounded-2xl bg-white shadow-sm border border-slate-100 text-indigo-600`}>
                  {activeContent.icon}
               </div>
               <div>
                  <h3 className="text-xl font-bold text-slate-800">{activeContent.label} View</h3>
                  <p className="text-slate-400 text-sm">Real-time data synchronization active</p>
               </div>
            </div>

            {/* RENDER COMPONENT */}
            <div className="transition-all">
              {activeContent.component}
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default AccountentSalaryManagement;