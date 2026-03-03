import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaTasks, FaClock, FaUser } from "react-icons/fa";

function TasksViewList({ employeeId }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [employeeName, setEmployeeName] = useState("Employee");
    const navigate = useNavigate();

    useEffect(() => {
        if (employeeId) getTasks();
    }, [employeeId]);

    const getTasks = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${BASE_URL}/api/tasks/task_manage/?em_id=${employeeId}`,
                TOCKEN_ONLY()
            );
            setTasks(res.data);
            if (res.data.length > 0 && res.data[0].employee_name) {
                setEmployeeName(res.data[0].employee_name);
            }
        } catch (err) {
            console.log(err.response?.data);
        }
        setLoading(false);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "ASSIGNED": return "bg-blue-600 text-white";
            case "SUBMITTED": return "bg-amber-500 text-white";
            case "RESUBMITTED": return "bg-purple-600 text-white";
            case "APPROVED": return "bg-emerald-600 text-white";
            case "REJECTED": return "bg-rose-600 text-white";
            default: return "bg-slate-500 text-white";
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-50 p-4 md:p-8 font-sans pb-20 relative">

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-blue-50 transition-all active:scale-95"
                    >
                        <FaArrowLeft /> <span className="hidden sm:inline">Back</span>
                    </button>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">
                        Task Explorer
                    </h2>
                </div>

            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            )}

            {!loading && tasks.length === 0 && (
                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 py-20 text-center">
                    <FaTasks className="mx-auto text-5xl text-slate-200 mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest">No tasks found</p>
                </div>
            )}

            <div className="flex flex-col gap-4 max-w-full lg:max-w-[50%]">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-5 relative hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col gap-3"
                        onClick={()=>navigate(`/teamlead/uniqtask/${task.id}`)}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                                    {task.title}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-slate-400 uppercase">
                                    <FaClock className="text-blue-400" />
                                    {new Date(task.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <span className={`text-[10px] px-3 py-1.5 rounded-lg font-black uppercase tracking-tighter ${getStatusStyle(task.status)}`}>
                                    {task.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2 border-t border-slate-50">
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest leading-none mb-1">
                                    Assigned By
                                </span>
                                <span className="text-xs font-black text-slate-600 leading-none capitalize">
                                    {task.team_lead_name}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-6 left-6 md:left-10 z-10">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-blue-100 px-5 py-3 rounded-2xl shadow-xl shadow-blue-900/5">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <FaUser size={14} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TasksViewList;