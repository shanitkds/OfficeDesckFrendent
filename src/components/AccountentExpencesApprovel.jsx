import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FaCheck, FaTimes, FaReceipt, FaUser, FaCalendarAlt } from "react-icons/fa";

function AccountentExpencesApprovel() {
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

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(
                `${BASE_URL}/api/acccountent/expence-action/${id}/`,
                { status: status },
                TOCKEN_ONLY()
            );
            alert(`Expense ${status.toLowerCase()} successfully`);
            getMyExpenses();
        } catch (err) {
            alert("Error updating expense");
        }
    };

    // ✅ ADD THIS HELPER (convert bill path to full URL)
    const getFileUrl = (path) => {
        if (!path) return null;
        return path.startsWith("http") ? path : `${BASE_URL}${path}`;
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-500">

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                        Expense Approval
                    </h2>
                    <p className="text-slate-500 font-medium">
                        Review and manage pending reimbursement requests
                    </p>
                </div>

                <div className="bg-sky-50 px-4 py-2 rounded-2xl border border-sky-100">
                    <span className="text-sky-600 font-bold">
                        {expenses.filter(item => item.status === "PENDING").length} Pending Requests
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {expenses
                    .filter(item => item.status !== "APPROVED")
                    .map((item) => (
                        <div key={item.id}
                            className="group border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all bg-white p-5 md:p-6">

                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-3 flex-1">

                                    <div className="flex items-center justify-between md:justify-start md:gap-4">
                                        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                            <span className="text-emerald-600 text-xl font-black">
                                                ₹ {item.amount}
                                            </span>
                                        </div>

                                        <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border
                                            ${item.status === "REJECTED"
                                                ? "bg-rose-50 text-rose-500 border-rose-100"
                                                : "bg-amber-50 text-amber-600 border-amber-100"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-700">
                                        <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                                            <FaUser size={14} />
                                        </div>
                                        <span className="font-bold text-sm">
                                            {item.user_name}
                                            <span className="text-slate-400 font-medium ml-2">
                                                #{item.user_employee_id}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {item.description || "No description provided."}
                                        </p>
                                    </div>

                                    {/* ✅ ADD BILL VIEW HERE */}
                                    {item.bill_file && (
                                        <div className="flex items-center gap-2 text-sky-600 text-sm font-bold">
                                            <FaReceipt />
                                            <a
                                                href={getFileUrl(item.bill_file)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline"
                                            >
                                                View Bill File
                                            </a>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium px-1">
                                        <FaCalendarAlt size={12} />
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                {item.status === "PENDING" && (
                                    <div className="flex md:flex-col gap-2 md:justify-center shrink-0">
                                        <button
                                            onClick={() => updateStatus(item.id, "APPROVED")}
                                            className="flex items-center justify-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-2xl font-bold"
                                        >
                                            <FaCheck /> Accept
                                        </button>

                                        <button
                                            onClick={() => updateStatus(item.id, "REJECTED")}
                                            className="flex items-center justify-center gap-2 bg-white border border-rose-100 text-rose-500 px-6 py-3 rounded-2xl font-bold"
                                        >
                                            <FaTimes /> Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default AccountentExpencesApprovel;