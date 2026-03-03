import React from "react";
import { FaUserShield, FaUsers, FaUser } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

function Roles() {
  const roles = [
    {
      title: "Administrator",
      icon: <FaUserShield />,
      highlight: true,
      features: [
        "Full system configuration & global settings",
        "Complete financial and salary oversight",
        "Master audit logs and security controls",
      ],
      preview: (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-blue-200 rounded w-3/4"></div>
          <div className="h-4 bg-blue-100 rounded w-1/2"></div>
          <div className="flex gap-4 mt-4">
            <div className="w-10 h-10 rounded-lg bg-blue-200"></div>
            <div className="w-10 h-10 rounded-lg bg-blue-200"></div>
            <div className="w-10 h-10 rounded-lg bg-blue-200"></div>
          </div>
        </div>
      ),
    },
    {
      title: "Team Lead",
      icon: <FaUsers />,
      highlight: false,
      features: [
        "Team performance tracking & AI reviews",
        "Task assignment and sprint oversight",
        "Leave approvals and shift management",
      ],
      preview: (
        <div className="space-y-4">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="relative h-3 bg-gray-100 rounded-full w-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-blue-500 w-2/3 rounded-full"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
      ),
    },
    {
      title: "Employee",
      icon: <FaUser />,
      highlight: false,
      features: [
        "Self-service attendance and punch-in",
        "Personal task board and deadline tracking",
        "Payslip access and profile management",
      ],
      preview: (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300"></div>
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-2 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-28 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-[#111827] mb-6 tracking-tight">
            Tailored Experiences for <span className="text-blue-600">Every User</span>
          </h2>
          <p className="text-[#6B7280] text-xl max-w-2xl mx-auto font-medium">
            Specific permissions and interfaces designed for distinct organizational needs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className={`group relative bg-white rounded-[2rem] transition-all duration-500 hover:-translate-y-2 
                ${
                  role.highlight
                    ? "border-2 border-blue-500 shadow-[0_20px_50px_rgba(59,130,246,0.15)] scale-105 z-10"
                    : "border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl"
                }`}
            >
              <div className="p-10">
                {/* Icon & Title */}
                <div className="flex items-center gap-5 mb-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:rotate-12 
                    ${role.highlight ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"}`}>
                    {role.icon}
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#111827]">
                    {role.title}
                  </h3>
                </div>

                {/* Feature List */}
                <ul className="space-y-6 mb-10">
                  {role.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 group/item">
                      <AiOutlineCheckCircle className={`text-xl mt-0.5 transition-colors ${role.highlight ? "text-blue-500" : "text-green-500"}`} />
                      <span className="text-gray-600 font-medium group-hover/item:text-gray-900 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom UI Preview Section */}
              <div className={`p-10 rounded-b-[2rem] border-t transition-colors duration-500 
                ${role.highlight ? "bg-blue-50/50 border-blue-100" : "bg-gray-50/50 border-gray-50 group-hover:bg-white"}`}>
                {role.preview}
              </div>

              {/* Subtle Corner Glow for Highlighted Card */}
              {/* {role.highlight && (
                <div className="absolute -top-4 -right-4 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  RECOMMENDED
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Roles;