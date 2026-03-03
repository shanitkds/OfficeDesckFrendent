import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import toast, { Toaster } from "react-hot-toast"; // ⭐ Import toast

function AttentanceRequestView() {
  const [requests, setRequests] = useState([]);
  const [dayType, setDayType] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/attendance/attentance-request/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to fetch requests"); // ⭐ Toast error
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    if (action === "APPROVE" && !dayType[id]) {
      toast.error("Please select a day type before approving."); // ⭐ Toast error
      return;
    }

    // ⭐ Using toast.promise for better UX during async calls
    const actionPromise = axios.patch(
      `${BASE_URL}/api/attendance/attentance-requestaction/${id}/`,
      {
        action,
        day_type: dayType[id] || null,
      },
      TOCKEN_ONLY()
    );

    toast.promise(actionPromise, {
      loading: `Processing ${action.toLowerCase()}...`,
      success: () => {
        fetchRequests();
        return `Request ${action.toLowerCase()}ed successfully ✅`;
      },
      error: (err) => err.response?.data?.error || "Action failed ❌",
    });
  };

  const displayRequests = showAll ? requests : requests.slice(0, 5);

  return (
    <div className=" p-4 md:p-8 w-full ">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-white border-b px-6 py-5 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-gray-800">
            Attendance Requests
            <span className="ml-3 text-sm font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {requests.length} Total
            </span>
          </h2>
          <button 
            onClick={fetchRequests}
            className="text-gray-500 hover:text-blue-600 transition flex items-center gap-2"
          >
            <span>Refresh</span>
            <span>🔄</span>
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
              <p>Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg italic">No pending requests found.</p>
            </div>
          ) : (
            <>
              {/* Responsive Table Wrapper */}
              <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">Employee</th>
                      <th className="p-4 font-semibold text-gray-600">Details</th>
                      <th className="p-4 font-semibold text-gray-600">Reason</th>
                      <th className="p-4 font-semibold text-gray-600">Type Selection</th>
                      <th className="p-4 font-semibold text-gray-600">Status</th>
                      <th className="p-4 font-semibold text-gray-600 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {displayRequests.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50 transition">
                        <td className="p-4">
                          <div className="font-bold text-gray-800">{r.name}</div>
                          <div className="text-xs text-gray-400">{r.email}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          <span className="block font-medium">{r.attendance_date}</span>
                        </td>
                        <td className="p-4 text-sm text-gray-500 italic max-w-xs">
                          "{r.reason}"
                        </td>

                        <td className="p-4">
                          {r.status === "PENDING" ? (
                            <select
                              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full bg-white"
                              onChange={(e) =>
                                setDayType({
                                  ...dayType,
                                  [r.id]: e.target.value,
                                })
                              }
                              value={dayType[r.id] || ""}
                            >
                              <option value="">Select Type</option>
                              <option value="FULL_DAY">Full Day</option>
                              <option value="HALF_DAY">Half Day</option>
                              <option value="ABSENT">Absent</option>
                            </select>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>

                        <td className="p-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            r.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                            r.status === "APPROVED" ? "bg-green-100 text-green-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {r.status}
                          </span>
                        </td>

                        <td className="p-4">
                          {r.status === "PENDING" ? (
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleAction(r.id, "APPROVE")}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleAction(r.id, "REJECT")}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <div className="text-center text-gray-400 text-sm font-medium">Processed</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* View All Toggle */}
              {requests.length > 5 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full font-bold transition-all shadow-sm active:scale-95"
                  >
                    {showAll ? "Show Fewer Requests" : `View All ${requests.length} Requests`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttentanceRequestView;