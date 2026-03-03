import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import ExpenseClimeRequest from "./ExpenseClimeRequest";
import { FiPlus, FiClock, FiCheckCircle, FiXCircle, FiCreditCard, FiCalendar, FiMessageSquare } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

function MyExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    getMyExpenses();
  }, []);

  const getMyExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/acccountent/expence-create/?type=my`,
        TOCKEN_ONLY()
      );
      setExpenses(res.data);
    } catch (err) {
      toast.error("Error loading expenses");
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLER TO CLOSE MODAL AND REFRESH DATA
  const handleSuccess = () => {
    setShowAdd(false);
    getMyExpenses(); // Refresh list after adding
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10 lg:p-12 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <FiCreditCard className="text-indigo-600" /> My Expenses
            </h2>
            <p className="text-slate-500 font-medium mt-1">Manage and track your reimbursement claims</p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <FiPlus strokeWidth={3} /> Add New Claim
          </button>
        </div>

        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl mx-4">
              <ExpenseClimeRequest
                onSuccess={handleSuccess}
                onCancel={() => setShowAdd(false)}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="flex flex-col items-center py-20 text-slate-300">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
              <p className="font-bold text-xs uppercase tracking-widest">Loading History...</p>
            </div>
          ) : expenses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
              <FiCreditCard size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Claims Found</p>
            </div>
          ) : (
            expenses.map((item, index) => (
              <div
                key={index}
                className="group bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.status === "APPROVED" ? "bg-emerald-50 text-emerald-600" :
                      item.status === "REJECTED" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                    }`}>
                    {item.status === "APPROVED" ? <FiCheckCircle size={28} /> :
                      item.status === "REJECTED" ? <FiXCircle size={28} /> : <FiClock size={28} />}
                  </div>

                  <div>
                    <div className="text-2xl font-black text-slate-800 tracking-tight">
                      ₹{Number(item.amount).toLocaleString()}
                    </div>
                    <p className="text-slate-500 font-medium text-sm line-clamp-1">{item.description}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block shadow-sm ${item.status === "APPROVED" ? "bg-emerald-500 text-white" :
                      item.status === "REJECTED" ? "bg-rose-500 text-white" : "bg-amber-400 text-white"
                    }`}>
                    {item.status}
                  </span>

                  <div className="flex items-center gap-4 mt-1 text-slate-400">
                    {item.accountant_remark && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                        <FiMessageSquare size={14} /> Remarked
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-tighter">
                      <FiCalendar /> {new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="mt-16 text-center opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Corporate Expense Ledger</p>
        </footer>
      </div>
    </div>
  );
}

export default MyExpenses;