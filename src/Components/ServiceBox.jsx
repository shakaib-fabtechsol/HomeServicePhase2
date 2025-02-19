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
          className="rounded-lg w-full h-40 object-cover"
        />
      </div>

      <p
        className={
          publish === 1
            ? "text-[#1dbd15] font-semibold text-end mt-5"
            : "text-[#f50202] font-semibold text-end mt-5"
        }
      >
        {publish === 1 ? "Published" : "Draft"}
      </p>
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-lg font-semibold">{title ?? "N/A"}</h2>
        <p className="mb-0 text-lg font-extrabold">${price ?? "N/A"}</p>
      </div>

      <p className="text-sm text-[#535862] mt-2">{description ?? "N/A"}</p>
      <p className="text-sm text-[#535862] mt-4">
        {tags.length > 0
          ? tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#E7F4FB] text-[#0F91D2] px-4 py-2 rounded-full text-sm me-2"
              >
                {tag}
              </span>
            ))
          : "No tags available"}
      </p>
    </div>
  );
}

export default ServiceBox;
