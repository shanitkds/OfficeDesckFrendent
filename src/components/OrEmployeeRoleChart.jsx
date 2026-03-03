import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FiPieChart, FiUsers, FiActivity, FiArrowRight } from "react-icons/fi";

const ROLE_COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"]; 
const ATT_COLORS = ["#10b981", "#f59e0b", "#ef4444", "#94a3b8"]; 

function OrDashboardCharts() {
  const [roleData, setRoleData] = useState([]);
  const [attData, setAttData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const userRes = await axios.get(
        `${BASE_URL}/api/org_admin/oruser_creation/`,
        TOCKEN_ONLY()
      );

      const users = Array.isArray(userRes.data)
        ? userRes.data
        : userRes.data.results || [];
      
      setTotalUsers(users.length);

      let roleCount = { EMPLOYEE: 0, TEAM_LEAD: 0, HR: 0, ACCOUNTANT: 0 };
      users.forEach((u) => {
        if (u.user_type && roleCount[u.user_type] !== undefined) {
          roleCount[u.user_type]++;
        }
      });

      setRoleData([
        { name: "Employees", value: roleCount.EMPLOYEE },
        { name: "Team Lead", value: roleCount.TEAM_LEAD },
        { name: "HR", value: roleCount.HR },
        { name: "Accountant", value: roleCount.ACCOUNTANT },
      ].filter(i => i.value > 0));

      const attRes = await axios.get(
        `${BASE_URL}/api/attendance/onedayattentance/`,
        TOCKEN_ONLY()
      );

      const attendance = Array.isArray(attRes.data)
        ? attRes.data
        : attRes.data.results || [];

      let count = { FULL_DAY: 0, HALF_DAY: 0, ABSENT: 0 };
      attendance.forEach((a) => {
        if (count[a.status] !== undefined) count[a.status]++;
      });

      const marked = count.FULL_DAY + count.HALF_DAY + count.ABSENT;
      const notMarked = Math.max(users.length - marked, 0);

      setAttData([
        { name: "Full Day", value: count.FULL_DAY },
        { name: "Half Day", value: count.HALF_DAY },
        { name: "Absent", value: count.ABSENT },
        { name: "Not Marked", value: notMarked },
      ]);

    } catch (err) {
      console.error("Chart Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const ChartWrapper = ({ title, icon: Icon, children, subtitle, action }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
            <span className="p-2 bg-slate-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Icon size={18} />
            </span>
            {title}
          </h2>
          <p className="text-slate-400 text-xs mt-1 ml-10 font-medium uppercase tracking-wider">{subtitle}</p>
        </div>
        {action}
      </div>
      <div className="h-[320px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-4 md:p-8 bg-slate-50/50 min-h-screen">

      <ChartWrapper 
        title="Staff Composition" 
        subtitle="By Designation" 
        icon={FiUsers}
      >
        <PieChart>
          <Pie 
            data={roleData} 
            dataKey="value" 
            innerRadius={80} 
            outerRadius={110} 
            paddingAngle={5} 
            stroke="none"
          >
            {roleData.map((entry, index) => (
              <Cell key={index} fill={ROLE_COLORS[index % ROLE_COLORS.length]} cornerRadius={6} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          />
          <Legend iconType="circle" />
          <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-800 font-bold text-2xl">
            {totalUsers}
          </text>
          <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-400 text-[10px] font-bold uppercase tracking-tighter">
            Total Staff
          </text>
        </PieChart>
      </ChartWrapper>

      <ChartWrapper 
        title="Today's Attendance" 
        subtitle="Live Status" 
        icon={FiActivity}
        action={
          <button 
            onClick={() => navigate('/today-attendance')}
            className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-all active:scale-95"
          >
            View List <FiArrowRight />
          </button>
        }
      >
        <PieChart>
          <Pie 
            data={attData} 
            dataKey="value" 
            innerRadius={80} 
            outerRadius={110} 
            paddingAngle={5} 
            stroke="none"
          >
            {attData.map((entry, index) => (
              <Cell key={index} fill={ATT_COLORS[index % ATT_COLORS.length]} cornerRadius={6} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          />
          <Legend iconType="circle" />
        </PieChart>
      </ChartWrapper>

    </div>
  );
}

export default OrDashboardCharts;