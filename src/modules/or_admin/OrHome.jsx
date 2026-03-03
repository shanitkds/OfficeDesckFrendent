import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrEmployeeRoleChart from '../../components/OrEmployeeRoleChart';
import { 
  FiBriefcase, 
  FiSettings, 
  FiMapPin, 
  FiUserPlus, 
  FiChevronRight, 
  FiTrendingUp,
  FiClock,
  FiGrid
} from 'react-icons/fi';

function OrHome() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "My Expenses",
      desc: "Manage business claims & reimbursements",
      path: "adminmyexpenses",
      icon: <FiBriefcase />,
      color: "text-emerald-600",
      bg: "bg-emerald-100/50",
      border: "hover:border-emerald-200"
    },
    {
      title: "Manage Profile",
      desc: "Security settings & personal info",
      path: "profile",
      icon: <FiSettings />,
      color: "text-blue-600",
      bg: "bg-blue-100/50",
      border: "hover:border-blue-200"
    },
    {
      title: "Set Location",
      desc: "Office geofencing & GPS radius",
      path: "setlocation",
      icon: <FiMapPin />,
      color: "text-indigo-600",
      bg: "bg-indigo-100/50",
      border: "hover:border-indigo-200"
    },
    {
      title: "Admin Management",
      desc: "Provision new administrative roles",
      path: "addminadd",
      icon: <FiUserPlus />,
      color: "text-purple-600",
      bg: "bg-purple-100/50",
      border: "hover:border-purple-200"
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest">
              <FiGrid /> Organization Portal
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Dashboard <span className="text-indigo-600">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-100">
              <FiClock className="text-indigo-500" />
              <span className="text-sm font-bold text-slate-700">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="px-4 py-2 text-sm font-medium text-slate-500">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">System Status</p>
              <h3 className="text-xl font-bold text-slate-800">Operational</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 animate-pulse">
              <FiTrendingUp size={24} />
            </div>
          </div>
        </div>

        <section className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-slate-200/50">
           <OrEmployeeRoleChart />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">System Controls</h2>
            <div className="h-px flex-1 bg-slate-200 mx-6 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`group relative text-left bg-white p-8 rounded-[2rem] border border-transparent shadow-sm ${item.border} hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden`}
              >
                <div className={`absolute -right-4 -top-4 w-24 h-24 ${item.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 opacity-50`}></div>

                <div className={`relative w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                  {item.icon}
                </div>

                <div className="relative">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center justify-between">
                    {item.title}
                    <FiChevronRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-400" />
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 h-1 bg-indigo-600 w-0 group-hover:w-full transition-all duration-500"></div>
              </button>
            ))}
          </div>
        </section>

        <footer className="pt-12 pb-6 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-200/50 rounded-full">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              office desck
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default OrHome;