import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdHome, MdTask, MdFolder, MdChat, MdTimeline, MdMenu, MdClose, MdLogout } from "react-icons/md";
import axios from "axios";
import UserProfile from "../../components/UserProfile";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";

function EmployeeDashboard() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [data, setData] = useState();
    const navigate = useNavigate();

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

    const navItems = [
        { to: "", label: "Home", icon: <MdHome size={22} />, end: true },
        { to: "task", label: "Tasks", icon: <MdTask size={22} />, end: false },
        { to: "filemanager", label: "File Manager", icon: <MdFolder size={22} />, end: false },
        { to: "performense", label: "My Performance", icon: <MdTimeline size={22} />, end: false },
        { to: "chat", label: "Chat", icon: <MdChat size={22} />, end: false },
    ];

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const respo = await axios(`${BASE_URL}/api/account/employee/`, TOCKEN_ONLY());
                setData(respo.data);
            } catch (error) {
                if (error.response?.status === 403 || error.response?.status === 401) {
                    navigate("/login");
                }
            }
        };

        loadDashboard();
    }, []);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#f0f9ff]">

            <div className="md:hidden bg-white border-b border-sky-100 p-4 flex items-center justify-between sticky top-0 z-[60] shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                        <MdTask size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Panel</h2>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-xl bg-sky-50 text-sky-600 active:scale-90 transition-all"
                >
                    {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[index-50] md:hidden transition-opacity"
                    onClick={toggleMobileMenu}
                ></div>
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-[100] w-72 bg-white border-r border-sky-50 p-6 
                transform transition-transform duration-300 ease-out md:sticky md:top-0 md:h-screen md:translate-x-0
                ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
            `}>
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-lg shadow-sky-200 flex items-center justify-center text-white font-bold">
                        EP
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 leading-none tracking-tighter">
                            STAFF <span className="text-sky-500">PRO</span>
                        </h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Employee
                        </span>
                    </div>
                </div>

                <nav className="space-y-1.5 flex-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                                    isActive
                                        ? "bg-sky-500 text-white shadow-xl shadow-sky-200 ring-4 ring-sky-50"
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

                <div className="absolute bottom-6 left-6 right-6">
                    <div
                        onClick={() => setShowProfile(true)}
                        className="absolute bottom-6 left-6 right-6 cursor-pointer"
                    >
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-sky-200 border-2 border-white shadow-sm overflow-hidden">
                                {data?.photo ? (
                                    <img src={data.photo} alt="profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="w-full h-full flex items-center justify-center font-bold text-sky-700">
                                        {data?.name ? data.name.slice(0, 2).toUpperCase() : "NA"}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-black text-slate-800 truncate">
                                    {data?.name || "Loading..."}
                                </p>
                                <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">
                                    {data?.employee_id}
                                </p>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    logout();
                                }}
                                className="text-slate-400 hover:text-rose-500"
                            >
                                <MdLogout size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 min-w-0">
                <div className=" max-w-[1400px] mx-auto">
                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                        <Outlet />
                    </div>
                </div>
            </main>

            {showProfile && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
                    <UserProfile data={data} onClose={() => setShowProfile(false)} />
                </div>
            )}

        </div>
    );
}

export default EmployeeDashboard;