import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import toast, { Toaster } from "react-hot-toast"; // ⭐ Added toast

function ManualAttentance() {
    const [employeeId, setEmployeeId] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("FULL_DAY");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employeeId || !date) {
            toast.error("Please enter both Employee ID and Date"); // ⭐ Replaced alert
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading("Saving attendance..."); // ⭐ Loading state toast

        try {
            await axios.patch(
                `${BASE_URL}/api/attendance/manual-attendance/`,
                {
                    employee_id: employeeId,
                    date: date,
                    status: status,
                },
                TOCKEN_ONLY()
            );

            toast.success("Attendance marked successfully ✅", { id: loadingToast });
            
            setEmployeeId("");
            setDate("");
            setStatus("FULL_DAY");

        } catch (err) {
            console.error(err.response?.data);
            const errMsg = err.response?.data?.detail || "Error marking attendance ❌";
            toast.error(errMsg, { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // Changed to w-full and removed flex-center to take full screen width
        <div className="w-full  bg-white p-4 md:p-10">
            <Toaster position="top-right" reverseOrder={false} />
            
            <div className="w-full border-b pb-6 mb-8">
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
                    Manual Attendance Entry
                </h1>
                <p className="text-gray-500 mt-2">
                    Override or update employee attendance records across the organization.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-8">
                {/* Full Width Grid: 
                   1 column on mobile, 3 columns on desktop 
                */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Employee ID Field */}
                    <div className="flex flex-col">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                            Employee Identifier
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. EM-123abc"
                            className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-gray-700"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        />
                    </div>

                    {/* Date Field */}
                    <div className="flex flex-col">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                            Effective Date
                        </label>
                        <input
                            type="date"
                            className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-gray-700"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    {/* Status Select */}
                    <div className="flex flex-col">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                            Attendance Status
                        </label>
                        <select
                            className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-gray-700 appearance-none cursor-pointer"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="FULL_DAY">Full Day (Present)</option>
                            <option value="HALF_DAY">Half Day</option>
                            <option value="ABSENT">Absent</option>
                        </select>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-400 italic">
                        Note: This action will overwrite existing logs for the selected date.
                    </p>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full md:w-64 py-4 rounded-2xl font-bold text-white transition-all shadow-xl active:scale-95 ${
                            isSubmitting 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 shadow-blue-100 hover:shadow-blue-200"
                        }`}
                    >
                        {isSubmitting ? "Processing..." : "Save Attendance"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ManualAttentance;