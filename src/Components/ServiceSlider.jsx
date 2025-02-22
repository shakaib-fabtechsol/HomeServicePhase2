import React from "react";
import Slider from "react-slick";

export default function ServiceSlider({ dealsVideo, dealslidedata }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
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
