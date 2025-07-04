import { useQuery } from "@tanstack/react-query";
import { type Expense } from "@shared/schema";
import ExpenseForm from "@/components/forms/expense-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export default function Expenses() {
  const { data: expenses, isLoading, error } = useQuery<Expense[]>({
    queryKey: ["/api/expenses"],
  });

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(parseFloat(amount));
  };

  const getExpenseSummary = () => {
    if (!expenses || expenses.length === 0) return [];
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category: category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      amount,
      percentage: (amount / totalExpenses) * 100
    }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <ExpenseForm />
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
          <ExpenseForm />
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600">Failed to load expenses</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const expenseSummary = getExpenseSummary();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Expense Entry Form */}
      <div className="lg:w-1/2">
        <ExpenseForm />
      </div>

      {/* Expense Summary */}
      <div className="lg:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-600">
              <PieChart className="mr-3" />
              Expense Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseSummary.length > 0 ? (
                expenseSummary.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.category}</h3>
                      <p className="text-sm text-gray-600">Category expenses</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-red-600">{formatCurrency(item.amount.toString())}</p>
                      <p className="text-sm text-gray-500">{item.percentage.toFixed(1)}% of total</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <PieChart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>No expenses recorded yet</p>
                  <p className="text-sm">Add your first expense using the form on the left</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
