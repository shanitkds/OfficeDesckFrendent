import React from "react";
import {
  FaUsers,
  FaFingerprint,
  FaBrain,
  FaMoneyBillWave,
  FaCloudUploadAlt
} from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

function Features() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Enterprise-Grade Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your global workforce from a single intuitive interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            { icon: <FaUsers />, title: "Employee Management" },
            { icon: <FaFingerprint />, title: "Attendance Tracking" },
            { icon: <FaBrain />, title: "AI Performance Evaluation" },
            { icon: <MdDashboardCustomize />, title: "Role-Based Dashboards" },
            { icon: <FaMoneyBillWave />, title: "Salary System" },
            { icon: <FaCloudUploadAlt />, title: "Secure File Sharing" }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 text-xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm">
                High-quality system feature description goes here.
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;
