import React from "react";

const metrics = [
  {
    kpi: "Occupancy Rate",
    current: "83.3%",
    target: "90%",
    status: "⚠️ Below Target",
    formula: "(Occupied / Total Rooms) × 100"
  },
  {
    kpi: "Monthly Revenue",
    current: "₹3,30,000",
    target: "₹3,96,000",
    status: "⚠️ Below Target",
    formula: "No. of Students × Rent"
  },
  {
    kpi: "Expenses",
    current: "₹2,00,000",
    target: "₹2,00,000",
    status: "✅ OK",
    formula: "Sum of Fixed + Variable + Other"
  },
  {
    kpi: "Profit Margin",
    current: "28%",
    target: "25%",
    status: "✅ Above Target",
    formula: "Profit ÷ Revenue"
  }
];

const getStatusClass = (status) => {
  if (status.includes("OK") || status.includes("Above")) return "bg-green-100 text-green-800";
  if (status.includes("Below")) return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

const MetricsTable = () => {
  return (
    <div className="mt-10">
      <div className="text-white font-semibold text-lg bg-blue-600 py-2 px-4 rounded mb-4 shadow">
        📋 Key Metrics Summary
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left border-b">📌 KPI</th>
              <th className="px-4 py-2 text-left border-b">📍 Current</th>
              <th className="px-4 py-2 text-left border-b">🎯 Target</th>
              <th className="px-4 py-2 text-left border-b">📊 Status</th>
              <th className="px-4 py-2 text-left border-b">🧮 Formula</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b font-medium">{row.kpi}</td>
                <td className="px-4 py-3 border-b">{row.current}</td>
                <td className="px-4 py-3 border-b">{row.target}</td>
                <td className={`px-4 py-3 border-b font-semibold rounded ${getStatusClass(row.status)}`}>
                  {row.status}
                </td>
                <td className="px-4 py-3 border-b font-mono text-xs text-gray-600">
                  {row.formula}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetricsTable;
