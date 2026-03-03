import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { useNavigate } from "react-router-dom";

function HrAdEmployeeTaskReport({ employeeId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();   // ✅ NEW

  useEffect(() => {
    if (employeeId) getTasks();
  }, [employeeId]);

  const getTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/api/tasks/task_manage/?em_id=${employeeId}`,
        TOCKEN_ONLY()
      );

      setTasks(res.data);

    } catch (err) {
      console.log(err.response?.data);
      alert("Error loading tasks");
    }

    setLoading(false);
  };

  if (!employeeId)
    return <p className="p-4 text-gray-500">Select employee to view tasks</p>;

  if (loading)
    return <p className="p-4">Loading tasks...</p>;

  return (
    <div className="p-4">

      
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm"
      >
        ← Back
      </button>

      <h2 className="text-xl font-bold mb-4">
        Employee Tasks
      </h2>

      {tasks.length === 0 && <p>No Tasks Found</p>}

      <div className="space-y-4">
        {tasks.map((t, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 bg-white shadow"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{t.title}</h3>

              <span className="text-xs px-2 py-1 rounded bg-yellow-500 text-white">
                {t.status}
              </span>
            </div>

            <p className="text-gray-600 mt-1">
              {t.description}
            </p>

            <div className="flex gap-3 mt-2 flex-wrap">

              {t.team_lead_file && (
                <a
                  href={`${BASE_URL}${t.team_lead_file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                >
                  Team Lead File
                </a>
              )}

              {t.employee_file && (
                <a
                  href={`${BASE_URL}${t.employee_file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                >
                  Employee File
                </a>
              )}
            </div>

            <div className="flex justify-between mt-3 text-xs text-gray-400">
              <span>
                Created: {new Date(t.created_at).toLocaleDateString()}
              </span>

              {t.team_lead_name && (
                <span>
                  Team Lead: <span className="font-semibold">{t.team_lead_name}</span>
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default HrAdEmployeeTaskReport;
