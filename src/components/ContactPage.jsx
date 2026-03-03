import React from "react";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone, HiArrowRight } from "react-icons/hi";

const ContactPage = () => {
  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-[0.3em]">
              Support Center
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#0f172a] mb-6">
            Connect with our <br />
            <span className="text-blue-500/50">Enterprise Team.</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium max-w-xl">
            Have questions about global deployment or custom role configurations? 
            Our technical engineers are ready to assist.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              {/* Contact Item */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <HiOutlineMail />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email Inquiry</h4>
                  <p className="text-xl font-bold text-[#0f172a]">solutions@officedesk.io</p>
                </div>
              </div>

              {/* Contact Item */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <HiOutlinePhone />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Global Support</h4>
                  <p className="text-xl font-bold text-[#0f172a]">+1 (888) 234-5678</p>
                </div>
              </div>

              {/* Contact Item */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <HiOutlineLocationMarker />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">HQ Address</h4>
                  <p className="text-xl font-bold text-[#0f172a]">101 Tech Plaza, San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 inline-block">
               <p className="text-[#0f172a] font-bold flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 Currently Active: <span className="text-gray-500 font-medium">9:00 AM — 6:00 PM EST</span>
               </p>
            </div>
          </div>

          {/* Right Column: High-Fidelity Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/5 relative">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[#0f172a] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                    <input 
                      type="email" 
                      placeholder="jane@company.com" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[#0f172a] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Interest Area</label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[#0f172a] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option>Enterprise Licensing</option>
                    <option>Custom Role Implementation</option>
                    <option>Technical Support</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    rows="4" 
                    placeholder="How can we help your team?" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[#0f172a] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-[#0f172a] hover:bg-blue-600 text-white font-bold py-5 rounded-2xl transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-3 group">
                  Transmit Message 
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Decoration Dot */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white">
                 <div className="w-2 h-2 bg-blue-600 rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;