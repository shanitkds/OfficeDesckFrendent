import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaCheck, FaTimes, FaEye, FaInbox, FaSpinner } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";

function OrgAdminUserRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/hr/user-creation-request/`,
        TOCKEN_ONLY()
      );
      setRequests(res.data || []);
    } catch {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    const t = toast.loading("Updating...");
    try {
      await axios.patch(
        `${BASE_URL}/api/hr/user-creation-request/${id}/`,
        { status },
        TOCKEN_ONLY()
      );
      toast.success(`Request ${status.toLowerCase()} ✅`, { id: t });
      loadRequests();
    } catch {
      toast.error("Update failed ❌", { id: t });
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200";
      case "APPROVED": return "bg-green-100 text-green-700 ring-1 ring-green-200";
      case "REJECTED": return "bg-red-100 text-red-700 ring-1 ring-red-200";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Employee Creation Requests
          </h2>
          <p className="text-slate-500 text-sm">Review and manage pending HR user requests</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-bold text-blue-600">
          Total: {requests.length}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-slate-500 font-medium">Fetching requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
          <div className="bg-slate-100 p-6 rounded-full mb-4">
            <FaInbox className="text-5xl text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">No Requests Available</h3>
          <p className="text-slate-500 max-w-xs text-center mt-2">
            There are currently no employee creation requests from HR to review.
          </p>
          <button 
            onClick={loadRequests}
            className="mt-6 text-blue-600 font-bold hover:underline"
          >
            Refresh Dashboard
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <FaUser className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 truncate max-w-[150px]">{req.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusStyle(req.status)}`}>
                  {req.status}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs text-slate-500 flex justify-between">
                  <span>Email:</span> <span className="text-slate-800 font-medium">{req.email}</span>
                </p>
                <p className="text-xs text-slate-500 flex justify-between">
                  <span>Role:</span> <span className="text-slate-800 font-medium">{req.user_type}</span>
                </p>
                <p className="text-xs text-slate-500 flex justify-between">
                  <span>HR:</span> <span className="text-slate-800 font-medium">{req.hr_name}</span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(req)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 font-bold text-sm transition-colors"
                >
                  <FaEye /> Details
                </button>

                {req.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => updateStatus(req.id, "APPROVED")}
                      className="bg-green-600 text-white px-4 py-2.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, "REJECTED")}
                      className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-100 transition-all"
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <h3 className="text-2xl font-black text-slate-800 mb-6">Request Details</h3>

            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-6 rounded-2xl mb-6">
              <div>
                <p className="text-slate-400 font-bold text-[10px] uppercase">Employee Name</p>
                <p className="text-slate-800 font-bold">{selected.name}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold text-[10px] uppercase">Requested By (HR)</p>
                <p className="text-slate-800 font-bold">{selected.hr_name}</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Email Address</p>
                <p className="text-slate-800 font-bold">{selected.email}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold text-[10px] uppercase">Department</p>
                <p className="text-slate-800 font-bold">{selected.department}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold text-[10px] uppercase">Designation</p>
                <p className="text-slate-800 font-bold">{selected.designation}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold text-[10px] uppercase">Attendance</p>
                <p className="text-slate-800 font-bold">{selected.attendance_mode}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold text-[10px] uppercase">Status</p>
                <p className="text-slate-800 font-bold">{selected.status}</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              {selected.photo && (
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Photo</p>
                  <img
                    src={`${BASE_URL}${selected.photo}`}
                    alt="profile"
                    className="w-20 h-20 object-cover rounded-xl ring-2 ring-slate-100"
                  />
                </div>
              )}
              {selected.id_proof && (
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Documents</p>
                  <a
                    href={`${BASE_URL}${selected.id_proof}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors"
                  >
                    View ID Proof Document
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrgAdminUserRequests;