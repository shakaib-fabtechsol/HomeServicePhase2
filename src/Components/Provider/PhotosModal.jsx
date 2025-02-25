import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import before1 from "../../assets/img/before1.png";
import before2 from "../../assets/img/before2.png";
import before3 from "../../assets/img/before3.png";

export default function PhotosModal({ close }) {
  const beforeimgs = [before1, before2, before3];
  const afterimgs = [before1, before2, before3];

  const [Beforeimages, setBeforeImages] = useState([]);
  const [Afterimages, setAfterImages] = useState([]);

  const handleBeforeImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newBeforeImages = files.map((file) => URL.createObjectURL(file));
    setBeforeImages((prevBeforeImages) => [
      ...prevBeforeImages,
      ...newBeforeImages,
    ]);
    event.target.value = "";
  };

  const handleAfterImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAfterImages = files.map((file) => URL.createObjectURL(file));
    setAfterImages((prevAfterImages) => [
      ...prevAfterImages,
      ...newAfterImages,
    ]);
    event.target.value = "";
  };

  const handleRemoveBeforeImage = (imageUrl) => {
    setBeforeImages(Beforeimages.filter((img) => img !== imageUrl));
  };

  const handleRemoveAfterImage = (imageUrl) => {
    setAfterImages(Afterimages.filter((img) => img !== imageUrl));
  };
  return (
    <div className="rounded-[12px] bg-white p-3">
      <form action="">
        <div className="max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden">
          <p className="text-[#101828] text-lg font-semibold">
            Confirm Delivery
          </p>
          <div className="mt-4">
            <label
              className="text-[#343434] text-sm font-medium"
              htmlFor="Comments"
            >
              Final Comments
            </label>
            <textarea
              className="border border-[#D7D7D7] block rounded-[8px] w-full mt-1 p-2 outline-none shadow-[0px_1px_2px_0px_#2E2E2E0D]"
              rows={5}
              name="Comments"
              id="Comments"
              placeholder="Write here..."
            ></textarea>
          </div>
          <div className="mt-4">
            <label
              className="text-[#343434] text-sm font-medium"
              htmlFor="date"
            >
              Schedule/ Date & time
            </label>
            <input
              className="border border-[#D7D7D7] block rounded-[8px] w-full mt-1 p-2 outline-none shadow-[0px_1px_2px_0px_#2E2E2E0D]"
              type="datetime-local"
              name="date"
              id="date"
            />
          </div>
          <div className="mt-4">
            <p className="font-medium">Before Photos</p>
            <div className="mt-1">
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
                  onChange={handleBeforeImageUpload}
                />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[...Beforeimages, ...beforeimgs].map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Image Preview ${index}`}
                    className="w-full aspect-square object-cover rounded-lg border"
                  />
                  {Beforeimages.includes(image) && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBeforeImage(image)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs size-5 shadow-lg rounded-full"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="font-medium mt-3">After Photos</p>
            <div className="mt-1">
              <div>
                <label
                  className="flex items-center cursor-pointer gap-1 justify-center w-full border border-[#D7D7D7] p-3 bg-[#D7D7D7] rounded-[8px] text-[#343434]"
                  htmlFor="uploadsfterimgs"
                >
                  <MdFileUpload />
                  <span className="text-xs">Upload Images</span>
                </label>
                <input
                  type="file"
                  id="uploadsfterimgs"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleAfterImageUpload}
                />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[...Afterimages, ...afterimgs].map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Image Preview ${index}`}
                    className="w-full aspect-square object-cover rounded-lg border"
                  />
                  {Afterimages.includes(image) && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAfterImage(image)}
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
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
