import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FaUpload, FaCloudUploadAlt, FaFileAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage("");
    if (selectedFile) {
      toast.success(`Selected: ${selectedFile.name}`, { icon: '📎' });
    }
  };

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/encryptfile/upload/`,
        formData,
       TOCKEN_ONLY()
      );

      setMessage(`✅ Uploaded: ${res.data.file_name}`);
      toast.success("File uploaded and encrypted!");
      setFile(null);
    } catch (err) {
      console.log(err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-1 sm:p-0">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
          <div className="inline-block p-3 bg-white/20 rounded-2xl backdrop-blur-md mb-3">
            <FaCloudUploadAlt size={32} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight flex justify-center items-center gap-2">
            File Uploader
          </h2>
          <p className="text-blue-100 text-xs font-medium uppercase tracking-widest mt-1">
            Secure Encryption Enabled
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="relative group mb-6">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`
              border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-200
              ${file ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50 group-hover:border-blue-400 group-hover:bg-blue-50'}
            `}>
              <FaFileAlt className={`mb-3 ${file ? 'text-green-500' : 'text-gray-400'}`} size={30} />
              <span className="text-sm font-semibold text-gray-600">
                {file ? "Change selected file" : "Click or Drag to select file"}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                Maximum size: 25MB
              </span>
            </div>
          </div>

          {/* Selection Preview */}
          {file && (
            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl mb-6 animate-in fade-in slide-in-from-top-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <FaFileAlt size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {file.name}
                </p>
                <p className="text-[10px] text-gray-500 font-bold uppercase">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <FaCheckCircle className="text-green-500" />
            </div>
          )}

          <button
            onClick={uploadFile}
            disabled={loading}
            className={`
              w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300
              ${loading 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-gray-900 text-white hover:bg-blue-600 hover:shadow-lg active:scale-95"}
            `}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-blue-600 rounded-full animate-spin" />
                Encrypting...
              </>
            ) : (
              <>
                <FaUpload /> Start Upload
              </>
            )}
          </button>

          {message && (
            <div className="mt-6 flex items-center justify-center gap-2 text-green-600 bg-green-50 py-3 rounded-xl border border-green-100 animate-in zoom-in duration-300">
              <FaCheckCircle size={14} />
              <span className="text-sm font-bold uppercase tracking-tighter italic">
                {message}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-center mt-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
        End-to-end encrypted file sharing system
      </p>
    </div>
  );
}

export default FileUpload;