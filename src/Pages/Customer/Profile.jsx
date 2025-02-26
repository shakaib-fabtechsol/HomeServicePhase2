import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import provider from "../../assets/img/provider.png";
import { IoLocationOutline } from "react-icons/io5";
import Review from "../../Components/SuperAdmin/Review";

const Profile = () => {
  useEffect(() => {
    document.title = "Profile";
  }, []);
  return (
    <div>
      <div className="flex items-center">
        <Link to="/customer/dashboard">
          <FaArrowLeft className="me-4 text-base" />
        </Link>
        <h2 className="text-2xl font-semibold">Profile Details</h2>
      </div>
      <div>
        <div className="flex flex-col lg:flex-row justify-between mt-4 lg:items-start">
          <div className="flex flex-wrap items-center">
            <img
              src={provider}
              alt=""
              className="me-2 my-2 rounded-lg max-w-[120px]"
            />
            <div className="flex items-center my-2">
              <IoLocationOutline className="me-2 myblack" />
              <p className="myblack ">Address of the provider here</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-medium myhead">About Me</h2>
          <p className="text-[#535862] mt-3">
            Donec pulvinar consequat metus eget cursus. Donec nec quam eu arcu
            elementum tempor eu pharetra mauris. Morbi et gravida purus, nec
            sagittis risus. Nulla placerat justo ut dui aliquam efficitur.
            Mauris aliquet mattis odio nec malesuada. Morbi at dui tristique,
            dignissim enim ac, varius nulla. Donec venenatis libero nec ligula
            laoreet laoreet. Sed quis lorem in mi suscipit dictum id nec diam.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam at vehicula neque. Proin molestie
            venenatis sem, ut imperdiet leo efficitur vel. Vestibulum nec
            elementum lacus.
          </p>
        </div>
        <div className="mt-8">
          <Review />
        </div>
      </div>
    </div>
  );
};

export default Profile;
