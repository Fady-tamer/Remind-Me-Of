import { NavLink } from "react-router";
import { FaCubes, FaTasks, FaCalendar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { IoGitCompareSharp } from "react-icons/io5";
import { useState } from "react";

const NAV_LINKS = [
  { name: "Home", link: "/", icon: FaCubes },
  { name: "Task", link: "/task", icon: FaTasks },
  { name: "Reminder", link: "/reminder", icon: IoGitCompareSharp },
  { name: "Calendar", link: "/calender", icon: FaCalendar },
];

const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <aside
        style={{
          // On desktop respect collapsed state; mobile is always w-64
          width: collapsed ? "4rem" : "16rem",
          transition: "width 0.25s ease",
        }}
        className={`
          pb-2
          fixed inset-y-0 left-0 z-40
          md:relative md:inset-auto
          flex flex-col
          bg-white rounded-2xl
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          overflow-hidden shrink-0
        `}
      >
        {/* ── Mobile close button (X) — only visible on mobile ── */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-[#8951d7] text-white shadow-md hover:bg-[#7040bb] transition-colors"
          aria-label="Close sidebar"
        >
          <IoIosClose className="text-lg" />
        </button>

        {/* ── Desktop collapse button — only visible on md+ ── */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden md:flex absolute top-3 right-3 z-10 w-7 h-7 items-center justify-center rounded-full bg-[#8951d7] text-white shadow-md hover:bg-[#7040bb] transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <IoIosArrowForward className="text-sm" />
          ) : (
            <IoIosArrowBack className="text-sm" />
          )}
        </button>

        {/* Label row */}
        <div className="h-14 flex items-center px-4 flex-shrink-0">
          {!collapsed && (
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest select-none">
              Menu
            </span>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-2 flex-1">
          {NAV_LINKS.map(({ name, link, icon: Icon }) => (
            <NavLink
              key={name}
              to={link}
              end={link === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 overflow-hidden
                ${
                  isActive
                    ? "bg-[#8951d7]/10 text-[#8951d7]"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active left bar */}
                  <span
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all duration-200"
                    style={{ background: isActive ? "#8951d7" : "transparent" }}
                  />

                  {/* Icon */}
                  <span
                    className={`flex-shrink-0 text-xl ${collapsed ? "mx-auto" : "ml-1"}`}
                  >
                    <Icon />
                  </span>

                  {/* Label — hidden when desktop-collapsed */}
                  {!collapsed && (
                    <span className="text-sm font-semibold whitespace-nowrap">
                      {name}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
