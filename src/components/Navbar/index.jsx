import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full bg-gray-700 shadow-md">
      {/* 
        - Changed 'p-7' to 'py-4 px-4 sm:px-6' to prevent huge vertical spacing on mobile.
        - Replaced non-standard 'max-w-325' with standard Tailwind classes.
      */}
      <div className="max-w-325 mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <p className="text-white text-lg sm:text-xl font-bold tracking-wide cursor-pointer hover:text-gray-200 transition-colors">
          Remind Me Of
        </p>

        {/* Mobile menu toggle button */}
        <button
          className="lg:hidden p-1 rounded-lg text-white hover:bg-gray-600 active:scale-95 transition-all focus:outline-none"
          aria-label="Toggle menu"
        >
          <FaBars className="w-5 h-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
