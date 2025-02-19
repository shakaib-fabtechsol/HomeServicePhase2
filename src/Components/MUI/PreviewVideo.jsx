import React, { useState } from "react";
import upload from "../../assets/img/upload.png";
import fileicon from "../../assets/img/fileicon.png";

export default function PreviewMedia({ onFileSelect, fieldName }) {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Supported formats for video and image
  const supportedFormats = [".mp4", ".mov", ".avi", ".mkv", ".webm", ".jpg", ".jpeg", ".png", ".gif"];

  // Handle file drop from drag-and-drop
  const handleFileDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && isFileSupported(uploadedFile)) {
      processFile(uploadedFile);
    } else {
      alert("Unsupported file format. Please upload a video or image file.");
    }
  };

  // Handle file selection via file input
  const handleFileClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = supportedFormats.join(",");
    fileInput.onchange = (e) => handleFileSelect(e);
    fileInput.click();
  };

  // Handle file input change
  const handleFileSelect = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && isFileSupported(uploadedFile)) {
      processFile(uploadedFile);
    } else {
      alert("Unsupported file format. Please upload a video or image file.");
    }
  };

  // Check if the file is supported
  const isFileSupported = (file) => {
    return supportedFormats.some((format) =>
      file.name.toLowerCase().endsWith(format)
    );
  };

  // Process the file and create a preview
  const processFile = (uploadedFile) => {
    setFile(uploadedFile);
    setFilePreview(URL.createObjectURL(uploadedFile));
    setShowPreview(true);
    onFileSelect({ target: { files: [uploadedFile] } }, fieldName);
  };

  // Remove the file
  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    setShowPreview(false);
  };

  // Determine if the file is an image
  const isImage = file && file.type.startsWith("image/");

  return (
    <div
      className="file-upload-container"
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className="upload-box w-full border border-solid border-[#cdcdcd] rounded-lg p-4 text-center cursor-pointer"
        onClick={handleFileClick}
      >
        {file ? (
          <div className="upload-placeholder flex flex-col items-center justify-center min-h-[180px]">
            <img src={upload} alt="upload" className="w-[50px] mb-4" />
            <p className="text-gray-500">
              <strong>File Uploaded Successfully</strong>
            </p>
            <p className="text-gray-500">
              <strong>Click to upload</strong> or drag and drop to change file
            </p>
            <p className="text-sm text-gray-400">
              Supported formats: {supportedFormats.join(", ")}
            </p>
          </div>
        ) : (
          <div className="upload-placeholder flex flex-col items-center justify-center min-h-[180px]">
            <img src={upload} alt="upload" className="w-[50px] mb-4" />
            <p className="text-gray-500">
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p className="text-sm text-gray-400">
              Supported formats: {supportedFormats.join(", ")}
            </p>
          </div>
        )}
      </div>

      {file && (
        <div className="file-actions mt-4">
          <div className="file-info flex items-center justify-between border rounded-lg p-2">
            <div className="flex items-center">
              <img src={fileicon} alt="fileicon" className="w-[20px]" />
              <div className="file-details ml-2">
                <p className="file-name text-sm font-medium">{file.name}</p>
              </div>
              <p
                className="show-preview text-[#0F91D2] mt-2 ms-8 cursor-pointer"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </p>
            </div>
            <div className="flex px-4">
              <p className="file-size text-xs me-2 text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
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

      {showPreview && filePreview && (
        <div className="media-preview mt-4">
          {isImage ? (
            <img
              src={filePreview}
              alt="preview"
              className="rounded-lg border border-gray-200 w-full max-w-[400px]"
            />
          ) : (
            <video
              controls
              src={filePreview}
              className="rounded-lg border border-gray-200 w-full max-w-[400px]"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </div>
  );
}
