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
import { IoHomeOutline } from "react-icons/io5";
import { FiBarChart2 } from "react-icons/fi";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { AiOutlineDollar } from "react-icons/ai";
import { CiCreditCard1 } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { PiFiles } from "react-icons/pi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GrNotification } from "react-icons/gr";
import { AiOutlineSetting } from "react-icons/ai";
import { CgSupport } from "react-icons/cg";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`left text-white bg-white fixed md:static h-full transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="left-mid">
        <div className="list flex flex-col h-full justify-between">
          <div>
            <ul className="">
              <li className="mx-1">
                <NavLink
                  to="provider/dashboard"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <IoHomeOutline className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Home</p>
                  </div>
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink
                  to="/provider/services" // Keep this the same for the general link
                  className={({ isActive }) =>
                    isActive ||
                    window.location.pathname.includes("/provider/newDeals")
                      ? "sidelink active"
                      : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <FiBarChart2 className="me-2 text-xl" />
                    <p className="mb-0 font-medium">My Services/ Deals</p>
                  </div>
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink
                  to="provider/test"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <AiOutlineDollar className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Pro Bucks</p>
                  </div>
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink
                  to="provider/test"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <RiBarChartHorizontalLine className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Orders</p>
                  </div>
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink
                  to="provider/test"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <CiCreditCard1 className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Payments/Payout</p>
                  </div>
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink
                  to="provider/test"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <FaRegHeart className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Favorites</p>
                  </div>
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink
                  to="provider/test"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <PiFiles className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Reports</p>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="mx-1">
                <NavLink
                  to="provider/test"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <IoChatboxEllipsesOutline className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Conversations</p>
                  </div>
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink
                  to="provider/notification"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <GrNotification className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Notifications</p>
                  </div>
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink
                  to="provider/settings"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <AiOutlineSetting className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Settings</p>
                  </div>
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink
                  to="provider/test"
                  className={({ isActive }) =>
                    isActive ? "sidelink active" : "sidelink"
                  }
                >
                  <div className="flex items-center">
                    <CgSupport className="me-2 text-xl" />
                    <p className="mb-0 font-medium">Support</p>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="left-bottom">
        <div className="flex items-center px-4 border-t-2 pt-3">
          <Link to="/customer/ProfileDetails">
            <img
              src={user}
              alt="logo"
              className="rounded-full pe-2 max-w-[70px]"
            />
          </Link>
          <NavLink to="user/signin" className="logouts">
            <div className="flex justify-between items-center">
              <p className="font-bold text-black">Mike Bird</p>
              <button>
                <MdLogout className="text-2xl text-black" />
              </button>
            </div>
            <p className="mb-0 font-medium text-sm text-black">
              mikebird@untitledui.com
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
