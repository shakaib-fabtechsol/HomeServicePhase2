import React, { useEffect, useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Slider from "react-slick";

export default function ServiceSlider({ mediaItems = [] }) {
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

  const videoRefs = useRef([]);
  const handleFullScreen = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          if (document.fullscreenElement === video) {
            video.classList.replace("object-cover", "object-contain");
          } else {
            video.classList.replace("object-contain", "object-cover");
          }
        }
      });
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

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
      <Slider ref={sliderRef} {...settings}>
        {mediaItems?.length > 0 &&
          Array.isArray(mediaItems) &&
          mediaItems?.map((video, index) => (
            <div key={index} className="px-[1px]">
              <div className="outline-none aspect-video rounded-[8px] overflow-hidden relative">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover"
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                ></video>

                <button
                  onClick={() => handleFullScreen(index)}
                  className="absolute bottom-2 outline-none right-2 bg-[rgba(0,0,0,0.4)] size-6 flex items-center justify-center text-white rounded"
                >
                  ⛶
                </button>
              </div>
            </div>
          ))}
        {dealslidedata.length > 0 &&
          Array.isArray(dealslidedata) && dealslidedata.map((slide, index) => (
            <div key={index} className="px-[1px]">
              <div className="outline-none aspect-video rounded-[8px] overflow-hidden">
                <img
                  src={slide}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
