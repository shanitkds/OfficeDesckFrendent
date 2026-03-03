import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaCalendarAlt, FaUser, FaQuoteLeft, FaSearch } from "react-icons/fa";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";
import toast, { Toaster } from "react-hot-toast";

function EmployeeReviewView() {
  // Logic to get the previous month (YYYY-MM)
  const getLastMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().slice(0, 7);
  };

  const [month, setMonth] = useState(getLastMonth());
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/team_lead/review/submit/`,
        TOCKEN_ONLY()
      );

      setAllReviews(res.data);
      // Filter using the default last month on initial load
      filterMonth(res.data, getLastMonth());
    } catch (err) {
      toast.error("Failed to load performance reviews");
    } finally {
      setLoading(false);
    }
  };

  const filterMonth = (data, selectedMonth) => {
    setMonth(selectedMonth);
    const filtered = data.filter((r) =>
      r.review_month.startsWith(selectedMonth)
    );
    setReviews(filtered);
  };

  // Helper to render star ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < rating ? "text-amber-400" : "text-gray-200"} />
    ));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Performance Insights
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Review your feedback and growth milestones.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Select Review Period</label>
            <div className="relative">
              <input
                type="month"
                value={month}
                onChange={(e) => filterMonth(allReviews, e.target.value)}
                className="appearance-none bg-white border border-slate-200 text-slate-700 py-3 px-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((n) => (
              <div key={n} className="h-64 bg-slate-100 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] shadow-sm border border-dashed border-slate-300">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
              <FaSearch className="text-slate-300 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No reviews found</h3>
            <p className="text-slate-500">There are no performance records for the selected month.</p>
          </div>
        ) : (
          /* Grid of Review Cards */
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="group bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:bg-blue-100 transition-colors"></div>

                <div className="relative">
                  {/* User Profile Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-slate-900 h-14 w-14 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-slate-200">
                      <FaUser />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-slate-800 tracking-tight">
                        {r.name}
                      </h3>
                      <div className="flex items-center gap-2">
                         <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md uppercase tracking-wider">
                           ID: {r.employee_id}
                         </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-4 mb-6 bg-slate-50 w-fit px-4 py-2 rounded-xl">
                    <div className="flex gap-1 text-sm">
                      {renderStars(r.rating)}
                    </div>
                    <div className="h-4 w-px bg-slate-200"></div>
                    <span className="font-black text-slate-700">{r.rating} / 5</span>
                  </div>

                  {/* Comment Section */}
                  <div className="relative mb-8">
                    <FaQuoteLeft className="text-slate-100 absolute -top-2 -left-3 text-4xl -z-0" />
                    <p className="text-slate-600 leading-relaxed relative z-10 italic">
                      {r.comment || "The reviewer did not provide a written comment for this period."}
                    </p>
                  </div>

                  {/* Footer Info */}
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-sm font-bold text-slate-400">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      {new Date(r.review_month).toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-300">Verified Review</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeReviewView;