import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import ChatRoomList from "./ChatRoomList";
import { HiPlus, HiX, HiChevronLeft } from "react-icons/hi"; // Added Chevron for mobile 'back'

function ChatMain() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showNewChat, setShowNewChat] = useState(false);

    const token = localStorage.getItem("token");

    // Helper to reset selection (used for the mobile 'Back' button)
    const handleBackToList = () => {
        setSelectedUser(null);
        setSelectedRoom(null);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] bg-slate-50 overflow-hidden md:rounded-2xl md:border border-slate-200 shadow-sm">

            {/* CHAT LIST POPUP */}
            {showNewChat && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowNewChat(false)} />
                    
                    <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-bold text-slate-800">Start New Chat</h2>
                            <button
                                onClick={() => setShowNewChat(false)}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                            >
                                <HiX size={20} />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto">
                            <ChatList
                                onSelectUser={(user) => {
                                    setSelectedUser(user);
                                    setShowNewChat(false);
                                }}
                                selectedUser={selectedUser}
                                onSelectRoom={setSelectedRoom}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* LEFT SIDE - Sidebar */}
            {/* Logic: Hide on mobile if a user/room is selected */}
            <div className={`
                ${(selectedUser || selectedRoom) ? 'hidden' : 'flex'} 
                md:flex w-full md:w-80 bg-white border-r border-slate-200 flex-col
            `}>
                <div className="p-5 border-b border-slate-100">
                    <button
                        onClick={() => setShowNewChat(true)}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-100"
                    >
                        <HiPlus size={20} />
                        New Message
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <ChatRoomList
                        onSelectRoom={setSelectedRoom}
                        selectedRoom={selectedRoom}
                        onSelectUser={setSelectedUser}
                    />
                </div>
            </div>

            {/* RIGHT SIDE – Chat Window */}
            {/* Logic: Show on mobile ONLY if a user/room is selected */}
            <div className={`
                ${!(selectedUser || selectedRoom) ? 'hidden' : 'flex'} 
                md:flex flex-1 bg-[#f8fafc] flex-col h-full relative
            `}>
                {selectedUser || selectedRoom ? (
                    <div className="h-full w-full p-2 md:p-4 lg:p-6 flex flex-col">
                        {/* Mobile Back Button - Hidden on desktop */}
                        <div className="md:hidden mb-2">
                            <button 
                                onClick={handleBackToList}
                                className="flex items-center gap-1 text-indigo-600 font-medium p-2"
                            >
                                <HiChevronLeft size={20} />
                                Back to Chats
                            </button>
                        </div>

                        <ChatWindow
                            user={selectedUser}
                            token={token}
                            roomId={selectedRoom}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                        <div className="p-6 bg-slate-100 rounded-full">
                            <HiOutlineChatAlt2 size={48} className="text-slate-300" />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-slate-500">No Chat Selected</p>
                            <p className="text-sm px-6">Pick a contact or start a new conversation</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

const HiOutlineChatAlt2 = ({ size, className }) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={{ width: size, height: size }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
);

export default ChatMain;