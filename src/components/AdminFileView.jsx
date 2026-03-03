import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { 
  FiFileText, FiImage, FiMoreVertical, FiDownload, 
  FiShare2, FiEye, FiTrash2, FiSearch, FiFilter, FiBox 
} from "react-icons/fi";
import { 
  FaFilePdf, FaFileExcel, FaFileArchive, FaFileAlt, 
  FaFilePowerpoint, FaFileWord 
} from "react-icons/fa";
import FileShareUserList from "./FileShareUserList";
import toast, { Toaster } from "react-hot-toast";

function AdminFileView() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("all");
    const [shareFileId, setShareFileId] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => { loadFiles("all"); }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const loadFiles = async (type) => {
        setLoading(true);
        try {
            let url = "/api/encryptfile/file-list-view/";
            if (type === "my") url += "?type=my";
            const res = await axios.get(`${BASE_URL}${url}`, TOCKEN_ONLY());
            setFiles(res.data);
            setFilterType(type);
        } catch (err) {
            toast.error("Failed to load files");
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (type) => {
        const t = type?.toLowerCase() || "";
        const size = 32;
        if (t.includes("pdf")) return <FaFilePdf size={size} className="text-rose-500" />;
        if (t.includes("xls")) return <FaFileExcel size={size} className="text-emerald-500" />;
        if (t.includes("doc")) return <FaFileWord size={size} className="text-blue-500" />;
        if (t.includes("ppt")) return <FaFilePowerpoint size={size} className="text-orange-500" />;
        if (t.includes("jpg") || t.includes("png") || t.includes("svg")) return <FiImage size={size} className="text-purple-500" />;
        if (t.includes("zip") || t.includes("rar")) return <FaFileArchive size={size} className="text-amber-500" />;
        return <FiFileText size={size} className="text-slate-400" />;
    };

    const viewFile = async (id) => {
        const load = toast.loading("Decrypting file...");
        try {
            const res = await axios.get(`${BASE_URL}/api/encryptfile/${id}/view/`, {
                headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                responseType: "blob",
            });
            window.open(URL.createObjectURL(res.data));
            toast.dismiss(load);
        } catch (err) {
            toast.error("Access denied or file corrupted", { id: load });
        }
    };

    const downloadFile = async (id, name = "file") => {
        const load = toast.loading("Preparing download...");
        try {
            const res = await axios.get(`${BASE_URL}/api/encryptfile/${id}/export/`, {
                headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                responseType: "blob",
            });
            const url = URL.createObjectURL(res.data);
            const a = document.createElement("a");
            a.href = url;
            a.download = name;
            a.click();
            toast.success("Download started", { id: load });
        } catch (err) {
            toast.error("Download failed", { id: load });
        }
    };

    const deleteFile = async (file_id) => {
        if (!window.confirm("Are you sure you want to delete this file?")) return;
        try {
            await axios.delete(`${BASE_URL}/api/encryptfile/add-sharefile/${file_id}/`, TOCKEN_ONLY);
            toast.success("File removed successfully");
            setFiles(files.filter((f) => f.id !== file_id));
        } catch (err) {
            toast.error("Failed to delete file");
        }
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-center" reverseOrder={false} />
            
            {/* Header & Local Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <FiFilter className="text-indigo-500" /> File Explorer
                    </h2>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
                    <button
                        onClick={() => loadFiles("all")}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                            filterType === "all" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        All Files
                    </button>
                    <button
                        onClick={() => loadFiles("my")}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                            filterType === "my" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        My Vault
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-44 bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />
                    ))}
                </div>
            ) : files.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <FiBox size={48} className="text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">No files found here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="group relative bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 transition-all duration-300"
                        >
                            {/* Action Menu Toggle */}
                            <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
                                <button 
                                    onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)}
                                    className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                                >
                                    <FiMoreVertical />
                                </button>

                                {openMenuId === file.id && (
                                    <div 
                                        ref={menuRef} 
                                        className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-2 z-50 animate-in fade-in zoom-in duration-150"
                                    >
                                        <button onClick={() => { setOpenMenuId(null); viewFile(file.id); }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 rounded-xl text-sm font-semibold text-slate-700">
                                            <FiEye className="text-indigo-500" /> View Online
                                        </button>
                                        <button onClick={() => { setOpenMenuId(null); downloadFile(file.id, file.original_name); }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-emerald-50 rounded-xl text-sm font-semibold text-slate-700">
                                            <FiDownload className="text-emerald-500" /> Download
                                        </button>
                                        <button onClick={() => { setOpenMenuId(null); setShareFileId(file.id); }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 rounded-xl text-sm font-semibold text-slate-700">
                                            <FiShare2 className="text-blue-500" /> Share File
                                        </button>
                                        <div className="h-px bg-slate-100 my-1" />
                                        <button onClick={() => { setOpenMenuId(null); deleteFile(file.id); }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-rose-50 rounded-xl text-sm font-semibold text-rose-600">
                                            <FiTrash2 /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* File Preview Icon */}
                            <div className="flex flex-col items-center text-center cursor-pointer" onClick={() => viewFile(file.id)}>
                                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-4">
                                    {getIcon(file.file_type)}
                                </div>
                                <h4 className="font-bold text-slate-800 truncate w-full px-2 text-sm">
                                    {file.original_name}
                                </h4>
                                <span className="mt-1 inline-block px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                    {file.file_type || "File"}
                                </span>
                            </div>

                            {/* File Meta */}
                            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px]">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                        {file.owner_name?.charAt(0)}
                                    </div>
                                    <span className="text-slate-600 font-semibold truncate max-w-[80px]">
                                        {file.owner_name}
                                    </span>
                                </div>
                                <span className="text-slate-400 font-medium">ID: {file.owner_employee_id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Share Modal */}
            {shareFileId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300">
                    <FileShareUserList
                        fileId={shareFileId}
                        onClose={() => setShareFileId(null)}
                    />
                </div>
            )}
        </div>
    );
}

export default AdminFileView;