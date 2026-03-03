import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Secure Authentication",
      desc: "Access your workspace via enterprise SSO or multi-factor biometric authentication.",
    },
    {
      num: "02",
      title: "Heuristic Role Identity",
      desc: "The neural engine instantly maps your profile to the global organizational directory.",
    },
    {
      num: "03",
      title: "Dynamic Routing",
      desc: "Automated navigation to your role-specific dashboard with tailored command tools.",
    },
    {
      num: "04",
      title: "Operational Flow",
      desc: "Execute tasks, manage capital, or oversee performance with real-time sync.",
    },
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Minimalist Header */}
        <div className="mb-24 space-y-4">
          
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#0f172a]">
            Protocol <span className="text-blue-500/50">&</span> Process.
          </h2>
          <p className="max-w-xl text-gray-500 text-lg leading-relaxed font-normal pt-2">
            A frictionless onboarding experience designed for global scale and zero-latency deployment.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-white p-10 transition-all duration-500 hover:bg-[#f8faff]"
            >
              {/* Step Number - Monospace & Minimal */}
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                  {step.num}
                </span>
                {/* Arrow Icon for flow (Except last) */}
                {idx !== steps.length - 1 && (
                  <div className="hidden lg:block text-gray-200 group-hover:text-blue-200 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#0f172a] tracking-tight group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h4>

                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent to-blue-50/50 transition-opacity opacity-0 group-hover:opacity-100 rounded-tl-full" />
            </div>
          ))}
        </div>

        {/* Bottom CTA for Process */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Ready to integrate?
          </p>
          <button className="bg-[#0f172a] text-white px-8 py-3 rounded-full font-bold text-sm transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200">
            View API Documentation
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;