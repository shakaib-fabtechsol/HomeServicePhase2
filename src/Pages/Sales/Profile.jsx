import React, { useEffect } from "react";
import provider from "../../assets/img/provider.png";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { FaRegPenToSquare } from "react-icons/fa6";

const Profiles = () => {
  const permissions = ["Permissions 1", "Permissions 2", "Permissions 3"];

  useEffect(() => {
    document.title = "Profile";
  }, []);
  return (
    <div>
      <div className="flex items-center">
        <Link to="/sales/dashboard">
          <FaArrowLeft className="me-4 text-base" />
        </Link>
        <h2 className="text-2xl font-semibold">Profile Details</h2>
      </div>
      <div className="flex flex-wrap gap-2 justify-between  items-start">
        <div className="flex flex-wrap items-center">
          <img
            src={provider}
            alt=""
            className="me-2 my-2 rounded-lg max-w-[120px]"
          />
          <div className="my-2">
            <div>
              <p className="font-semibold myhead">Sales Rep Name</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-1">
              <div className="flex items-center gap-1">
                <IoMailOutline className="text-[#535862]" />
                <p className="text-[#535862]">angel_clarke@gmail.com</p>
              </div>
              <div className="flex items-center gap-1">
                <LuPhone className="text-[#535862]" />
                <p className="text-[#535862]">+3481401405167</p>
              </div>
            </div>
            <div className="mt-1">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-[#535862]" />
                <p className="text-[#535862]">Address of the Sales Rep</p>
              </div>
            </div>
          </div>
        </div>
        <Link
          to="/sales/setting"
          className="flex py-3 justify-center items-center px-6 rounded-lg text-[#fff] bg-[#0F91D2] ms-auto"
        >
          <FaRegPenToSquare className="me-2 text-[#fff]" />
          <span>Edit</span>
        </Link>
      </div>
      <div className="mt-4 border-b border-[#00000033] pb-3">
        <h2 className="md:text-lg font-medium myhead">About Me</h2>
        <p className="myblack text-sm md:text-base mt-2">
          Donec pulvinar consequat metus eget cursus. Donec nec quam eu arcu
          elementum tempor eu pharetra mauris. Morbi et gravida purus, nec
          sagittis risus. Nulla placerat justo ut dui aliquam efficitur. Mauris
          aliquet mattis odio nec malesuada. Morbi at dui tristique, dignissim
          enim ac, varius nulla. Donec venenatis libero nec ligula laoreet
          laoreet. Sed quis lorem in mi suscipit dictum id nec diam. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam at vehicula neque. Proin molestie venenatis sem, ut imperdiet
          leo efficitur vel. Vestibulum nec elementum lacus.
        </p>
      </div>
      <div className="mt-4">
        <div className="flex flex-col gap-4 max-w-[400px]">
          {permissions.map((permission, index) => (
            <div key={index} className="flex items-center justify-between">
              <label
                htmlFor={`permission${index + 1}`}
                className="sm:text-lg font-semibold"
              >
                {permission}
              </label>
              <input
                className="accent-[#0F91D2] size-4"
                type="checkbox"
                checked={true}
                name={`permission${index + 1}`}
                id={`permission${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profiles;
