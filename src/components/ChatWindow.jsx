import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { HiOutlinePaperAirplane, HiOutlineUser, HiOutlinePaperClip } from "react-icons/hi";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";

const socket = io("http://localhost:4000");

function ChatWindow({ user, token, roomId }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const myId = Number(localStorage.getItem("user_id"));

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!roomId) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/chat/messages/${roomId}/`,
          TOCKEN_ONLY()
        );
        setMessages(res.data);
        socket.emit("join_room", roomId);
      } catch (err) {
        console.log("Load old messages error", err);
      }
    };

    loadMessages();

    socket.off("receive_message");
    socket.on("receive_message", (msg) => {
      if (msg.room_id === roomId) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => socket.off("receive_message");
  }, [roomId]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("send_message", {
      receiver_id: user.id,
      text,
      token,
    });
    setText("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 md:rounded-2xl shadow-lg border-x md:border border-slate-200 overflow-hidden">
      
      {/* Header - Responsive height & Image support */}
      <div className="bg-white p-3 md:p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm overflow-hidden border border-slate-100">
            {user?.image ? (
              <img 
                src={user.image} 
                alt={user.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              user?.name ? user.name.charAt(0).toUpperCase() : <HiOutlineUser />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-slate-800 text-sm md:text-base leading-tight">
              {user?.name || "Chat"}
            </h2>
          </div>
        </div>
      </div>

      {/* Message Area - Responsive padding & Bubble Width */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 bg-[#f8fafc]">
        {messages.map((m, i) => {
          const isMe = m.sender === myId;
          return (
            <div 
              key={i} 
              className={`flex w-full ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-1`}
            >
              <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
                <div
                  className={`relative px-3 py-2 md:px-4 md:py-2.5 rounded-2xl text-sm md:text-base shadow-sm transition-all ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
                  }`}
                >
                  {/* Image support in message (if your backend sends 'm.image') */}
                  {m.image && (
                    <img 
                      src={m.image} 
                      alt="shared" 
                      className="rounded-lg mb-2 max-w-full max-h-60 object-cover"
                    />
                  )}
                  
                  <p className="pr-8 md:pr-10 text-sm md:text-[15px] leading-relaxed">
                    {m.text}
                  </p>
                  
                  <span className={`absolute bottom-1 right-2 text-[8px] md:text-[10px] font-medium opacity-70 ${isMe ? "text-indigo-100" : "text-slate-400"}`}>
                    {formatTime(m.created_at || new Date())}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Compact on mobile */}
      <div className="p-3 md:p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2 items-center">
          {/* Optional Attachment Button for images */}
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors hidden md:block">
            <HiOutlinePaperClip size={20} />
          </button>
          
          <div className="flex-1 flex gap-2 items-center bg-slate-50 p-1 md:p-1.5 rounded-2xl border border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all duration-200">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-transparent border-none focus:ring-0 px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="Type message..."
            />
            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className={`p-2 md:p-2.5 rounded-xl transition-all ${
                text.trim() 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <HiOutlinePaperAirplane className="rotate-90" size={18} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ChatWindow;