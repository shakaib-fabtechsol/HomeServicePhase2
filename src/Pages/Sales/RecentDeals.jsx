import React from "react";
import { BsSliders } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import ServiceDet from "../../assets/img/service-det.png";
import Table from "../../Components/Table";
import provider from "../../assets/img/client1.png";

export default function RecentDeals() {
  const tableHeader = [
    "Service",
    "Service Provider",
    "Category",
    "Published Date",
    "Action",
  ];
  const orders = [
    {
      serviceimg: ServiceDet,
      serviceName: "Service Name",
      proname: "Ricky Smith",
      prologo: provider,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$200",
      Category: "Residential",
      date: "Dec 21, 2024",
    },
    {
      serviceimg: ServiceDet,
      serviceName: "Service Name",
      proname: "Frances Swann",
      prologo: provider,
      description: "Praesent tincidunt consectetur justo, at fermentum metus.",
      price: "$150",
      Category: "Residential",
      date: "Dec 21, 2024",
    },
    {
      serviceimg: ServiceDet,
      serviceName: "Service Name",
      proname: "James Hall",
      prologo: provider,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$200",
      Category: "Residential",
      date: "Dec 21, 2024",
    },
    {
      serviceimg: ServiceDet,
      serviceName: "Service Name",
      proname: "Mary Freund",
      prologo: provider,
      description: "Praesent tincidunt consectetur justo, at fermentum metus.",
      price: "$150",
      Category: "Residential",
      date: "Dec 21, 2024",
    },
  ];

  const tablerows = orders.map((order) => [
    <div className="flex items-center gap-2">
      <img
        src={order.serviceimg}
        alt=""
        className="w-[112px] max-w-[112px] h-[88px] rounded-lg object-cover"
      />
      <div>
        <p className="text-nowrap text-sm text-[#181D27]">
          {order.serviceName}
        </p>
        <p className="text-xs text-wrap text-[#535862] line-clamp-2 w-[250px]">
          {order.description}
        </p>
        <div className="flex items-center gap-1">
          <p className="text-[10px] text-[#535862]">Starting Price:</p>
          <p className="font-extrabold text-lg text-[#181D27]">{order.price}</p>
        </div>
      </div>
    </div>,
    <div className="flex items-center gap-2">
      <img
        className="size-10 object-cover rounded-full"
        src={order.prologo}
        alt="img"
      />
      <p>{order.proname}</p>
    </div>,
    <p className="text-[#181D27] text-sm">{order.Category}</p>,
    <p className="text-[#181D27] text-sm">{order.date}</p>,
    <div className="flex text-nowrap gap-5 items-center">
      <div>
        <div>
          <button className="bg-[#42B443] text-white text-sm font-semibold p-2 min-w-[100px] text-center border text-nowrap rounded-lg inline-block">
            Approve
          </button>
        </div>
        <div className="mt-3">
          <button className="text-[#FF1D1D] text-sm font-semibold bg-white p-2 border border-[#FF1D1D] rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]">
            Flag for Removal
          </button>
        </div>
      </div>
    </div>,
  ]);

  return (
    <div>
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-2">
        <div className="flex items-center p-2 border rounded-lg w-full sm:max-w-[400px]">
          <label>
            <CiSearch className="text-[#717680] text-xl" />
          </label>
          <input type="search" placeholder="Search" className="w-full px-2" />
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="border bg-white px-4 py-3 rounded-lg flex text-sm items-center gap-2">
            <BsSliders />
            Filter
          </button>
        </div>
      </div>
      <div className="mt-4">
        <Table headers={tableHeader} rows={tablerows} />
      </div>
    </div>
  );
}
