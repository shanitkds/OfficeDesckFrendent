import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";
import { FaArrowLeft, FaUpload, FaFileAlt, FaCheckCircle, FaClock, FaExclamationCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function EmployeeTaskSubmission() {
    const { Id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [replyNote, setReplyNote] = useState("");
    const [replyFile, setReplyFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTask();
    }, [Id]);

    const loadTask = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${BASE_URL}/api/tasks/uniq_task_manage/${Id}/`,
                TOCKEN_ONLY()
            );
            setTask(res.data);
        } catch (err) {
            toast.error("Error loading task details");
            console.log(err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (date) =>
        date ? new Date(date).toLocaleString('en-US', { 
            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
        }) : "N/A";

    const submitReply = async () => {
        if (!replyNote && !replyFile) {
            toast.error("Please provide a note or upload a file");
            return;
        }

        const formData = new FormData();
        if (replyNote) formData.append("reaplay_note", replyNote);
        if (replyFile) formData.append("replay_file", replyFile);
        
        const loadingToast = toast.loading("Submitting your reply...");

        try {
            await axios.patch(
                `${BASE_URL}/api/tasks/task_submit/${Id}/`,
                formData,
                TOCKEN_ONLY()
            );

            toast.success("Task submitted successfully!", { id: loadingToast });
            setReplyNote("");
            setReplyFile(null);
            loadTask();
        } catch (err) {
            toast.error("Submission failed. Please try again.", { id: loadingToast });
            console.log(err.response?.data);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );
    
    if (!task) return (
        <div className="p-8 text-center text-gray-500">
            <FaExclamationCircle className="mx-auto text-4xl mb-2" />
            <p>Task not found</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                        Back to Tasks
                    </button>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            task.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                            task.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                            {task.status}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Main Content */}
                    <div className="p-6 md:p-8 space-y-8">
                        
                        {/* Title & Description */}
                        <section>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{task.title}</h2>
                            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                                {task.description || "No description provided."}
                            </p>
                        </section>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 p-5 rounded-xl">
                            <div className="flex items-center text-gray-700">
                                <FaClock className="mr-2 text-blue-400" />
                                <div><span className="font-semibold block text-gray-500 uppercase text-[10px]">Created At</span> {formatDateTime(task.created_at)}</div>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <FaClock className="mr-2 text-red-400" />
                                <div><span className="font-semibold block text-gray-500 uppercase text-[10px]">Deadline</span> {formatDateTime(task.last_submission_date)}</div>
                            </div>
                        </div>

                        {/* Files Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {task.team_lead_file && (
                                <a href={`${BASE_URL}${task.team_lead_file}`} target="_blank" rel="noreferrer" 
                                   className="flex items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors group">
                                    <div className="bg-blue-100 p-2 rounded mr-3"><FaFileAlt className="text-blue-600" /></div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 underline">Team Lead Reference</span>
                                </a>
                            )}
                            {task.employee_file && (
                                <a href={`${BASE_URL}${task.employee_file}`} target="_blank" rel="noreferrer"
                                   className="flex items-center p-3 border rounded-lg hover:bg-green-50 transition-colors group">
                                    <div className="bg-green-100 p-2 rounded mr-3"><FaFileAlt className="text-green-600" /></div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 underline">Your Submitted File</span>
                                </a>
                            )}
                        </div>

                        {/* Notes Section */}
                        <div className="space-y-4">
                            {task.team_lead_replay_note && (
                                <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                                    <h4 className="text-xs font-bold text-orange-800 uppercase mb-1">Team Lead Feedback</h4>
                                    <p className="text-gray-700 text-sm italic">"{task.team_lead_replay_note}"</p>
                                </div>
                            )}
                            {task.employee_replay_note && (
                                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                                    <h4 className="text-xs font-bold text-blue-800 uppercase mb-1">Your Previous Note</h4>
                                    <p className="text-gray-700 text-sm">"{task.employee_replay_note}"</p>
                                </div>
                            )}
                        </div>

                        {/* Action Section */}
                        <div className="pt-6 border-t border-gray-100">
                            {(task.status === "ASSIGNED" || task.status === "REJECTED") ? (
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-gray-700">Submit Your Work</label>
                                    <textarea
                                        value={replyNote}
                                        onChange={(e) => setReplyNote(e.target.value)}
                                        className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none min-h-[120px]"
                                        placeholder="Add a comment about your submission..."
                                    />

                                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-xl">
                                        <input
                                            type="file"
                                            onChange={(e) => setReplyFile(e.target.files[0])}
                                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                        />
                                        <button
                                            onClick={submitReply}
                                            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transform hover:scale-[1.02] transition-all shadow-md active:scale-95"
                                        >
                                            <FaUpload /> Submit Reply
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-3 p-6 bg-green-50 rounded-2xl border border-green-200">
                                    <FaCheckCircle className="text-green-500 text-xl" />
                                    <span className="text-green-800 font-bold">This task has been submitted and is under review.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeTaskSubmission;