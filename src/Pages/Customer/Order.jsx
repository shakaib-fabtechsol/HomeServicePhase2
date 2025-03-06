import React, { useEffect, useState } from "react";
import { BsSliders } from "react-icons/bs";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ServiceDet from "../../assets/img/service-det.png";
import { Modal } from "@mui/material";
import ReviewModal from "../../Components/Provider/ReviewModal";
import LoadingSpinner from "../../Components/Common/LoadingSpinner.jsx";
import { useGetCustomerOrdersQuery } from "../../services/order/index.js";
import RemoteError from "../../Components/Common/RemoteError.jsx";

const orders = [
  {
    id: 1,
    serviceName: "Service Name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: "$200",
    provider: "Tatiana Dorwart",
    date: "Dec 21, 2024 7:59 pm",
    status: "New",
  },
  {
    id: 2,
    serviceName: "Another Service",
    description: "Praesent tincidunt consectetur justo, at fermentum metus.",
    price: "$150",
    provider: "John Doe",
    date: "Jan 10, 2025 3:45 pm",
    status: "Scheduled",
  },
  {
    id: 2,
    serviceName: "Another Service",
    description: "Praesent tincidunt consectetur justo, at fermentum metus.",
    price: "$150",
    provider: "John Doe",
    date: "Jan 10, 2025 3:45 pm",
    status: "In Progress",
  },
  {
    id: 3,
    serviceName: "Another Service",
    description: "Praesent tincidunt consectetur justo, at fermentum metus.",
    price: "$150",
    provider: "John Doe",
    date: "Jan 10, 2025 3:45 pm",
    status: "Completed",
  },
  {
    id: 4,
    serviceName: "Another Service",
    description: "Praesent tincidunt consectetur justo, at fermentum metus.",
    price: "$150",
    provider: "John Doe",
    date: "Jan 10, 2025 3:45 pm",
    status: "Completed",
  },
];

const Order = () => {
  const { data, isFetching, error, isError } = useGetCustomerOrdersQuery();
  const [photosopen, setphotosOpen] = useState(false);
  React.useEffect(() => {
    document.title = "Orders";
  }, []);

  // if (isFetching) return <LoadingSpinner />;
  // if (isError)
  //   return <RemoteError hasError={isError} message={error?.message} />;
  

  const handlephotosOpen = () => setphotosOpen(true);
  const handlephotosClose = () => setphotosOpen(false);

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
          <button className="border border-[#0F91D2] bg-white text-[#0F91D2] px-4 py-3 rounded-lg flex text-sm items-center gap-2">
            <FiDownload />
            Export Data
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-4 shadow-lg">
          <thead>
            <tr className="border rounded-t-xl">
              <th className="text-start p-3 font-normal">Service</th>
              <th className="text-start p-3 font-normal">Service Provider</th>
              <th className="text-start p-3 font-normal">Status</th>
              <th className="text-start p-3 font-normal">Contact Pro</th>
              <th className="text-start p-3 font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={
                  index % 2 === 0
                    ? "bg-[#FAFAFA] border-b"
                    : "bg-white border-b"
                }
              >
                <td className="p-3">
                  <div className="flex gap-2">
                    <img
                      src={ServiceDet}
                      alt=""
                      className="size-24 max-w-24 rounded-lg object-cover"
                    />
                    <div>
                      <h6>{order.serviceName}</h6>
                      <p className="text-xs text-[#535862]">
                        {order.description}
                      </p>
                      <div className="flex items-center gap-1 text-nowrap">
                        <p className="text-[10px] text-[#535862]">
                          Starting Price:
                        </p>
                        <p className="font-extrabold text-lg">{order.price}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={ServiceDet}
                      alt=""
                      className="size-12 max-w-12 rounded-full object-cover"
                    />
                    <div>
                      <h6>{order.provider}</h6>
                      <div className="flex items-center gap-1">
                        <button className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
                          <LuPhone /> Phone Call
                        </button>
                        <button className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
                          <MdOutlineMailOutline /> Email
                        </button>
                        <button className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
                          <CiLocationOn /> Address
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <p
                    className={`inline text-xs py-1 text-nowrap px-2 rounded-[4px] ${
                      order.status === "New"
                        ? "bg-[#0F91D21A]  text-[#0F91D2]"
                        : order.status === "Scheduled"
                          ? "bg-[#D20F8A1A]  text-[#D20F8A]"
                          : order.status === "In Progress"
                            ? "bg-[#FB86031A]  text-[#FB8603]"
                            : order.status === "Completed"
                              ? "bg-[#4CB53C1A]  text-[#4CB53C]"
                              : ""
                    }`}
                  >
                    {order.status}
                  </p>
                </td>
                <td className="p-3 text-nowrap">{order.date}</td>
                <td className="p-3">
                  <Link
                    to="/customer/orderdetails"
                    className="bg-white text-base py-2 px-4 border text-nowrap rounded-lg inline-block"
                  >
                    View Details
                  </Link>
                  <div className="mt-3">
                    <button
                      onClick={handlephotosOpen}
                      className="bg-[#0F91D2] text-white text-base py-2 px-4 border text-nowrap rounded-lg block"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={photosopen}
        onClose={handlephotosClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[500px] -translate-y-1/2 outline-none">
          <ReviewModal close={handlephotosClose} />
        </div>
      </Modal>
    </div>
  );
};

export default Order;
