import axios from "axios";
import { useState } from "react";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import toast, { Toaster } from "react-hot-toast"; // ⭐ Added toast

function FaceEntrolment() {
    const [employeeId, setEmployeeId] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null); // ⭐ Added for image preview
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Create a local URL for preview
        }
    };

    const handilSubmit = async (e) => {
        e.preventDefault();
        
        if (!employeeId || !image) {
            toast.error("Please provide both Employee ID and a Face Image");
            return;
        }

        const formData = new FormData();
        formData.append("employee_id", employeeId);
        formData.append("face_image", image);

        setIsSubmitting(true);
        const loadingToast = toast.loading("Enrolling face data...");

        try {
            const res = await axios.post(
                `${BASE_URL}/api/attendance/face-enroll/`, 
                formData, 
                TOCKEN_ONLY()
            );
            toast.success(res.data.message || "Face Enrolled Successfully! ✅", { id: loadingToast });
            
            // Clear form
            setEmployeeId("");
            setImage(null);
            setPreview(null);
        } catch (err) {
            console.error(err);
            toast.error("Enrollment failed. Please try again.", { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full  bg-white p-4 md:p-10">
            <Toaster position="top-right" />
            
            {/* Header Area */}
            <div className="w-full border-b pb-6 mb-8">
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
                    Face Enrollment
                </h1>
                <p className="text-gray-500 mt-2">
                    Register biometric data for employee facial recognition.
                </p>
            </div>

            <form onSubmit={handilSubmit} className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    
                    {/* Left Side: Inputs */}
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                                Employee ID
                            </label>
                            <input
                                type="text"
                                placeholder="Enter ID (e.g., EMP-001)"
                                className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-all"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                                Upload Face Image
                            </label>
                            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors bg-gray-50">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                />
                                <div className="text-gray-400">
                                    <span className="text-blue-600 font-bold">Click to upload</span> or drag and drop
                                    <p className="text-xs mt-1">PNG, JPG or JPEG (Recommended: Frontal view)</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full py-5 rounded-2xl font-black text-lg text-white transition-all shadow-lg active:scale-95 ${
                                isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
                            }`}
                        >
                            {isSubmitting ? "Processing..." : "Complete Enrollment"}
                        </button>
                    </div>

                    {/* Right Side: Preview Box */}
                    <div className="flex flex-col items-center justify-center border-2 border-gray-50 rounded-3xl bg-gray-50 p-6 min-h-[300px]">
                        {preview ? (
                            <div className="text-center">
                                <label className="text-xs font-bold text-gray-400 uppercase mb-4 block">Image Preview</label>
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className="w-64 h-64 object-cover rounded-2xl shadow-md border-4 border-white"
                                />
                                <button 
                                    type="button"
                                    onClick={() => {setImage(null); setPreview(null);}}
                                    className="mt-4 text-sm text-red-500 font-semibold hover:underline"
                                >
                                    Remove Photo
                                </button>
                            </div>
                        ) : (
                            <div className="text-center text-gray-300">
                                <div className="text-6xl mb-2">👤</div>
                                <p className="font-medium">No image selected</p>
                            </div>
                        )}
                    </div>

                </div>
            </form>
        </div>
    )
}

export default FaceEntrolment;