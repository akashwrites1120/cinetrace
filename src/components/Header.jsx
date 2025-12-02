import React from "react";

const Header = ({ activeTab, setActiveTab }) => {
  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveTab("home");
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  };

  return (
    <header className="sticky top-0 z-50 py-4 border-b border-gray-700 bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 flex justify-between items-center max-sm:flex-col max-sm:gap-4">
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90 transition-opacity"
        >
          <span className="text-indigo-400">Cine</span>Trace
        </a>
        <nav className="flex gap-4 max-sm:w-full max-sm:justify-center max-sm:bg-white/5 max-sm:p-1 max-sm:rounded-full">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 max-sm:flex-1 max-sm:text-center max-sm:text-sm ${
              activeTab === "home"
                ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 max-sm:flex-1 max-sm:text-center max-sm:text-sm ${
              activeTab === "trending"
                ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Trending
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;