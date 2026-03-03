import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { MdEdit, MdEmail, MdPhone, MdBusinessCenter, MdBadge, MdPhotoCamera, MdArrowBack } from 'react-icons/md';
import { HiOutlineUpload } from 'react-icons/hi';
import { BASE_URL, TOCKEN_ONLY } from '../../api/baseurl';

function HrUserUpdateRequest() {
  const { id } = useParams();
    const navigate = useNavigate();

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUser_type] = useState('EMPLOYEE');
    const [phone, setPhone] = useState('');
    const [attendance_mode, setAttendance_mode] = useState('FACE_LOCATION');
    const [photo, setPhoto] = useState(null); // Will hold URL string or File object
    const [department, setDepartment] = useState('');
    const [desigination, setDesigination] = useState('');
    const [id_proof, setIdProof] = useState(null); // Will hold URL string or File object
    const [emId,setEmId]=useState(null)

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        getuser();
    }, [id]);

    const getuser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/org_admin/oruser_creation/${id}/`, {
                headers: { Authorization: `Token ${localStorage.getItem("token")}` },
            });
            const data = response.data;
            
            // Map fetched data to states
            setName(data.name || '');
            setEmail(data.email || '');
            setUser_type(data.user_type || 'EMPLOYEE');
            setPhone(data.phone || '');
            setAttendance_mode(data.attendance_mode || 'FACE_LOCATION');
            setDepartment(data.department || '');
            setDesigination(data.desigination || '');
            setEmId(data.employee_id);
            
            

            setFetching(false);
        } catch (error) {
            console.error("Fetch Error:", error.response?.data);
            toast.error("Failed to load user details.");
            setFetching(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("user_type", user_type);
        formData.append("phone", phone || "");
        formData.append("attendance_mode", attendance_mode || "");
        formData.append("department", department || "");
        formData.append("designation", desigination || "");
        formData.append("action", "UPDATE");
        formData.append("employee_id",emId);
        if (photo) formData.append("photo", photo);
        if (id_proof) formData.append("id_proof", id_proof);

        setLoading(true);
        const loadToast = toast.loading("Updating employee profile...");

        try {
            await axios.post(
                `${BASE_URL}/api/hr/user-creation-request/`,
                formData,
                TOCKEN_ONLY()
            );
            
            toast.success("Profile Updated Successfully! ", { id: loadToast });
            setTimeout(() => navigate(-1), 1500); 
        } catch (error) {
            console.error("Update Error:", error.response?.data);
            toast.error(error.response?.data?.message || "Update failed. ❌", { id: loadToast });
        } finally {
            setLoading(false);
        }
    };

    // Helper to get display name for files
    const getFileName = (file) => {
        if (!file) return "";
        if (file instanceof File) return file.name;
        // If it's a string (URL), extract the filename from the end of the URL
        return file.split('/').pop();
    };

    // Shared Styles
    const inputWrapper = "relative flex flex-col gap-1";
    const iconStyle = "absolute left-3 top-9 text-gray-400 text-lg";
    const inputStyle = "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-gray-50/50";
    const labelStyle = "text-xs font-bold text-gray-700 uppercase tracking-wider ml-1";

    if (fetching) return <div className="flex justify-center items-center h-screen text-indigo-600 font-bold">Loading User Data...</div>;

    return (
        <div className="min-h-screen bg-[#f8fafc] ">
            <Toaster position="top-right" />

            <div className="max-w-3xl mx-auto bg-white md:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-8 text-white">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <MdEdit size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold tracking-tight">Edit Profile</h2>
                                <p className="text-blue-100 text-sm opacity-90">Modify details for {name}</p>
                            </div>
                        </div>
                        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all">
                            <MdArrowBack /> Back
                        </button>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Full Name</label>
                            <MdEdit className={iconStyle} />
                            <input className={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Email Address</label>
                            <MdEmail className={iconStyle} />
                            <input type="email" className={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Phone Number</label>
                            <MdPhone className={iconStyle} />
                            <input className={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                        <div className="relative flex justify-start text-xs uppercase"><span className="bg-white pr-3 text-gray-400 font-medium">Work Assignments</span></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Department</label>
                            <MdBusinessCenter className={iconStyle} />
                            <input className={inputStyle} value={department} onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Designation</label>
                            <MdBadge className={iconStyle} />
                            <input className={inputStyle} value={desigination} onChange={(e) => setDesigination(e.target.value)} />
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Role Permissions</label>
                            <select className={inputStyle} value={user_type} onChange={(e) => setUser_type(e.target.value)}>
                                <option value="EMPLOYEE">Employee</option>
                                <option value="HR">HR Manager</option>
                                <option value="TEAM_LEAD">Team Lead</option>
                                <option value="ACCOUNTANT">Accountant</option>
                            </select>
                        </div>
                        <div className={inputWrapper}>
                            <label className={labelStyle}>Attendance Tracking</label>
                            <select className={inputStyle} value={attendance_mode} onChange={(e) => setAttendance_mode(e.target.value)}>
                                <option value="FACE_LOCATION">Face + Geolocation</option>
                                <option value="FACE_ONLY">Face Recognition Only</option>
                            </select>
                        </div>
                    </div>

                    {/* FILE UPDATES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-gray-50">
                            <label className="flex flex-col items-center cursor-pointer">
                                <MdPhotoCamera className="text-3xl text-gray-400 group-hover:text-blue-500 mb-2" />
                                <span className="text-sm font-semibold text-gray-600">Update Photo</span>
                                <input type="file" className="hidden" onChange={(e) => setPhoto(e.target.files[0])} />
                                {photo && <span className="text-xs text-blue-600 mt-1 truncate max-w-[200px]">{getFileName(photo)}</span>}
                            </label>
                        </div>
                        <div className="group border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-gray-50">
                            <label className="flex flex-col items-center cursor-pointer">
                                <HiOutlineUpload className="text-3xl text-gray-400 group-hover:text-blue-500 mb-2" />
                                <span className="text-sm font-semibold text-gray-600">Update ID Proof</span>
                                <input type="file" className="hidden" onChange={(e) => setIdProof(e.target.files[0])} />
                                {id_proof && <span className="text-xs text-blue-600 mt-1 truncate max-w-[200px]">{getFileName(id_proof)}</span>}
                            </label>
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className={`w-full py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 font-bold text-white
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-blue-200'}`}
                    >
                        {loading ? 'Saving Changes...' : (
                            <>
                                <MdEdit size={20} />
                                Change Request
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default HrUserUpdateRequest