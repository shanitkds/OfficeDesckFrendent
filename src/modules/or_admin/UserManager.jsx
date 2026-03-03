import React, { useEffect, useState } from 'react';
import { listUsers } from '../../api/oradmin';
import { MdPersonAdd, MdEdit, MdDeleteOutline, MdBadge, MdClose, MdPhone, MdEmail, MdWork, MdFingerprint, MdVisibility, MdNumbers, MdBusinessCenter } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api/baseurl';
import axios from 'axios';
import OrgAdminUserRequests from '../../components/OrgAdminUserRequests';

function UserManager() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState("ALL");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const IM_BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await listUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete

  const handleDeleteUser = async (id) => {
    try {
      if (!window.confirm("Delete this user?")) return;

      await axios.delete(
        `${BASE_URL}/api/org_admin/oruser_creation/${id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("User deleted successfully!");
      setUsers(users.filter((user) => user.id !== id));
      setSelectedUser(null);

    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      alert(JSON.stringify(error.response?.data || "Delete failed"));
    }
  };


  const filteredUsers = users.filter((u) => {
    const text = search.toLowerCase();
    return (
      (u.name?.toLowerCase().includes(text) ||
        u.email?.toLowerCase().includes(text) ||
        u.user_type?.toLowerCase().includes(text) ||
        u.employee_id?.toLowerCase().includes(text)) && 
      (userType === "ALL" || u.user_type === userType)
    );
  });

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${IM_BASE_URL}${path}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">User Management</h2>
            <p className="text-sm text-gray-500">Manage your organization's members and roles</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Assign Team Lead Button */}
            <button
              onClick={() => navigate('/or-admin/teamleadassine')}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-lg shadow-sm transition-all font-semibold text-sm"
            >
              <MdBusinessCenter size={18} />
              Team Management
            </button>

            {/* Add New User Button */}
            <button
              onClick={() => navigate('/or-admin/adduser')}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md shadow-indigo-100 transition-all font-semibold text-sm"
            >
              <MdPersonAdd size={20} />
              Add New User
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-4">
          <input
            placeholder="Search by ID, name, email, or role..." // ⭐ Updated placeholder
            className="flex-1 border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-200 p-2.5 rounded-lg outline-none cursor-pointer"
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="ALL">All Roles</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="HR">HR</option>
            <option value="TEAM_LEAD">Team Lead</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Employee</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Type</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedUser(u)}
                >
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={getImageUrl(u.image) || 'https://via.placeholder.com/40'}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">{u.name}</span>
                      <span className="text-[10px] font-bold text-indigo-500 uppercase">{u.employee_id}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{u.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase">
                      {u.user_type}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-indigo-600 hover:text-indigo-800 p-1">
                      <MdVisibility size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <OrgAdminUserRequests/>
        </div>
      </div>

      {/* ⭐ DETAILED USER MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">

            <div className="relative h-32 bg-indigo-600">
              <button
                className="absolute right-4 top-4 bg-white/20 hover:bg-white/40 text-white p-1 rounded-full transition-colors"
                onClick={() => setSelectedUser(null)}
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="px-8 pb-8">
              <div className="relative -mt-16 flex items-end gap-6 mb-6">
                <img
                  src={getImageUrl(selectedUser.image) || 'https://via.placeholder.com/150'}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
                  alt={selectedUser.name}
                />
                <div className="pb-2">
                  <h3 className="text-2xl font-extrabold text-gray-800">{selectedUser.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">{selectedUser.employee_id}</span>
                    <span className="text-gray-300">|</span>
                    <p className="text-gray-500 font-medium">{selectedUser.desigination || "Employee"}</p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* ⭐ Employee ID Field in Modal */}
                  <div className="flex items-center gap-3 text-gray-600">
                    <MdNumbers className="text-indigo-500" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Employee ID</p>
                      <p className="text-sm font-bold text-indigo-600">{selectedUser.employee_id || "NOT ASSIGNED"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <MdEmail className="text-indigo-500" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                      <p className="text-sm font-medium">{selectedUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MdPhone className="text-indigo-500" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</p>
                      <p className="text-sm font-medium">{selectedUser.phone || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MdWork className="text-indigo-500" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Department</p>
                      <p className="text-sm font-medium">{selectedUser.department || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MdFingerprint className="text-indigo-500" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attendance Mode</p>
                      <p className="text-sm font-medium">{selectedUser.attendance_mode_display || selectedUser.attendance_mode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ID PROOF SECTION */}
              <div className="mt-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Identity Proof Document</p>
                {selectedUser.id_proof ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-2 bg-gray-50 group relative overflow-hidden">
                    <img
                      src={getImageUrl(selectedUser.id_proof)}
                      alt="ID Proof"
                      className="w-full h-40 object-contain rounded-lg"
                    />
                    <a
                      href={getImageUrl(selectedUser.id_proof)}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold gap-2"
                    >
                      <MdVisibility size={24} /> View Original
                    </a>
                  </div>
                ) : (
                  <div className="bg-amber-50 text-amber-700 p-4 rounded-xl text-sm border border-amber-100">
                    No ID proof has been uploaded for this user.
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-bold transition-colors" onClick={() => handleDeleteUser(selectedUser.id)}>
                  <MdDeleteOutline size={20} className="text-red-500" /> Delete
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all" onClick={() => navigate(`/or-admin/updateuser/${selectedUser.id}`)}>
                  <MdEdit size={20} /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManager;