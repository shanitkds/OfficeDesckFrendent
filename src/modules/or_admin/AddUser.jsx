import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'; // 1. Import toast tools
import { MdPersonAdd, MdEmail, MdVpnKey, MdPhone, MdBusinessCenter, MdBadge, MdPhotoCamera } from 'react-icons/md';
import { HiOutlineUpload } from 'react-icons/hi';
import { BASE_URL, TOCKEN_ONLY } from '../../api/baseurl';

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_type, setUser_type] = useState('EMPLOYEE');
    const [phone, setPhone] = useState('');
    const [attendance_mode, setAttendance_mode] = useState('FACE_LOCATION');
    const [photo, setPhoto] = useState(null);
    const [department, setDepartment] = useState('');
    const [desigination, setDesigination] = useState('');
    const [id_proof, setIdProof] = useState(null);
    const [loading, setLoading] = useState(false); // New: loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !email || !password) {
            toast.error("Please fill in Name, Email, and Password");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("user_type", user_type);
        formData.append("phone", phone || "");
        formData.append("attendance_mode", attendance_mode || "");
        formData.append("department", department || "");
        formData.append("desigination", desigination || "");
        if (photo) formData.append("photo", photo);
        if (id_proof) formData.append("id_proof", id_proof);

        setLoading(true);
        const loadToast = toast.loading("Creating employee profile..."); // Show loading toast

        try {
            await axios.post(
                `${BASE_URL}/api/org_admin/oruser_creation/`,
                formData,
                TOCKEN_ONLY()
            );
            
            toast.success("Employee Added Successfully! ✅", { id: loadToast }); // Replace loading with success
            setTimeout(() => navigate(-1), 1500); 
            // e.target.reset();
            // // Clear states manually if needed
            // setPhoto(null);
            // setIdProof(null);
        } catch (error) {
            console.error("Server Error:", error.response?.data);
            toast.error(error.response?.data?.message || "Failed to add employee. ❌", { id: loadToast });
        } finally {
            setLoading(false);
        }

        
    };

    // Styles (Same as before)
    const inputWrapper = "relative flex flex-col gap-1";
    const iconStyle = "absolute left-3 top-9 text-gray-400 text-lg";
    const inputStyle = "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-gray-50/50";
    const labelStyle = "text-xs font-bold text-gray-700 uppercase tracking-wider ml-1";

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
            {/* 2. Place the Toaster component anywhere in your tree */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <MdPersonAdd size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold tracking-tight">Onboard New Employee</h2>
                            <p className="text-indigo-100 text-sm opacity-90">Create a secure profile for your team member</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* PERSONAL INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Full Name</label>
                            <MdPersonAdd className={iconStyle} />
                            <input className={inputStyle} placeholder="Johnathan Doe" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Email Address</label>
                            <MdEmail className={iconStyle} />
                            <input type="email" className={inputStyle} placeholder="john@company.com" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Password</label>
                            <MdVpnKey className={iconStyle} />
                            <input type="password" className={inputStyle} placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Phone Number</label>
                            <MdPhone className={iconStyle} />
                            <input className={inputStyle} placeholder="+1 (555) 000-0000" onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                        <div className="relative flex justify-start text-xs uppercase"><span className="bg-white pr-3 text-gray-400 font-medium">Work Details</span></div>
                    </div>

                    {/* WORK DETAILS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Department</label>
                            <MdBusinessCenter className={iconStyle} />
                            <input className={inputStyle} placeholder="Human Resources" onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Designation</label>
                            <MdBadge className={iconStyle} />
                            <input className={inputStyle} placeholder="Senior Specialist" onChange={(e) => setDesigination(e.target.value)} />
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Role Permissions</label>
                            <select className={inputStyle} onChange={(e) => setUser_type(e.target.value)}>
                                <option value="EMPLOYEE">Employee</option>
                                <option value="HR">HR Manager</option>
                                <option value="TEAM_LEAD">Team Lead</option>
                                <option value="ACCOUNTANT">Accountant</option>
                            </select>
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Attendance Tracking</label>
                            <select className={inputStyle} onChange={(e) => setAttendance_mode(e.target.value)}>
                                <option value="FACE_LOCATION">Face + Geolocation</option>
                                <option value="FACE_ONLY">Face Recognition Only</option>
                            </select>
                        </div>
                    </div>

                    {/* FILE UPLOADS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-indigo-400 transition-colors bg-gray-50">
                            <label className="flex flex-col items-center cursor-pointer">
                                <MdPhotoCamera className="text-3xl text-gray-400 group-hover:text-indigo-500 mb-2" />
                                <span className="text-sm font-semibold text-gray-600">Profile Photo</span>
                                <input type="file" className="hidden" onChange={(e) => setPhoto(e.target.files[0])} />
                                {photo && <span className="text-xs text-indigo-600 mt-1">{photo.name}</span>}
                            </label>
                        </div>
                        <div className="group border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-indigo-400 transition-colors bg-gray-50">
                            <label className="flex flex-col items-center cursor-pointer">
                                <HiOutlineUpload className="text-3xl text-gray-400 group-hover:text-indigo-500 mb-2" />
                                <span className="text-sm font-semibold text-gray-600">ID Proof</span>
                                <input type="file" className="hidden" onChange={(e) => setIdProof(e.target.files[0])} />
                                {id_proof && <span className="text-xs text-indigo-600 mt-1">{id_proof.name}</span>}
                            </label>
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className={`w-full py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 font-bold text-white
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] shadow-indigo-200'}`}
                    >
                        {loading ? 'Processing...' : (
                            <>
                                <MdPersonAdd size={20} />
                                Register Employee
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;