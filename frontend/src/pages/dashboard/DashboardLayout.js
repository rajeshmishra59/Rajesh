// frontend/src/pages/dashboard/DashboardLayout.js
import React, { useState } from "react";

const tabs = [
  { id: "dashboard", label: "📈 Dashboard" },
  { id: "occupancy", label: "🏠 Occupancy" },
  { id: "revenue", label: "💰 Revenue" },
  { id: "expenses", label: "📋 Expenses" },
  { id: "profitability", label: "📊 P&L" },
  { id: "setup", label: "⚙️ Setup" }
];

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-blue-500 text-white text-center py-6 px-4">
          <h1 className="text-3xl font-light">📊 Instay Coliving Dashboard</h1>
          <p className="opacity-90 text-sm">Ahmedabad PG Monitoring System</p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto bg-gray-200 border-b border-blue-400">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap ${
                activeTab === tab.id ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "dashboard" && (
            <div className="text-xl font-semibold text-gray-700">Dashboard Content Here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
