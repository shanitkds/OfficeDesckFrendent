import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
    HiOutlineHome, 
    HiOutlineCurrencyDollar, 
    HiOutlineFolderOpen, 
    HiOutlineChatAlt2, 
    HiOutlineDocumentReport, 
    HiOutlineMenuAlt2, 
    HiOutlineX,
    HiLogout
} from "react-icons/hi";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";
import axios from "axios";
import UserProfile from "../../components/UserProfile";

function AccountentDashboard() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [data, setData] = useState(null);
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

    const navLinks = [
        { to: "", label: "Home", icon: <HiOutlineHome size={22} />, end: true },
        { to: "salarymanagement", label: "Salary Management", icon: <HiOutlineCurrencyDollar size={22} />, end: false },
        { to: "allexpence", label: "Expense Manage", icon: <HiOutlineDocumentReport size={22} />, end: false },
        { to: "myfiles", label: "File Manager", icon: <HiOutlineFolderOpen size={22} />, end: false },
        { to: "chat", label: "Chat Support", icon: <HiOutlineChatAlt2 size={22} />, end: false },
    ];

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const respo = await axios(`${BASE_URL}/api/account/accountent/`, TOCKEN_ONLY());
                setData(respo.data);
            } catch (error) {
                if (error.response?.status === 403 || error.response?.status === 401) {
                    navigate("/login");
                }
            }
        };
        loadDashboard();
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc]">

            <div className="md:hidden bg-white border-b border-blue-100 p-4 flex items-center justify-between sticky top-0 z-[60] shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white">
                        <HiOutlineCurrencyDollar size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">AccuPro</h2>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-xl bg-blue-50 text-blue-700 active:scale-90 transition-all"
                >
                    {isMobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt2 size={24} />}
                </button>
            </div>

\            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[90] md:hidden transition-opacity"
                    onClick={toggleMobileMenu}
                ></div>
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-[100] w-72 bg-white border-r border-blue-50 p-6 
                transform transition-transform duration-300 ease-out md:sticky md:top-0 md:h-screen md:translate-x-0
                ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
            `}>
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center text-white font-bold text-lg">
                        AP
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 leading-none tracking-tighter">
                            ACCU <span className="text-blue-700">PRO</span>
                        </h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Accountant
                        </span>
                    </div>
                </div>

                <nav className="space-y-1.5 flex-1 overflow-y-auto scrollbar-hide">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                                    isActive
                                        ? "bg-blue-700 text-white shadow-xl shadow-blue-100 ring-4 ring-blue-50"
                                        : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                                }`
                            }
                        >
                            {link.icon}
                            <span className="font-bold text-sm tracking-wide">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <div
                        onClick={() => setShowProfile(true)}
                        className="p-4 rounded-2xl bg-slate-50 border border-blue-100 flex items-center gap-3 cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                            {data?.photo ? (
                                <img src={data.photo} alt="profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="font-bold text-blue-700">
                                    {data?.name ? data.name.slice(0, 2).toUpperCase() : "AC"}
                                </span>
                            )}
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-black text-slate-800 truncate">
                                {data?.name || "Accountant"}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">
                                {data?.employee_id}
                            </p>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // stop profile popup
                                logout();
                            }}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                        >
                            <HiLogout size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            <main className="flex-1 min-w-0">
                <div className=" max-w-[1400px] mx-auto">
                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 bg-white shadow-sm border border-slate-100 p-2 min-h-[calc(100vh-180px)] overflow-hidden">
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

export default AccountentDashboard;