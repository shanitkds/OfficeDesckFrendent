import React, { useState } from 'react';
import FileShareView from '../../components/FileShareView';
import FileUpload from '../../components/FileUpload';
import FileView from '../../components/FileView';
import { FaFolderOpen, FaShareAlt, FaCloudUploadAlt, FaFileSignature } from 'react-icons/fa';

function EmployeeFileManage() {
    const [activeTab, setActiveTab] = useState('myFiles');

    const menuItems = [
        { id: 'myFiles', label: 'My Files', icon: <FaFolderOpen />, component: <FileView /> },
        { id: 'shared', label: 'Shared', icon: <FaShareAlt />, component: <FileShareView /> },
        { id: 'upload', label: 'Upload', icon: <FaCloudUploadAlt />, component: <FileUpload /> },
    ];

    return (
        <div className="min-h-screen bg-sky-50/30">
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 pt-8 pb-16 md:pt-10 md:pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-3 md:gap-4">
                    <div className="bg-white/20 p-2 md:p-3 rounded-xl md:rounded-2xl backdrop-blur-md border border-white/30 shrink-0">
                        <FaFileSignature className="text-white text-xl md:text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-3xl font-black text-white tracking-tight">
                            Document Center
                        </h1>
                        <p className="text-sky-100 text-xs md:text-sm font-medium opacity-90 line-clamp-1">
                            Personal storage and collaboration.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 md:-mt-10">
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="bg-white p-2 md:p-3 rounded-2xl md:rounded-[2rem] shadow-xl shadow-sky-200/40 border border-sky-100">
                            <ul className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 no-scrollbar">
                                {menuItems.map((item) => (
                                    <li key={item.id} className="shrink-0 lg:w-full">
                                        <button
                                            onClick={() => setActiveTab(item.id)}
                                            className={`flex items-center gap-2 md:gap-3 px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 text-sm md:text-base ${
                                                activeTab === item.id
                                                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-200'
                                                    : 'text-slate-500 hover:bg-sky-50 hover:text-sky-600'
                                            }`}
                                        >
                                            <span className={`text-base md:text-lg ${activeTab === item.id ? 'text-white' : 'text-sky-400'}`}>
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <div className="flex-1 bg-white rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-sky-200/20 border border-sky-100 overflow-hidden min-h-[400px] md:min-h-[500px]">
                        <div className="p-4 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            
                            <div className="mb-4 md:mb-6 flex items-center justify-between border-b border-sky-50 pb-3 md:pb-4">
                                <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">
                                    {menuItems.find(i => i.id === activeTab).label}
                                </h2>
                                <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-widest text-sky-400 bg-sky-50 px-3 py-1 rounded-full">
                                    Cloud Sync Active
                                </span>
                            </div>

                            <div className="mt-2 md:mt-4 overflow-x-auto">
                                {menuItems.find((item) => item.id === activeTab)?.component}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            <div className="h-10 md:h-20"></div>
        </div>
    );
}

export default EmployeeFileManage;