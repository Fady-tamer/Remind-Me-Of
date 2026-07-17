import { FaBars, FaTasks, FaRegBell } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";

// 1. Optimization: Move static data outside the component
// so it doesn't get re-allocated in memory on every render.
const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <IoMdHome className="w-5 h-5" />,
  },
  {
    id: "todo",
    label: "Todo List",
    icon: <FaTasks className="w-5 h-5" />,
  },
  {
    id: "reminder",
    label: "Reminder",
    icon: <FaRegBell className="w-5 h-5" />,
  },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      // 2. Standardization: Updated height and width classes for consistency
      className={`h-screen py-4 bg-gray-900 border-r border-gray-800 shadow-md flex flex-col justify-between transition-all duration-300 z-10 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Header */}
        <div
          className={`px-4 flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <p className="text-white font-bold tracking-wide cursor-pointer hover:text-gray-300 transition-colors truncate">
              Remind Me Of
            </p>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 active:scale-95 transition-all focus:outline-none"
            aria-label="Toggle menu"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg font-medium transition-all duration-200 ${
                  isCollapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <div className="shrink-0">{item.icon}</div>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
