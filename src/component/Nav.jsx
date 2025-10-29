import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#1c1c1c", // Darker gray/black
        color: "#fff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#f39c12" }}>
        MoviePlace
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "2rem", fontSize: "1.1rem" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#f39c12")}
          onMouseLeave={(e) => (e.target.style.color = "#fff")}
        >
          Home
        </Link>
        <Link
          to="/favorites"
          style={{
            textDecoration: "none",
            color: "#fff",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#f39c12")}
          onMouseLeave={(e) => (e.target.style.color = "#fff")}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
