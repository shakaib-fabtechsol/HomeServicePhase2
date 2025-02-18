import React, { useState } from "react";
import upload from "../../assets/img/upload.png";
import fileicon from "../../assets/img/fileicon.png";

const MediaUpload = () => {
  const [file, setFile] = useState(null); // Stores the uploaded file
  const [filePreview, setFilePreview] = useState(null); // Stores the file preview URL
  const [showPreview, setShowPreview] = useState(false); // Toggles the preview display

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilePreview(URL.createObjectURL(uploadedFile)); // Generate a preview URL
      setShowPreview(false); // Reset preview display
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilePreview(URL.createObjectURL(uploadedFile)); // Generate a preview URL
      setShowPreview(false); // Reset preview display
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    setShowPreview(false);
  };

  const handleShowPreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="mt-5">
      <form action="#">
        <div className="file-upload-container">
          {/* Upload Box */}
          <div
            className="upload-box w-full border border-solid border-1 border-[#cdcdcd] rounded-lg p-4 text-center cursor-pointer"
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {file ? (
              <div className="upload-placeholder flex flex-col items-center justify-center h-[250px]">
                <img src={upload} alt="upload" className="w-[50px] mb-4" />
                <p className="text-gray-500">
                  <strong>File Uploaded Successfully</strong>
                </p>
                <p className="text-gray-500">
                  <strong>Click to upload</strong> or drag and drop to change
                  image
                </p>
                <p className="text-sm text-gray-400">
                  SVG, PNG, or JPG (max. 800×400px)
                </p>
              </div>
            ) : (
              <div className="upload-placeholder flex flex-col items-center justify-center h-[250px]">
                <img src={upload} alt="upload" className="w-[50px] mb-4" />
                <p className="text-gray-500">
                  <strong>Click to upload</strong> or drag and drop
                </p>
                <p className="text-sm text-gray-400">
                  SVG, PNG, or JPG (max. 800×400px)
                </p>
              </div>
            )}
            <input
              type="file"
              id="fileInput"
              accept=".svg, .png, .jpg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* File Details and Actions */}
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
                    onClick={handleShowPreview}
                  >
                    Show Preview
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

              {/* Show Preview Button */}
            </div>
          )}

          {/* Image Preview */}
          {showPreview && filePreview && (
            <div className="image-preview mt-4">
              <img
                src={filePreview}
                alt="Preview"
                className="rounded-lg border border-gray-200 w-[200px]"
              />
            </div>
          )}
        </div>
        <div>
          <div className="col-span-12 mt-4">
            <div className="flex justify-end">
              <button
                type="reset"
                className="border border-[#cdcdcd] rounded-lg w-[150px] py-[10px] me-4 font-semibold bg-[#ffffff]"
                onClick={() => setSelectedRate("")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border border-[#0F91D2] rounded-lg w-[150px] py-[10px] text-[#ffffff] font-semibold bg-[#0F91D2]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MediaUpload;
