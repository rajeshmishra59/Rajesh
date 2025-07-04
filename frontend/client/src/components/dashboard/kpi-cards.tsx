import { Card } from "@/components/ui/card";
import { IndianRupee, Users, TrendingUp, Percent } from "lucide-react";

interface KPIData {
  totalRevenue: number;
  occupancyRate: number;
  monthlyProfit: number;
  profitMargin: number;
}

interface KPICardsProps {
  data: KPIData;
}

export default function KPICards({ data }: KPICardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Revenue Card */}
      <Card className="kpi-card-orange-400 text-white p-6 shadow-lg transform-hover">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium opacity-90">Total Revenue Target</h3>
            <p className="text-3xl font-bold">{formatCurrency(data.totalRevenue)}</p>
            <p className="text-sm opacity-75">Monthly collections</p>
          </div>
          <IndianRupee className="text-2xl opacity-75" />
        </div>
      </Card>

      {/* Current Occupancy Card */}
      <Card className="kpi-card-orange-500 text-white p-6 shadow-lg transform-hover">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium opacity-90">Current Occupancy</h3>
            <p className="text-3xl font-bold">{data.occupancyRate.toFixed(1)}%</p>
            <p className="text-sm opacity-75">Calculated from rooms</p>
          </div>
          <Users className="text-2xl opacity-75" />
        </div>
      </Card>

      {/* Monthly Profit Card */}
      <Card className="kpi-card-orange-600 text-white p-6 shadow-lg transform-hover">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium opacity-90">Monthly Profit</h3>
            <p className="text-3xl font-bold">{formatCurrency(data.monthlyProfit)}</p>
            <p className="text-sm opacity-75">Revenue - Expenses</p>
          </div>
          <TrendingUp className="text-2xl opacity-75" />
        </div>
      </Card>

      {/* Profit Margin Card */}
      <Card className="kpi-card-orange-700 text-white p-6 shadow-lg transform-hover">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium opacity-90">Profit Margin</h3>
            <p className="text-3xl font-bold">{data.profitMargin.toFixed(1)}%</p>
            <p className="text-sm opacity-75">Target: 25%+</p>
          </div>
          <Percent className="text-2xl opacity-75" />
        </div>
      </Card>
    </div>
  );
}
