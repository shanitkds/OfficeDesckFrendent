import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../api/baseurl";

function ExpenseHistory() {
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/acccountent/expence-create/`,
                TOCKEN_ONLY()
            );
            setExpenses(res.data);
        } catch (err) {
            alert("Error loading expenses");
        }
    };

    // ✅ Filter by name + employee id
    const filtered = expenses.filter((e) => {
        const text = search.toLowerCase();
        return (
            e.user_name?.toLowerCase().includes(text) ||
            e.employee_id?.toLowerCase().includes(text)
        );
    });

    return (
        <div className="p-4 md:p-10">

            {/* Title + Search */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold">
                    Expense History
                </h2>

                <input
                    type="text"
                    placeholder="Search by name or employee id..."
                    className="border p-2 rounded-md md:ml-auto"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Cards */}
            <div className="space-y-6">

                {filtered.length === 0 && (
                    <p>No Expense Found</p>
                )}

                {filtered.map((item, index) => (
                    <div
                        key={index}
                        className="w-full md:w-1/2 border rounded-xl shadow p-4 bg-white"
                    >
                        {/* Top Line */}
                        <div className="flex items-center justify-between gap-3">

                            {/* Name + Employee ID */}
                            <div className="font-semibold text-lg truncate whitespace-nowrap">
                                {item.user_name} ({item.user_employee_id})
                            </div>

                            {/* Amount */}
                            <div className="font-bold text-green-600 whitespace-nowrap">
                                ₹ {item.amount}
                            </div>

                            {/* Status */}
                            <span
                                className={`px-2 py-1 text-xs rounded text-white whitespace-nowrap
      ${item.status === "APPROVED"
                                        ? "bg-green-500"
                                        : item.status === "REJECTED"
                                            ? "bg-red-500"
                                            : "bg-yellow-500"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>

                        {/* Second Line */}
                        <div className="flex justify-between mt-2 gap-3">

                            <p className="text-gray-600 truncate">
                                {item.description}
                            </p>

                            {item.accountant_remark && (
                                <p className="text-sm text-gray-500 truncate">
                                    Remark: {item.accountant_remark}
                                </p>
                            )}

                            <p className="text-xs text-gray-400 whitespace-nowrap">
                                {new Date(item.created_at).toLocaleDateString()}
                            </p>

                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default ExpenseHistory;
