import React, { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Slider from "react-slick";
import userimg from "../assets/img/client1.png";
import { useNavigate } from "react-router-dom";

export default function SupportSlider() {
  const navigate = useNavigate();

  const sliderRef = useRef(null);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const slidedata = [
    { name: "User Name", img: userimg, email: "example@gmail.com" },
    { name: "User Name", img: userimg, email: "example@gmail.com" },
    { name: "User Name", img: userimg, email: "example@gmail.com" },
    { name: "User Name", img: userimg, email: "example@gmail.com" },
    { name: "User Name", img: userimg, email: "example@gmail.com" },
    { name: "User Name", img: userimg, email: "example@gmail.com" },
    { name: "User Name", img: userimg, email: "example@gmail.com" },
    { name: "User Name", img: userimg, email: "example@gmail.com" },
  ];

  return (
    <div className="relative">
      <div className="absolute top-1/2 -translate-y-1/2 z-[1] start-0">
        <button
          onClick={prevSlide}
          className="w-6 mx-1 shadow text-2xl aspect-square bg-[rgba(0,0,0,0.4)] text-white rounded-full flex items-center justify-center"
        >
          <MdNavigateBefore />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 z-[1] end-0">
        <button
          onClick={nextSlide}
          className="w-6 mx-1 shadow text-2xl aspect-square bg-[rgba(0,0,0,0.4)] text-white rounded-full flex items-center justify-center"
        >
          <MdNavigateNext />
        </button>
      </div>
      <div className="mx-5 md:mx-8">
        <Slider ref={sliderRef} {...settings}>
          {slidedata.map((slide, index) => (
            <div className="px-2">
              <div
                onClick={() => navigate("/provider/clientprofile")}
                className="border border-[#E9EAEB] shadow-[0px_8px_8px_-4px_#0A0D1208] bg-white rounded-[12px] cursor-pointer"
                key={index}
              >
                <div className="flex flex-col items-center gap-2 p-3">
                  <img
                    className="size-16 aspect-square object-cover rounded-full"
                    src={slide.img}
                    alt="img"
                  />
                  <p className="text-center text-[#181D27]">{slide.name}</p>
                  <p className="text-center text-[#181D27]">{slide.email}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
