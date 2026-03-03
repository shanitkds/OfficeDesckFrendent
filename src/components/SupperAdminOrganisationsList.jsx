import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import toast from "react-hot-toast";
import Swal from "sweetalert2";   // ✅ added
import { 
  MdBusiness, 
  MdEmail, 
  MdBlock, 
  MdCheckCircle, 
  MdDeleteForever, 
  MdOpenInNew,
  MdLayers
} from "react-icons/md";

function SupperAdminOrganisationsList() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrganisations = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/supperadmin/organisationslist/`,
        TOCKEN_ONLY()
      );
      setOrgs(res.data);
    } catch (err) {
      toast.error("Failed to load organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  // ================= BLOCK =================
  const blockOrg = async (id, isActive) => {
    const action = isActive ? "block" : "unblock";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to ${action} this organization?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    const myPromise = axios.post(
      `${BASE_URL}/api/supperadmin/organisation/${id}/block/`,
      { action: action },
      TOCKEN_ONLY()
    );

    toast.promise(myPromise, {
      loading: `${action === "block" ? "Blocking" : "Unblocking"}...`,
      success: `Organization ${action}ed!`,
      error: "Could not update status.",
    });

    try {
      await myPromise;
      fetchOrganisations();
    } catch (err) { console.log(err); }
  };

  // ================= DELETE =================
  const deleteOrg = async (id) => {

    const result = await Swal.fire({
      title: "Delete Organisation?",
      text: "Delete this organisation? This is permanent.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    const loadId = toast.loading("Deleting...");
    try {
      await axios.delete(
        `${BASE_URL}/api/supperadmin/organisation/${id}/delete/`,
        TOCKEN_ONLY()
      );
      toast.success("Organization removed.", { id: loadId });
      fetchOrganisations();
    } catch (err) {
      toast.error("Delete failed.", { id: loadId });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto mb-8 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center justify-center sm:justify-start gap-3">
          <MdLayers className="text-sky-600 shrink-0" />
          <span className="truncate">
            ORGANISATION <span className="text-sky-600 font-light tracking-widest">CONTROL</span>
          </span>
        </h2>
        <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-tighter mt-1">
          Super Admin Dashboard / List View
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 italic text-slate-400 animate-pulse">
          Loading data...
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {orgs.map((org) => (
            <div key={org.id}
              className="bg-white rounded-[2rem] border border-slate-100 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-sky-100/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                    <MdBusiness size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                    org.is_active ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                  }`}>
                    {org.is_active ? "Active" : "Blocked"}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 truncate">
                    {org.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 mt-1">
                    <MdEmail size={14} />
                    <p className="text-xs sm:text-sm truncate">{org.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-auto">
                <button
                  onClick={() => navigate(`/__admin_/organisationinfo/${org.id}`)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm hover:bg-sky-600 transition-all active:scale-95 shadow-md shadow-slate-200"
                >
                  <MdOpenInNew /> User & Organisation
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => blockOrg(org.id, org.is_active)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${
                      org.is_active 
                      ? "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white" 
                      : "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    }`}
                  >
                    {org.is_active ? <><MdBlock size={16}/> Block</> : <><MdCheckCircle size={16}/> Unblock</>}
                  </button>

                  <button
                    onClick={() => deleteOrg(org.id)}
                    className="px-4 py-3 bg-rose-50 text-rose-500 rounded-xl sm:rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {orgs.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 max-w-6xl mx-auto m-4">
          <MdBusiness size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-bold px-4">
            No organisations currently registered.
          </p>
        </div>
      )}
    </div>
  );
}

export default SupperAdminOrganisationsList;