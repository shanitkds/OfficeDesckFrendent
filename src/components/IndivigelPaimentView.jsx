import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";
import { FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

function IndivigelPaimentView() {

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPayments();
  }, [month, year]);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/acccountent/payment-settings/?month=${year}-${String(month).padStart(2,"0")}`,
        TOCKEN_ONLY()
      );
      setPayments(res.data);
    } catch (err) {
      alert(err.response?.data?.detail || "Error loading payments");
    } finally {
      setLoading(false);
    }
  };

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const years = [2024, 2025, 2026, 2027];

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
          <FaMoneyBillWave className="text-green-600" />
          Payment Settings
        </h2>

        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm">
          <FaCalendarAlt className="text-gray-500" />

          {/* Month Dropdown */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="outline-none text-sm"
          >
            {months.map((m, i) => (
              <option key={i+1} value={i+1}>{m}</option>
            ))}
          </select>

          {/* Year Dropdown */}
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="outline-none text-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

        </div>
      </div>

      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading payments...
        </div>
      )}

      {!loading && payments.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No payments found
        </div>
      )}

      {!loading && payments.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Emp ID</th>
                <th className="p-3">Month</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Expense</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{p.user_name}</td>
                  <td className="p-3 text-indigo-600">{p.user_employee_id}</td>
                  <td className="p-3">{p.month}</td>
                  <td className="p-3">₹ {p.salary_amount}</td>
                  <td className="p-3">₹ {p.expense_amount}</td>
                  <td className="p-3 font-semibold text-green-600">
                    ₹ {p.total_amount}
                  </td>
                  <td className={`p-3 font-semibold ${
                    p.status === "PAID" ? "text-green-600" : "text-red-600"
                  }`}>
                    {p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default IndivigelPaimentView;
