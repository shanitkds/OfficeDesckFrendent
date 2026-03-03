import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTasks, FaClock } from "react-icons/fa";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";

function EmployeTaskView() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${BASE_URL}/api/tasks/task_manage/`,
        TOCKEN_ONLY()
      );

      const data = res.data.results || res.data || [];
      setTasks(data);
      console.log(data);
      

    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.detail || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status = "") => {
    switch (status.toUpperCase()) {
      case "ASSIGNED": return "bg-blue-600 text-white";
      case "SUBMITTED": return "bg-amber-500 text-white";
      case "RESUBMITTED": return "bg-purple-600 text-white";
      case "APPROVED": return "bg-emerald-600 text-white";
      case "REJECTED": return "bg-rose-600 text-white";
      default: return "bg-slate-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">

      
      <div className="flex items-center gap-4 mb-6">

        <h2 className="text-2xl font-bold"> My Tasks</h2>
      </div>

      {loading && (
        <div className="text-center py-20 text-gray-500">
          Loading tasks...
        </div>
      )}

    
      {!loading && error && (
        <div className="text-center py-10 text-red-500 font-semibold">
          {error}
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <FaTasks className="mx-auto text-5xl mb-3" />
          No tasks found
        </div>
      )}

      <div className="flex flex-col gap-4 max-w-xl">
        {tasks.map((task) => (
          <div
            key={task.id || Math.random()}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg cursor-pointer transition"
            onClick={() => navigate(`/employee/tasksubmition/${task.id}`)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg truncate">
                {task.title || "No Title"}
              </h3>

              <span
                className={`px-3 py-1 text-xs rounded-lg ${getStatusStyle(task.status)}`}
              >
                {task.status || "UNKNOWN"}
              </span>
            </div>

            <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
              <FaClock />
              {task.created_at
                ? new Date(task.created_at).toLocaleDateString()
                : "No date"}
            </div>

            <div className="text-xs mt-2 text-gray-600">
              Assigned by: {task.team_lead_name || "N/A"}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default EmployeTaskView;
