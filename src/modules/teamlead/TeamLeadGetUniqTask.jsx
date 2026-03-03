import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";
import { 
  FaArrowLeft, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaCheck, 
  FaTimes, 
  FaCommentDots, 
  FaClipboardCheck, 
  FaHistory, 
  FaUserEdit,
  FaCalendarCheck,
  FaHourglassEnd
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function TeamLeadGetUniqTask() {
  const { Id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tlReply, setTlReply] = useState("");

  useEffect(() => {
    getTask();
  }, [Id]);

  const getTask = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/tasks/uniq_task_manage/${Id}/`, TOCKEN_ONLY());
      setTask(res.data);
    } catch (err) {
      console.log("Error loading task", err.response?.data);
      toast.error("Error loading task details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    const loadingToast = toast.loading(`Processing ${status.toLowerCase()}...`);
    const formData = new FormData();
    if (tlReply) formData.append("review_note",tlReply)
    formData.append("action",status)
    try {
      await axios.patch(
        `${BASE_URL}/api/tasks/task_approve/${Id}/`,
        formData,
        TOCKEN_ONLY()
      );
      toast.success(`Task ${status} successfully`, { id: loadingToast });
      setTlReply("");
      getTask();
    } catch (err) {
      toast.error("Update failed. Please try again.", { id: loadingToast });
      console.log(err.response?.data);
    }
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

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 md:p-8 font-sans pb-20">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-blue-50 transition-all active:scale-95"
          >
            <FaArrowLeft /> <span>Back</span>
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">
              Review Task
            </h2>
          </div>
        </div>

        {task && (
          <span className={`px-6 py-2 rounded-full font-black text-[10px] tracking-widest shadow-lg uppercase ${getStatusStyle(task.status)}`}>
            {task.status}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : task ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <FaClipboardCheck size={80} />
              </div>

              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Task Title</h3>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 mb-6">{task.title}</h1>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Description</h3>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed">
                    {task.description || "No description provided."}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {task.employee_replay_note && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                        <FaUserEdit /> Employee's Submission Note
                      </h3>
                      <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-emerald-800 text-sm">
                        {task.employee_replay_note}
                      </div>
                    </div>
                  )}

                  {task.team_lead_replay_note && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                        <FaHistory /> Your Last Review Note
                      </h3>
                      <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-blue-800 text-sm">
                        {task.team_lead_replay_note}
                      </div>
                    </div>
                  )}
                </div>

                {(task.status === "SUBMITTED" || task.status === "RESUBMITTED") && (
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FaCommentDots /> Add New Feedback / Reply Note
                    </h3>
                    <textarea
                      value={tlReply}
                      onChange={(e) => setTlReply(e.target.value)}
                      className="w-full border border-blue-100 p-4 rounded-2xl bg-blue-50/30 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all text-sm shadow-inner min-h-[120px] resize-none"
                      placeholder="Enter your feedback for the employee here..."
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {task.team_lead_file && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"> <FaFileAlt /> </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Your Attachment</p>
                      <p className="text-sm font-bold text-slate-700">Reference File</p>
                    </div>
                  </div>
                  <a href={`${BASE_URL}${task.team_lead_file}`} target="_blank" rel="noreferrer" className="bg-slate-100 p-2 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                    <FaArrowLeft className="rotate-180" />
                  </a>
                </div>
              )}
              {task.employee_file && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"> <FaFileAlt /> </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Submission</p>
                      <p className="text-sm font-bold text-slate-700">Employee File</p>
                    </div>
                  </div>
                  <a href={`${BASE_URL}${task.employee_file}`} target="_blank" rel="noreferrer" className="bg-emerald-50 p-2 rounded-lg text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors">
                    <FaArrowLeft className="rotate-180" />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-4 mb-6">Information</h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Created</p>
                    <p className="text-sm font-bold text-slate-700">{formatDate(task.created_at)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <FaHourglassEnd />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Date for Submission</p>
                    <p className="text-sm font-bold text-slate-700">{formatDate(task.last_submission_date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <FaCalendarCheck />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted Date</p>
                    <p className="text-sm font-bold text-slate-700">{formatDate(task.submission_date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <FaClock />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Assigned</p>
                    <p className="text-sm font-bold text-slate-700">
                      {task.created_at ? new Date(task.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {(task.status === "SUBMITTED" || task.status === "RESUBMITTED") && (
                <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleStatusUpdate("APPROVED")}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <FaCheck /> Approve Task
                  </button>
                  <button
                    onClick={() => handleStatusUpdate("REJECTED")}
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <FaTimes /> Reject Task
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <p className="font-bold uppercase tracking-widest">No task found</p>
        </div>
      )}
    </div>
  );
}

export default TeamLeadGetUniqTask;