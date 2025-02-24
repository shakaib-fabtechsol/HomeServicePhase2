import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import before1 from "../../assets/img/before1.png";
import before2 from "../../assets/img/before2.png";
import before3 from "../../assets/img/before3.png";

export default function UploadPhotos({ title, close }) {
  const imgs = [before1, before2, before3];

  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (imageUrl) => {
    setImages(images.filter((img) => img !== imageUrl));
  };

  return (
    <div className="rounded-[12px] bg-white p-3">
      <form action="">
        <div className="max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden">
          <p className="text-[#101828] text-lg font-semibold">{title}</p>
          <div className="mt-4">
            <div>
              <div>
                <label
                  className="flex items-center cursor-pointer gap-1 justify-center w-full border border-[#D7D7D7] p-3 bg-[#D7D7D7] rounded-[8px] text-[#343434]"
                  htmlFor="Uploadbeforeimgs"
                >
                  <MdFileUpload />
                  <span className="text-xs">Upload Images</span>
                </label>
                <input
                  type="file"
                  id="Uploadbeforeimgs"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[...images, ...imgs].map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Image Preview ${index}`}
                    className="w-full aspect-square object-cover rounded-lg border"
                  />
                  {images.includes(image) && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs size-5 shadow-lg rounded-full"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="my-4 grid grid-cols-2 gap-3">
            <button
              className="bg-white text-[#343434] text-sm font-semibold border border-[#D7D7D7] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]"
              onClick={close}
              type="button"
            >
              Cancel
            </button>
            <button className="bg-[#0F91D2] text-white text-sm font-semibold border border-[#0F91D2] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]">
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
