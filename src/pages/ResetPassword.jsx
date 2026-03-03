import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/baseurl";
import toast, { Toaster } from "react-hot-toast";
import { FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi";

function ResetPassword() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (password.length < 3) {
      return toast.error("Password must be at least 6 characters.");
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Updating your password...");

    try {
      const res = await axios.post(
        `${BASE_URL}/api/account/reset-password/${uid}/${token}/`,
        { password }
      );

      toast.success(res.data.message || "Password reset successful!", { id: loadingToast });
      
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Link expired or invalid.";
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans">
      <Toaster position="top-center" />
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="flex items-center justify-center gap-3 mb-10 group cursor-default">
          <div className="relative w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-[10deg] transition-all duration-300 shadow-xl shadow-blue-500/30">
            <img src="/logo.png" alt="" className="w-8 h-8 object-contain" />
            <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            Office<span className="text-blue-600">Desk</span>
          </span>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 sm:p-10 border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4">
                <FiShield size={28} />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Secure Reset</h2>
            <p className="text-slate-500 text-sm mt-2">Enter a strong password to protect your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2
                ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-300'}
              `}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Update Password"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <button 
                onClick={() => navigate("/login")}
                className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors"
            >
                Back to Login
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-xs font-medium">
          © 2026 OfficeDesk Systems • Secure Auth v3.0
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;