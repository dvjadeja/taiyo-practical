import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`fixed z-[9999] p-8 inset-y-0 left-0 w-56 bg-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-[70%]"
      }`}
    >
      <button
        className="fixed top-4 right-4 p-2 rounded-md bg-gray-300 hover:bg-gray-400 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="21"
            // height="18"
            className="h-6 w-6"
            viewBox="0 0 16.933 16.933"
            id="hamburger"
          >
            <path d="M1.971 1.323c-1.058 0-1.058 1.587 0 1.587h12.996c1.059 0 1.059-1.587 0-1.587zm13.018 6.35H1.97c-1.1-.043-1.1 1.65 0 1.587h12.996c1.08.042 1.101-1.587.022-1.587zM1.97 14.023c-1.058 0-1.058 1.587 0 1.587h12.996c1.059 0 1.059-1.587 0-1.587z"></path>
          </svg>
        )}
      </button>
      <ul className="space-y-4 mt-">
        <li>
          <Link to="/contacts" onClick={toggleSidebar}>
            Contacts
          </Link>
        </li>
        <li>
          <Link to="/chart" onClick={toggleSidebar}>
            Charts
          </Link>
        </li>
        <li>
          <Link to="/map" onClick={toggleSidebar}>
            Map
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
