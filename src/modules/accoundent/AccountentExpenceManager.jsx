import React, { useState } from 'react'
import AccountentExpencesApprovel from '../../components/AccountentExpencesApprovel'
import AllExpensesHistory from '../../components/AllExpensesHistory'
import ExpenseClimeRequest from '../../components/ExpenseClimeRequest'
import { FaCheckDouble, FaHistory, FaPlusCircle, FaWallet } from 'react-icons/fa'

function AccountentExpenceManager() {
    const [activeTab, setActiveTab] = useState('approval');

    const menuItems = [
        { 
            id: 'approval', 
            label: 'Pending Approvals', 
            icon: <FaCheckDouble />, 
            component: <AccountentExpencesApprovel /> 
        },
        { 
            id: 'history', 
            label: 'Expense History', 
            icon: <FaHistory />, 
            component: <AllExpensesHistory /> 
        },
        { 
            id: 'request', 
            label: 'New Claim', 
            icon: <FaPlusCircle />, 
            component: <ExpenseClimeRequest /> 
        },
    ];

    return (
        <div className="min-h-screen bg-sky-50/30">
            <div className="bg-gradient-to-r from-sky-600 to-blue-700 pt-10 pb-24 px-4 md:px-8 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30 shrink-0">
                        <FaWallet className="text-white text-2xl md:text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                            Finance Hub
                        </h1>
                        <p className="text-sky-100 text-sm font-medium opacity-90">
                            Monitor reimbursements, approve staff expenses, and track financial history.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12">
                <div className="flex flex-col gap-6">
                    
                    <div className="bg-white p-2 rounded-3xl shadow-xl shadow-sky-200/40 border border-sky-100 flex overflow-x-auto no-scrollbar gap-2 max-w-fit">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 whitespace-nowrap ${
                                    activeTab === item.id
                                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 translate-y-[-2px]'
                                        : 'text-slate-500 hover:bg-sky-50 hover:text-sky-600'
                                }`}
                            >
                                <span className={`text-lg ${activeTab === item.id ? 'text-white' : 'text-sky-400'}`}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-sky-200/20 border border-sky-100 overflow-hidden min-h-[600px] mb-10">
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {menuItems.find((item) => item.id === activeTab)?.component}
                        </div>
                    </div>

                </div>
            </div>

            <div className="h-10"></div>
        </div>
    )
}

export default AccountentExpenceManager