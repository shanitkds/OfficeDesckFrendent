import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { FaGlobe, FaUsers, FaChartLine, FaProjectDiagram } from "react-icons/fa";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";

// Professional Color Palette
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function SuperAdminChart() {
  const [orgCount, setOrgCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [roleData, setRoleData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchOrganisations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/supperadmin/organisationslist/`, TOCKEN_ONLY());
      const data = res.data || [];
      setOrgCount(data.length);

      const monthly = {};
      const year = new Date().getFullYear();
      data.forEach((org) => {
        if (!org.creates_at) return;
        const d = new Date(org.creates_at);
        if (d.getFullYear() === year) {
          const m = MONTHS[d.getMonth()];
          monthly[m] = (monthly[m] || 0) + 1;
        }
      });

      setMonthlyData(MONTHS.map((m) => ({ month: m, count: monthly[m] || 0 })));
    } catch (err) {
      console.error("Org fetch error", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/supperadmin/userslist/`, TOCKEN_ONLY());
      const users = res.data || [];
      setUserCount(users.length);

      const roles = { ORG_ADMIN: 0, TEAM_LEAD: 0, EMPLOYEE: 0, HR: 0, ACCOUNTANT: 0 };
      users.forEach((u) => {
        if (roles[u.user_type] !== undefined) roles[u.user_type]++;
      });

      setRoleData(Object.keys(roles).map((r) => ({ name: r.replace("_", " "), value: roles[r] })));
    } catch (err) {
      console.error("User fetch error", err);
    }
  };

  useEffect(() => {
    fetchOrganisations();
    fetchUsers();
  }, []);

  return (
    <div className="p-4 sm:p-10 bg-[#f8fafc] min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 font-medium">Real-time analytics for the Super Admin console.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">Live System Status</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Organisations" count={orgCount} icon={<FaGlobe />} color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard title="Active Users" count={userCount} icon={<FaUsers />} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard title="Monthly Growth" count="+12%" icon={<FaChartLine />} color="text-amber-600" bg="bg-amber-50" />
        <StatCard title="System Nodes" count="05" icon={<FaProjectDiagram />} color="text-cyan-600" bg="bg-cyan-50" />
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        
        <div className="lg:col-span-3 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Organisation Growth</h2>
            <select className="text-xs font-bold border-none bg-slate-100 rounded-lg px-3 py-1 outline-none">
              <option>Year 2026</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-2">User Distribution</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">Role Hierarchy Breakdown</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px' }} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '12px', fontWeight: 'bold'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, count, icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:translate-y-[-4px] transition-all duration-300">
      <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center text-2xl shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">{title}</p>
        <p className={`text-3xl font-black ${color} tracking-tighter`}>{count}</p>
      </div>
    </div>
  );
}

export default SuperAdminChart;