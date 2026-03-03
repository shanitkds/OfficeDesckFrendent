import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL, TOCKEN_ONLY } from '../../api/baseurl';
import { FaUserCircle, FaIdBadge, FaBriefcase, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function TealeadTaskEmployeeView() {
    const [employee, setEmployee] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        fechemployee();
    }, []);

    const fechemployee = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/team_lead/userslist/`,
                TOCKEN_ONLY()
            );
            setEmployee(res.data);
        } catch (err) {
            console.log("Error fetching employees", err);
        }
    };

    return (
        <div className="w-full min-h-full bg-slate-50 p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                        <FaClipboardList size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">
                            Task View
                        </h2>
                        <p className="text-slate-500 text-xs md:text-sm mt-1 uppercase tracking-widest font-bold opacity-70">
                            Monitor team assignments and progress
                        </p>
                    </div>
                </div>
                <div className="hidden md:block bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-tighter">
                    Team Size: <span className="text-indigo-600 ml-1">{employee.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {employee.map((emp) => (
                    <div
                        key={emp.id}
                        className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
                        onClick={()=>navigate(`/teamlead/tasklist/${emp.id}`)}
                    >
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-lg font-black shadow-inner flex-shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                {emp.name ? emp.name.charAt(0).toUpperCase() : <FaUserCircle />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-bold text-slate-800 truncate leading-tight">
                                    {emp.name}
                                </h3>
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        <FaIdBadge className="text-indigo-500" /> 
                                        {emp.employeez_id}
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                                        <FaBriefcase className="text-indigo-500" /> 
                                        {emp.desigination || "Associate"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 w-10 h-1 bg-indigo-100 rounded-full group-hover:w-full group-hover:bg-indigo-500 transition-all duration-500"></div>
                    </div>
                ))}
            </div>

            {employee.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                    <FaClipboardList className="text-5xl text-slate-200 mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center px-4">
                        No team members available to display tasks
                    </p>
                </div>
            )}
        </div>
    );
}

export default TealeadTaskEmployeeView;