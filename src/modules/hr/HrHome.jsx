import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrDashboardCharts from '../../components/OrEmployeeRoleChart'
import { 
  HiOutlineClipboardCheck, 
  HiOutlineReceiptTax, 
  HiOutlineCalendar, 
  HiOutlineCash 
} from 'react-icons/hi'

function HrHome() {
  const navigate = useNavigate()

  const menuItems = [
    { 
      name: 'Mark Attendance', 
      path: 'markattendance', 
      icon: <HiOutlineClipboardCheck size={26} />, 
      color: 'bg-emerald-50 text-emerald-600' 
    },
    { 
      name: 'My Expenses', 
      path: 'myexopence', 
      icon: <HiOutlineReceiptTax size={26} />, 
      color: 'bg-orange-50 text-orange-600' 
    },
    { 
      name: 'Attendance History', 
      path: 'attentancehistory', 
      icon: <HiOutlineCalendar size={26} />, 
      color: 'bg-indigo-50 text-indigo-600' 
    },
    { 
      name: 'Payment History', 
      path: 'paimenthistory', 
      icon: <HiOutlineCash size={26} />, 
      color: 'bg-rose-50 text-rose-600' 
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <header className="mb-4">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">HR Dashboard</h1>
        <p className="text-slate-500 font-medium">Organization oversight and personal management</p>
      </header>

      {/* Analytics Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <OrDashboardCharts />
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center gap-4"
          >
            <div className={`p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                {item.name}
              </h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-60">
                Action Required
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Branding */}
      <footer className="pt-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300">
          Office Desck 
        </p>
      </footer>
    </div>
  )
}

export default HrHome