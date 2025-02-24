import React, { useEffect } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import ServiceBox from "../../Components/ServiceBox";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import userimg1 from "../../assets/img/client1.png";
import userimg2 from "../../assets/img/client2.png";
import cardvideo from "../../assets/img/cardvideo.mp4";
import slideimg from "../../assets/img/service1new.jpeg";

const CommonDashboard = ({ orderto, conversationto, serviceDetailTo }) => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      publish: 2,
      userimg: userimg2,
      username: "Julia Maria",
      Rating: 4.5,
      Liked: true,
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
      userimg: userimg1,
      username: "John Doe",
      Rating: 4.9,
      Liked: false,
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
    },
  ];

  const projectStatuses = [
    {
      title: "Web software develop, Progressive web app",
      status: "Delivered",
      bgColor: "#46D20F",
    },
    {
      title: "Web software develop, Progressive web app",
      status: "In Progress",
      bgColor: "#C8D20F",
    },
  ];
  const getBgColor = (status) => {
    if (status === "Delivered") return "#46D20F";
    if (status === "In Progress") return "#C8D20F";
    return "#CCCCCC";
  };
  return (
    <div>
      <div className="">
        <HeroSection />
      </div>
      <div>
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <div className="border rounded-xl">
            <div className="bg-[#00000014] p-4 rounded-t-xl">
              <h6 className="text-center">Active Orders</h6>
            </div>
            <div className="p-3 grid grid-cols-1 gap-4">
              {projectStatuses.map((project, index) => (
                <div
                  key={index}
                  className="flex sm:flex-row flex-col justify-between sm:items-center border p-3 rounded-xl"
                >
                  <div>
                    <h5 className="text-[#00000091] text-xs">
                      {project.title}
                    </h5>
                  </div>
                  <div className="flex justify-end sm:mt-0 mt-4">
                    <p
                      className="w-[98px] text-center max-w-[98px] py-2 px-2 text-xs"
                      style={{ backgroundColor: getBgColor(project.status) }}
                    >
                      {project.status}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <Link
                  to={orderto}
                  className="underline text-[#000] flex items-cneter text-sm gap-x-1"
                >
                  See Order History <FaArrowRight className="text-xs mt-1" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border rounded-2xl p-4">
            <h4 className="font-medium text-xl">Recent Conversations</h4>
            <Link
              to={conversationto}
              className="flex justify-between items-center border p-3 rounded-xl mt-4"
            >
              <div>
                <h5 className="text-[#000000] text-sm">5 New messages</h5>
                <p className="text-[#6E6E6E] text-xs">
                  Stay connected to the service providers
                </p>
              </div>
              <div>
                <FaArrowRight className="text-lg" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-5">Recently Viewed</h2>
      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceBox
            key={service.id}
            title={service.title}
            price={service.price}
            description={service.description}
            tags={service.tags}
            image={service.image}
            serviceDetailTo={serviceDetailTo}
            publish={service.publish}
            userimg={service.userimg}
            username={service.username}
            Rating={service.Rating}
            Liked={service.Liked}
            videos={service.videos}
            imgs={service.images}
          />
        ))}
      </div>
    </div>
  );
};

export default CommonDashboard;
