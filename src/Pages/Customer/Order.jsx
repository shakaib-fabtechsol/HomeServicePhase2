import React, {  useState } from "react";
import { BsSliders } from "react-icons/bs";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import ReviewModal from "../../Components/Provider/ReviewModal";
import LoadingSpinner from "../../Components/Common/LoadingSpinner.jsx";
import { useGetMyOrdersAsCustomerQuery } from "../../services/order";
import RemoteError from "../../Components/Common/RemoteError.jsx";
import { getImageUrl } from "../../utils";
import OrderStatus from "../../Components/Common/OrderStatus.jsx";

const Order = () => {
  const { data, isFetching, error, isError } = useGetMyOrdersAsCustomerQuery();
  const [photosopen, setphotosOpen] = useState(false);
  React.useEffect(() => {
    document.title = "Orders";
  }, []);

  if (isFetching) return <LoadingSpinner />;
  if (isError)
    return <RemoteError hasError={isError} message={error?.message} />;
  

  const handlephotosOpen = () => setphotosOpen(true);
  const handlephotosClose = () => setphotosOpen(false);

  if(data)
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
            {data?.orders?.map((order, index) => (
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
                      src={JSON.parse(order?.order?.images)?.at(0)}
                      alt=""
                      className="size-24 max-w-24 rounded-lg object-cover"
                    />
                    <div>
                      <h6>{order.order.service_title}</h6>
                      <p className="text-xs text-[#535862]">
                        {order.description}
                      </p>
                      <div className="flex items-center gap-1 text-nowrap">
                        <p className="text-[10px] text-[#535862]">
                          Starting Price:
                        </p>
                        <p className="font-extrabold text-lg">{order.order.total_amount}$</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={getImageUrl(order?.order?.personal_image)}
                      alt=""
                      className="size-12 max-w-12 rounded-full object-cover"
                    />
                    <div>
                      <h6>{order.order.name}</h6>
                      <div className="flex items-center gap-1">
                        <Link to={`tel:${order.order.phone}`} className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
                          <LuPhone /> Phone Call
                        </Link>
                        <Link to={`mailto:${order.order.email}`} className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
                          <MdOutlineMailOutline /> Email
                        </Link>
                        <button className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
                          <CiLocationOn /> Address
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <OrderStatus status={order.order.status}/>
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
