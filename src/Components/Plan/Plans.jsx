import React from "react";

export default function Plans({ title, price, desc, features = [] }) {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium myhead">
          {title}
        </h2>
        <p className="text-xl sm:text-2xl md:text-3xl myhead font-bold">
          ${price}
        </p>
      </div>
      <p className="text-sm myblack mt-2">{desc}</p>
      <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
        {features.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
