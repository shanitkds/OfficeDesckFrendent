import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import toast, { Toaster } from "react-hot-toast";

import {
  FaFilePdf,
  FaFileExcel,
  FaFileImage,
  FaFileArchive,
  FaFileAlt,
  FaEye,
  FaDownload,
  FaEllipsisV,
  FaUser,
  FaCalendarAlt,
  FaFolderOpen,
  FaPlus,
  FaShareAlt,
} from "react-icons/fa";

function FileShareView() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const loadFiles = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/encryptfile/sharefileView/`,
        TOCKEN_ONLY()
      );
      setFiles(res.data);
    } catch {
      toast.error("Error loading shared files");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    const iconSize = 40;
    if (!type) return <FaFileAlt size={iconSize} className="text-slate-400" />;
    type = type.toLowerCase();

    if (type.includes("pdf")) return <FaFilePdf size={iconSize} className="text-rose-500" />;
    if (type.includes("xls")) return <FaFileExcel size={iconSize} className="text-emerald-500" />;
    if (type.includes("jpg") || type.includes("png")) return <FaFileImage size={iconSize} className="text-violet-500" />;
    if (type.includes("zip") || type.includes("rar")) return <FaFileArchive size={iconSize} className="text-amber-500" />;

    return <FaFileAlt size={iconSize} className="text-slate-400" />;
  };

  const viewSharedFile = async (share_id) => {
    const loadingToast = toast.loading("Opening secure file...");
    try {
      const res = await axios.get(
        `${BASE_URL}/api/encryptfile/${share_id}/share-view/`,
        { ...TOCKEN_ONLY(), responseType: "blob" }
      );
      window.open(URL.createObjectURL(res.data));
      toast.dismiss(loadingToast);
    } catch {
      toast.error("Access denied or file missing", { id: loadingToast });
    }
  };

  const downloadSharedFile = async (share_id, name) => {
    const loadingToast = toast.loading("Preparing download...");
    try {
      const res = await axios.get(
        `${BASE_URL}/api/encryptfile/${share_id}/share-download/`,
        { ...TOCKEN_ONLY(), responseType: "blob" }
      );
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      toast.success("Download started", { id: loadingToast });
    } catch {
      toast.error("Download failed", { id: loadingToast });
    }
  };

  const addToMyFiles = async (file_id) => {
    try {
      await axios.post(
        `${BASE_URL}/api/encryptfile/add-sharefile/${file_id}`,
        {},
        TOCKEN_ONLY()
      );
      toast.success("Copied to My Files");
    } catch {
      toast.error("Cannot copy file");
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      <Toaster position="top-right" />
      
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-800 tracking-tight">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <FaShareAlt size={20} />
            </div>
            Incoming Shares
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            Files shared by team members
          </p>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-50 animate-pulse rounded-3xl" />)}
        </div>
      )}

      {!loading && files.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
          <FaFolderOpen className="text-slate-300 mb-4" size={48} />
          <p className="text-slate-500 font-medium tracking-tight">Your shared inbox is empty</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((f) => (
          <div
            key={f.share_id}
            className="group relative bg-white border border-slate-200/60 p-5 rounded-[1.8rem] hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => viewSharedFile(f.share_id)}
          >
            <div className="absolute top-0 left-0 px-4 py-1.5 bg-blue-50 rounded-br-2xl">
               <span className="text-[10px] font-black text-blue-600 tracking-tighter uppercase italic">
                 Sender ID: {f.shared_by_employee_id}
               </span>
            </div>

            <div
              className="absolute top-4 right-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                onClick={() => setOpenMenuId(openMenuId === f.share_id ? null : f.share_id)}
              >
                <FaEllipsisV size={14} />
              </button>

              {openMenuId === f.share_id && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 animate-in zoom-in duration-150"
                >
                  <button
                    onClick={() => { setOpenMenuId(null); viewSharedFile(f.share_id); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-slate-100 rounded-xl text-sm font-semibold text-slate-700"
                  >
                    <FaEye className="text-blue-500" /> View
                  </button>

                  {f.can_download && (
                    <>
                      <button
                        onClick={() => { setOpenMenuId(null); downloadSharedFile(f.share_id, f.file_name); }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-slate-100 rounded-xl text-sm font-semibold text-slate-700"
                      >
                        <FaDownload className="text-emerald-500" /> Download
                      </button>

                      <button
                        onClick={() => { setOpenMenuId(null); addToMyFiles(f.file_id); }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-indigo-50 rounded-xl text-sm font-semibold text-indigo-600"
                      >
                        <FaPlus /> Copy to My Vault
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center bg-slate-50 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                {getIcon(f.file_type)}
              </div>
              
              <div className="mt-4 w-full px-2">
                <h4 className="font-bold text-slate-800 truncate text-lg tracking-tight">
                  {f.file_name}
                </h4>
                <div className="mt-1 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400">
                   <span className="uppercase tracking-widest">{f.file_type || "Unknown"}</span>
                   <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                   <span>SHARED SECURELY</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <FaUser size={12} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Shared By</span>
                    <span className="text-xs font-bold text-slate-700">{f.shared_by_name}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                   <FaCalendarAlt size={10} />
                   <span>Recent</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Original Owner</p>
                 <div className="flex justify-between items-center text-[12px] font-semibold text-slate-600">
                   <span>{f.owner_name}</span>
                   <span className="text-[10px] bg-white px-2 py-0.5 rounded border text-slate-400">ID: {f.owner_employee_id}</span>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileShareView;