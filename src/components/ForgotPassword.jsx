import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FiMail, FiArrowLeft, FiSend } from "react-icons/fi";
import { BASE_URL } from "../api/baseurl";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const loadingToast = toast.loading("Verifying email and sending link...");

    try {
      const res = await axios.post(
        `${BASE_URL}/api/account/forgot-password/`,
        { email }
      );

      toast.success(res.data.message || "Reset link sent! Please check your inbox.", { 
        id: loadingToast,
        duration: 5000 
      });
      setEmail("");

    } catch (err) {
      const errorMsg = err.response?.data?.error || "Unable to find an account with that email.";
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans">
      <Toaster position="top-center" />
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] bg-indigo-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="flex items-center justify-center gap-3 mb-10 group cursor-default">
          <div className="relative w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-[10deg] transition-all duration-300 shadow-xl shadow-blue-500/30">
            <img src="/logo.png" alt="OfficeDesk" className="w-8 h-8 object-contain" />
            <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            Office<span className="text-blue-600">Desk</span>
          </span>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 sm:p-10 border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4">
                <FiMail size={28} />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Forgot Password?</h2>
            <p className="text-slate-500 text-sm mt-2 px-4">
              Enter the email address associated with your account and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3
                ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:shadow-blue-300'}
              `}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <FiSend /> Send Reset Link
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center">
            <button 
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 transition-all"
            >
                <FiArrowLeft /> Back to Login
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-xs font-medium">
          Protected by OfficeDesk Secure Gateway
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;