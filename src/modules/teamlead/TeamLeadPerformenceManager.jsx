import React, { useState } from 'react';
import MarkReview from './MarkReview';
import ReviewList from '../../components/ReviewList';
import AllPerformenceView from '../../components/AllPerformenceView';
import { FiEdit3, FiList, FiPieChart } from 'react-icons/fi';

function TeamLeadPerformenceManager() {
  const [activeTab, setActiveTab] = useState('submit');

  const tabs = [
    { id: 'submit', label: 'New Review', icon: <FiEdit3 /> },
    { id: 'history', label: 'Recent History', icon: <FiList /> },
    { id: 'analytics', label: 'Performance Analytics', icon: <FiPieChart /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-10">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Performance Manager</h1>
              <p className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em]">Team Leadership Suite</p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-2xl w-full md:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'submit' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MarkReview />
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ReviewList />
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AllPerformenceView />
            </div>
          )}
        </div>
      </main>

      <footer className="py-10 flex justify-center opacity-20">
        <div className="h-1 w-20 bg-slate-300 rounded-full"></div>
      </footer>
    </div>
  );
}

export default TeamLeadPerformenceManager;