import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiClock, 
  FiCalendar, 
  FiUserCheck, 
  FiDollarSign, 
  FiFileText, 
  FiArrowRight 
} from 'react-icons/fi';

function AccountentHome() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuActions = [
    { 
      name: 'Mark Attendance', 
      path: 'attentance', 
      icon: <FiUserCheck size={24} />, 
      color: 'bg-emerald-50 text-emerald-600',
      desc: 'Check-in for today' 
    },
    { 
      name: 'My Attendance', 
      path: 'myattentance', 
      icon: <FiCalendar size={24} />, 
      color: 'bg-blue-50 text-blue-600',
      desc: 'View personal logs' 
    },
    { 
      name: 'Payment History', 
      path: 'paimenthistory', 
      icon: <FiDollarSign size={24} />, 
      color: 'bg-indigo-50 text-indigo-600',
      desc: 'Salary & slips' 
    },
    { 
      name: 'Leave Request', 
      path: 'leaverequest', 
      icon: <FiFileText size={24} />, 
      color: 'bg-rose-50 text-rose-600',
      desc: 'Apply for time off' 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 lg:p-14">
      <div className="max-w-6xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Accountant Portal</h1>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-[2.5rem] shadow-sm flex items-center gap-6 pr-8">
            <div className="w-14 h-14 bg-slate-900 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-slate-200">
              <FiClock size={28} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-800 tracking-tighter tabular-nums leading-none">
                {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                {dateTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuActions.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 text-slate-50 group-hover:text-slate-100 transition-colors duration-300 rotate-12">
                 {React.cloneElement(item.icon, { size: 100 })}
              </div>

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${item.color}`}>
                {item.icon}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-indigo-400 transition-colors">
                Open Module <FiArrowRight />
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Office Desck</p>
        </footer>

      </div>
    </div>
  );
}

export default AccountentHome;