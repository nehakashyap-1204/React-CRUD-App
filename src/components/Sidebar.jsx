import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState); // Toggle the sidebar state
  };

  // Set isMobile based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Check if the screen width is <= 1024px
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false); // Close the sidebar automatically on mobile view
      }
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize); // Add event listener for resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup on component unmount
  }, []);

  // Automatically close sidebar on route change if on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar if on mobile screen and route changes
    }
  }, [location, isMobile]);
  
  return (
    <>
      <div className="wrapper">
        <label htmlFor="btn" className="menu-btn" onClick={toggleSidebar}>
          <i className="ri-menu-line"></i>
        </label>

        <nav id="sidebar" className={isSidebarOpen ? "open" : "close"}>
          <ul className="list-items">
            <li>
              <Link to="/" onClick={() => isMobile && setIsSidebarOpen(false)}>
                <i className="ri-home-5-line"></i>Home
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <i className="ri-user-3-line"></i>Create Users
              </Link>
            </li>
            <li>
              <Link
                to="/read"
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <i className="ri-list-unordered"></i>List Users
              </Link>
            </li>
            <li>
              <Link
                to="/setting"
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <i className="ri-settings-4-line"></i>Settings
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <i className="ri-logout-circle-line"></i>Log Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
