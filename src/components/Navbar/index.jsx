import { FaBars } from "react-icons/fa";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <div className="p-4 rounded-2xl bg-white flex">
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-[#8951d7] text-white"
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>
        <p className="text-2xl text-[#8951d7] font-bold">Remind Me Of</p>
      </div>
    </div>
  );
};

export default Navbar;
