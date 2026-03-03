import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaUserTie, FaChartLine, FaSearch, FaTrophy } from "react-icons/fa";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";
import toast, { Toaster } from "react-hot-toast";

function EmployeePerformanceList() {
  // 👉 Get last month automatically
  const today = new Date();
  today.setMonth(today.getMonth() - 1);
  const defaultMonth = today.toLocaleString("default", { month: "long" });
  const defaultYear = today.getFullYear();

  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReports(defaultMonth, defaultYear);
  }, []);

  const getReports = async (m = month, y = year) => {
    const fetchToast = toast.loading(`Fetching reports for ${m}...`);
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/performance/performance-reports/?month=${m}&year=${y}`,
        TOCKEN_ONLY()
      );
      setReports(res.data);
      toast.success("Reports updated", { id: fetchToast });
    } catch (err) {
      console.log(err.response?.data);
      setReports([]);
      toast.error("Failed to fetch reports", { id: fetchToast });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (level) => {
    switch (level) {
      case "EXCELLENT": return "bg-indigo-600 shadow-indigo-100";
      case "GOOD": return "bg-emerald-500 shadow-emerald-100";
      case "AVERAGE": return "bg-amber-500 shadow-amber-100";
      default: return "bg-rose-500 shadow-rose-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] p-4 md:p-10 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <FaChartLine className="text-blue-600" /> 
              Performance Analytics
            </h2>
            <p className="text-slate-500 font-medium mt-1">Monitor and analyze employee productivity metrics.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-transparent font-bold text-slate-700 px-4 py-2 outline-none cursor-pointer hover:text-blue-600 transition-colors"
            >
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-transparent font-bold text-slate-700 w-20 outline-none text-center"
              placeholder="Year"
            />

            <button
              onClick={() => getReports()}
              disabled={loading}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50"
            >
              <FaSearch className="text-sm" /> View
            </button>
          </div>
        </div>

        {/* Loading / Empty States */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-100 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 p-20 rounded-[2.5rem] text-center shadow-sm">
             <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 text-2xl">
                <FaCalendarAlt />
             </div>
             <h3 className="text-slate-800 font-bold text-xl">No records found</h3>
             <p className="text-slate-400 mt-1 font-medium">Try selecting a different month or year to view data.</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Employee Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3.5 rounded-2xl text-white shadow-lg shadow-blue-100">
                      <FaUserTie className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 leading-tight">
                        {item.employee_name}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        ID: {item.employee_id}
                      </p>
                    </div>
                  </div>
                  {item.performance_level === "EXCELLENT" && (
                    <FaTrophy className="text-amber-400 text-xl animate-bounce" />
                  )}
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-3">Lead Supervisor</p>
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 border border-white shadow-sm"></div>
                      <span className="text-sm font-bold text-slate-700">{item.team_lead_name}</span>
                   </div>
                </div>

                {/* Score Indicators */}
                <div className="space-y-4 mb-6">
                  <ScoreBar label="Attendance" value={item.attendance_score} color="bg-blue-400" />
                  <ScoreBar label="Task Completion" value={item.task_score} color="bg-indigo-400" />
                  <ScoreBar label="Review Score" value={item.review_score} color="bg-purple-400" />
                </div>

                {/* Final Score Section */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Final Performance</p>
                      <span className={`px-4 py-1.5 rounded-full text-[11px] font-black text-white shadow-md ${getStatusColor(item.performance_level)}`}>
                        {item.performance_level}
                      </span>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Aggregate</p>
                      <span className="text-2xl font-black text-slate-900 leading-none">
                        {item.final_score}
                      </span>
                   </div>
                </div>

                {/* Timestamp */}
                <div className="mt-6 flex items-center justify-between text-[10px] text-slate-400 font-bold border-t border-slate-50 pt-4">
                   <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-blue-400" /> {item.month} {item.year}
                   </span>
                   <span className="italic opacity-60">Sync: {new Date(item.generated_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component for Score Bars
const ScoreBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-[11px] font-bold mb-1.5 uppercase tracking-wide">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-800">{value}/100</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

export default EmployeePerformanceList;