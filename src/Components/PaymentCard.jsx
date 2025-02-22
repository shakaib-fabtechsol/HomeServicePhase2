import React from "react";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";

function PaymentCard({ title, trend, percentage, amount }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow-md">
      <div className="flex justify-between items-center">
        <p className="font-medium">{title}</p>
        <div
          className={`flex items-center px-4 py-1 rounded-full text-sm ${
            trend === "up" ? "bg-[#DCEEE1] text-[#34A853]" : "bg-[#F7DBDE] text-[#C71026]"
          }`}
        >
          {trend === "up" ? <IoMdTrendingUp /> : <IoMdTrendingDown />}
          <p className="ml-2">{percentage}%</p>
        </div>
      </div>
      <p className="text-2xl mt-8 font-bold">${amount}</p>
    </div>
  );
}

export default PaymentCard;
