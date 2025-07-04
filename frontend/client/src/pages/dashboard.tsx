import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import KPICards from "@/components/dashboard/kpi-cards";
import MetricsTable from "@/components/dashboard/metrics-table";
import { Card } from "@/components/ui/card";

interface DashboardKPIs {
  totalRevenue: number;
  occupancyRate: number;
  monthlyProfit: number;
  profitMargin: number;
  totalStudents: number;
  totalExpenses: number;
  availableRooms: number;
}

export default function Dashboard() {
  const { data: kpis, isLoading, error } = useQuery<DashboardKPIs>({
    queryKey: ["/api/dashboard/kpis"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold flex items-center">
            <TrendingUp className="mr-2" />
            Real-Time Dashboard KPIs
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-20 bg-gray-200 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load dashboard data</p>
      </div>
    );
  }

  if (!kpis) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Real-Time Dashboard KPIs Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold flex items-center">
          <TrendingUp className="mr-2" />
          Real-Time Dashboard KPIs
        </h2>
      </div>

      {/* KPI Cards */}
      <KPICards data={kpis} />

      {/* Key Metrics Summary */}
      <MetricsTable occupancyRate={kpis.occupancyRate} />
    </div>
  );
}
