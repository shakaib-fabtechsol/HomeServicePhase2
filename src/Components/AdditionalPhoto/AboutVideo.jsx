import React from "react";
import cardvideo from "../../assets/img/cardvideo.mp4";

const AboutVideo = () => {
  return (
    <div className="video-container flex items-center">
      <video
        src={cardvideo}
        controls
        autoPlay
        muted
        className="w-1/2 h-auto max-h-[500px] rounded-lg shadow-lg"
      />
    </div>
  );
};

export default AboutVideo;
