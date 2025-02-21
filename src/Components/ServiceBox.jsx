import React from "react";

function ServiceBox({ tags = [], image, publish, title, price, description }) {
  const defaultimg = "/service1.png";
  const imageToShow = image || defaultimg;

  return (
    <div className="border px-3 py-3 rounded-lg">
      <div>
        <img
          src={imageToShow}
          alt="Service Image"
          className="rounded-lg w-full h-[200px] object-cover"
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <h2 className="text-lg font-semibold">{title ?? "N/A"}</h2>
        <p className="mb-0 text-lg font-extrabold">${price ?? "N/A"}</p>
      </div>

      <p className="text-sm text-[#535862] mt-2">{description ?? "N/A"}</p>

      <div className="text-sm text-[#535862] mt-4">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <span
              key={index}
              className={`px-4 py-2 rounded-full text-sm me-2 ${
                index % 2 === 0 ? "bg-[#E7F4FB] text-[#0F91D2]" : "bg-[#EBEBEB]"
              }`}
            >
              {tag}
            </span>
          ))
        ) : (
          "No tags available"
        )}
      </div>
    </div>
  );
}

export default ServiceBox;
