import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css"; // Required for search styling
import { BASE_URL } from "../api/baseurl";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ setLocation }) {
    useMapEvents({
        click(e) {
            setLocation({
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
            });
        },
    });
    return null;
}

function SearchControl() {
    const map = useMapEvents({});

    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider,
            style: "bar",
            showMarker: true,
            showPopup: false,
            autoClose: true,
            retainZoomLevel: false,
            searchLabel: "Search for your location...",
        });

        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map]);

    return null;
}

function OrganizationRequestForm() {
    const [form, setForm] = useState({
        org_name: "",
        org_email: "",
        org_phone: "",
        org_address: "",
        registration_number: "",
        attendance_mode: "FACE_ONLY",
        full_day_last_time: "",
        half_day_cutoff_time: "",
        admin_name: "",
        admin_email: "",
        admin_phone: "",
        admin_password: "",
    });

    const [files, setFiles] = useState({
        registration_doc: null,
        admin_photo: null,
        admin_id_proof: null,
    });

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location.latitude) return alert("Please select a location on the map");

        try {
            const formData = new FormData();
            Object.keys(form).forEach((key) => formData.append(key, form[key]));
            Object.keys(files).forEach((key) => {
                if (files[key]) formData.append(key, files[key]);
            });
            formData.append("latitude", location.latitude);
            formData.append("longitude", location.longitude);

            await axios.post(`${BASE_URL}/api/organisation/org-request/create/`, formData);
            alert("Request Submitted Successfully ");
        } catch (err) {
            console.error(err.response?.data);
            alert("Error submitting request ");
        }
    };

    const inputClass = "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all mb-4 text-sm";
    const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1";

    return (
        <div className="min-h-screen bg-sky-50 md:py-12 md:px-4 md:pt-22">
            <div className="max-w-3xl mx-auto bg-white md:rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-sky-600 p-8 text-center">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Org Registration</h2>
                    <p className="text-sky-100 text-sm mt-2">Submit your request to join the platform</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Organization Details */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm">01</span>
                            Organization Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <input name="org_name" placeholder="Organization Name" className={inputClass} onChange={handleChange} required />
                            <input name="org_email" placeholder="Organization Email" className={inputClass} onChange={handleChange} required />
                            <input name="org_phone" placeholder="Phone Number" className={inputClass} onChange={handleChange} />
                            <input name="registration_number" placeholder="Registration Number" className={inputClass} onChange={handleChange} />
                        </div>
                        <textarea name="org_address" placeholder="Physical Address" className={`${inputClass} h-24`} onChange={handleChange} />
                        <label className={labelClass}>Registration Document</label>
                        <input type="file" name="registration_doc" className={inputClass} onChange={handleFileChange} />
                    </section>

                    <hr className="border-slate-100" />

                    {/* Attendance Settings */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm">02</span>
                            Attendance Settings
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={labelClass}>Mode</label>
                                <select name="attendance_mode" className={inputClass} onChange={handleChange}>
                                    <option value="FACE_ONLY">Face Only</option>
                                    <option value="FACE_LOCATION">Face + Location</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Full Day Cutoff</label>
                                <input type="time" name="full_day_last_time" className={inputClass} onChange={handleChange} />
                            </div>
                            <div>
                                <label className={labelClass}>Half Day Cutoff</label>
                                <input type="time" name="half_day_cutoff_time" className={inputClass} onChange={handleChange} />
                            </div>
                        </div>
                    </section>

                    <hr className="border-slate-100" />

                    {/* Admin Details */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm">03</span>
                            Admin Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <input name="admin_name" placeholder="Admin Full Name" className={inputClass} onChange={handleChange} required />
                            <input name="admin_email" placeholder="Admin Email" className={inputClass} onChange={handleChange} required />
                            <input name="admin_phone" placeholder="Admin Phone" className={inputClass} onChange={handleChange} />
                            <input type="password" name="admin_password" placeholder="Set Password" className={inputClass} onChange={handleChange} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Admin Photo</label>
                                <input type="file" name="admin_photo" className={inputClass} onChange={handleFileChange} />
                            </div>
                            <div>
                                <label className={labelClass}>Admin ID Proof</label>
                                <input type="file" name="admin_id_proof" className={inputClass} onChange={handleFileChange} />
                            </div>
                        </div>
                    </section>

                    <hr className="border-slate-100" />

                    {/* Map Selection */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm">04</span>
                            Select Location
                        </h3>
                        <p className="text-xs text-slate-400 mb-4 ml-10 italic">Use the search bar or click the map to pin your office location</p>
                        
                        <div className="rounded-2xl overflow-hidden border-4 border-slate-50 shadow-inner">
                            <MapContainer center={[10.8505, 76.2711]} zoom={16} style={{ height: "350px", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                    attribution="© OpenStreetMap"
                                />
                                <SearchControl />
                                <LocationPicker setLocation={setLocation} />
                                {location.latitude && (
                                    <Marker position={[location.latitude, location.longitude]} />
                                )}
                            </MapContainer>
                        </div>
                        
                        <div className="mt-4 flex gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                           <div className="flex-1 text-center">
                               <p className={labelClass}>Latitude</p>
                               <p className="text-sm font-mono font-bold text-sky-600">{location.latitude?.toFixed(6) || "---"}</p>
                           </div>
                           <div className="flex-1 text-center border-l border-slate-200">
                               <p className={labelClass}>Longitude</p>
                               <p className="text-sm font-mono font-bold text-sky-600">{location.longitude?.toFixed(6) || "---"}</p>
                           </div>
                        </div>
                    </section>

                    <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-sky-100 transition-all active:scale-[0.98] uppercase tracking-widest">
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OrganizationRequestForm;