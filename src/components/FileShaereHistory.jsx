import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { 
  FaHistory, FaUser, FaFileAlt, FaCalendarAlt, 
  FaArrowRight, FaExchangeAlt, FaInbox, FaSearch 
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function FileShaereHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/encryptfile/share-history/`,
        TOCKEN_ONLY()
      );
      setHistory(res.data);
    } catch (err) {
      toast.error("Failed to sync share logs");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(h => 
    h.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.shared_to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <FaHistory size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Audit Logs</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">
              Secure Share History & Tracking
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
          <input 
            type="text"
            placeholder="Search by file or user..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />)}
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <FaInbox className="text-slate-200 mb-4" size={60} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No activity recorded</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredHistory.map((h) => (
            <div
              key={h.id}
              className="group relative bg-white border border-slate-100 p-5 sm:p-6 rounded-[2rem] hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                
                <div className="flex items-center gap-4 lg:w-1/3">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <FaFileAlt size={20} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Target Resource</span>
                    <h4 className="font-bold text-slate-800 truncate text-base">
                      {h.file_name}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-between sm:justify-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                  <div className="text-center sm:text-right flex-1">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-tighter mb-1">From Sender</p>
                    <p className="text-sm font-bold text-slate-700">{h.shared_from}</p>
                    <span className="text-[10px] text-slate-400 font-medium">ID: {h.shared_from_id}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 px-4">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-500 shadow-sm">
                      <FaArrowRight className="hidden sm:block" />
                      <FaExchangeAlt className="sm:hidden" />
                    </div>
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter mb-1">To Recipient</p>
                    <p className="text-sm font-bold text-slate-700">{h.shared_to}</p>
                    <span className="text-[10px] text-slate-400 font-medium">ID: {h.shared_to_id}</span>
                  </div>
                </div>

                <div className="lg:w-1/4 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FaCalendarAlt size={12} className="text-indigo-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1 text-right">Timestamp</span>
                      <span className="text-xs font-bold text-slate-600 tracking-tight">
                        {new Date(h.shared_at).toLocaleDateString()} at {new Date(h.shared_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="hidden lg:block absolute -left-[11px] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-indigo-100 rounded-full group-hover:border-indigo-500 transition-colors shadow-sm" />
            </div>
          ))}
        </div>
      )}
      
      <div className="hidden lg:block fixed left-[calc(1rem+1.5rem)] top-0 bottom-0 w-px bg-slate-100 -z-10 mt-20" />
    </div>
  );
}

export default FileShaereHistory;