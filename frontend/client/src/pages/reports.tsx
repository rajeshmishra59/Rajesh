import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CreditCard, 
  Receipt, 
  Bed, 
  AlertTriangle,
  TrendingUp
} from "lucide-react";

interface DashboardKPIs {
  totalRevenue: number;
  occupancyRate: number;
  monthlyProfit: number;
  profitMargin: number;
  totalStudents: number;
  totalExpenses: number;
  availableRooms: number;
}

export default function Reports() {
  const { data: kpis, isLoading, error } = useQuery<DashboardKPIs>({
    queryKey: ["/api/dashboard/kpis"],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Excellent":
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case "Good":
        return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
      case "Open":
        return <Badge className="bg-yellow-100 text-yellow-800">Open</Badge>;
      case "Urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load reports data</p>
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
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium opacity-90">Total Students</h3>
                <p className="text-3xl font-bold">{kpis.totalStudents}</p>
              </div>
              <Users className="text-2xl opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium opacity-90">Total Payments</h3>
                <p className="text-3xl font-bold">{formatCurrency(kpis.totalRevenue)}</p>
              </div>
              <CreditCard className="text-2xl opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium opacity-90">Total Expenses</h3>
                <p className="text-3xl font-bold">{formatCurrency(kpis.totalExpenses)}</p>
              </div>
              <Receipt className="text-2xl opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium opacity-90">Available Beds</h3>
                <p className="text-3xl font-bold">{kpis.availableRooms}</p>
              </div>
              <Bed className="text-2xl opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium opacity-90">Complaints</h3>
                <p className="text-3xl font-bold">0</p>
              </div>
              <AlertTriangle className="text-2xl opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Report Table */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2" />
            Monthly Financial Report
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Month</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Revenue</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Expenses</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Profit</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Occupancy</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Current Month</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">{formatCurrency(kpis.totalRevenue)}</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">{formatCurrency(kpis.totalExpenses)}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 font-medium">{formatCurrency(kpis.monthlyProfit)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{kpis.occupancyRate.toFixed(1)}%</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(kpis.profitMargin > 25 ? "Excellent" : "Good")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Complaint Summary */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <AlertTriangle className="mr-3" />
            Recent Complaints & Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>No complaints reported</p>
            <p className="text-sm">All systems running smoothly</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
