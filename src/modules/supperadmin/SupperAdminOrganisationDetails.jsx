import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";
import toast, { Toaster } from "react-hot-toast";
import {
  MdBusiness,
  MdEmail,
  MdPhone,
  MdPerson,
  MdBadge,
  MdClose,
  MdVisibility,
  MdCalendarToday,
  MdLayers,
  MdFingerprint,
  MdSearch
} from "react-icons/md";

function SupperAdminOrganisationDetails() {
  const { id } = useParams();

  const [org, setOrg] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchOrgDetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/supperadmin/organisationslist/?org=${id}`, TOCKEN_ONLY());
      setOrg(res.data);
    } catch (err) {
      toast.error("Failed to load organisation");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/supperadmin/userslist/?org=${id}`, TOCKEN_ONLY());
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrgDetails();
    fetchUsers();
  }, [id]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading secure portal...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6 lg:p-10 font-sans">
      <Toaster position="top-right" />

      {/* ================= ORGANISATION CARD ================= */}
      {org && (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-10 shadow-sm border border-slate-100 mb-6 sm:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex p-4 bg-sky-100 text-sky-600 rounded-3xl"><MdBusiness size={40}/></span>
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">Organisation Profile</h2>
                <p className="text-slate-400 font-medium text-sm">Real-time management and details</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${org.is_active ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"}`}>
              {org.is_active ? "• Active Instance" : "• Blocked Instance"}
            </span>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
            <InfoBlock label="Official Name" value={org.name} />
            <InfoBlock label="Email Address" value={org.email} />
            <InfoBlock label="Contact Number" value={org.phone} />
            <InfoBlock label="Reg. Number" value={org.registration_number} />
            <InfoBlock label="Attendance" value={org.attendance_mode} />
            <InfoBlock label="Full Day Time" value={org.full_day_last_time} />
            <InfoBlock label="Half Day Cutoff" value={org.half_day_cutoff_time} />
            <InfoBlock label="Coordinates" value={`${org.latitude}, ${org.longitude}`} />
          </div>

          <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-6 items-center justify-between">
             <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <MdCalendarToday className="text-sky-500"/>
                System Created: {org.creates_at ? new Date(org.creates_at).toLocaleDateString() : "N/A"}
             </div>
             {org.registration_doc && (
                <a
                  href={`${BASE_URL}${org.registration_doc}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto text-center bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-sky-600 transition-all shadow-xl shadow-slate-200"
                >
                  View Registration Doc
                </a>
             )}
          </div>
        </div>
      )}

      {/* ================= USERS LIST ================= */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div>
                <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-slate-800">
                    User Directory
                </h2>
                <p className="text-slate-400 text-sm">Listing all enrolled members</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                    <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                    <input 
                        type="text" 
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-72 pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-sky-500 transition-all text-sm"
                    />
                </div>
                <div className="flex items-center justify-center bg-indigo-600 text-white px-5 py-3 rounded-2xl text-xs font-bold tracking-widest shadow-lg shadow-indigo-100">
                    COUNT: {filteredUsers.length}
                </div>
            </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] text-center shadow-sm border border-slate-100">
            <p className="text-slate-400 font-medium italic">No users matching your criteria were found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                className="group bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-indigo-500 transition-colors"></div>
                <div className="relative mb-5 mt-2">
                    <img
                        src={u.image ? `${BASE_URL}${u.image}` : "https://via.placeholder.com/150"}
                        alt="user"
                        className="w-24 h-24 object-cover rounded-[1.8rem] shadow-lg group-hover:rotate-3 transition-transform duration-500"
                    />
                </div>
                
                <h3 className="font-black text-slate-800 text-lg line-clamp-1">{u.name}</h3>
                <p className="text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-2 mt-1 px-3 py-1 bg-indigo-50 rounded-lg">{u.user_type}</p>
                <p className="text-slate-400 text-xs mb-6 font-medium break-all px-2">{u.email}</p>

                <button 
                    onClick={() => setSelectedUser(u)}
                    className="w-full mt-auto flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95"
                >
                    <MdVisibility size={18} /> Profile Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= USER DETAIL POPUP ================= */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedUser(null)}></div>
          
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header / Cover */}
            <div className="h-24 sm:h-32 bg-slate-900"></div>
            
            <button 
                onClick={() => setSelectedUser(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-rose-500 text-white p-2 rounded-xl transition-all z-10"
            >
                <MdClose size={24} />
            </button>

            <div className="px-5 sm:px-12 pb-8 sm:pb-12">
                <div className="relative -mt-12 sm:-mt-16 flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-10 text-center sm:text-left">
                    <img 
                        src={selectedUser.image ? `${BASE_URL}${selectedUser.image}` : "https://via.placeholder.com/150"} 
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] border-[6px] border-white shadow-2xl object-cover" 
                        alt="Profile"
                    />
                    <div className="pb-2">
                        <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">{selectedUser.name}</h2>
                        <p className="text-indigo-600 font-bold text-lg">{selectedUser.desigination}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 bg-slate-50 p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-slate-100">
                    <DetailItem icon={<MdBadge />} label="ID Reference" value={selectedUser.employee_id} />
                    <DetailItem icon={<MdLayers />} label="Division" value={selectedUser.department} />
                    <DetailItem icon={<MdPhone />} label="Mobile" value={selectedUser.phone} />
                    <DetailItem icon={<MdEmail />} label="Cloud Email" value={selectedUser.email} />
                    <DetailItem icon={<MdFingerprint />} label="Auth Mode" value={selectedUser.attendance_mode_display} />
                    <DetailItem icon={<MdPerson />} label="System Role" value={selectedUser.user_type} />
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    {selectedUser.id_proof && (
                        <a 
                            href={`${BASE_URL}${selectedUser.id_proof}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 text-center bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-200 hover:bg-slate-900 transition-all active:scale-95"
                        >
                            Review ID Credentials
                        </a>
                    )}
                    <button 
                        onClick={() => setSelectedUser(null)}
                        className="flex-1 border-2 border-slate-100 text-slate-400 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all active:scale-95"
                    >
                        Exit Preview
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">{label}</p>
      <p className="text-slate-800 font-bold text-sm truncate">{value || "---"}</p>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-indigo-500 bg-white p-3 rounded-2xl shadow-sm">{icon}</div>
      <div className="min-w-0">
        <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">{label}</p>
        <p className="text-slate-700 font-bold text-sm truncate uppercase">{value || "Not Assigned"}</p>
      </div>
    </div>
  );
}

export default SupperAdminOrganisationDetails;