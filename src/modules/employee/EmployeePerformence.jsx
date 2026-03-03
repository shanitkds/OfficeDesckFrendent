import React, { useState } from 'react';
import EmployeeReviewView from './EmployeeReviewView';
import EmployeePerformanceList from './EmplayPerformenceList';
import { FaStar, FaChartBar, FaUserShield } from 'react-icons/fa';

function EmployeePerformance() {
  const [activeTab, setActiveTab] = useState('review');

  const tabs = [
    { 
      id: 'review', 
      label: 'My Reviews', 
      icon: <FaStar />, 
      component: <EmployeeReviewView /> 
    },
    { 
      id: 'performance', 
      label: 'My Performance', 
      icon: <FaChartBar />, 
      component: <EmployeePerformanceList /> 
    },
  ];

  return (
    <div className="min-h-screen bg-sky-50/50">
      {/* Responsive Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 pt-8 pb-20 md:pt-12 md:pb-24 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl border border-white/30 backdrop-blur-sm shrink-0">
            <FaUserShield className="text-white text-xl md:text-2xl" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-black text-white tracking-tight">
              Growth & Analytics
            </h1>
            <p className="text-sky-100 text-xs md:text-sm font-medium">
              Manage your professional feedback and performance metrics in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-12">
        
        {/* Responsive Tab Switcher */}
        {/* On mobile: full width grid or scrollable / On desktop: w-fit */}
        <div className="bg-white p-1.5 md:p-2 rounded-2xl shadow-xl shadow-sky-200/50 border border-sky-100 flex flex-row gap-1 md:gap-2 w-full md:w-fit mb-6 md:mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-bold transition-all duration-300 whitespace-nowrap flex-1 md:flex-none text-sm md:text-base ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-200'
                  : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-white' : 'text-sky-300'}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content Rendering */}
        <div className="pb-10 md:pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {tabs.find((t) => t.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}

export default EmployeePerformance;