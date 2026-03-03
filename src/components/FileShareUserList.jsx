import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";

function FileShareUserList({ fileId, onClose }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [fileId]);

  const loadUsers = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/encryptfile/share-users/${fileId}/`,TOCKEN_ONLY()
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading users");
    } finally {
      setLoading(false);
    }
  };

  const shareFile = async (userId) => {
    try {
      await axios.post(
        `${BASE_URL}/api/encryptfile/${fileId}/export/`,
        { shared_with: userId },
       TOCKEN_ONLY()
      );

      alert("File Shared Successfully!");
      onClose();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error||"Share failed");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="
          bg-white 
          w-full sm:w-[420px] 
          max-h-[85vh] 
          overflow-y-auto 
          rounded-t-2xl sm:rounded-2xl 
          p-4 sm:p-6 
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Share File
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500 text-center">No users available</p>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u.id}
                className="
                  flex items-center gap-3 
                  p-3 rounded-xl border 
                  hover:bg-gray-50 transition
                "
              >
                <img
                  src={u.image || "/default-user.png"}
                  alt="user"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {u.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {u.email}
                  </p>
                  <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    {u.user_type}
                  </span>
                </div>

                <button
                  onClick={() => shareFile(u.id)}
                  className="
                    bg-blue-600 text-white 
                    px-3 py-1 
                    text-xs sm:text-sm
                    rounded-lg 
                    hover:bg-blue-700 transition
                  "
                >
                  Share
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="
            mt-5 w-full 
            bg-gray-200 hover:bg-gray-300 
            text-gray-800 py-2 
            rounded-lg text-sm sm:text-base
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default FileShareUserList;
