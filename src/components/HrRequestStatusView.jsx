import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";

function HrRequestStatusView() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/api/hr/user-creation-request/`,
        TOCKEN_ONLY()
      );

      setRequests(res.data || []);
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to load requests");
    }
    setLoading(false);
  };

  const statusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-slate-50">

      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        My Employee Requests
      </h2>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && requests.length === 0 && (
        <div className="text-gray-400 text-center mt-20">
          No Requests Found
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-5 rounded-2xl shadow border hover:shadow-lg transition"
          >

            <div className="flex items-center gap-3 mb-2">
              <FaUser className="text-blue-500" />
              <h3 className="font-bold text-lg">{req.name}</h3>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              Email: {req.email}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              Role: <span className="font-semibold">{req.user_type}</span>
            </p>

            <p className="text-sm text-gray-600 mb-1">
              Action: <span className="font-semibold">{req.action}</span>
            </p>

            <p className="text-sm text-gray-600 mb-2">
              Requested by: {req.hr_name || "You"}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle(req.status)}`}
            >
              {req.status}
            </span>

            <p className="text-xs text-gray-400 mt-3">
              Created: {req.created_at
                ? new Date(req.created_at).toLocaleString()
                : ""}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default HrRequestStatusView;
