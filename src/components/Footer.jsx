import React from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-[#0f172a]">
                OfficeDesk
              </span>
            </div>

            <p className="text-gray-500 leading-relaxed max-w-sm font-medium">
              Architecting the future of workspace governance. A unified ecosystem 
              designed for high-performance teams and complex organizational structures.
            </p>

            <div className="flex gap-4">
              {[FaTwitter, FaLinkedin, FaGithub, FaDiscord].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600">
              {["Infrastructure", "Role Mapping", "Security Hub", "Integrations"].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={scrollToTop}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Resources</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600">
              {["Documentation", "API Status", "Case Studies", "Global Support"].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={scrollToTop}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Stay Synchronized</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Get technical updates and enterprise release notes delivered to your inbox.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="engineering@company.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#0f172a] text-white px-4 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all">
                <HiOutlineArrowNarrowRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            © 2026 OfficeDesk Management Systems. All Rights Reserved.
          </p>

          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item, i) => (
              <button
                key={i}
                onClick={scrollToTop}
                className="text-[11px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;