import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FiCalendar, FiSearch, FiDollarSign, FiDownload, FiUser, FiActivity } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

function AllPaimentViewList() {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [month, setMonth] = useState("2026-02");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPayments();
  }, [month]);

  useEffect(() => {
    const text = search.toLowerCase();
    setFiltered(
      payments.filter(
        (p) =>
          p.user_name?.toLowerCase().includes(text) ||
          p.user_employee_id?.toLowerCase().includes(text)
      )
    );
  }, [search, payments]);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/acccountent/payment-settings/?month=${month}`,
        TOCKEN_ONLY()
      );
      setPayments(res.data);
      setFiltered(res.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error loading payments");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const loadingToast = toast.loading("Preparing PDF report...");
    try {
      const res = await axios.get(
        `${BASE_URL}/api/report/payment/pdf/?month=${month}`,
        {
          ...TOCKEN_ONLY(),
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `payment_report_${month}.pdf`);
      document.body.appendChild(link);
      link.click();
      toast.success("Download started!", { id: loadingToast });
    } catch (err) {
      toast.error("PDF download failed", { id: loadingToast });
      console.log(err);
    }
  };

  return (
    <div className="p-4 md:p-10 bg-slate-50/50 min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                <FiDollarSign size={28} />
              </div>
              Payment Settings
            </h1>
            <p className="text-slate-500 font-medium mt-2 ml-1">Review and manage payroll disbursements for the selected period.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Month Picker */}
            <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
              <FiCalendar className="text-slate-400" />
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="outline-none text-sm font-bold text-slate-700 bg-transparent cursor-pointer"
              />
            </div>

            {/* Download Button */}
            <button
              onClick={downloadPDF}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-green-600 text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-slate-200 active:scale-95"
            >
              <FiDownload size={18} /> Download PDF
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-8 relative group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input
            placeholder="Search by employee name or ID..."
            className="w-full bg-white border border-slate-200 pl-14 pr-6 py-5 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all font-medium text-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Main Content Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Syncing Records...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <div className="inline-flex p-5 bg-slate-50 rounded-full mb-4 text-slate-300">
                <FiActivity size={40} />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">No payment history found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Employee</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Emp ID</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Salary</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Expenses</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Amount</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                            <FiUser size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm whitespace-nowrap">{p.user_name}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{p.month}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-lg">
                          {p.user_employee_id}
                        </span>
                      </td>
                      <td className="p-6 font-semibold text-slate-700 tabular-nums">₹{p.salary_amount}</td>
                      <td className="p-6 font-semibold text-slate-500 tabular-nums">₹{p.expense_amount}</td>
                      <td className="p-6 font-black text-slate-900 tabular-nums text-lg">
                        ₹{p.total_amount}
                      </td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          p.status === "PAID" 
                          ? "bg-emerald-100 text-emerald-600 border border-emerald-200" 
                          : "bg-rose-100 text-rose-600 border border-rose-200"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-16 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] opacity-50">Payroll Management System v2.0</p>
      </footer>
    </div>
  );
}

export default AllPaimentViewList;