import { useEffect, useRef, useState } from "react";

const TABS = [
  { id: "home", label: "Home" },
  { id: "trending", label: "Trending" },
  { id: "watchlist", label: "Watchlist" },
];

const Header = ({ activeTab, setActiveTab, watchlistCount = 0 }) => {
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const el = tabRefs.current[activeTab];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update).catch(() => {});
    }
    return () => window.removeEventListener("resize", update);
  }, [activeTab, watchlistCount]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveTab("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bg/80 backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? "border-border" : "border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-3.5 sm:py-4">
        <a
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-2.5"
          aria-label="CineTrace home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#09090b" aria-hidden="true">
              <path d="M6 3 L21 12 L6 21 Z" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Cine
            <span className="font-display font-medium italic text-accent">
              Trace
            </span>
          </span>
        </a>

        <nav className="relative flex items-center gap-0.5 sm:gap-2" aria-label="Primary">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative cursor-pointer px-3 py-2.5 text-sm font-medium transition-colors duration-200 sm:px-4 ${
                  isActive ? "text-text" : "text-text-secondary hover:text-text"
                }`}
              >
                {tab.label}
                {tab.id === "watchlist" && watchlistCount > 0 && (
                  <span className="ml-1.5 inline-grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 align-middle text-[10px] font-bold leading-none text-black tabular-nums">
                    {watchlistCount > 99 ? "99+" : watchlistCount}
                  </span>
                )}
              </button>
            );
          })}
          <span
            aria-hidden="true"
            className="absolute bottom-0.5 m-0 h-0.5 rounded-full bg-accent transition-all duration-300 ease-out"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.width ? 1 : 0,
            }}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
