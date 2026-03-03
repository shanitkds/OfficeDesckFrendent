import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";

function ChatList({ onSelectUser, selectedUser, onSelectRoom }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");   // ⭐ NEW

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/chat/chatusers/`,
        TOCKEN_ONLY()
      );
      setUsers(res.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const openChat = async (user) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/chat/get-or-create-room/`,
        { receiver_id: user.id },
        TOCKEN_ONLY()
      );

      const roomId = res.data.room_id;

      onSelectUser(user);
      onSelectRoom(roomId);

    } catch (error) {
      console.log("Room create error:", error);
    }
  };

  // ⭐ FILTER USERS
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-4 space-y-2">

        {/* ⭐ SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-2"
        />

        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {!loading && filteredUsers.length === 0 && (
          <p className="text-center text-gray-500">
            No users found
          </p>
        )}

        {!loading &&
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => openChat(user)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
                ${
                  selectedUser?.id === user.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
            >
              <img
                src={user.image || "https://via.placeholder.com/40"}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {user.name || "No Name"}
                </h3>
                <p className="text-xs text-gray-500">
                  {user.user_type}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChatList;