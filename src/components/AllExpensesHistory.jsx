import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FaHistory, FaFileInvoiceDollar, FaUser, FaCalendarDay } from "react-icons/fa";

function AllExpensesHistory() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyExpenses();
    }, []);

    const getMyExpenses = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/acccountent/expence-create/`,
                TOCKEN_ONLY()
            );
            setExpenses(res.data);
        } catch (err) {
            alert("Error loading expenses");
        }
        setLoading(false);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500"></div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-sky-500 p-3 rounded-2xl shadow-lg shadow-sky-200">
                        <FaHistory className="text-white text-xl" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                            Expense History
                        </h2>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Archive Log</p>
                    </div>
                </div>
                
                {/* Quick Summary Badge */}
                <div className="bg-white border border-sky-100 px-5 py-2 rounded-2xl shadow-sm">
                    <span className="text-slate-400 text-xs font-bold block">Total Entries</span>
                    <span className="text-sky-600 font-black text-lg">{expenses.length}</span>
                </div>
            </div>

            <div className="space-y-4">
                {expenses.map((item) => (
                    <div
                        key={item.id}
                        className="group relative bg-white border border-slate-100 rounded-[2rem] p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 overflow-hidden"
                    >
                        {/* Decorative side accent based on status */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                            item.status === "APPROVED" ? "bg-emerald-500" : 
                            item.status === "REJECTED" ? "bg-rose-500" : "bg-amber-500"
                        }`} />

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-3 flex-1 w-full">
                                <div className="flex items-center justify-between md:justify-start gap-4">
                                    <h3 className="text-emerald-600 text-xl font-black tracking-tight">
                                        ₹ {item.amount}
                                    </h3>
                                    <span className={`px-4 py-1 text-[10px] font-black rounded-full uppercase tracking-tighter ${
                                        item.status === "APPROVED"
                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                            : item.status === "REJECTED"
                                                ? "bg-rose-50 text-rose-600 border border-rose-100"
                                                : "bg-amber-50 text-amber-600 border border-amber-100"
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 items-center text-slate-500 text-sm">
                                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg">
                                        <FaUser className="text-sky-400 size={12}" />
                                        <span className="font-bold text-slate-700">{item.user_name}</span>
                                        <span className="text-slate-400">#{item.user_employee_id}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                                        <FaCalendarDay size={14} />
                                        {new Date(item.created_at).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>

                                <p className="text-slate-600 text-sm italic border-l-2 border-sky-50 pl-4 py-1">
                                    "{item.description || "No description provided."}"
                                </p>
                            </div>
                            
                            {/* Visual cue icon */}
                            <div className="hidden md:block opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaFileInvoiceDollar size={48} className="text-sky-900" />
                            </div>
                        </div>
                    </div>
                ))}

                {expenses.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-sky-100">
                        <FaFileInvoiceDollar className="mx-auto text-sky-200 text-5xl mb-4" />
                        <p className="text-slate-400 font-bold">No Expenses Found in History</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllExpensesHistory;