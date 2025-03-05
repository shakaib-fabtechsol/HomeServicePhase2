import React from "react";
import { useEffect } from "react";
import { BsChatLeftDots, BsSliders } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ServiceDet from "../../assets/img/service-det.png";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import DateModal from "../../Components/Provider/DateModal";
import { Modal } from "@mui/material";
import DeliveryModal from "../../Components/Provider/DeliveryModal";
import Table from "../../Components/Table";
import customer from "../../assets/img/client1.png";
import { useGetCustomerOrdersQuery } from "../../services/order";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import RemoteError from "../../Components/Common/RemoteError";
import OrderStatus from "../../Components/Common/OrderStatus";
import OrderBeforeImagesModal from "../../Components/Common/OrderBeforeImagesModal";
import OrderAfterImagesModal from "../../Components/Common/OrderAfterImagesModal";

const tableHeader = ["Service", "Customer", "Status", "Scheduled"];
export default function Ordersp() {
  useEffect(() => {
    document.title = "Orders";
  }, []);

  const [beforeModalOrder, setBeforeModalOrder] = React.useState(null);
  const [deliverModalOrder, setDeliverModalOrder] = React.useState(null);
  const [afterModalOrder, setAfterModalOrder] = React.useState(false);
  const [dateopen, setdateOpen] = React.useState(false);

  const handledateOpen = () => setdateOpen(true);
  const handledateClose = () => setdateOpen(false);

  const handleDeliverModalOpen = React.useCallback((orderData) => {
    setDeliverModalOrder(orderData);
  }, []);
  const handleDeliverModalClose = React.useCallback(
    () => setDeliverModalOrder(null),
    []
  );
  const handleBeforeOpen = React.useCallback(
    (orderData) => setBeforeModalOrder(orderData),
    []
  );
  const handleBeforeClose = React.useCallback(
    () => setBeforeModalOrder(null),
    []
  );
  const handleAfterOpen = React.useCallback(
    (orderData) => setAfterModalOrder(orderData),
    []
  );
  const handleAfterClose = React.useCallback(
    () => setAfterModalOrder(null),
    []
  );

  const { data, isFetching, error, isError } = useGetCustomerOrdersQuery();
  const tableRows = data?.orders?.map((orderDetails) => [
    <div
      key={`${orderDetails.order.id}-service`}
      className="flex items-center gap-2"
    >
      <img
        src={ServiceDet}
        alt=""
        className="w-[112px] max-w-[112px] h-[88px] rounded-lg object-cover"
      />
      <div>
        <p className="text-nowrap text-sm text-[#181D27]">
          {orderDetails.order.service_title}
        </p>
        <p className="text-xs text-wrap text-[#535862] line-clamp-2 w-[250px]">
          Lorem Ipsum is simply dummy text of the printing
        </p>
        <div>
          <p className="font-extrabold text-lg text-[#181D27]">
            {orderDetails.order.total_amount}
          </p>
        </div>
      </div>
    </div>,
    <div key={`${orderDetails.order.id}-customer`}>
      <div className="flex items-center gap-2">
        <img
          src={customer}
          alt=""
          className="size-12 max-w-12 rounded-full object-cover"
        />
        {/* <img src={getImageUrl(order.personal_image)} alt='' className='size-12 max-w-12 rounded-full object-cover' /> */}
        <div>
          <h6>{orderDetails.order.name}</h6>
          <div className="flex items-center gap-1 mt-1">
            <Link className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
              <LuPhone /> Phone Call
            </Link>
            <Link className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
              <MdOutlineMailOutline /> Email
            </Link>
            <Link className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
              <BsChatLeftDots /> Chat
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs flex items-center gap-1">
        <IoLocationOutline />
        <p className="text-[10px]">
          <span className="font-semibold">Service Location</span> : Lorem Ipsum
          is simply dummy text of the printing
        </p>
      </div>
    </div>,
    <OrderStatus
      key={`${orderDetails.order.id}-status`}
      status={orderDetails.order.status}
    />,
    <div
      key={`${orderDetails.order.id}-Scheduled`}
      className="flex text-nowrap gap-5 items-center"
    >
      <div className="w-max">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (orderDetails.order.status === "New") {
                handledateOpen();
              }
            }}
            className="col-span-2 flex items-center justify-center gap-2 bg-white p-2 border border-[#D7D7D7] rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            <IoCalendarOutline className="text-sm" />
            <p className="text-[#535862] text-xs">
              {orderDetails.order.status === "New"
                ? "Schedule"
                : orderDetails.order.date}
            </p>
          </button>
          <button
            disabled={orderDetails.order?.type === "delivered"}
            onClick={handleBeforeOpen.bind(null, orderDetails)}
            className="bg-white text-[#0F91D2] text-xs py-2 px-3 text-center border border-[#0F91D2] text-nowrap rounded-lg inline-block shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            Before
          </button>
          <button
            disabled={orderDetails.order?.type === "delivered"}
            onClick={handleAfterOpen.bind(null, orderDetails)}
            className="bg-white text-[#0F91D2] text-xs py-2 px-3 text-center border border-[#0F91D2] text-nowrap rounded-lg inline-block shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            After
          </button>
        </div>
      </div>
      <div>
        <div>
          <Link
            to={`/provider/orderdetails/${orderDetails.order.id}`}
            className="bg-white text-[#343434] text-xs p-2 min-w-[100px] text-center border border-[#D7D7D7] text-nowrap rounded-lg inline-block shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            View Details
          </Link>
        </div>

        <div className="mt-2">
          <button
            disabled={orderDetails.order.type === "delivered"}
            onClick={handleDeliverModalOpen.bind(null, orderDetails)}
            className="text-white bg-[#0F91D2] text-xs p-2 min-w-[100px] text-center border border-[#0F91D2] text-nowrap rounded-lg inline-block shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            {orderDetails.order.type == "delivered" ? "Delivered" : "Deliver"}
          </button>
        </div>
      </div>
    </div>,
  ]);

  const allBeforeImages = deliverModalOrder?.before_images?.at(0)
    ? JSON.parse(deliverModalOrder.before_images.at(0))
    : [];

  const allAfterImages = deliverModalOrder?.after_images?.at(0)
    ? JSON.parse(deliverModalOrder.after_images.at(0))
    : [];

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
      <div className="mt-4">
        {isFetching ? (
          <LoadingSpinner />
        ) : isError ? (
          <RemoteError hasError={isError} message={error?.message} />
        ) : data ? (
          <Table headers={tableHeader} rows={tableRows} />
        ) : null}
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
        open={!!deliverModalOrder}
        onClose={handleDeliverModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[500px] -translate-y-1/2 outline-none">
          <DeliveryModal
            afterImgs={allAfterImages}
            beforeImgs={allBeforeImages}
            orderId={deliverModalOrder?.order?.id}
            close={handleDeliverModalClose}
          />
        </div>
      </Modal>

      <OrderBeforeImagesModal
        orderId={beforeModalOrder?.order?.id}
        isOpen={!!beforeModalOrder}
        onClose={handleBeforeClose}
      />
      <OrderAfterImagesModal
        orderId={afterModalOrder?.order?.id}
        isOpen={!!afterModalOrder}
        onClose={handleAfterClose}
      />
    </div>
  );
}
