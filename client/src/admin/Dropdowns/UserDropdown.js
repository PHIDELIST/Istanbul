import React, { useState, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom"; 

const UserDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (dropdownOpen) {
      createPopper(buttonRef.current, dropdownRef.current, {
        placement: "bottom-start",
      });
    }
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    window.location.href = "/"; 
  };

  return (
    <div className="relative">
      <button
        className="text-blueGray-500 block"
        ref={buttonRef}
        onClick={toggleDropdown}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="User"
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("../../assets/img/team-1-800x800.jpg").default}
            />
          </span>
        </div>
      </button>
      <div
        ref={dropdownRef}
        className={
          (dropdownOpen ? "block" : "hidden") +
          " bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 mt-2"
        }
      >
        <Link
          to="/login"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default UserDropdown;
