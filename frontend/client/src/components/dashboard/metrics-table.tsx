import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key } from "lucide-react";

interface MetricsTableProps {
  occupancyRate: number;
}

export default function MetricsTable({ occupancyRate }: MetricsTableProps) {
  const metrics = [
    {
      kpi: "Occupancy Rate",
      currentValue: occupancyRate > 0 ? `${occupancyRate.toFixed(1)}%` : "Input Required",
      target: "95%+",
      status: occupancyRate > 0 ? (occupancyRate >= 95 ? "Excellent" : "Good") : "Pending",
      formula: "=COUNTIF(OccupancySheet!C:C,\"Occupied\")/36*100"
    },
    {
      kpi: "Collection Efficiency",
      currentValue: "Input Required",
      target: "95%+",
      status: "Pending",
      formula: "=RevenueSheet!TotalCollected/RevenueSheet!TotalBilled*100"
    },
    {
      kpi: "Expense Ratio",
      currentValue: "Input Required",
      target: "<75%",
      status: "Pending",
      formula: "=ExpenseSheet!TotalExpenses/RevenueSheet!TotalRevenue*100"
    },
    {
      kpi: "Average Stay Duration",
      currentValue: "Input Required",
      target: "6+ months",
      status: "Pending",
      formula: "=AVERAGE(OccupancySheet!StayDuration)"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Excellent":
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case "Good":
        return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-0">
      {/* Key Metrics Summary Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold flex items-center">
          <Key className="mr-2" />
          Key Metrics Summary
        </h2>
      </div>

      <Card className="rounded-t-none shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">KPI</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Current Value</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Target</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Excel Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {metrics.map((metric, index) => (
                  <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-25' : ''}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{metric.kpi}</td>
                    <td className="px-6 py-4 text-sm text-yellow-600 font-medium">{metric.currentValue}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{metric.target}</td>
                    <td className="px-6 py-4">{getStatusBadge(metric.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{metric.formula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
