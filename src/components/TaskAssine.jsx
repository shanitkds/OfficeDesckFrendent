import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import toast, { Toaster } from "react-hot-toast";

// React Icons for better UI
import { FaUserAlt, FaCalendarAlt, FaFileUpload, FaTasks } from "react-icons/fa";

function TaskAssine() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/team_lead/userslist/`, TOCKEN_ONLY());
      setEmployees(res.data);
    } catch (err) {
      console.log("Employee list error", err);
      toast.error("Failed to load employee list");
    }
  };

  const sendTask = async (e) => {
    e.preventDefault();

    if (!employeeId || !title) {
      toast.error("Employee and Title are required! ❌");
      return;
    }

    const loadingToast = toast.loading("Creating task...");

    try {
      const formData = new FormData();
      formData.append("employee_id", employeeId);
      formData.append("title", title);
      formData.append("description", description);

      if (lastDate) formData.append("last_submission_date", lastDate);
      if (file) formData.append("team_lead_file", file);

      await axios.post(`${BASE_URL}/api/tasks/task_manage/`, formData, TOCKEN_ONLY());

      toast.success("Task Created Successfully ✅", { id: loadingToast });

      // Clear form
      setEmployeeId("");
      setTitle("");
      setDescription("");
      setLastDate("");
      setFile(null);
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Task Creation Failed ❌", { id: loadingToast });
    }
  };

  return (
    <div className="w-full min-h-full bg-white p-4 md:p-8">
      {/* Toast Container positioned top-right */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <FaTasks className="text-2xl text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Assign Task</h2>
      </div>

      <form onSubmit={sendTask} className="w-full space-y-6">
        
        {/* Row 1: Employee Selection & Task Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
              <FaUserAlt className="text-blue-500" /> Select Employee *
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">Choose an employee...</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} - {emp.employeez_id}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-2">Task Title *</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Enter task heading"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: Description (Full Width) */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-600 mb-2">Task Description</label>
          <textarea
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Provide detailed instructions..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Row 3: Deadline & File Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
              <FaCalendarAlt className="text-red-500" /> Last Submission Date
            </label>
            <input
              type="datetime-local"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 text-gray-600"
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
              <FaFileUpload className="text-green-500" /> Reference File (Optional)
            </label>
            <input
              type="file"
              className="w-full p-2.5 border border-dashed border-gray-400 rounded-xl bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-max px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 uppercase tracking-wider text-sm"
          >
            Assign Task Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskAssine;