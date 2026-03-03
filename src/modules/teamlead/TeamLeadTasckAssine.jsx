import React, { useState } from 'react'
import TaskAssine from '../../components/TaskAssine'
import TealeadTaskEmployeeView from './TealeadTaskEmployeeView'
import { FaPlusCircle, FaTasks } from 'react-icons/fa'

function TeamLeadTasckAssine() {
    const [activeTab, setActiveTab] = useState('assign');

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6 max-w-fit">
                <ul className="flex items-center gap-2 p-2">
                    <li 
                        onClick={() => setActiveTab('assign')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer font-bold transition-all text-sm uppercase tracking-wider ${
                            activeTab === 'assign' 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                    >
                        <FaPlusCircle /> <span>Assign Task</span>
                    </li>
                    <li 
                        onClick={() => setActiveTab('view')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer font-bold transition-all text-sm uppercase tracking-wider ${
                            activeTab === 'view' 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                    >
                        <FaTasks /> <span>Task View</span>
                    </li>
                </ul>
            </div>

           
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                {activeTab === 'assign' ? (
                    <div className="animate-fadeIn">
                        <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight border-b pb-4">
                            Assign New Task
                        </h2>
                        <TaskAssine />
                    </div>
                ) : (
                    <div className="animate-fadeIn">
                        <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight border-b pb-4">
                            Employee Task Overview
                        </h2>
                        <TealeadTaskEmployeeView />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TeamLeadTasckAssine