import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Photo from "./Photo";
import GetLocation from "./GetLocation";
import { BASE_URL, TOCKEN_ONLY, } from "../api/baseurl";

import { FaCamera, FaMapMarkerAlt, FaCheckCircle, FaUserCheck, FaUndo } from "react-icons/fa";
import { MdError, MdCloudUpload } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function AttendanceMarking() {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("System Ready");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const sentRef = useRef(false);

  const [showRequest, setShowRequest] = useState(false);
  const [reason, setReason] = useState("");

  // ---------- PHOTO ----------
  const handleCapture = (image) => {
    console.log("📷 Photo captured");
    setPhoto(image);
    setStatus("Photo captured ✅");
  };

  // ---------- LOCATION ----------
  const handleLocation = (loc) => {
    console.log("📍 LOCATION RECEIVED:", loc);
    setLocation(loc);
    setStatus("Location captured ✅");
  };

  // ---------- RESET ----------
  const handleReset = () => {
    setPhoto(null);
    setLocation(null);
    setStatus("System Ready");
    setIsError(false);
    setIsSuccess(false);
    setShowRequest(false);
    setReason("");
    sentRef.current = false;
    setResetKey(prev => prev + 1);
  };

  // ---------- AUTO SEND ----------
  useEffect(() => {
    if (photo && location && !sentRef.current) {
      console.log("🚀 Sending attendance...");
      sentRef.current = true;
      sendAttendance();
    }
  }, [photo, location]);

  // ---------- BASE64 TO FILE ----------
  const base64ToFile = (base64) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], "attendance.jpg", { type: mime });
  };

  // ---------- SEND ATTENDANCE ----------
  const sendAttendance = async () => {
    try {
      setIsError(false);
      setShowRequest(false);
      setStatus("Sending attendance...");

      const formData = new FormData();
      formData.append("face_image", base64ToFile(photo));
      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);

      console.log("📤 Sending:", location.lat, location.lng);

      const response = await axios.post(
        `${BASE_URL}/api/attendance/mark-attentance/`,
        formData,
        TOCKEN_ONLY()
      );

      setIsSuccess(true);
      setStatus(response?.data?.message || "Attendance Success");

    } catch (err) {
      console.error("❌ Attendance Error:", err);
      sentRef.current = false;
      setIsError(true);
      setShowRequest(true);

      const errorMsg = err?.response?.data?.detail || "Process Failed";
      setStatus("Failed: " + errorMsg);
    }
  };

  // ---------- SEND REQUEST ----------
  const sendRequest = async () => {
    if (!reason) {
      alert("Please enter reason");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/attendance/attentance-request/`,
        { reason },
        TOCKEN_ONLY()
      );

      alert("Attendance request sent ✅");
      setShowRequest(false);
      setReason("");
    } catch (err) {
      alert(err.response?.data?.error || "Request failed ❌");
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
      <div className="w-full shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100">

        {/* Header */}
        <div className="bg-indigo-700 p-5 md:p-8 text-center text-white relative">
          <div className="inline-block p-3 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
            <FaUserCheck className="text-2xl md:text-3xl" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest">Attendance</h2>
          <p className="text-indigo-100 text-xs md:text-sm mt-1 opacity-80">
            Biometric & GPS Verification
          </p>
        </div>

        <div className="p-4 md:p-8 space-y-6">

          {/* STATUS */}
          <div className={`flex items-center justify-between p-4 rounded-xl border-l-4 ${
            isError ? "bg-red-50 border-red-500 text-red-700" :
            isSuccess ? "bg-green-50 border-green-500 text-green-700" :
            "bg-blue-50 border-blue-500 text-blue-700"
          }`}>
            <div className="flex items-center gap-3">
              {status.includes("Sending") ? (
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              ) : isError ? (
                <MdError size={20} />
              ) : isSuccess ? (
                <FaCheckCircle size={20} />
              ) : (
                <MdCloudUpload size={20} />
              )}
              <span className="text-sm md:text-base font-bold">{status}</span>
            </div>
          </div>

          {/* PHOTO */}
          <div className={`p-4 rounded-xl border-2 ${photo ? 'border-green-200 bg-green-50/20' : 'border-gray-100 bg-gray-50/50'}`}>
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2 font-bold text-xs uppercase text-gray-600 tracking-wide">
                <FaCamera className={photo ? "text-green-500" : "text-indigo-400"} />
                Identity Check
              </div>
              {photo && <FaCheckCircle className="text-green-500 animate-pulse" />}
            </div>
            <Photo key={`photo-${resetKey}`} onCapture={handleCapture} />
          </div>

          {/* LOCATION */}
          <div className={`p-4 rounded-xl border-2 ${location ? 'border-green-200 bg-green-50/20' : 'border-gray-100 bg-gray-50/50'}`}>
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2 font-bold text-xs uppercase text-gray-600 tracking-wide">
                <FaMapMarkerAlt className={location ? "text-red-500" : "text-indigo-400"} />
                Location Fix
              </div>
              {location && <FaCheckCircle className="text-green-500" />}
            </div>
            <GetLocation key={`loc-${resetKey}`} onLocation={handleLocation} />
          </div>

          {/* RESET */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-bold"
          >
            <FaUndo /> Reset System
          </button>

          {/* REQUEST */}
          {showRequest && (
            <div className="mt-4 p-4 border rounded-xl bg-yellow-50 space-y-2">
              <h3 className="font-bold text-sm text-yellow-700">
                Attendance Failed - Send Request
              </h3>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason..."
                className="w-full border p-2 rounded"
              />

              <button
                onClick={sendRequest}
                className="bg-orange-600 text-white w-full p-2 rounded"
              >
                Send Attendance Request
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AttendanceMarking;