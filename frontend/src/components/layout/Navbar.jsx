import { useState } from "react";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
      {/* Left Side */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Order Management System
        </h1>
      </div>

      {/* Right Side */}
      <div className="relative flex items-center gap-6">
        {/* Notification */}
        <button className="relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
        >
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>

          <div className="text-left">
            <p className="font-semibold">
              {user?.name || "Administrator"}
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>

          <ChevronDown size={18} />
        </button>

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute right-0 top-16 w-52 bg-white rounded-lg shadow-lg border py-2 z-50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;