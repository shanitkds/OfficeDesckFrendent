import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FiDollarSign, FiFileText, FiUploadCloud, FiChevronLeft, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

function ExpenseClimeRequest({ onSuccess, onCancel }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [billFile, setBillFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return toast.error("Please enter an amount");

    const formData = new FormData();
    formData.append("amount", amount);
    if (billFile) formData.append("bill_file", billFile);
    formData.append("description", description);

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/acccountent/expence-create/`, formData, TOCKEN_ONLY());
      toast.success("Claim submitted successfully");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.error || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* AMOUNT INPUT */}
        <div className="relative group">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">
            Reimbursement Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-lg font-bold text-slate-800"
            />
          </div>
        </div>

        {/* FILE UPLOAD BOX */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">
            Proof of Expense (Bill/Receipt)
          </label>
          <div className="relative group cursor-pointer">
            <input
              type="file"
              onChange={(e) => setBillFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
            />
            <div className={`border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center gap-2 ${
              billFile ? "border-indigo-500 bg-indigo-50/30" : "border-slate-200 bg-slate-50 group-hover:border-indigo-300"
            }`}>
              <FiUploadCloud className={billFile ? "text-indigo-600" : "text-slate-400"} size={24} />
              <span className="text-sm font-semibold text-slate-600 text-center line-clamp-1 px-4">
                {billFile ? billFile.name : "Tap to upload receipt"}
              </span>
              {!billFile && <span className="text-[10px] text-slate-400 font-medium">PNG, JPG or PDF</span>}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">
            Reason / Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the purpose of this expense..."
            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm font-medium text-slate-700 min-h-[100px] resize-none"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
          >
            <FiChevronLeft /> Back
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Submit Claim <FiSend size={14} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseClimeRequest;