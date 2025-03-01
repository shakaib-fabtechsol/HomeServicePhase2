import React, { useState, useEffect } from "react";
import upload from "../../assets/img/upload.png";
import fileicon from "../../assets/img/fileicon.png";

export default function PreviewVideo({
  onFileSelect,
  fieldName,
  existingVideo,
}) {
  const [file, setFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(existingVideo || null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!file && existingVideo) {
      setVideoPreview(import.meta.env.VITE_BASE_URL + "uploads/" + existingVideo);
      setShowPreview(true);
    }
  }, [existingVideo]);

  console.log("existingVideo>>>>>>>>", existingVideo);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && uploadedFile.type.startsWith('video/')) {
      handleVideoFile(uploadedFile, e);
    } else {
      alert('Please upload a video file');
    }
  };

  const handleFileClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/*";
    fileInput.onchange = (e) => handleFileSelect(e);
    fileInput.click();
  };

  const handleFileSelect = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith('video/')) {
      handleVideoFile(uploadedFile, e);
    } else {
      alert('Please upload a video file');
    }
  };

  const handleVideoFile = (uploadedFile, e) => {
    setFile(uploadedFile);
    setVideoPreview(URL.createObjectURL(uploadedFile));
    setShowPreview(true);
    onFileSelect(e, fieldName);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setVideoPreview(null);
    setShowPreview(false);
  };

  const handleShowPreview = () => {
    setShowPreview(true);
  };

  return (
    <div
      className="file-upload-container"
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className="upload-box w-full border border-solid border-1 border-[#cdcdcd] rounded-lg p-4 text-center cursor-pointer"
        onClick={handleFileClick}
      >
        {file || existingVideo ? (
          <div className="upload-placeholder flex flex-col items-center justify-center min-h-[180px]">
            <img src={upload} alt="upload" className="w-[50px] mb-4" />
            <p className="text-gray-500">
              <strong>Video Uploaded Successfully</strong>
            </p>
            <p className="text-gray-500">
              <strong className="text-[#0F91D2]">Click to upload</strong> or drag and drop to change video
            </p>
            <p className="text-sm text-gray-400">
              MP4, WebM, or OGG (max. 100MB)
            </p>
          </div>
        ) : (
          <div className="upload-placeholder flex flex-col items-center justify-center min-h-[180px]">
            <img src={upload} alt="upload" className="w-[50px] mb-4" />
            <p className="text-gray-500">
              <strong className="text-[#0F91D2]">Click to upload</strong> or drag and drop
            </p>
            <p className="text-sm text-gray-400">
              MP4, WebM, or OGG (max. 100MB)
            </p>
          </div>
        )}
      </div>

      {(file || existingVideo) && (
        <div className="file-actions mt-4">
          <div className="file-info flex items-center justify-between border rounded-lg p-2">
            <div className="flex items-center">
              <img src={fileicon} alt="fileicon" className="w-[20px]" />
              <div className="file-details ml-2">
                <p className="file-name text-sm font-medium">
                  {file ? file.name : "Existing Video"}
                </p>
              </div>
              <p
                className="show-preview text-[#0F91D2] mt-2 ms-8 cursor-pointer"
                onClick={handleShowPreview}
              >
                Show Preview
              </p>
            </div>
            <div className="flex px-4">
              {file && (
                <p className="file-size text-xs me-2 text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
              <button
                className="remove-file text-red-500 font-bold text-xs"
                onClick={handleRemoveFile}
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && videoPreview && (
        <div className="video-preview mt-4">
          <video 
            controls 
            className="rounded-lg border border-gray-200 w-full max-w-[400px]"
          >
            <source src={videoPreview} type={file?.type || "video/mp4"} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
