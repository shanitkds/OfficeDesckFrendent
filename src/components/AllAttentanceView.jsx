import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL, TOCKEN_ONLY } from '../api/baseurl';
import toast, { Toaster } from 'react-hot-toast';

function AllAttentanceView() {
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
                `${BASE_URL}/api/attendance/view/?employee_id=${employeeId}&month=${year}-${month}`,
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

    // ✅ NEW FUNCTION → DOWNLOAD PDF
    const downloadPDF = async () => {
        if (!month || !year) {
            toast.error("Please select both month and year");
            return;
        }

        try {
            const res = await axios.get(
                `${BASE_URL}/api/report/attendance/pdf/?employee_id=${employeeId}&month=${year}-${month}`,
                {
                    ...TOCKEN_ONLY(),
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `attendance_${employeeId || "my"}_${year}-${month}.pdf`
            );
            document.body.appendChild(link);
            link.click();

            toast.success("PDF downloaded successfully");
        } catch (err) {
            toast.error("PDF download failed");
            console.log(err);
        }
    };

    return (
        <div className="w-full p-4 md:p-10">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="w-full bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">

                <div className="bg-white border-b px-8 py-6">
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">
                        Attendance Dashboard
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Search and analyze employee attendance logs.
                    </p>
                </div>

                <div className="p-8">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                                Employee ID
                            </label>
                            <input
                                placeholder="Optional (e.g. EM-101)"
                                className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-all"
                                onChange={(e) => setEmployeeId(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                                Month
                            </label>
                            <select
                                className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-all appearance-none cursor-pointer"
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
                            <label className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                                Year
                            </label>
                            <select
                                className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-all appearance-none cursor-pointer"
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="">Select Year</option>
                                <option>2026</option>
                                <option>2025</option>
                                <option>2024</option>
                            </select>
                        </div>

                        <div className="flex flex-col justify-end gap-3">

                            <button
                                onClick={handleView}
                                disabled={loading}
                                className={`w-full py-4 rounded-2xl font-black text-white transition-all shadow-lg active:scale-95 ${
                                    loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
                                }`}
                            >
                                {loading ? "Loading..." : "View Records"}
                            </button>

                            {/* ✅ NEW BUTTON */}
                            <button
                                onClick={downloadPDF}
                                className="w-full py-4 rounded-2xl font-black text-white bg-green-600 hover:bg-green-700 shadow-lg active:scale-95"
                            >
                                Download PDF
                            </button>

                        </div>
                    </div>

                    {data && (
                        <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-blue-50 p-6 rounded-3xl border border-blue-100">
                                <div>
                                    <h3 className="font-black text-2xl text-blue-900">
                                        {data.target_user}
                                    </h3>
                                    <span className="text-blue-600 font-bold">
                                        Employee ID: {data.employee_id}
                                    </span>
                                </div>

                                <div className="mt-4 md:mt-0 bg-white px-6 py-2 rounded-full shadow-sm text-sm font-bold text-gray-500">
                                    {month}/{year} Report
                                </div>
                            </div>

                            <div className="w-full overflow-hidden border border-gray-100 rounded-3xl shadow-sm">
                                <div className="overflow-x-auto">

                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="p-5 font-bold text-gray-400 uppercase text-xs tracking-widest">
                                                    Date
                                                </th>
                                                <th className="p-5 font-bold text-gray-400 uppercase text-xs tracking-widest">
                                                    Attendance Status
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-50">
                                            {data?.attendance?.length > 0 ? (
                                                data.attendance.map((a, i) => (
                                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="p-5 text-gray-700 font-bold">
                                                            {a.date}
                                                        </td>

                                                        <td className="p-5">
                                                            <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight ${
                                                                a.status === 'Present' || a.status === 'FULL_DAY'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : a.status === 'Absent' || a.status === 'ABSENT'
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : 'bg-orange-100 text-orange-700'
                                                            }`}>
                                                                {a.status.replace('_', ' ')}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="text-center py-20 text-gray-400 font-medium">
                                                        No detailed records found for this selection.
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

export default AllAttentanceView;