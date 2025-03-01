import React, { useEffect, useState } from "react";
import upload from "../../assets/img/upload.png";
import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import fileicon from "../../assets/img/fileicon.png";
import Loader from "../../Components/MUI/Loader";
import { toast } from "react-toastify";
import axios from "axios";

const MediaUpload = ({ serviceId, setValue }) => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const id = localStorage.getItem("id");
  const { dealid } = useParams();
  const [loading, setLoading] = useState(false);
  const [publishValue, setPublishValue] = useState(1);
  const [publishLoading, setPublishLoading] = useState(false);


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
      file, // store the actual file
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    event.target.value = "";
  };

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files).filter(isValidVideo);
    const newVideos = files.map((file) => ({
      file, // store the actual file
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

  useEffect(() => {
    if (dealid) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found. Please log in.");
        return;
      }
      axios
        .get(`https://homeservice.thefabulousshow.com/api/Deal/${dealid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const BasicInfo = response?.data?.deal?.[0];
          if (BasicInfo?.image) {
            const imagePath = BasicInfo.image;
            const imageUrl = `https://homeservice.thefabulousshow.com/uploads/${imagePath}`;
            console.log("Fetched image URL:", imageUrl);
           
          }
        })
        .catch((error) => {
          console.error("Error fetching deal data:", error);
          if (error.response?.status === 401) {
            console.error("Unauthorized. Redirecting to login...");
          }
        });
    }
  }, [dealid]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
  
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({ icon: "error", title: "No token found. Please log in." });
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
   
    images.forEach((img, index) => {
      formData.append("image", img.file);
    });
   
    videos.forEach((vid, index) => {
      formData.append("video", vid.file);
    });
    
    try {
      const response = await fetch(
        "https://homeservice.thefabulousshow.com/api/MediaUpload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
           
          },
          body: formData,
        }
      );
  
      const result = await response.json();
      console.log("Response:", result);
  
      if (response.status === 200) {
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Failed to update media.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while updating media. Please try again.",
      });
      console.error("Error during media upload:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    console.log("📦 MediaUpload Received Service ID:", serviceId);
  }, [serviceId]);

  const handlePublish = async () => {
    setPublishLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.get(
        `https://homeservice.thefabulousshow.com/api/DealPublish/${dealid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Deal published successfully!");
    } catch (error) {
      toast.error("Error publishing the deal.");
    } finally {
      setPublishLoading(false);
    }
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
                publishLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePublish}
              disabled={publishLoading}
            >
              {publishLoading ? "Publishing..." : "Publish"}
            </button>
            <button
              type="submit"
              className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save & Next"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MediaUpload;
