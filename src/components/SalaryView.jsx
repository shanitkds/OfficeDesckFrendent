import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FiSearch, FiDollarSign, FiPlus, FiUser, FiArrowUpRight, FiMinusCircle } from "react-icons/fi";
import SalaryAdd from "./SalaryAdd";
import toast from "react-hot-toast";

function SalaryView() {
  const [salaries, setSalaries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    loadSalary();
  }, []);

  const loadSalary = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/acccountent/salary-view/`,
        TOCKEN_ONLY()
      );
      setSalaries(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("Failed to fetch salary records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const text = search.toLowerCase();
    setFiltered(
      salaries.filter(
        (s) =>
          s.user_name?.toLowerCase().includes(text) ||
          s.user_employee_id?.toLowerCase().includes(text)
      )
    );
  }, [search, salaries]);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                <FiDollarSign size={28} />
              </div>
              Salary Management
            </h1>
            <p className="text-slate-500 font-medium mt-2 ml-1">Configure and review employee payroll structures</p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-4 rounded-[1.5rem] font-bold transition-all shadow-lg shadow-slate-200 active:scale-95"
          >
            <FiPlus size={20} /> Create / Update Salary
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8 relative group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input
            placeholder="Search by employee name or ID..."
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
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Fetching Records...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em]">No salary records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee Details</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Basic (Monthly)</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Benefits (HRA/ALW)</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Deductions</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Net Structure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((s) => (
                    <tr key={s.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                            <FiUser size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{s.user_name}</p>
                            <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-tighter">{s.user_employee_id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 font-black text-slate-700 tabular-nums">
                        ₹{parseFloat(s.basic_salary).toLocaleString()}
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center gap-2">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black" title="HRA">HRA: {s.hra}</span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black" title="Allowance">ALW: {s.allowance}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-1 text-rose-500 font-bold tabular-nums">
                          <FiMinusCircle size={14} /> ₹{s.deduction}
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <button className="p-2 text-slate-300 group-hover:text-indigo-500 transition-colors">
                          <FiArrowUpRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* MODAL OVERLAY */}
        {showAdd && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8">
                <SalaryAdd
                  onClose={() => {
                    setShowAdd(false);
                    loadSalary();
                  }}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default SalaryView;