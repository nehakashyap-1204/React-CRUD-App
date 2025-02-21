import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    const dropdown = dropdownRef.current.querySelector(".toggle-options");
    dropdown.classList.toggle("active");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const dropdown = dropdownRef.current.querySelector(".toggle-options");
        dropdown.classList.remove("active");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <header className="header">
        <div className="nav-logo">
          <i className="ri-earth-line"></i>Company Name
        </div>
        <div className="toggle-container" ref={dropdownRef}>
          <button className="toggle-btn" onClick={toggleDropdown}>
            <i className="ri-user-line"></i>
          </button>

          <div className="toggle-options">
            <ul>
              <li>
                <Link to={"/profile"}>
                  <i className="ri-user-3-fill"></i>Profile
                </Link>
              </li>
              <li>
                <Link to={"/password"}>
                  <i className="ri-settings-3-line"></i>Change Password
                </Link>
              </li>
              <li>
                <Link to={"/logout"}>
                  <i className="ri-logout-circle-line"></i>Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
