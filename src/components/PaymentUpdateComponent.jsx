import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiCalendar, FiSearch, FiDollarSign, FiCheckCircle, FiUser, FiArrowRight } from "react-icons/fi";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import toast, { Toaster } from "react-hot-toast";

function PaymentUpdateComponent() {
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
      toast.error("Failed to sync payment data");
    } finally {
      setLoading(false);
    }
  };

  const updateSingle = async (id) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        <b className="text-sm">Mark this record as PAID?</b>
        <div className="flex gap-2">
          <button 
            className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold"
            onClick={async () => {
              toast.dismiss(t.id);
              processUpdateSingle(id);
            }}
          >
            Confirm
          </button>
          <button className="bg-slate-200 px-3 py-1 rounded-lg text-xs" onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </div>
      </span>
    ));
  };

  const processUpdateSingle = async (id) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/acccountent/payment-settings/`,
        { id: id, status: "PAID" },
        TOCKEN_ONLY()
      );
      toast.success("Payment marked as PAID");
      loadPayments();
    } catch {
      toast.error("Update failed");
    }
  };

  const updateFullMonth = async () => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        <b className="text-sm">Mark ALL payments for {month} as PAID?</b>
        <div className="flex gap-2">
          <button 
            className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold"
            onClick={async () => {
              toast.dismiss(t.id);
              processFullMonth();
            }}
          >
            Yes, Pay All
          </button>
          <button className="bg-slate-200 px-3 py-1 rounded-lg text-xs" onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </div>
      </span>
    ), { duration: 5000 });
  };

  const processFullMonth = async () => {
    const [year, mon] = month.split("-");
    try {
      await axios.patch(
        `${BASE_URL}/api/acccountent/payment-settings/`,
        { month: mon, year: year, status: "PAID" },
        TOCKEN_ONLY()
      );
      toast.success("Bulk update successful");
      loadPayments();
    } catch {
      toast.error("Bulk update failed");
    }
  };

  return (
    <div className="p-4 md:p-10 bg-slate-50/50 min-h-screen">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                <FiDollarSign size={28} />
              </div>
              Payment Update
            </h1>
            <p className="text-slate-500 font-medium mt-2 ml-1">Process and authorize monthly disbursements.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-3 bg-white shadow-sm">
              <FiCalendar className="text-slate-400" />
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="outline-none text-sm font-bold text-slate-700 bg-transparent"
              />
            </div>

            <button
              onClick={updateFullMonth}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 active:scale-95"
            >
              <FiCheckCircle size={18} /> Pay Full Month
            </button>
          </div>
        </header>

        {/* SEARCH BAR */}
        <div className="mb-8 relative group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input
            placeholder="Search employee or ID..."
            className="w-full bg-white border border-slate-200 pl-14 pr-6 py-5 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all font-medium text-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Records...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff Member</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Month</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Amount Due</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((p) => (
                    <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                            <FiUser size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm whitespace-nowrap">{p.user_name}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Verified User</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg inline-block mr-2">
                          {p.user_employee_id}
                        </div>
                        <span className="text-[10px] text-slate-400 font-black uppercase">{p.month}</span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="text-lg font-black text-emerald-600 tabular-nums">₹{p.total_amount}</span>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          p.status === "PAID" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-rose-100 text-rose-700"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        {p.status !== "PAID" ? (
                          <button
                            onClick={() => updateSingle(p.id)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-2 ml-auto"
                          >
                            Pay <FiArrowRight size={14} />
                          </button>
                        ) : (
                          <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em]">Authorized</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentUpdateComponent;