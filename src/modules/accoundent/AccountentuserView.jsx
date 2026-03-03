import React, { useState, useEffect } from "react";
import { listUsers } from "../../api/oradmin";
import { FaUserCircle, FaSearch, FaFilter, FaPhoneAlt, FaEnvelope, FaIdBadge } from "react-icons/fa";

function AccountentuserView() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [userType, setUserType] = useState("ALL");

    const IM_BASE_URL = "http://127.0.0.1:8000";

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await listUsers();
            setUsers(res?.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const filteredUsers = users.filter((u) => {
        const text = search.toLowerCase();
        return (
            (u.name?.toLowerCase().includes(text) ||
             u.email?.toLowerCase().includes(text) ||
             u.phone?.toLowerCase().includes(text) ||
             u.user_type?.toLowerCase().includes(text) ||
             u.employee_id?.toLowerCase().includes(text)) &&
            (userType === "ALL" || u.user_type === userType)
        );
    });

    const getImageUrl = (path) => {
        if (!path) return null;
        return path.startsWith("http") ? path : `${IM_BASE_URL}${path}`;
    };

    return (
        <div className="p-2 md:p-6 animate-in fade-in duration-500">
            <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-sky-100/50 border border-sky-50 mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" />
                    <input
                        placeholder="Search by ID, name, email, or phone..."
                        className="w-full bg-sky-50/50 border border-sky-100 pl-11 pr-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-sky-200 transition-all font-medium text-slate-700"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="relative w-full md:w-64">
                    <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 pointer-events-none" />
                    <select
                        className="w-full bg-sky-50/50 border border-sky-100 pl-11 pr-4 py-3 rounded-2xl cursor-pointer outline-none focus:ring-4 focus:ring-sky-200 transition-all font-bold text-slate-600 appearance-none"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="ALL">All Roles</option>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="HR">HR</option>
                        <option value="TEAM_LEAD">Team Lead</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-sky-100/30 overflow-hidden border border-sky-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-sky-50 to-white border-b border-sky-100">
                                <th className="p-5 font-black text-sky-700 text-xs uppercase tracking-widest">Employee Profile</th>
                                <th className="p-5 font-black text-sky-700 text-xs uppercase tracking-widest">Contact Information</th>
                                <th className="p-5 font-black text-sky-700 text-xs uppercase tracking-widest">Phone</th>
                                <th className="p-5 font-black text-sky-700 text-xs uppercase tracking-widest">Designation</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-sky-50">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <FaUserCircle size={48} className="text-sky-100" />
                                            <p className="text-slate-400 font-bold tracking-tight">No directory results found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-sky-50/50 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img
                                                        src={getImageUrl(u.image) || `https://ui-avatars.com/api/?name=${u.name}&background=0ea5e9&color=fff`}
                                                        className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                                                        alt=""
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-800 tracking-tight leading-none mb-1">
                                                        {u.name}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-sky-500">
                                                        <FaIdBadge size={10} />
                                                        <span className="text-[10px] font-black uppercase tracking-tighter">
                                                            {u.employee_id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-5">
                                            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                                                <FaEnvelope className="text-sky-300" />
                                                {u.email}
                                            </div>
                                        </td>

                                        <td className="p-5">
                                            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                                                <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                                                    <FaPhoneAlt size={12} />
                                                </div>
                                                {u.phone || "---"}
                                            </div>
                                        </td>

                                        <td className="p-5">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border ${
                                                u.user_type === 'HR' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                u.user_type === 'TEAM_LEAD' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                                'bg-sky-50 text-sky-600 border-sky-100'
                                            }`}>
                                                {u.user_type}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AccountentuserView;