import { Rating } from "@mui/material";
import { Star } from "lucide-react";
import React from "react";

export default function Review({ data }) {
  return (
    <div className="space-y-8">
      {data.map((review, index) => (
        <div key={index} className="border-t pt-4">
          <div className="">
            <p className="text-sm text-gray-500 mb-2">{review.date}</p>
            <div className="flex items-center mb-2">
              <Rating
                sx={{ color: "#eab308" }}
                readOnly
                value={review.rating}
                precision={0.5}
              />
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={review.userimg}
              alt=""
              className="me-2 rounded-full w-[30px] h-[30px]"
            />
            <div>
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <p className="text-sm text-gray-400">{review.title}</p>
            </div>
          </div>
          <p className="text-gray-600 mt-2">{review.review}</p>
        </div>
      ))}
    </div>
  );
}
