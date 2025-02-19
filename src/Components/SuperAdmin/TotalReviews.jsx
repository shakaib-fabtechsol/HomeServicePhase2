import React from "react";
import { Rating } from "@mui/material";
import down from "../../assets/img/chevronDown.png";

export default function TotalReviews({ data }) {
  return (
    <div>
      <div className="flex gap-4 flex-wrap">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="flex flex-wrap justify-end items-center gap-3 ms-auto">
          <select
            style={{
              backgroundImage: `url(${down})`,
              backgroundPosition: "5px",
            }}
            className="ps-6 text-[#414651] text-sm font-semibold focus:outline-none border border-[#D5D7DA] p-3 rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] back appearance-none bg-no-repeat"
            name="byRate"
            id="byRate"
          >
            <option value="" hidden>
              Filter by Rate
            </option>
            <option value="">0$ to 99$</option>
            <option value="">100$ to 199$</option>
            <option value="">200$ to 299$</option>
            <option value="">300$ to 399$</option>
          </select>
          <select
            style={{
              backgroundImage: `url(${down})`,
              backgroundPosition: "5px",
            }}
            className="ps-6 text-[#414651] text-sm font-semibold focus:outline-none border border-[#D5D7DA] p-3 rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] back appearance-none bg-no-repeat"
            name="byService"
            id="byService"
          >
            <option value="" hidden>
              Filter by Service
            </option>
            <option value="">Service 1</option>
            <option value="">Service 2</option>
            <option value="">Service 3</option>
            <option value="">Service 4</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-10 xl:px-10 mt-6">
        <div className="text-center md:text-left">
          <p className="text-5xl font-bold">4.7</p>
          <div className="flex items-center justify-center md:justify-start mt-2">
            <Rating
              sx={{ color: "#eab308" }}
              readOnly
              value={4.5}
              precision={0.5}
            />
          </div>
          <p className="text-gray-500 mt-1">(578 Reviews)</p>
        </div>
        <div className="ms-auto w-full lg:w-[70%]">
          {data.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-4 mb-1">
              <span className="text-sm text-nowrap font-medium text-gray-600">
                {stars} stars
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: `${(count / 578) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
