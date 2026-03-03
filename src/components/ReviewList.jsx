import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FiCalendar, FiUser, FiStar, FiHash, FiInbox } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

function ReviewList() {
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7);

    const [month, setMonth] = useState(currentMonth);
    const [reviews, setReviews] = useState([]);
    const [allReviews, setAllReviews] = useState([]);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/team_lead/review/submit/`,
                TOCKEN_ONLY()
            );

            setAllReviews(res.data);
            filterMonth(res.data, month);
        } catch {
            toast.error("Failed to load reviews");
        }
    };

    const filterMonth = (data, selectedMonth) => {
        setMonth(selectedMonth);

        const filtered = data.filter((r) =>
            r.review_month.startsWith(selectedMonth)
        );

        setReviews(filtered);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6 font-sans">
            <Toaster position="top-right" />
            
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Employee Reviews</h2>
                    <p className="text-slate-500 text-sm font-medium">Monitoring team performance and feedback</p>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-500">
                        <FiCalendar />
                    </div>
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => filterMonth(allReviews, e.target.value)}
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                    />
                </div>
            </header>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <div className="flex items-center gap-2"><FiUser /> Name</div>
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <div className="flex items-center gap-2"><FiHash /> ID</div>
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <div className="flex items-center gap-2"><FiStar /> Rating</div>
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    Review Date
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {reviews.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-300">
                                            <FiInbox size={48} className="mb-2" />
                                            <p className="font-bold text-sm uppercase tracking-widest">No Reviews Found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                reviews.map((r) => (
                                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-700">{r.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase">
                                                {r.employee_id}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-black text-xs ${
                                                    r.rating >= 4 ? 'bg-emerald-100 text-emerald-600' : 
                                                    r.rating >= 3 ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                                                }`}>
                                                    {r.rating}
                                                </span>
                                                <div className="flex text-amber-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FiStar key={i} size={12} fill={i < r.rating ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-500 uppercase tracking-tighter">
                                                {r.review_month}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                    Performance Tracking System
                </p>
            </footer>
        </div>
    );
}

export default ReviewList;