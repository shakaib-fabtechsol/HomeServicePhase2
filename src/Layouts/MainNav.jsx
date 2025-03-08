import React,{useState} from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/img/logo.png";
import profile from "../assets/img/service1.png";
import { FaRegHeart } from "react-icons/fa6";
import { GrNotification } from "react-icons/gr";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config";
import {useDispatch} from 'react-redux';
import logout from "../redux/reducers/authSlice";
const MainNav = ({ toggleSidebar, logolink }) => {
  const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const {user}= useSelector((state)=>state.auth);
  const dispatch = useDispatch();
 const navigate=useNavigate();
  const isHomeOrCatalog =
    location.pathname === "/" ||
    location.pathname === "/catalogResult" ||
    location.pathname === "/dealdetails";

    const redirectTo = location.pathname === "/" ? "/home" : "/dashboard";


  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="mainnav input-shadow p-4 flex justify-between items-center bg-white border-b-2 border-[#E4E4E4]">
      <div className="flex items-center justify-between">
        <NavLink to={logolink} className="logodiv w-full h-full">
          <img src={logo} alt="logo" className="w-[60px]" />
        </NavLink>
      </div>

      <div className="ms-auto md:mx-auto lg:w-full lg:max-w-[700px]">
        <form action="/catalogResult" className="w-full">
          <div className="md:flex hidden ms-auto md:mx-auto lg:w-full ">
            <div className="flex me-3 rounded-lg w-full border-[#E4E4E4] border-2 py-1">
              <div className="w-[40%]">
                <input
                  type="text"
                  placeholder="Search for any service..."
                  className="py-[6px] bg-transparent focus-none w-full border-r px-3"
                />
              </div>
              <div className="flex w-[60%] items-center px-3">
                <IoLocationOutline className="me-2 text-2xl text-[#6B6B6B]" />
                <input
                  type="text"
                  placeholder="Location for the service..."
                  className="py-[6px] bg-transparent focus-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-lg flex items-center bg-[#0F91D2] px-4 text-xl text-white py-1"
            >
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center">
      {!user ? (
        <>
          <Link to="/login" className="me-3">
            Sign In
          </Link>
          <Link to="/register" className="border-2 rounded-lg px-4 py-2">
            Join Now
          </Link>
        </>
      ) : (
        <>
          <button className="text-2xl md:hidden" onClick={toggleSidebar}>
            <RxHamburgerMenu className="pointer" />
          </button>
          <div className="relative">
            <img
              onClick={toggleDropdown}
              src={
                user?.personal_image
                  ? `${BASE_URL}/uploads/${user.personal_image}`
                  : profile
              }
              alt="Profile"
              className="w-10 h-10 rounded-3xl cursor-pointer"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to={redirectTo}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default MainNav;
