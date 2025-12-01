import React from "react";

const Header = ({ activeTab, setActiveTab }) => {
  const buttonStyle = (tabName) => ({
    color:
      activeTab === tabName ? "var(--text-color)" : "var(--text-secondary)",
    backgroundColor:
      activeTab === tabName ? "var(--primary-color)" : "transparent",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    padding: "0.5rem 1.5rem",
    borderRadius: "50px",
    border: "none",
    textDecoration: "none",
    display: "inline-block",
  });

  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveTab("home");
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  };

  return (
    <header
      style={{
        padding: "1rem 0",
        borderBottom: "1px solid var(--border-color)",
        backgroundColor: "rgba(11, 14, 20, 0.8)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a
          href="/"
          onClick={handleLogoClick}
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--text-color)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ color: "var(--primary-color)" }}>Cine</span>Tag
        </a>
        <nav>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setActiveTab("home")}
              style={buttonStyle("home")}
              onMouseEnter={(e) => {
                if (activeTab !== "home")
                  e.currentTarget.style.color = "var(--text-color)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "home")
                  e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              style={buttonStyle("trending")}
              onMouseEnter={(e) => {
                if (activeTab !== "trending")
                  e.currentTarget.style.color = "var(--text-color)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "trending")
                  e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              Trending
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
