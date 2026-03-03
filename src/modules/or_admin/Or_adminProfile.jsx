import React, { useEffect, useState } from 'react'
import { Oradmindash } from '../../api/accountapi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, TOCKEN_ONLY } from '../../api/baseurl';
import { FaUserCircle, FaBuilding, FaPhone, FaEnvelope, FaIdBadge, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

function Or_adminProfile() {

  const [data, setData] = useState(null);
  const [org, setOrg] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employee_id: "",
    phone: "",
  });

  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const respo = await Oradmindash();
        const orgRes = await axios.get(
          `${BASE_URL}/api/supperadmin/organisationslist/`,
          TOCKEN_ONLY()
        );

        setData(respo.data);
        setOrg(orgRes.data);

        setFormData({
          name: respo.data.name || "",
          email: respo.data.email || "",
          employee_id: respo.data.employee_id || "",
          phone: respo.data.phone || "",
        });

      } catch (error) {
        if (error.response?.status === 403 || error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    loadDashboard();
  }, [navigate]);

  if (!data || !org) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("employee_id", formData.employee_id);
      form.append("phone", formData.phone);

      if (photo) {
        form.append("photo", photo);
      }

      await axios.patch(
        `${BASE_URL}/api/org_admin/oruser_creation/${data.id}/`,
        form,
        TOCKEN_ONLY()
      );

      toast.success("Profile Updated Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 p-6">
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              <FaUserCircle /> Organisation Admin Profile
            </h2>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative group">
                <img
                  src={photo ? URL.createObjectURL(photo) : (data.photo || "https://via.placeholder.com/150")}
                  className="w-32 h-32 rounded-2xl object-cover ring-4 ring-gray-50 shadow-md"
                  alt="profile"
                />
                {isEdit && (
                  <label className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-lg text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                    <FaCamera size={14} />
                    <input type="file" hidden accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
                  </label>
                )}
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-gray-800 font-bold text-lg uppercase tracking-wider">Personal Information</h3>
                  {!isEdit && (
                    <button onClick={() => setIsEdit(true)} className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all">
                      <FaEdit /> Edit Profile
                    </button>
                  )}
                </div>

                {isEdit ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Full Name</label>
                      <input name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Email Address</label>
                      <input name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Employee ID</label>
                      <input name="employee_id" value={formData.employee_id} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Phone Number</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div className="md:col-span-2 flex gap-3 pt-4">
                      <button disabled={loading} onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 transition-all disabled:opacity-50">
                        <FaSave /> {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button onClick={() => setIsEdit(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all">
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><FaUserCircle /></div>
                      <div><p className="text-xs text-gray-400">Name</p><p className="font-semibold">{data.name}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><FaEnvelope /></div>
                      <div><p className="text-xs text-gray-400">Email</p><p className="font-semibold">{data.email}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><FaIdBadge /></div>
                      <div><p className="text-xs text-gray-400">Employee ID</p><p className="font-semibold">{data.employee_id}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><FaPhone /></div>
                      <div><p className="text-xs text-gray-400">Phone</p><p className="font-semibold">{data.phone}</p></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-slate-800 p-6 flex justify-between items-center">
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              <FaBuilding /> Organisation Details
            </h2>
            <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {org.attendance_mode} Mode
            </span>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Company Name</p>
              <p className="font-semibold text-gray-800">{org.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Business Email</p>
              <p className="font-semibold text-gray-800">{org.email}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Contact Phone</p>
              <p className="font-semibold text-gray-800">{org.phone}</p>
            </div>
            <div className="lg:col-span-3">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Office Address</p>
              <p className="font-semibold text-gray-800">{org.address}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 border border-gray-100">
              <FaMapMarkerAlt className="text-red-500" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Latitude</p>
                <p className="font-mono text-sm">{org.latitude}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 border border-gray-100">
              <FaMapMarkerAlt className="text-green-500" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Longitude</p>
                <p className="font-mono text-sm">{org.longitude}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Or_adminProfile;