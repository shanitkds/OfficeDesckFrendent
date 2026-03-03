import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { 
  FiSearch, FiFilter, FiDownload, FiRefreshCcw, 
  FiUser, FiCalendar, FiAward, FiBarChart2, FiTrendingUp 
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

function AllPerformenceView() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    month: "",
    year: "",
    employee_id: "",
    employee_name: "",
    team_lead_id: "",
    team_lead_name: "",
  });

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    const loadingToast = toast.loading("Fetching reports...");
    try {
      setLoading(true);
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );
      const params = new URLSearchParams(cleanFilters).toString();
      const res = await axios.get(
        `${BASE_URL}/api/performance/performance-reports/?${params}`,
        TOCKEN_ONLY()
      );
      setReports(res.data);
      toast.success("Reports loaded", { id: loadingToast });
    } catch (err) {
      const msg = err.response?.data?.error;
      if (msg && msg.toLowerCase().includes("no data")) {
        setReports([]);
        toast.error("No data found", { id: loadingToast });
      } else {
        toast.error(msg || "Error loading reports", { id: loadingToast });
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const loadingToast = toast.loading("Preparing PDF...");
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );
      const params = new URLSearchParams(cleanFilters).toString();
      const res = await axios.get(
        `${BASE_URL}/api/report/performance/pdf/?${params}`,
        {
          ...TOCKEN_ONLY(),
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "performance_report.pdf");
      document.body.appendChild(link);
      link.click();
      toast.success("Download started", { id: loadingToast });
    } catch (err) {
      toast.error("PDF download failed", { id: loadingToast });
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "month" && value) {
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      month: "",
      year: "",
      employee_id: "",
      employee_name: "",
      team_lead_id: "",
      team_lead_name: "",
    });
    getReports();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-12 font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <FiBarChart2 className="text-indigo-600" /> Performance Analytics
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Review and export cross-departmental performance metrics</p>
        </header>

        <section className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-2 mb-6 text-indigo-600 font-bold uppercase text-xs tracking-widest">
            <FiFilter /> Filter parameters
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-slate-400" />
              <input name="month" value={filters.month} placeholder="Month (e.g. February)" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" onChange={handleChange} />
            </div>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-slate-400" />
              <input name="year" value={filters.year} placeholder="Year" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" onChange={handleChange} />
            </div>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-slate-400" />
              <input name="employee_id" value={filters.employee_id} placeholder="Employee ID" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" onChange={handleChange} />
            </div>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-slate-400" />
              <input name="employee_name" value={filters.employee_name} placeholder="Employee Name" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" onChange={handleChange} />
            </div>
            <div className="relative">
              <FiAward className="absolute left-3 top-3 text-slate-400" />
              <input name="team_lead_id" value={filters.team_lead_id} placeholder="Team Lead ID" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" onChange={handleChange} />
            </div>
            <div className="relative">
              <FiAward className="absolute left-3 top-3 text-slate-400" />
              <input name="team_lead_name" value={filters.team_lead_name} placeholder="Team Lead Name" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" onChange={handleChange} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button onClick={getReports} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
              <FiSearch /> Apply Filter
            </button>
            <button onClick={downloadPDF} className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 active:scale-95">
              <FiDownload /> Export PDF
            </button>
            <button onClick={resetFilters} className="flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all active:scale-95">
              <FiRefreshCcw /> Reset
            </button>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-300">
            <FiBarChart2 size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Performance Data Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((item, index) => (
              <div key={index} className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-black text-slate-800 text-lg leading-tight">{item.employee_name}</h3>
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-tighter mt-1">{item.employee_id}</p>
                  </div>
                  <span className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest text-white shadow-sm
                    ${item.performance_level === "EXCELLENT" ? "bg-indigo-600" : 
                      item.performance_level === "GOOD" ? "bg-emerald-500" : 
                      item.performance_level === "AVERAGE" ? "bg-amber-500" : "bg-rose-500"}`}>
                    {item.performance_level}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl mb-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-3 flex items-center gap-2">
                    <FiAward className="text-indigo-500" /> Lead: {item.team_lead_name}
                  </p>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-black tracking-tighter">Period</p>
                      <p className="text-sm font-bold text-slate-700">{item.month} {item.year}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-black tracking-tighter">Attendance</p>
                      <p className="text-sm font-bold text-slate-700">{item.attendance_score}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-black tracking-tighter">Tasks</p>
                      <p className="text-sm font-bold text-slate-700">{item.task_score}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-black tracking-tighter">Review</p>
                      <p className="text-sm font-bold text-slate-700">{item.review_score}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-2">
                      <FiTrendingUp className="text-indigo-600" />
                      <span className="text-xs uppercase font-black text-slate-400 tracking-tighter">Final Score:</span>
                      <span className="text-xl font-black text-indigo-600">{item.final_score}</span>
                   </div>
                   <p className="text-[9px] font-bold text-slate-300 uppercase">
                     ID: {new Date(item.generated_at).getTime().toString().slice(-6)}
                   </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-20 text-center pb-10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Performance Management Ledger</p>
      </footer>
    </div>
  );
}

export default AllPerformenceView;