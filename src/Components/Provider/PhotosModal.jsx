import React from "react";
import { MdFileUpload } from "react-icons/md";
import before1 from "../../assets/img/before1.png";
import before2 from "../../assets/img/before2.png";
import before3 from "../../assets/img/before3.png";

export default function PhotosModal({ close }) {
  const beforeimgs = [before1, before2, before3];
  const afterimgs = [before1, before2, before3];
  return (
    <div className="rounded-[12px] bg-white p-3">
      <form action="">
        <div className="max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden">
          <p className="text-[#101828] text-lg font-semibold">
            Before & after photos
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
            <p>Upload</p>
            <div className="mt-1">
              <label
                className="flex items-center gap-1 justify-center w-full border border-[#D7D7D7] p-3 bg-[#D7D7D7] rounded-[8px] text-[#343434]"
                htmlFor="uploadfile"
              >
                <MdFileUpload />
                <span className="text-xs">Upload Images</span>
              </label>
              <input
                className="hidden"
                type="file"
                name="uploadfile"
                id="uploadfile"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-medium">Before Photos</p>
            <div className="grid grid-cols-3 gap-3 mt-1">
              {beforeimgs.map((imgs, index) => (
                <div key={index}>
                  <img
                    className="w-full aspect-square object-cover rounded-[8px]"
                    src={imgs}
                    alt="imgs"
                  />
                </div>
              ))}
            </div>
            <p className="font-medium mt-3">After Photos</p>
            <div className="grid grid-cols-3 gap-3 mt-1">
              {afterimgs.map((imgs, index) => (
                <div key={index}>
                  <img
                    className="w-full aspect-square object-cover rounded-[8px]"
                    src={imgs}
                    alt="imgs"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="my-4 grid grid-cols-2">
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
