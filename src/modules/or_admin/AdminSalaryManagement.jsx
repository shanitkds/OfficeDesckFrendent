import React, { useState } from "react";
import SalaryView from "../../components/SalaryView";
import AllPaimentViewList from "../../components/AllPaimentViewList";
import ExpenseHistory from "../../components/ExpenseHistory";

function AdminSalaryManagement() {
  const [active, setActive] = useState("salary");

  const renderContent = () => {
    if (active === "salary") return <SalaryView />;
    if (active === "payment") return <AllPaimentViewList />;
    if (active === "expense") return <ExpenseHistory />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-4">
        Admin Salary Management
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">

        <button
          onClick={() => setActive("salary")}
          className={`px-4 py-2 rounded-lg shadow 
          ${
            active === "salary"
              ? "bg-blue-500 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          Employee Salary
        </button>

        <button
          onClick={() => setActive("payment")}
          className={`px-4 py-2 rounded-lg shadow 
          ${
            active === "payment"
              ? "bg-blue-500 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          Payment List
        </button>

        <button
          onClick={() => setActive("expense")}
          className={`px-4 py-2 rounded-lg shadow 
          ${
            active === "expense"
              ? "bg-blue-500 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          Expense History
        </button>

      </div>

      <div className="bg-white rounded-2xl shadow p-4 md:p-6">
        {renderContent()}
      </div>

    </div>
  );
}

export default AdminSalaryManagement;
