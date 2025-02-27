import React, { useState } from "react";
import before1 from "../../assets/img/before1.png";
import before2 from "../../assets/img/before2.png";
import before3 from "../../assets/img/before3.png";
import logo from "../../assets/img/logo.png";
import { Rating } from "@mui/material";
import BlueSwitch from "../SuperAdmin/settings/BlueSwitch";

export default function ReviewModal({ close }) {
  const beforeimgs = [before1, before2, before3, before3];
  const afterimgs = [before1, before2, before3, before3];

  const [showImages, setShowImages] = useState(true);

  return (
    <div className="rounded-[12px] bg-white p-3">
      <form
        className="max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden"
        action=""
      >
        <div className="flex flex-col items-center">
          <div>
            <img className="size-16 object-contain" src={logo} alt="" />
          </div>
          <p className="text-[#101828] text-lg font-medium">Leave a Review</p>
          <div className="flex items-center gap-1 mt-2">
            <img
              className="size-12 aspect-square object-cover rounded-full"
              src={before1}
              alt="img"
            />
            <p className="font-medium text-lg">Provider Name</p>
          </div>
          <p className="text-[#535862] mt-2 text-sm">
            How would you rate your service?
          </p>
          <div className="mt-2 ps-4">
            <Rating precision={0.5} sx={{ fontSize: "40px", gap: "16px" }} />
          </div>
        </div>
        <div>
          <div className="mt-4">
            <textarea
              className="border border-[#F6F6F6] bg-[#F6F6F6] block rounded-[8px] w-full mt-1 p-2 outline-none shadow-[0px_1px_2px_0px_#2E2E2E0D]"
              rows={5}
              name="Comments"
              id="Comments"
              placeholder="Write here..."
            ></textarea>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <label htmlFor="reviewPhotos">
              Attach before & after photos to review?
            </label>
            <BlueSwitch
              id="reviewPhotos"
              defaultChecked={showImages}
              onChange={(e) => setShowImages(e.target.checked)}
            />
          </div>
          {showImages && (
            <div className="mt-4">
              <p className="font-medium">Before Photos</p>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {beforeimgs.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Image Preview ${index}`}
                      className="w-full aspect-square object-cover rounded-lg border"
                    />
                  </div>
                ))}
              </div>
              <p className="font-medium mt-3">After Photos</p>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {afterimgs.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Image Preview ${index}`}
                      className="w-full aspect-square object-cover rounded-lg border"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="my-4 grid grid-cols-2 gap-3">
            <button
              className="bg-white text-[#343434] text-sm font-semibold border border-[#D7D7D7] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]"
              onClick={close}
              type="button"
            >
              Skip
            </button>
            <button className="bg-[#0F91D2] text-white text-sm font-semibold border border-[#0F91D2] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
