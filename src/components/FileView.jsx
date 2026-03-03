import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import {
  FaFileAlt, FaFilePdf, FaFileExcel, FaFileImage,
  FaFileArchive, FaFile, FaDownload, FaShareAlt,
  FaEye, FaEllipsisV, FaTrashAlt
} from "react-icons/fa";
import FileShareUserList from "./FileShareUserList";

function FileView() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareFileId, setShareFileId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/encryptfile/file-list-view/`,
        TOCKEN_ONLY()
      );
      setFiles(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    if (!type) return <FaFile size={32} className="text-slate-400" />;
    type = type.toLowerCase();
    if (type.includes("pdf")) return <FaFilePdf size={32} className="text-rose-500" />;
    if (type.includes("xls")) return <FaFileExcel size={32} className="text-emerald-500" />;
    if (type.includes("jpg") || type.includes("png"))
      return <FaFileImage size={32} className="text-violet-500" />;
    if (type.includes("zip") || type.includes("rar"))
      return <FaFileArchive size={32} className="text-amber-500" />;
    return <FaFileAlt size={32} className="text-blue-500" />;
  };

  const viewFile = async (id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/encryptfile/${id}/view/`,
        { ...TOCKEN_ONLY(), responseType: "blob" }
      );
      const url = URL.createObjectURL(res.data);
      window.open(url);
    } catch {
      alert("Cannot open file");
    }
  };

  const downloadFile = async (id, name = "file") => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/encryptfile/${id}/export/`,
        { ...TOCKEN_ONLY(), responseType: "blob" }
      );
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Download failed");
    }
  };

  const deleteFile = async (id) => {
    if (!window.confirm("Delete this file permanently?")) return;
    try {
      await axios.delete(
        `${BASE_URL}/api/encryptfile/add-sharefile/${id}/`,
        TOCKEN_ONLY()
      );
      setFiles(files.filter((f) => f.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">📁 File Explorer</h2>
            <p className="text-slate-500 text-sm font-medium">Access and manage your encrypted documents</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-44 bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <div
                key={file.id}
                className="group relative rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                onClick={() => viewFile(file.id)}
              >
                {/* Menu */}
                <div className="absolute top-5 right-5" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                  >
                    <FaEllipsisV />
                  </button>

                  {openMenuId === file.id && (
                    <div ref={menuRef} className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors" onClick={() => viewFile(file.id)}>
                        <FaEye className="text-indigo-500" /> View File
                      </button>
                      <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors" onClick={() => downloadFile(file.id, file.original_name)}>
                        <FaDownload className="text-emerald-500" /> Download
                      </button>
                      <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors" onClick={() => setShareFileId(file.id)}>
                        <FaShareAlt className="text-blue-500" /> Share File
                      </button>
                      <div className="border-t border-slate-50" />
                      <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors" onClick={() => deleteFile(file.id)}>
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {getIcon(file.file_type)}
                  </div>
                  <div className="overflow-hidden pr-6">
                    <h4 className="font-bold text-slate-800 truncate leading-tight mb-1" title={file.original_name}>
                      {file.original_name}
                    </h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {file.file_type || 'Unknown'}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-50 grid grid-cols-2 gap-4 text-[11px]">
                   <div>
                      <p className="text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Owner</p>
                      <p className="text-slate-700 font-bold truncate">{file.owner_name}</p>
                   </div>
                   <div>
                      <p className="text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Emp ID</p>
                      <p className="text-slate-700 font-bold">{file.owner_employee_id}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && files.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
             <div className="text-slate-200 mb-4 text-6xl">📂</div>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No files found</p>
          </div>
        )}

        {shareFileId && (
          <FileShareUserList
            fileId={shareFileId}
            onClose={() => setShareFileId(null)}
          />
        )}
      </div>
    </div>
  );
}

export default FileView;