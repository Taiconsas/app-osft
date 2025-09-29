import React, { useState, useEffect } from "react"; 
import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaCogs,
  FaSignOutAlt,
  FaArrowLeft,
  FaArrowRight,
  FaSignInAlt, 
  FaRobot,
} from "react-icons/fa";

import "./Header.css";

const Header = ({ authenticated, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  // Colapsar automáticamente en móviles
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false); // opcional: expandir en escritorio
      }
    };

    handleResize(); // Ejecutar al montar

    window.addEventListener("resize", handleResize); // Reajustar si cambia tamaño

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Botón para colapsar / expandir */}
      <div className="sidebar-top">
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
      </div>

      {/* Links */}
      <ul className="sidebar-links">
        {/* 🔹 Inicio siempre visible */}
        <li className="sidebar-item">
          <NavLink to="/auth" className="sidebar-link">
            <FaSignInAlt className="sidebar-icon" />
            <span className="sidebar-text">Inicio</span>
          </NavLink>
        </li>

        {authenticated && (
          <>
            <li className="sidebar-item">
              <NavLink to="/indices" className="sidebar-link">
                <FaChartBar className="sidebar-icon" />
                <span className="sidebar-text">Indices</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/areas" className="sidebar-link">
                <FaCogs className="sidebar-icon" />
                <span className="sidebar-text">Áreas</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/text" className="sidebar-link">
                <FaRobot className="sidebar-icon" />
                <span className="sidebar-text">Hugging Face</span>
              </NavLink>
            </li>

            {/* Logout siempre abajo */}
            <li className="sidebar-item logout-item">
              <button onClick={onLogout} className="btn-logout">
                <FaSignOutAlt className="sidebar-icon" />
                <span className="sidebar-text">Logout</span>
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
