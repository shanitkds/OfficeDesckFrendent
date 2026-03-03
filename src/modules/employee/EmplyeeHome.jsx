import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiCheckCircle, 
  FiCreditCard, 
  FiUsers, 
  FiCalendar, 
  FiDollarSign, 
  FiLogOut,
  FiFileText,
  FiClock
} from 'react-icons/fi';

function EmployeeHome() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { 
      title: 'Mark Attendance', 
      path: 'attentance', 
      icon: <FiCheckCircle size={28} />, 
      color: 'bg-emerald-50 text-emerald-600',
      desc: 'Clock in/out for today'
    },
    { 
      title: 'My Expenses', 
      path: 'myexpenses', 
      icon: <FiCreditCard size={28} />, 
      color: 'bg-blue-50 text-blue-600',
      desc: 'Claim reimbursements'
    },
    { 
      title: 'My Team', 
      path: 'myteam', 
      icon: <FiUsers size={28} />, 
      color: 'bg-indigo-50 text-indigo-600',
      desc: 'View team members'
    },
    { 
      title: 'Attendance History', 
      path: 'attentancehistory', 
      icon: <FiCalendar size={28} />, 
      color: 'bg-amber-50 text-amber-600',
      desc: 'Review past records'
    },
    { 
      title: 'Payment History', 
      path: 'paimenthistory', 
      icon: <FiDollarSign size={28} />, 
      color: 'bg-rose-50 text-rose-600',
      desc: 'Salary & slips'
    },
    { 
      title: 'Leave Request', 
      path: 'leaverequest', 
      icon: <FiFileText size={28} />, 
      color: 'bg-purple-50 text-purple-600',
      desc: 'Apply for time off'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* TOP DATE & TIME SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              Employee Portal
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Welcome back! What would you like to do today?
            </p>
          </div>

          <div className="bg-white border border-slate-100 px-6 py-4 rounded-[2rem] shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <FiClock size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-800 tracking-tighter tabular-nums">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' })}
              </div>
            </div>
          </div>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="group cursor-pointer bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity ${item.color}`} />

              <div className="flex flex-col gap-6 relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${item.color}`}>
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-800 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-bold mt-1 uppercase tracking-tighter opacity-70">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 text-slate-200 group-hover:text-slate-400 transition-colors">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                 </svg>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER ACTION */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex justify-center">
            <div className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-[0.3em] hover:text-rose-500 transition-colors">
                Office Desck
            </div>
        </div>

      </div>
    </div>
  );
}

export default EmployeeHome;