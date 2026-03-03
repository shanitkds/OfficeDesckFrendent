import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdGroups, MdBadge, MdBusinessCenter } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, TOCKEN_ONLY } from '../../api/baseurl';

function HrTaskReportEmplayView() {
  const [teamData, setTeamData] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/team_lead/view-membars/`,
        TOCKEN_ONLY()
      );

      setTeamData(Array.isArray(res.data) ? res.data : [res.data]);

    } catch (err) {
      console.log("Fetch Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-0">
      <div className="flex items-center gap-2 mb-6">
        <MdGroups size={28} className="text-indigo-600" />
        <h2 className="text-2xl font-extrabold text-gray-800">
          Organization Teams
        </h2>
      </div>

      {teamData.map((team, index) => (
        <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">

          <div className="bg-gray-50 border-b border-gray-100 p-5 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">

              <img
                src={
                  team?.team_lead?.photo
                    ? `${BASE_URL}${team.team_lead.photo}`
                    : "/default-user.png"
                }
                alt={team?.team_lead?.name}
                className="w-12 h-12 rounded-full object-cover border"
              />

              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {team?.team_lead?.name}
                </h3>
                <div className="flex gap-4 mt-1">
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <MdBadge className="text-indigo-400" />
                    {team?.team_lead?.employeez_id}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <MdBusinessCenter className="text-indigo-400" />
                    {team?.team_lead?.department}
                  </span>
                </div>
              </div>
            </div>

            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full">
              Team Lead
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4 border-b">Member Name</th>
                  <th className="px-6 py-4 border-b">Employee ID</th>
                  <th className="px-6 py-4 border-b">Department</th>
                  <th className="px-6 py-4 border-b text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {(team?.team_members?.length ?? 0) > 0 ? (
                  team.team_members.map((emp, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">{emp.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{emp.employeez_id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{emp.department}</td>

                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => navigation(`/hr/taskreport/${emp.id}`)}
                          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-xs"
                        >
                          View Task
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic bg-gray-50/30">
                      No team members assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      ))}
    </div>
  );
}

export default HrTaskReportEmplayView