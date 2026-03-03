import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL, TOCKEN_ONLY } from '../api/baseurl';
import { useNavigate } from 'react-router-dom';
import { MdPersonAdd, MdBadge, MdGroups } from 'react-icons/md';

function TeamLeadAssign() {
    const [employees, setEmployees] = useState([]);
    const [teamleads, setTeamleads] = useState([]);
    const [employeeId, setEmployeeId] = useState("");
    const [teamleadId, setTeamleadId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/org_admin/oruser_creation/`,
                {
                    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                }
            );
            const users = res.data;
            setEmployees(users.filter(u => u.user_type === "EMPLOYEE" && u.profile_id));
            setTeamleads(users.filter(u => u.user_type === "TEAM_LEAD" && u.profile_id));
        } catch (err) {
            console.log("Fetch Error:", err.response?.data || err.message);
        }
    };

    const handleAssign = async () => {
        if (!employeeId || !teamleadId) {
            alert("Select employee and teamlead");
            return;
        }
        try {
            await axios.post(
                `${BASE_URL}/api/org_admin/team_lead_assine/`,
                { employee_id: employeeId, teamlead_id: teamleadId },
                TOCKEN_ONLY()
            );
            alert("TeamLead Assigned ✅");
            navigate(-1);
        } catch (err) {
            alert(JSON.stringify(err.response?.data || "Error"));
        }
    };

    const selectStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm appearance-none";
    const labelStyle = "block text-xs font-bold text-gray-500 uppercase mb-1 ml-1";

    return (
        <div className="max-w-md mx-auto bg-white shadow-xl shadow-gray-100 rounded-2xl border border-gray-100 overflow-hidden mb-8">
            <div className="bg-indigo-600 p-5 text-white flex items-center gap-3">
                <MdPersonAdd size={24} />
                <h2 className="font-bold text-lg">Assign Team Structure</h2>
            </div>

            <div className="p-6 space-y-5">
                <div>
                    <label className={labelStyle}>Employee Name</label>
                    <div className="relative">
                        <select className={selectStyle} onChange={(e) => setEmployeeId(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.profile_id}>{emp.name} ({emp.employee_id})</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className={labelStyle}>Assign to Team Lead</label>
                    <select className={selectStyle} onChange={(e) => setTeamleadId(e.target.value)}>
                        <option value="">Select TeamLead</option>
                        {teamleads.map(tl => (
                            <option key={tl.id} value={tl.profile_id}>{tl.name} ({tl.employee_id})</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleAssign}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                    Confirm Assignment
                </button>
            </div>
        </div>
    );
}

export default TeamLeadAssign;