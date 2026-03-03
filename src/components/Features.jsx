import React from "react";
import {
  FaUsers,
  FaFingerprint,
  FaBrain,
  FaMoneyBillWave,
  FaCloudUploadAlt
} from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

const Features = () => {
  const features = [
    { 
      icon: <FaUsers />, 
      title: "Workforce Directory", 
      desc: "Centralized employee profiles with dynamic organizational charts and skill mapping.",
      color: "blue"
    },
    { 
      icon: <FaFingerprint />, 
      title: "Biometric Sync", 
      desc: "Seamlessly integrate hardware clock-ins with real-time cloud attendance tracking.",
      color: "indigo"
    },
    { 
      icon: <FaBrain />, 
      title: "AI Insights", 
      desc: "Predictive performance modeling to identify top talent and burnout risks early.",
      color: "purple"
    },
    { 
      icon: <MdDashboardCustomize />, 
      title: "Adaptive UI", 
      desc: "Customizable workspace views tailored to roles, from Interns to C-Suite Executives.",
      color: "orange"
    },
    { 
      icon: <FaMoneyBillWave />, 
      title: "Automated Payroll", 
      desc: "One-click salary disbursement with automated tax compliance and slip generation.",
      color: "emerald"
    },
    { 
      icon: <FaCloudUploadAlt />, 
      title: "Vault Storage", 
      desc: "Enterprise-grade encryption for sensitive documents with granular access control.",
      color: "sky"
    }
  ];

  return (
    <section className="relative py-32 bg-[#fafafa] overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
              Core Capabilities
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Enterprise power, <br /> 
              <span className="text-gray-400">Startup agility.</span>
            </h3>
          </div>
          <p className="text-gray-500 text-lg max-w-sm font-medium leading-relaxed">
            Everything you need to manage your global workforce from a single, high-fidelity command center.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Subtle Icon Background Glow */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 bg-${item.color}-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 text-2xl text-gray-700 group-hover:bg-[#111827] group-hover:text-white transition-colors duration-300`}>
                  {item.icon}
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
                  {item.title}
                </h4>
                
                <p className="text-gray-500 leading-relaxed font-medium">
                  {item.desc}
                </p>

                {/* Bottom Learn More link */}
                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 cursor-pointer">
                  Explore Feature <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Features */}
        <div className="mt-20 p-1 bg-[#111827] rounded-[40px] shadow-2xl overflow-hidden">
          <div className="bg-white/5 backdrop-blur-sm rounded-[38px] px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left text-white">
              <h4 className="text-2xl font-bold mb-2">Need a custom workflow?</h4>
              <p className="text-gray-400">Our API allows you to build custom integrations in minutes.</p>
            </div>
            <button className="bg-white text-[#111827] px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors whitespace-nowrap">
              Contact Engineering
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;