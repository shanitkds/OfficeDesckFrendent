import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FiSearch, FiZap, FiUser, FiCalendar, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";

function PerformenceGenarater() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!month || !year) {
      toast.error("Please enter both month and year");
      return;
    }

    try {
      setLoading(true);
      
      await axios.post(
        `${BASE_URL}/api/performance/emplyee-performance/`,
        { month, year },
        TOCKEN_ONLY()
      );

      const res = await axios.get(
        `${BASE_URL}/api/performance/performance-reports/?month=${month}&year=${year}`,
        TOCKEN_ONLY()
      );

      setReports(res.data);
      toast.success(`Performance generated for ${month} ${year}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Error generating performance");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getLevelStyle = (level) => {
    const base = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ";
    if (level?.toLowerCase().includes("high") || level?.toLowerCase().includes("excellent")) 
      return base + "bg-emerald-100 text-emerald-700";
    if (level?.toLowerCase().includes("average")) 
      return base + "bg-amber-100 text-amber-700";
    return base + "bg-slate-100 text-slate-600";
  };

  return (
    <div className="space-y-10">
      <div className="max-w-3xl">
        <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <FiZap className="text-indigo-500" /> Run Monthly Analysis
        </h2>
        
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Month</label>
            <input
              placeholder="e.g. February"
              className="w-full bg-white border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Year</label>
            <input
              placeholder="e.g. 2026"
              className="w-full bg-white border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Calculate Scores <FiSearch size={16}/></>
            )}
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
             Results <span className="text-sm font-medium text-slate-400 ml-2">({reports.length})</span>
          </h3>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Data Generated Yet</p>
          </div>
        ) : (
          <div className="overflow-hidden bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Lead</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Scores (A/T/R)</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Score</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {reports.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold text-xs">
                            {item.employee_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 text-sm">{item.employee_name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: {item.employee_id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm font-medium text-slate-500">
                        {item.team_lead_name}
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-2">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold" title="Attendance">{item.attendance_score}</span>
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-[10px] font-bold" title="Task">{item.task_score}</span>
                          <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-bold" title="Review">{item.review_score}</span>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <span className="text-lg font-black text-indigo-600 tabular-nums">
                          {item.final_score}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className={getLevelStyle(item.performance_level)}>
                          {item.performance_level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerformenceGenarater;