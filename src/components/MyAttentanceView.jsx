import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL, TOCKEN_ONLY } from '../api/baseurl';
import toast, { Toaster } from 'react-hot-toast';

function MyAttentanceView() {
    const [employeeId, setEmployeeId] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleView = async () => {
        if (!month || !year) {
            toast.error("Please select both month and year");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("Fetching attendance records...");

        try {
            const res = await axios.get(
                `${BASE_URL}/api/attendance/view/?month=${year}-${month}`,
                TOCKEN_ONLY()
            );

            if (res.data.attendance?.length === 0) {
                toast.error("No records found for this period", { id: loadingToast });
            } else {
                toast.success("Data loaded successfully", { id: loadingToast });
            }

            setData(res.data);
        } catch (err) {
            console.log("Fetch Error:", err.response?.data || err.message);
            toast.error("Could not find data for the given criteria", { id: loadingToast });
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    // ⭐ format time
    const formatTime = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="w-full min-h-screen ">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="w-full bg-white shadow-xl overflow-hidden border border-gray-100 min-h-screen">

                <div className="bg-white border-b px-8 py-6">
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">
                        Attendance Dashboard
                    </h2>
                    <p className="text-gray-500 mt-1">Search and analyze employee attendance logs.</p>
                </div>

                <div className="p-8">

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Month</label>
                            <select
                                className="w-full border-2 border-gray-100 p-4 rounded-2xl bg-gray-50"
                                onChange={(e) => setMonth(e.target.value)}
                            >
                                <option value="">Select Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Year</label>
                            <select
                                className="w-full border-2 border-gray-100 p-4 rounded-2xl bg-gray-50"
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="">Select Year</option>
                                <option>2026</option>
                                <option>2025</option>
                                <option>2024</option>
                            </select>
                        </div>

                        <div className="flex flex-col justify-end">
                            <button
                                onClick={handleView}
                                disabled={loading}
                                className={`w-full py-4 rounded-2xl font-black text-white ${
                                    loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? "Loading..." : "View Records"}
                            </button>
                        </div>
                    </div>

                    {/* RESULT */}
                    {data && (
                        <div className="mt-8">

                            <div className="flex justify-between mb-8 bg-blue-50 p-6 rounded-3xl border border-blue-100">
                                <div>
                                    <h3 className="font-black text-2xl text-blue-900">
                                        {data.target_user}
                                    </h3>
                                    <span className="text-blue-600 font-bold">
                                        Employee ID: {data.employee_id}
                                    </span>
                                </div>
                                <div className="bg-white px-6 py-2 rounded-full shadow-sm text-sm font-bold text-gray-500">
                                    {month}/{year} Report
                                </div>
                            </div>

                            {/* Table */}
                            <div className="w-full overflow-hidden border border-gray-100 rounded-3xl shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Date</th>
                                                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Status</th>
                                                {/* ⭐ NEW COLUMN */}
                                                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Time</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data?.attendance?.length > 0 ? (
                                                data.attendance.map((a, i) => (
                                                    <tr key={i} className="hover:bg-gray-50">
                                                        <td className="p-5 font-bold">{a.date}</td>

                                                        <td className="p-5">
                                                            <span className={`px-4 py-1 rounded-xl text-xs font-black ${
                                                                a.status === 'Present' || a.status === 'FULL_DAY'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : a.status === 'Absent' || a.status === 'ABSENT'
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : 'bg-orange-100 text-orange-700'
                                                            }`}>
                                                                {a.status.replace('_', ' ')}
                                                            </span>
                                                        </td>

                                                        {/* ⭐ SHOW TIME */}
                                                        <td className="p-5 font-semibold text-gray-600">
                                                            {formatTime(a.updated_at)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center py-20 text-gray-400">
                                                        No records found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>

                                    </table>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default MyAttentanceView;
