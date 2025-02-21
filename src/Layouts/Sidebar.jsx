import React from "react";
import { NavLink, Link, useMatch, useResolvedPath } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import user from "../assets/img/user.png";

const SidebarItem = ({ to, icon: Icon, label, toChild }) => {
  const resolved = useResolvedPath(to);
  const isActive = useMatch({ path: resolved.pathname, end: false });
  
  const resolvedChild = toChild ? useResolvedPath(toChild) : null;
  const isChildActive = toChild ? useMatch({ path: resolvedChild.pathname, end: false }) : false;

  return (
    <li className="mx-1">
    <NavLink
      to={to}
      className={isActive || isChildActive ? "sidelink active" : "sidelink"}
    >
      <div className="flex items-center">
        <Icon className="me-2 text-xl" />
        <p className="mb-0 font-medium">{label}</p>
      </div>
    </NavLink>
  </li>
  );
};

const SidebarSection = ({ items }) => {
  return (
    <div className="">
      <ul>
        {items.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </ul>
    </div>
  );
};

const Sidebar = ({ isSidebarOpen, sidebarData, userInfo }) => {
  return (
    <div
      className={`left text-white bg-white fixed md:static h-full transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="left-mid h-[calc(100dvh-184px)]">
        <div className="list flex flex-col h-full justify-between">
          <div className="flex flex-col justify-between h-full">
            {sidebarData.map((section, index) => (
              <SidebarSection key={index} {...section} />
            ))}
          </div>

        </div>
      </div>
          <div className="left-bottom border-t-2">
            <div className="flex items-center px-4 pt-3">
              <Link to="/customer/ProfileDetails">
                <img
                  src={user}
                  alt="logo"
                  className="rounded-full pe-2 max-w-[70px]"
                />
              </Link>
              <NavLink to="/" className="logouts">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-black">{userInfo.name}</p>
                  <button>
                    <MdLogout className="text-2xl text-black" />
                  </button>
                </div>
                <p className="mb-0 font-medium text-sm text-black">
                  {userInfo.email}
                </p>
              </NavLink>
            </div>
          </div>
    </div>
  );
};

export default Sidebar;
