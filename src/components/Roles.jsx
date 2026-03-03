import React from "react";
import { FaUserShield, FaUsers, FaUser, FaUserTie, FaCalculator } from "react-icons/fa";

const Roles = () => {
  const roles = [
    {
      title: "Administrator",
      tag: "System Owner",
      icon: <FaUserShield />,
      desc: "Full-scale governance and architectural control over the workspace.",
      features: ["Infrastructure", "Security Audit"],
      highlight: false,
    },
    {
      title: "HR Manager",
      tag: "People Ops",
      icon: <FaUserTie />,
      desc: "Talent lifecycle management from onboarding to performance.",
      features: ["Recruitment", "Leave Mgmt"],
      highlight: false,
    },
    {
      title: "Team Lead",
      tag: "Operations",
      icon: <FaUsers />,
      desc: "Middle-layer management to bridge strategy and execution.",
      features: ["Analytics", "Planning"],
      highlight: true, 
    },
    {
      title: "Accountant",
      tag: "Fiscal",
      icon: <FaCalculator />,
      desc: "Financial tracking and automated payroll disbursement.",
      features: ["Payroll", "Compliance"],
      highlight: false,
    },
    {
      title: "Employee",
      tag: "Contributor",
      icon: <FaUser />,
      desc: "Focus-oriented interface optimized for task completion.",
      features: ["Workflows", "Task Sync"],
      highlight: false,
    },
  ];

  return (
    <section className="py-32 bg-white text-[#1a1c21] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col pl-20 md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="space-y-4">
            <h3 className="text-5xl font-bold tracking-tighter text-[#0f172a]">
              One platform. <br />
              <span className="text-blue-500/60">Five perspectives.</span>
            </h3>
          </div>
          <p className="max-w-xs text-gray-500 text-lg leading-relaxed font-normal">
            Granular permission sets that transform the UI based on specific organizational roles.
          </p>
        </div>

        {/* Roles Grid: 5 Columns for Large Screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-gray-200 border border-gray-200 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className={`relative group p-8 transition-all duration-700 ${
                role.highlight ? "bg-[#f8faff] z-10 shadow-[0_0_40px_rgba(0,0,0,0.03)]" : "bg-white z-0 hover:bg-gray-50/50"
              }`}
            >
              {/* Subtle Blue Glow for Highlighted Card */}
              {role.highlight && (
                <div className="absolute inset-0 bg-blue-500/5 blur-[60px] pointer-events-none" />
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className={`text-xl transition-colors duration-500 ${
                    role.highlight ? "text-blue-600" : "text-gray-400 group-hover:text-blue-500"
                  }`}>
                    {role.icon}
                  </div>
                  <span className={`text-[9px] font-mono border px-2 py-1 rounded tracking-widest uppercase font-bold ${
                    role.highlight 
                    ? "border-blue-200 text-blue-600 bg-blue-50" 
                    : "border-gray-200 text-gray-500 bg-gray-50"
                  }`}>
                    {role.tag}
                  </span>
                </div>

                <h4 className="text-xl font-bold mb-3 tracking-tight text-[#0f172a]">
                  {role.title}
                </h4>
                
                <p className="text-gray-500 text-xs leading-relaxed mb-6 h-12 overflow-hidden">
                  {role.desc}
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-1.5 mb-10">
                  {role.features.map((f, i) => (
                    <span key={i} className="text-[9px] font-bold bg-white border border-gray-100 px-2 py-1 rounded-full text-gray-600 shadow-sm whitespace-nowrap">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Minimalist UI Preview */}
                <div className={`mt-auto pt-6 border-t transition-colors duration-500 ${
                  role.highlight ? "border-blue-100" : "border-gray-100 group-hover:border-blue-200"
                }`}>
                  <div className={`rounded-xl p-3 space-y-2.5 border ${
                    role.highlight ? "bg-white border-blue-50" : "bg-gray-50/50 border-gray-100"
                  }`}>
                    <div className="flex gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${role.highlight ? "bg-blue-200" : "bg-gray-200"}`} />
                      <div className={`w-1.5 h-1.5 rounded-full ${role.highlight ? "bg-blue-200" : "bg-gray-200"}`} />
                    </div>
                    <div className={`h-1 w-full rounded ${role.highlight ? "bg-blue-50" : "bg-gray-100"}`} />
                    <div className={`h-1 w-2/3 rounded ${role.highlight ? "bg-blue-50" : "bg-gray-100"}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-[10px] font-mono tracking-widest uppercase font-bold">
            Enterprise RBAC System • SOC2 Compliant • 256-bit Encryption
          </p>
        </div>
      </div>
    </section>
  );
};

export default Roles;