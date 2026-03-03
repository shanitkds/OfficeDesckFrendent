import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";

function SalaryAdd({ onClose }) {
  const [employeeId, setEmployeeId] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [hra, setHra] = useState("");
  const [allowance, setAllowance] = useState("");
  const [deduction, setDeduction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(
        `${BASE_URL}/api/acccountent/crete-update-salary/`,
        {
          employee_id: employeeId,
          basic_salary: basicSalary || 0,
          hra: hra || 0,
          allowance: allowance || 0,
          deduction: deduction || 0,
        },
        TOCKEN_ONLY()
      );

      alert(res.data.message || "Salary saved");
      setEmployeeId("");
      setBasicSalary("");
      setHra("");
      setAllowance("");
      setDeduction("");
      onClose && onClose();

    } catch (error) {
      alert(error.response?.data?.detail || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
        Add / Update Salary
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Employee ID"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <input
            type="number"
            placeholder="Basic Salary"
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
          />

          <input
            type="number"
            placeholder="HRA"
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={hra}
            onChange={(e) => setHra(e.target.value)}
          />

          <input
            type="number"
            placeholder="Allowance"
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={allowance}
            onChange={(e) => setAllowance(e.target.value)}
          />

          <input
            type="number"
            placeholder="Deduction"
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={deduction}
            onChange={(e) => setDeduction(e.target.value)}
          />

        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Salary"}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default SalaryAdd;
