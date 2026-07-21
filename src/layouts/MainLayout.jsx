import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-dvh flex gap-3 p-2 sm:p-3 md:p-4 overflow-hidden">
      {/* Sidebar: hidden from layout flow on mobile (fixed overlay), shown inline on md+ */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar mobileOpen={sidebarOpen} onClose={closeSidebar} />
      </div>

      {/* Mobile sidebar overlay (outside layout flow) */}
      <div className="md:hidden">
        <Sidebar mobileOpen={sidebarOpen} onClose={closeSidebar} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-3 sm:gap-4 min-w-0 overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} />
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
