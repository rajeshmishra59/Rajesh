import React from "react";

const kpis = [
  {
    title: "Total Revenue Target",
    value: "₹3,96,000",
    subtitle: "36 students × ₹11,000",
    gradient: "from-orange-400 to-orange-600"
  },
  {
    title: "Current Occupancy",
    value: "---%",
    subtitle: "To be calculated from tracker",
    gradient: "from-indigo-400 to-indigo-600"
  },
  {
    title: "Monthly Profit",
    value: "₹---",
    subtitle: "Revenue - Expenses",
    gradient: "from-green-400 to-green-600"
  },
  {
    title: "Profit Margin",
    value: "---%",
    subtitle: "Target: 25%+",
    gradient: "from-pink-400 to-pink-600"
  }
];

const KPISection = () => {
  return (
    <div>
      <div className="text-white font-semibold text-lg bg-red-600 py-2 px-4 rounded mt-6 mb-4 shadow">
        📈 Real-Time Dashboard KPIs
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className={`p-5 text-white rounded-xl shadow-lg bg-gradient-to-br ${kpi.gradient}`}
          >
            <h3 className="text-sm font-light">{kpi.title}</h3>
            <div className="text-3xl font-bold">{kpi.value}</div>
            <small className="opacity-90">{kpi.subtitle}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPISection;
