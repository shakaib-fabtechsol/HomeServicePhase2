import React, { useEffect, useState } from "react";
import upload from "../../assets/img/upload.png";
import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useGetDealQuery } from "../../services/base-api/index";
import { toast } from "react-toastify";
import {
  useUploadMediaMutation,
  usePublishDealMutation,
} from "../../services/base-api/index";
import axios from "axios";
import { useSelector } from "react-redux";

const MediaUpload = ({ serviceId, setValue }) => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const { dealid } = useParams();
  const [deal, setDeal] = useState(null);
  const [publishValue, setPublishValue] = useState(1);

  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
  const [publishDeal, { isLoading: isPublishing }] = usePublishDealMutation();

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
      videos.forEach((video) => URL.revokeObjectURL(video.url));
    };
  }, [images, videos]);

  const isValidImage = (file) =>
    ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type);

  const isValidVideo = (file) =>
    ["video/mp4", "video/webm"].includes(file.type);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).filter(isValidImage);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    event.target.value = "";
  };

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files).filter(isValidVideo);
    const newVideos = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
    event.target.value = "";
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    const formData = new FormData();

    formData.append("deal_id", serviceId);
    images.forEach((img) => formData.append("images[]", img.file));
    videos.forEach((vid) => formData.append("videos[]", vid.file));

    try {
      const result = await uploadMedia(formData).unwrap();
      console.log(result);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Media saved successfully.",
      }).then(() => {
        if (typeof setValue === "function") {
          setValue(3);
        }
      });
      setImages([]);
      setVideos([]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.data?.message || "Failed to update media.",
      });
      console.error("Error during media upload:", error);
    }
  };

  const handlePublish = async () => {
    const dealid = localStorage.getItem("deal_id");

    if (!dealid) {
      toast.error("Deal ID is missing. Please try again.");
      return;
    }
    try {
      await publishDeal({ deal_id: dealIdFromStorage }).unwrap();
      toast.success("Deal published successfully!");
    } catch (error) {
      toast.error("Error publishing the deal.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter(isValidImage);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDropVideo = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter(isValidVideo);
    const newVideos = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="mt-5">
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
                <p className="text-[#0F91D2] text-sm">
                  Click or drag to upload
                </p>
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
                    <HiOutlineTrash />
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
                    controls
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(video.url)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs size-5 shadow-lg rounded-full"
                    aria-label="Remove video"
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 mt-4 flex justify-end gap-4">
            <button
              type="reset"
              className="border border-gray-300 rounded-lg w-[150px] py-[10px] font-semibold bg-white"
            >
              Cancel
            </button>
            <input
              type="text"
              id="Flatr"
              className="focus-none border hidden"
              readOnly
            />
            <input
              type="text"
              id="publish"
              value={publishValue}
              className="focus-none border hidden"
              readOnly
            />
            <button
              type="button"
              className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                isPublishing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
            <button
              type="submit"
              className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isUploading}
            >
              {isUploading ? "Saving..." : "Save & Next"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MediaUpload;
