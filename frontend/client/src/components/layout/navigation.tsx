import { Link, useLocation } from "wouter";
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Receipt, 
  Bed, 
  FileText 
} from "lucide-react";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: BarChart3 },
  { path: "/students", label: "Students", icon: Users },
  { path: "/payments", label: "Payments", icon: CreditCard },
  { path: "/expenses", label: "Expenses", icon: Receipt },
  { path: "/rooms", label: "Rooms", icon: Bed },
  { path: "/reports", label: "Reports", icon: FileText },
];

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-0 overflow-x-auto scrollbar-hide">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-tab flex items-center space-x-2 ${
                  isActive ? "active" : ""
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
