import React from "react";
import { BsSliders } from "react-icons/bs";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ServiceDet from "../../assets/img/service-det.png";
import { IoCalendarOutline } from "react-icons/io5";
import DateModal from "../../Components/Provider/DateModal";
import { Modal } from "@mui/material";
import PhotosModal from "../../Components/Provider/PhotosModal";

export default function Ordersp() {
  const [dateopen, setdateOpen] = React.useState(false);
  const handledateOpen = () => setdateOpen(true);
  const handledateClose = () => setdateOpen(false);

  const [photosopen, setphotosOpen] = React.useState(false);
  const handlephotosOpen = () => setphotosOpen(true);
  const handlephotosClose = () => setphotosOpen(false);

  const tableHeader = ["Service", "Customer", "Status", "Scheduled"];
  const orders = [
    {
      serviceName: "Service Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$200",
      provider: "Tatiana Dorwart",
      date: "Dec 21, 2024",
      status: "New",
    },
    {
      serviceName: "Service Name",
      description: "Praesent tincidunt consectetur justo, at fermentum metus.",
      price: "$150",
      provider: "John Doe",
      date: "Dec 21, 2024",
      status: "Scheduled",
    },
    {
      serviceName: "Service Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$200",
      provider: "Tatiana Dorwart",
      date: "Dec 21, 2024",
      status: "In Progress",
    },
    {
      serviceName: "Service Name",
      description: "Praesent tincidunt consectetur justo, at fermentum metus.",
      price: "$150",
      provider: "John Doe",
      date: "Dec 21, 2024",
      status: "Completed",
    },
  ];
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
            Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-4 border-separate border-spacing-0 mb-2">
          <thead>
            <tr>
              {tableHeader.map((header, index) => (
                <th
                  key={index}
                  className="text-xs font-medium text-start p-3 border-y border-[#E9EAEB] first:border-s first:rounded-tl-[12px] last:border-e last:rounded-tr-[12px]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="odd:bg-[#FAFAFA]">
                <td
                  className={`border-b p-3 border-s border-[#E9EAEB] ${
                    index === orders.length - 1 ? "rounded-bl-[12px]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={ServiceDet}
                      alt=""
                      className="w-[112px] max-w-[112px] h-[88px] rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-nowrap text-sm text-[#181D27]">
                        {order.serviceName}
                      </p>
                      <p className="text-xs text-[#535862] line-clamp-2 min-w-[200px]">
                        {order.description}
                      </p>
                      <div>
                        <p className="font-extrabold text-lg text-[#181D27]">
                          {order.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-b border-[#E9EAEB] p-3">
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
                <td className="border-b border-[#E9EAEB] p-3 text-nowrap">
                  <p
                    className={`inline text-xs py-1 px-2 rounded-[4px] ${
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
                <td
                  className={`border-b border-[#E9EAEB] p-3 border-e ${
                    index === orders.length - 1 ? "rounded-br-[12px]" : ""
                  }`}
                >
                  <div className="flex text-nowrap gap-5 items-center">
                    <div>
                      <div>
                        <button
                          onClick={() => {
                            if (order.status === "New") {
                              handledateOpen();
                            }
                          }}
                          className="flex items-center gap-2 bg-white p-2 border border-[#D7D7D7] rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]"
                        >
                          <IoCalendarOutline className="text-sm" />
                          <p className="text-[#535862] text-xs">Dec 21, 2024</p>
                        </button>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={handlephotosOpen}
                          className="bg-[#0F91D2] text-white text-xs p-2 min-w-[100px] text-center border text-nowrap rounded-lg inline-block"
                        >
                          Before & After Photos
                        </button>
                      </div>
                    </div>
                    <div>
                      <div>
                        <Link
                          to="/provider/orderdetails"
                          className="bg-white text-[#343434] text-xs p-2 min-w-[100px] text-center border border-[#D7D7D7] text-nowrap rounded-lg inline-block"
                        >
                          View Details
                        </Link>
                      </div>
                      {order.status !== "Completed" && (
                        <div className="mt-3">
                          <Link
                            to="#"
                            className="bg-[#0F91D2] text-white text-xs p-2 min-w-[100px] text-center border text-nowrap rounded-lg inline-block"
                          >
                            Deliver
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={dateopen}
        onClose={handledateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[400px] -translate-y-1/2 outline-none">
          <DateModal close={handledateClose} />
        </div>
      </Modal>
      <Modal
        open={photosopen}
        onClose={handlephotosClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[500px] -translate-y-1/2 outline-none">
          <PhotosModal close={handlephotosClose} />
        </div>
      </Modal>
    </div>
  );
}
