import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";

function ChatRoomList({ onSelectRoom, selectedRoom, onSelectUser }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [selectedRoom]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/chat/rooms/`,
        TOCKEN_ONLY()
      );
      setRooms(res.data);
    } catch (err) {
      console.log("Room fetch error", err);
    }
  };

  return (
    <div className="p-3 space-y-2">
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => {
            onSelectRoom(room.id);
            onSelectUser(room.chat_with);
          }}
          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer
          ${selectedRoom === room.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
        >
          <img
            src={room.chat_with.image || "https://via.placeholder.com/40"}
            className="w-10 h-10 rounded-full"
            alt="user"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-sm">
              {room.chat_with.name}
            </h3>
          </div>

          {room.unread_count > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {room.unread_count}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatRoomList;