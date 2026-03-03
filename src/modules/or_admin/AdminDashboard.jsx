import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Oradmindash } from "../../api/accountapi";
import {
  MdDashboard,
  MdPeople,
  MdSettingsSuggest,
  MdFolder,
  MdAccountBalanceWallet,
  MdTimeline,
  MdAssignment,
  MdChat,
  MdMenu,
  MdClose,
  MdLogout
} from "react-icons/md";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: "", label: "Overview", icon: <MdDashboard size={22} />, end: true },
    { to: "users", label: "User Management", icon: <MdPeople size={22} />, end: false },
    { to: "attentancemanager", label: "Attendance Settings", icon: <MdSettingsSuggest size={22} />, end: false },
    { to: "filemanage", label: "File Manager", icon: <MdFolder size={22} />, end: false },
    { to: "salarymanage", label: "Salary Management", icon: <MdAccountBalanceWallet size={22} />, end: false },
    { to: "allperformence", label: "Performance Analyzer", icon: <MdTimeline size={22} />, end: false },
    { to: "taskreports", label: "Task Reports", icon: <MdAssignment size={22} />, end: false },
    { to: "chat", label: "Support Chat", icon: <MdChat size={22} />, end: false },
  ];

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const respo = await Oradmindash();
        setData(respo.data);
        console.log(respo.data);
        
      } catch (error) {
        if (error.response?.status === 403 || error.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    loadDashboard();
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/account/logout/`,
        {},
        TOCKEN_ONLY()
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_type");
      navigate("/login");

    } catch (err) {
      console.log(err);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f0f9ff]">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-sky-100 p-4 flex items-center justify-between sticky top-0 z-[60] shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-sky-200">
            <MdDashboard size={20} />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Admin</h2>
        </div>
        <button onClick={toggleMobileMenu} className="p-2 rounded-xl bg-sky-50 text-sky-600">
          {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[90] md:hidden" onClick={toggleMobileMenu}></div>
      )}

      {/* Sidebar */}
      <aside className={`
                fixed inset-y-0 left-0 z-[100] w-72 bg-white border-r border-sky-50 p-6 
                flex flex-col transition-transform duration-300 ease-out md:sticky md:top-0 md:h-screen md:translate-x-0
                ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
            `}>
        {/* 1. Top: Branding */}
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="w-11 h-11 flex-shrink-0 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-lg border border-white/20">
            AD
          </div>
          <div className="flex flex-col">
            <h2 className="text-[17px] font-black text-slate-800 leading-[1] tracking-tighter uppercase">
              ORGANISATION <span className="text-sky-600 block">ADMIN</span>
            </h2>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] mt-1">
              Master Control
            </span>
          </div>
        </div>

        {/* 2. Middle: Nav Links (Scrollable) */}
        <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-hide pr-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${isActive
                  ? "bg-sky-600 text-white shadow-xl shadow-sky-100 ring-4 ring-sky-50"
                  : "text-slate-500 hover:bg-sky-50 hover:text-sky-600"
                }`
              }
            >
              <span className="transition-transform group-hover:scale-110 duration-300">
                {item.icon}
              </span>
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* 3. Bottom: Logout & Profile Section */}
        <div className="pt-6 border-t border-sky-50 mt-6">
          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
              {data?.photo ? (
                <img src={data.photo} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-indigo-700">
                  {data?.name ? data.name.slice(0, 2).toUpperCase() : "HR"}
                </span>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-black text-slate-800 truncate">{data?.name || "OA Manager"}</p>
              <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight uppercase">{data?.employee_id || "OR Dept"}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90"
              title="Logout"
            >
              <MdLogout size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">

        <div className=" max-w-[1600px] mx-auto w-full">
          <div className="bg-white min-h-screen shadow-sm border border-slate-100 p-2 min-h-[calc(100vh-160px)]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;