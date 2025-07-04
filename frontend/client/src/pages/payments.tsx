import { useQuery } from "@tanstack/react-query";
import { type Payment, type Student } from "@shared/schema";
import PaymentForm from "@/components/forms/payment-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

export default function Payments() {
  const { data: payments, isLoading, error } = useQuery<Payment[]>({
    queryKey: ["/api/payments"],
  });

  const { data: students } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const getStudentName = (studentId: number) => {
    const student = students?.find(s => s.id === studentId);
    return student?.fullName || "Unknown Student";
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(parseFloat(amount));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <PaymentForm />
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <PaymentForm />
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600">Failed to load payments</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Payment Entry Form */}
      <div className="lg:w-1/2">
        <PaymentForm />
      </div>

      {/* Recent Payments */}
      <div className="lg:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <History className="mr-3" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {payments && payments.length > 0 ? (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Student</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Amount</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Method</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-4 py-2">{getStudentName(payment.studentId)}</td>
                        <td className="px-4 py-2 text-green-600 font-medium">{formatCurrency(payment.amount)}</td>
                        <td className="px-4 py-2 capitalize">{payment.paymentMethod.replace('_', ' ')}</td>
                        <td className="px-4 py-2">{payment.paymentDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <History className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>No payments recorded yet</p>
                  <p className="text-sm">Record your first payment using the form on the left</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
