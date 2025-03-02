import React from "react";
import cardvideo from "../../assets/img/cardvideo.mp4";

const AboutVideo = ({about_video}) => {
  console.log("about_video>>>>>>>>", import.meta.env.VITE_BASE_URL + "uploads/" + about_video);
  return (
    <div className="video-container flex items-center">
      <video
        src={import.meta.env.VITE_BASE_URL + "uploads/" + about_video}
        controls
        autoPlay
        muted
        className="w-1/2 h-auto max-h-[500px] rounded-lg shadow-lg"
      />
    </div>
  );
};

export default AboutVideo;
