import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ChatApp from "../../Components/SuperAdmin/ChatApp";

const Chatsa = () => {
  useEffect(() => {
    document.title = "Message";
  }, []);
  return (
    <div>
      <div className="flex items-center sm:gap-4 gap-2 ">
        <div>
          <Link to="#">
            <FaArrowLeft className="md:text-xl text-sm" />
          </Link>
        </div>
        <div>
          <p className="font-semibold 2xl:text-3xl sm:text-xl text-lg">
            Messages
          </p>
          <p className="text-[#535862] md:text-base text-xs">
            Manage and Respond to Messages Seamlessly
          </p>
        </div>
      </div>
      <div className="mt-2">
        <ChatApp />
      </div>
    </div>
  );
};

export default Chatsa;
