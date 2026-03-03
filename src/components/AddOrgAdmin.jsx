import React, { useState } from "react";
import axios from "axios";
import { FaUserPlus, FaEnvelope, FaLock, FaPhone, FaUser, FaImage, FaIdCard, FaUserShield } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import toast, { Toaster } from "react-hot-toast";

function AddOrgAdmin() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    user_type: "ORG_ADMIN",
    phone: "",
    photo: null,
    id_proof: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Processing registration...");

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) data.append(key, form[key]);
      });

      await axios.post(
        `${BASE_URL}/api/org_admin/oruser_creation/`,
        data,
        TOCKEN_ONLY()
      );

      toast.success("Organisation Admin Created ✅", { id: loadingToast });

      setForm({
        name: "",
        email: "",
        password: "",
        user_type: "ORG_ADMIN",
        phone: "",
        photo: null,
        id_proof: null,
      });

      e.target.reset();

    } catch (err) {
      console.error(err.response?.data);
      toast.error("Failed to create admin. Check details.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center  md:p-10">
      <Toaster position="top-right" />
      
      <div className="w-full max-w-2xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
              <FaUserShield size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Add Org Admin</h2>
              <p className="text-slate-400 text-sm">Register a new administrator for your organisation</p>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="name"
                  placeholder="e.g. Alex Johnson"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative group">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 000 000 0000"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
            <h3 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-2">Documents & Photo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                  <FaImage /> Profile Photo
                </div>
                <input 
                  type="file" 
                  name="photo" 
                  onChange={handleFile} 
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                  <FaIdCard /> ID Proof (PDF/JPG)
                </div>
                <input 
                  type="file" 
                  name="id_proof" 
                  onChange={handleFile} 
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-xl ${
              loading 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 hover:shadow-blue-300"
            }`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={24} />
            ) : (
              <FaUserPlus size={24} />
            )}
            {loading ? "Creating Account..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddOrgAdmin;