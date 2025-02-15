import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaUserShield,
  FaTicketAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import logo from "../assets/img/logo.png";
import {
  MdOutlineSupport,
  MdHomeRepairService,
  MdLogout,
} from "react-icons/md";
import user from "../assets/img/user.png";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`left text-white fixed md:static h-full transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="left-mid">
        <div className="list">
          <ul className="">
            <li className="mx-1">
              <NavLink
                to="user/dashboard"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaHome className="me-2" />
                  <p className="mb-0">Dashboard</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/users"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaUserShield className="me-2" />
                  <p className="mb-0">Users</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/tickets"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaTicketAlt className="me-2" />
                  <p className="mb-0">Tickets</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/users"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaUserShield className="me-2" />
                  <p className="mb-0">Users</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/tickets"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaTicketAlt className="me-2" />
                  <p className="mb-0">Tickets</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/users"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaUserShield className="me-2" />
                  <p className="mb-0">Users</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/tickets"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaTicketAlt className="me-2" />
                  <p className="mb-0">Tickets</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/users"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaUserShield className="me-2" />
                  <p className="mb-0">Users</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/tickets"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaTicketAlt className="me-2" />
                  <p className="mb-0">Tickets</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/users"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaUserShield className="me-2" />
                  <p className="mb-0">Users</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/tickets"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaTicketAlt className="me-2" />
                  <p className="mb-0">Tickets</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/tickets"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaTicketAlt className="me-2" />
                  <p className="mb-0">Tickets</p>
                </div>
              </NavLink>
            </li>
            <li className="mx-1">
              <NavLink
                to="user/faq"
                className={({ isActive }) =>
                  isActive ? "sidelink active" : "sidelink"
                }
              >
                <div className="flex items-center">
                  <FaQuestionCircle className="me-2" />
                  <p className="mb-0">FAQ</p>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="left-bottom px-4">
        <div className="flex items-center px-4">
          <Link to="/customer/ProfileDetails">
            <img
              src={user}
              alt="logo"
              className="rounded-full pe-2 max-w-[70px]"
            />
          </Link>
          <NavLink to="user/signin" className="logouts">
            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold">Mike Bird</p>
                <button>
                  <MdLogout className="text-2xl" />
                </button>
              </div>
              <p className="mb-0 text-sm">mikebird@untitledui.com</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
