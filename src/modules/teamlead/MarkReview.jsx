import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";
import { FiUser, FiStar, FiCalendar, FiSend } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

function MarkReview() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [rating, setRating] = useState(1);
  const [date, setDate] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/team_lead/userslist/`, TOCKEN_ONLY())
      .then((res) => setEmployees(res.data))
      .catch(() => toast.error("Employee load failed")); 
  }, []);

  const submitReview = async () => {
    const loadingToast = toast.loading("Submitting evaluation..."); 
    try {
      await axios.post(
        `${BASE_URL}/api/team_lead/review/submit/`,
        {
          employee: employee,
          rating: rating,
          review_month: date,
        },
        TOCKEN_ONLY()
      );

      toast.success("Submitted successfully ✅", { id: loadingToast }); 

      setEmployee("");
      setRating(1);
      setDate("");

    } catch (err) {
      const errorMsg = err.response?.data?.error || "Submit failed ❌";
      toast.error(errorMsg, { id: loadingToast }); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="bg-white shadow-2xl shadow-blue-100 rounded-[2rem] border border-slate-100 overflow-hidden">
        
        <div className="bg-indigo-600 p-6 text-white">
          <h2 className="text-xl font-black flex items-center gap-2">
            <FiStar className="text-yellow-400" /> Employee Performance
          </h2>
          <p className="text-indigo-100 text-xs font-medium mt-1">Submit monthly evaluation for team members</p>
        </div>

        <div className="p-8 space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <FiUser /> Target Employee
            </label>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.user_id}>
                  {emp.name} — {emp.employeez_id}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
          
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <FiStar /> Score (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="1-5"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <FiCalendar /> Month
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <button
            onClick={submitReview}
            disabled={!employee || !date}
            className={`w-full p-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 
              ${(!employee || !date) 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
              }`}
          >
            <FiSend /> Submit Evaluation
          </button>
        </div>
      </div>
      
      <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-6">
        Internal Performance Record
      </p>
    </div>
  );
}

export default MarkReview;