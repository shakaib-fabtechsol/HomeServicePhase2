import React, { useEffect, useState } from "react";
import upload from "../../assets/img/upload.png";

const MediaUpload = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
      videos.forEach((video) => URL.revokeObjectURL(video.url));
    };
  }, []);

  const isValidImage = (file) => {
    return ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type);
  };

  const isValidVideo = (file) => {
    return ["video/mp4", "video/webm"].includes(file.type);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).filter(isValidImage);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    event.target.value = "";
  };

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files).filter(isValidVideo);
    const newVideos = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter(isValidImage);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDropVideo = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter(isValidVideo);
    const newVideos = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
  };

  const handleRemoveImage = (imageUrl) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((img) => img.url !== imageUrl);
      URL.revokeObjectURL(imageUrl);
      return updatedImages;
    });
  };

  const handleRemoveVideo = (videoUrl) => {
    setVideos((prevVideos) => {
      const updatedVideos = prevVideos.filter((vid) => vid.url !== videoUrl);
      URL.revokeObjectURL(videoUrl);
      return updatedVideos;
    });
  };

  return (
    <div className="mt-5">
      <form action="#">
        <div className="file-upload-container">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="upload-box w-full border border-solid border-[#cdcdcd] rounded-lg p-4 text-center cursor-pointer"
          >
            <label
              htmlFor="fileInput"
              className="upload-placeholder flex flex-col items-center justify-center h-[250px]"
            >
              <img src={upload} alt="Upload" className="w-[50px] mb-4" />
              <p className="text-[#0F91D2] text-sm">Click or drag to upload</p>
              <p className="text-xs text-[#343434]">
                SVG, PNG or JPG (multiple files allowed)
              </p>
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/png, image/jpeg, image/svg+xml"
              className="hidden"
              multiple
              onChange={handleImageUpload}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3 max-w-[1200px]">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt={`Preview ${image.name}`}
                  className="w-full aspect-square object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.url)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs size-5 shadow-lg rounded-full"
                  aria-label="Remove image"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="file-upload-container mt-5">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropVideo}
            className="upload-box w-full border border-solid border-[#cdcdcd] rounded-lg p-4 text-center cursor-pointer"
          >
            <label
              htmlFor="fileInputVideo"
              className="upload-placeholder flex flex-col items-center justify-center h-[250px]"
            >
              <img src={upload} alt="Upload" className="w-[50px] mb-4" />
              <p className="text-[#0F91D2] text-sm">
                Click or drag to upload videos
              </p>
              <p className="text-xs text-[#343434]">
                Only MP4 & WEBM files allowed
              </p>
            </label>
            <input
              type="file"
              id="fileInputVideo"
              accept="video/mp4, video/webm"
              className="hidden"
              multiple
              onChange={handleVideoUpload}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3 max-w-[1200px]">
            {videos.map((video, index) => (
              <div key={index} className="relative">
                <video
                  src={video.url}
                  className="w-full aspect-square rounded-lg border object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveVideo(video.url)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs size-5 shadow-lg rounded-full"
                  aria-label="Remove video"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="md:max-w-[550px] w-full mt-4 ms-auto">
          <div className="grid sm:grid-cols-3 gap-3">
            <button
              type="reset"
              className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border rounded-lg py-[10px] w-full text-white font-semibold bg-[#0F91D2]"
            >
              Publish
            </button>
            <button
              type="submit"
              className={`border rounded-lg py-[10px] w-full text-white font-semibold bg-[#0F91D2]`}
            >
              Save & Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MediaUpload;
