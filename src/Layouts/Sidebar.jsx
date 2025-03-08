import React from "react";
import { NavLink, Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import user from "../assets/img/user.png";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import { persistor } from "../redux/store";
import { BASE_URL } from "../../config";



const SidebarItem = ({ to, icon: Icon, label, toChild, toChild2 }) => {


  const resolved = useResolvedPath(to);
  const isActive = useMatch({ path: resolved.pathname, end: false });

  const isChildActive = toChild
    ? useMatch({ path: useResolvedPath(toChild).pathname, end: false })
    : false;
  const isChildActive2 = toChild2
    ? useMatch({ path: useResolvedPath(toChild2).pathname, end: false })
    : false;

  return (
    <li className="mx-1">
      <NavLink
        to={to}
        className={
          isActive || isChildActive || isChildActive2
            ? "sidelink active"
            : "sidelink"
        }
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log("userInfo", userInfo)
  const image = userInfo?.personal_image;
  const personal_image = image
    ? `${BASE_URL}/uploads/${image}`
    : "/service1.png";
  return (
    <div
      className={`left text-white bg-white fixed md:static h-full transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
    >
      <div className="left-mid h-[calc(100dvh-184px)]">
        <div className="list flex flex-col h-full justify-between">
          <div className="flex flex-col justify-between h-full">
            {sidebarData?.map((section, index) => (
              <SidebarSection key={index} {...section} />
            ))}
          </div>
        </div>
      </div>
      <div className="left-bottom border-t-2">
        <div className="flex items-center px-2 pt-3">
          <Link to={userInfo.profileLink}>
            <img
              src={personal_image}
              alt="logo"
              className="rounded-full w-[45px] h-[45px] max-w-[45px] object-cover"
            />
          </Link>
          <div className="logouts ps-1">
            <div className="flex justify-between items-center">
              <p className="font-bold text-black">{userInfo.name}</p>
              <div onClick={() => {
                dispatch(logout());
                persistor.purge()
                navigate("/login");
              }}>
                <MdLogout className="text-2xl text-black" />
              </div>
            </div>
            <p className="mb-0 font-medium text-sm text-black">
              {userInfo.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
