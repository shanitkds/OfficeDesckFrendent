import React, { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineArrowRight } from "react-icons/ai";
import { loginUser } from "../api/accountapi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const loadingToast = toast.loading("Authenticating...");

    try {
      const response = await loginUser({ email, password });
      
      // Store Auth Data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_type", response.data.user_type);
      localStorage.setItem("user_id", response.data.id);

      toast.success(`Welcome back, ${response.data.user_type}!`, { id: loadingToast });

      setTimeout(() => {
        redirectDashboard(response.data.user_type);
      }, 800);

    } catch (error) {
      const errorMsg = error.response?.data?.error || "Login failed. Please check your credentials.";
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const redirectDashboard = (role) => {
    const routes = {
      'ORG_ADMIN': "/or-admin",
      'TEAM_LEAD': "/teamlead",
      'EMPLOYEE': "/employee",
      'HR': "/hr",
      'ACCOUNTANT': "/accountent",
      'SUPER_ADMIN': "/__admin_"
    };
    navigate(routes[role] || "/");
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      {/* LEFT SIDE: VISUAL PANEL */}
      <div className="hidden lg:flex w-[55%] relative overflow-hidden">
        <img
          src="/officeimage.jpg"
          alt="Office Culture"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/90 via-blue-800/80 to-transparent"></div>

        <div className="relative z-10 text-white p-20 flex flex-col justify-between w-full">
          <div>
            <div className="bg-white/10 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center mb-12 border border-white/20 shadow-2xl">
              <img src="/logo.png" alt="OfficeDesk" className="w-10 h-10 object-contain" />
            </div>

            <h1 className="text-6xl font-black leading-[1.1] mb-8 tracking-tight">
              Manage your <br /> 
              <span className="text-blue-400">workspace</span> <br /> 
              with confidence.
            </h1>

            <div className="flex items-center gap-4 text-white/70">
              <div className="h-[1px] w-12 bg-blue-400"></div>
              <p className="text-lg font-medium tracking-wide">
                Trusted by 500+ enterprises worldwide.
              </p>
            </div>
          </div>

          <p className="text-sm text-white/50 font-medium uppercase tracking-[0.3em]">
            © 2026 OfficeDesk Inc. • v4.0.2
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-8 lg:px-24 bg-white">
        <div className="w-full max-w-md">
          
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <img src="/logo.png" alt="" className="w-6 h-6" />
              </div>
              <span className="font-black text-slate-800 text-xl tracking-tighter">OfficeDesk</span>
            </div>
            <a href="#" className="text-blue-600 text-xs font-black uppercase tracking-widest hover:text-indigo-700 transition-colors flex items-center gap-1">
              Website <AiOutlineArrowRight />
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 font-medium">Please enter your workspace credentials.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors text-xl" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold text-slate-700 
                  ${errors.email ? "border-red-500" : "border-slate-100 focus:border-blue-500"}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-bold ml-1">{errors.email}</p>}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button 
                  type="button"
                  onClick={() => navigate('/forgotpassword')}
                  className="text-[11px] font-black text-blue-600 uppercase tracking-widest hover:text-indigo-700"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors text-xl" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold text-slate-700 
                  ${errors.password ? "border-red-500" : "border-slate-100 focus:border-blue-500"}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs font-bold ml-1">{errors.password}</p>}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;