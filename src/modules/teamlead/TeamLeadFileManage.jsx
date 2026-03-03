import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import AdminFileView from '../../components/AdminFileView';
import FileShareView from '../../components/FileShareView';
import { FaFolderOpen, FaShareAlt, FaCloudUploadAlt } from 'react-icons/fa';

function TeamLeadFileManage() {
    
    const [activeTab, setActiveTab] = useState('view');

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
                <ul className="flex flex-wrap items-center gap-2 p-2">
                    <li 
                        onClick={() => setActiveTab('view')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer font-bold transition-all ${
                            activeTab === 'view' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
                        }`}
                    >
                        <FaFolderOpen /> <span>View File</span>
                    </li>
                    <li 
                        onClick={() => setActiveTab('share')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer font-bold transition-all ${
                            activeTab === 'share' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
                        }`}
                    >
                        <FaShareAlt /> <span>Share File</span>
                    </li>
                    <li 
                        onClick={() => setActiveTab('upload')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer font-bold transition-all ${
                            activeTab === 'upload' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
                        }`}
                    >
                        <FaCloudUploadAlt /> <span>Upload File</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 min-h-[400px]">
                {activeTab === 'view' && <AdminFileView />}
                {activeTab === 'share' && <FileShareView />}
                {activeTab === 'upload' && <FileUpload />}
            </div>
        </div>
    );
}

export default TeamLeadFileManage;