import React, { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Slider from "react-slick";

export default function ServiceSlider({ dealsVideo = [], dealslidedata = [] }) {
  const sliderRef = useRef(null);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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

  return (
    <div className="relative">
      <div className="absolute top-1/2 -translate-y-1/2 z-[99] start-0">
        <button
          onClick={prevSlide}
          className="w-6 aspect-square hover:bg-[rgba(0,0,0,0.4)] text-white rounded-full flex items-center justify-center"
        >
          <MdNavigateBefore />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 z-[99] end-0">
        <button
          onClick={nextSlide}
          className="w-6 aspect-square hover:bg-[rgba(0,0,0,0.4)] text-white rounded-full flex items-center justify-center"
        >
          <MdNavigateNext />
        </button>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {dealsVideo.length > 0 &&
          dealsVideo.map((video, index) => (
            <div
              key={index}
              className="outline-none aspect-video rounded-[8px] overflow-hidden"
            >
              <video
                className="w-full h-full object-cover"
                src={video}
                autoPlay
                muted
                loop
                controls
              ></video>
            </div>
          ))}
        {dealslidedata.length > 0 &&
          dealslidedata.map((slide, index) => (
            <div
              key={index}
              className="outline-none aspect-video rounded-[8px] overflow-hidden"
            >
              <img
                src={slide}
                alt="Service Image"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}
