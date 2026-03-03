import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  MdDashboard, 
  MdAssignment, 
  MdBusiness, 
  MdChat, 
  MdLogout,
  MdMenu,
  MdClose 
} from 'react-icons/md';

function SupperadminDashbord() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Items helper
  const navItems = [
    { name: 'Home', path: '', icon: <MdDashboard size={22} /> },
    { name: 'View Requests', path: 'requestmanagement', icon: <MdAssignment size={22} /> },
    { name: 'Manage Organisation', path: 'manageorgamisation', icon: <MdBusiness size={22} /> },
    { name: 'Chat', path: 'chat', icon: <MdChat size={22} /> },
  ];

  const handleNav = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        flex flex-col  {/* Added flex-col to allow bottom alignment */}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* LOGO SECTION */}
        <div className="p-6 border-b border-slate-50">
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => handleNav('')}
          >
            <div className="relative w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-[10deg] transition-all duration-300 shadow-lg shadow-blue-500/30">
              <img src="/logo.png" alt="" className="w-6 h-6 object-contain" />
              <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse"></div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Office<span className="text-blue-600">Desk</span>
            </span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        {/* flex-1 here pushes the following div (Logout) to the bottom */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            Main Menu
          </p>
          
          {navItems.map((item) => {
            const isActive = location.pathname.endsWith(item.path);
            
            return (
              <div
                key={item.name}
                onClick={() => handleNav(item.path)}
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer font-bold text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                <span className={`${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                {item.name}
              </div>
            );
          })}
        </nav>

        {/* LOGOUT SECTION - Now fixed to bottom */}
        <div className="p-4 border-t border-slate-100 mt-auto">
           <div 
             className="flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer font-bold text-sm text-rose-500 hover:bg-rose-50 transition-all"
             onClick={() => {/* Add logout logic here */}}
           >
              <MdLogout size={22} />
              Sign Out
           </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP NAVBAR (MOBILE ONLY) */}
        <header className="lg:hidden flex items-center justify-between bg-white px-6 py-4 border-b border-slate-200">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">O</div>
              <span className="font-black text-slate-800 tracking-tighter">OfficeDesk</span>
           </div>
           <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-slate-100 rounded-xl text-slate-600"
           >
             {isMobileMenuOpen ? <MdClose size={24}/> : <MdMenu size={24}/>}
           </button>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-slate-100/50 to-transparent pointer-events-none"></div>
          
          <div className="relative p-4 md:p-8 lg:p-10">
            <Outlet />
          </div>
        </div>
      </main>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default SupperadminDashbord;