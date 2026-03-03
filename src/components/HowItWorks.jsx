import React from "react";

function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Login",
      desc: "Access your secure portal with SSO or two-factor auth.",
    },
    {
      num: "2",
      title: "Identify Role",
      desc: "System automatically recognizes your organizational level.",
    },
    {
      num: "3",
      title: "Redirect",
      desc: "Get navigated to your personalized workspace immediately.",
    },
    {
      num: "4",
      title: "Manage",
      desc: "Start managing tasks, teams, or personal attendance.",
    },
  ];

  return (
    <section className="py-28 bg-[#d4dae7] relative">
      <div className="max-w-7xl mx-auto px-8 relative">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-[#1f2937] mb-4">
            How It Works
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto text-lg">
            Get your entire team onboarded in minutes with our streamlined process.
          </p>
        </div>

        {/* Connecting Line */}
        <div className="hidden lg:block absolute top-[63%] left-8 right-8 h-[2px] bg-blue-200 z-0"></div>

        {/* Steps Grid */}
        <div className="relative grid lg:grid-cols-4 gap-10 z-10">

          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-gray-100 p-10 text-center"
            >
              {/* Number Circle */}
              <div className="w-16 h-16 bg-[#1A73E8] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 ring-8 ring-blue-50 shadow-md">
                {step.num}
              </div>

              <h4 className="font-bold text-lg mb-3 text-[#111827]">
                {step.title}
              </h4>

              <p className="text-[#6b7280] text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
