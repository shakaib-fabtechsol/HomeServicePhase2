import React, { useEffect, useState } from "react";
import ServiceBox from "../../Components/ServiceBox";
import user1 from "../../assets/img/client3.png";
import user2 from "../../assets/img/client2.png";

const ProBucks = () => {
  useEffect(() => {
    document.title = "ProBucks";
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
      rating: 4.3,
      Liked: false,
      username: "John Doe",
      userimg: user1,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
      rating: 4.3,
      Liked: false,
      username: "Julia",
      userimg: user2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
      rating: 4.3,
      Liked: true,
      username: "John Doe",
      userimg: user1,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
      rating: 4.3,
      Liked: false,
      username: "Julia",
      userimg: user2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
      rating: 4.3,
      Liked: true,
      username: "John Doe",
      userimg: user1,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
      rating: 4.3,
      Liked: false,
      username: "Julia",
      userimg: user2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
      rating: 4.3,
      Liked: false,
      username: "John Doe",
      userimg: user1,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
      rating: 4.3,
      Liked: true,
      username: "Julia",
      userimg: user2,
    },
  ];
  return (
    <div className="sm:pt-6">
      <h3 className="sm:text-xl text-md text-black">
        Showing full catalog results, giving you the{" "}
        <strong>widest verity</strong> of <strong>services...</strong>{" "}
      </h3>
      <p className="text-[#0000008A] text-xs">60 results</p>
      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceBox
            key={service.id}
            title={service.title}
            price={service.price}
            description={service.description}
            tags={service.tags}
            image={service.image}
            publish={service.publish}
            Rating={service.rating}
            userimg={service.userimg}
            username={service.username}
            Liked={service.Liked}
            serviceDetailTo={"/customer/dealDetails"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProBucks;
