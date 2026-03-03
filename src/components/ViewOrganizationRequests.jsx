import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import toast, { Toaster } from "react-hot-toast";
import { 
  FiCheckCircle, 
  FiXCircle, 
  FiEye, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFileText, 
  FiUser, 
  FiInfo,
  FiAlertCircle
} from "react-icons/fi";

function ViewOrganizationRequests() {
  const [requests, setRequests] = useState([]);
  const [note, setNote] = useState({});
  const [selected, setSelected] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/organisation/org-request/list/`,
        TOCKEN_ONLY()
      );
      setRequests(res.data);
    } catch (err) {
      toast.error("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    const loadingToast = toast.loading("Processing approval...");
    try {
      await axios.post(
        `${BASE_URL}/api/organisation/org-request/status/${id}/`,
        { status: "APPROVED" },
        TOCKEN_ONLY()
      );
      toast.success("Organization Approved Successfully!", { id: loadingToast });
      setRequests(requests.filter((item) => item.id !== id));
      setSelected(null);
    } catch {
      toast.error("Approval failed. Please try again.", { id: loadingToast });
    }
  };

  const rejectRequest = async (id) => {
    if (!note[id]) {
      toast("Please provide a reason for rejection in the note field.", {
        icon: '⚠️',
      });
      return;
    }

    const loadingToast = toast.loading("Processing rejection...");
    try {
      await axios.post(
        `${BASE_URL}/api/organisation/org-request/status/${id}/`,
        { status: "REJECTED", reason: note[id] || "" },
        TOCKEN_ONLY()
      );
      toast.success("Request Rejected", { id: loadingToast });
      setRequests(requests.filter((item) => item.id !== id));
      setSelected(null);
    } catch {
      toast.error("Rejection failed.", { id: loadingToast });
    }
  };

  return (
    <div className="p-10 bg-slate-100 min-h-screen font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 m-0">Super Admin Panel</h1>
            <p className="mt-1 text-slate-500">Manage organization onboarding and documentation</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-blue-600 font-bold border border-slate-100">
            Pending: {requests.length}
          </div>
        </header>

        {/* Empty State */}
        {requests.length === 0 ? (
          <div className="text-center py-24 px-5 bg-white rounded-[20px] border-2 border-dashed border-slate-200 text-slate-400">
            <FiCheckCircle size={60} className="mb-5 mx-auto text-emerald-500" />
            <h3 className="text-slate-800 text-xl font-bold mb-2">Queue is Clear</h3>
            <p>No new organization requests to review at this time.</p>
          </div>
        ) : (
          /* Grid List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div key={req.id} className="bg-white p-6 rounded-[20px] shadow-sm border border-white hover:shadow-md transition-all flex flex-col">
                <div className="mb-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{req.org_name}</h3>
                    <span className="text-[10px] px-2 py-1 bg-slate-100 rounded-md text-slate-500 uppercase font-bold tracking-wider">ID: {req.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-3">
                    <FiMail size={14} /> {req.org_email}
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelected(req)}
                  className="mt-auto flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl cursor-pointer font-bold hover:bg-blue-700 transition-colors"
                >
                  <FiEye /> Review Documents
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal Overlay */}
        {selected && (
          <div className="fixed inset-0 w-full h-full bg-slate-900/80 flex justify-center items-center z-[1000] backdrop-blur-md p-5 animate-in fade-in duration-300">
            <div className="bg-white p-8 md:p-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[30px] relative shadow-2xl animate-in zoom-in duration-300">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900">Verification Desk</h2>
                <button 
                  onClick={() => setSelected(null)} 
                  className="bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <FiXCircle size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <section>
                  <h4 className="flex items-center gap-2 text-blue-600 mb-5 text-xs font-black uppercase tracking-widest">
                    <FiInfo /> Company Info
                  </h4>
                  <div className="grid gap-4">
                    <DetailItem icon={<FiFileText />} label="Entity Name" value={selected.org_name} />
                    <DetailItem icon={<FiMapPin />} label="Address" value={selected.org_address} />
                    <DetailItem icon={<FiAlertCircle />} label="Reg Number" value={selected.registration_number} />
                    <DetailItem icon={<FiPhone />} label="Contact" value={selected.org_phone} />
                  </div>
                </section>

                <section>
                  <h4 className="flex items-center gap-2 text-blue-600 mb-5 text-xs font-black uppercase tracking-widest">
                    <FiUser /> Admin Profile
                  </h4>
                  <div className="bg-slate-50 p-5 rounded-[20px] border border-slate-200">
                    {selected.admin_photo && (
                      <img 
                        src={`${BASE_URL}${selected.admin_photo}`} 
                        alt="Admin" 
                        className="w-20 h-20 rounded-2xl object-cover mb-4 border-4 border-white shadow-sm"
                      />
                    )}
                    <div className="font-bold text-slate-800">{selected.admin_name}</div>
                    <div className="text-slate-500 text-sm mt-1">{selected.admin_email}</div>
                  </div>
                </section>
              </div>

              {/* Documents */}
              <div className="mt-8 p-6 bg-slate-100 rounded-[20px]">
                <h4 className="text-sm font-bold text-slate-700 mb-4">Legal Documents</h4>
                <div className="flex flex-wrap gap-4">
                  {selected.registration_doc && (
                    <DocumentLink href={`${BASE_URL}${selected.registration_doc}`} label="Registration Certificate" />
                  )}
                  {selected.admin_id_proof && (
                    <DocumentLink href={`${BASE_URL}${selected.admin_id_proof}`} label="Identity Proof" />
                  )}
                </div>
              </div>

              {/* Textarea */}
              <div className="mt-8">
                <label className="block mb-2 font-bold text-slate-600 text-sm">Decision Remarks</label>
                <textarea
                  placeholder="Explain rejection reason here..."
                  value={note[selected.id] || ""}
                  onChange={(e) => setNote({ ...note, [selected.id]: e.target.value })}
                  className="w-full h-24 p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => approveRequest(selected.id)} 
                  className="flex-[2] flex items-center justify-center gap-2 bg-emerald-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-600 active:scale-95 transition-all"
                >
                  <FiCheckCircle size={20} /> Approve Entry
                </button>
                <button 
                  onClick={() => rejectRequest(selected.id)} 
                  className="flex-1 flex items-center justify-center gap-2 bg-rose-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-rose-600 active:scale-95 transition-all"
                >
                  <FiXCircle size={20} /> Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-slate-400">{icon}</div>
    <div>
      <div className="text-[10px] text-slate-400 uppercase font-black tracking-tighter leading-none">{label}</div>
      <div className="text-sm text-slate-700 font-bold mt-1">{value}</div>
    </div>
  </div>
);

const DocumentLink = ({ href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer" 
    className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-blue-600 no-underline text-xs font-bold border border-slate-200 hover:bg-blue-50 transition-colors"
  >
    <FiFileText /> {label}
  </a>
);

export default ViewOrganizationRequests;