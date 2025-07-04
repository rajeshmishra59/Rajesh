import { Building } from "lucide-react";

export default function Header() {
  return (
    <header className="dashboard-header text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
              <Building className="text-white text-sm" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Instay Coliving Dashboard</h1>
              <p className="text-blue-200 text-sm">Complete Business Monitoring System for Hostel Operations</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Admin Panel</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
