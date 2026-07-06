import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  RefreshCw,
  User,
  LogOut,
  BarChart3,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Shipments",
    path: "/shipments",
    icon: Truck,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Website Orders",
    path: "/sync-monitor",
    icon: RefreshCw,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        OMS Admin
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-700 text-slate-200"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 p-5 hover:bg-red-600 transition-colors border-t border-slate-700"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;