import React from "react";
import { useEffect } from "react";
import { FaArrowLeft, FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";
import ServiceDet from "../../assets/img/service-det.png";
import ClientTwo from "../../assets/img/client2.png";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { BsChatLeftDots } from "react-icons/bs";
import { useGetOrderDetailsQuery } from "../../services/order";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import RemoteError from "../../Components/Common/RemoteError";
import { useParams } from "react-router-dom";
import OrderBeforeImagesModal from "../../Components/Common/OrderBeforeImagesModal";
import OrderAfterImagesModal from "../../Components/Common/OrderAfterImagesModal";
import { getImageUrl } from "../../utils";
import { FaImage } from "react-icons/fa";
import OrderDeliveryModal from "../../Components/Common/OrderDeliveryModal/index.jsx";

export default function OrderDetailsp() {
  const { id } = useParams();
  const [afterOpen, setAfterOpen] = React.useState(false);
  const [beforeOpen, setBeforeOpen] = React.useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = React.useState(false);
  const { data, error, isError, isFetching } = useGetOrderDetailsQuery(id);

  useEffect(() => {
    document.title = "OrderDetails";
  }, []);

  const handleDeliveryModalOpen = React.useCallback(
    (order) => setIsDeliveryModalOpen(order),
    []
  );
  const handleDeliveryModalClose = React.useCallback(
    () => setIsDeliveryModalOpen(null),
    []
  );

  const handleBeforeOpen = React.useCallback(
    (order) => setBeforeOpen(order),
    []
  );
  const handleBeforeClose = React.useCallback(() => setBeforeOpen(null), []);
  const handleAfterOpen = React.useCallback((order) => setAfterOpen(order), []);
  const handleAfterClose = React.useCallback(() => setAfterOpen(null), []);

  const orderId = data?.GetOrderDetails?.order_id;

  if (isFetching) return <LoadingSpinner />;
  if (isError)
    return <RemoteError hasError={isError} message={error?.message} />;

  const allBeforeImages =
    data?.GetOrderBeforeImages?.flatMap((item) =>
      JSON.parse(item.before_images)
    ) || [];
  const allAfterImages =
    data?.GetOrderAfterImages?.flatMap((item) =>
      JSON.parse(item.after_images)
    ) || [];

    console.log()
    const isOrderDelivered=['completed','delivered'].includes(data?.GetOrderDetails?.order_status)
    console.log(data?.GetOrderDetails)
if (data?.GetOrderDetails)
    return (
      <div>
        <div className="flex justify-between flex-wrap gap-3">
          <div className="flex items-center sm:gap-4 gap-2 sm:mt-4 ">
            <div>
              <Link to="/provider/orders">
                <FaArrowLeft className="md:tex    t-xl text-sm" />
              </Link>
            </div>
            <div>
              <p className="font-semibold 2xl:text-3xl sm:text-xl text-lg">
                Order Details
              </p>
              <p className="text-[#535862] md:text-base text-xs">
                Track Your Orders, Every Step of the Way
              </p>
            </div>
          </div>
        {!isOrderDelivered &&   <div className="flex items-center w-full lg:w-auto flex-wrap justify-end gap-2 ms-auto">
            <button
              onClick={handleBeforeOpen.bind(null, data?.GetOrderDetails)}
              className="bg-[#FB8803] w-full min-[480px]:w-auto py-2 px-4 text-white rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]"
            >
              Before Photos
            </button>
            <button
              onClick={handleAfterOpen.bind(null, data?.GetOrderDetails)}
              className="bg-[#4EB53B] w-full min-[480px]:w-auto py-2 px-4 text-white rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]"
            >
              After Photos
            </button>
            <button
              onClick={handleDeliveryModalOpen}
              className="bg-[#0F91D2] w-full min-[480px]:w-auto py-2 px-4 text-white rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]"
            >
             Deliver
            </button>
          </div>}
        </div>
        <div className="bg-[#F4F4F4] rounded-2xl p-4 mt-4">
          <div className="flex lg:flex-row flex-col gap-3">
            <div>
              <img
                src={ServiceDet}
                alt=""
                className="lg:size-52 max-w-52 aspect-[2/1] lg:aspect-square w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="w-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[#181D27] sm:text-xl text-sm font-normal">
                      {data?.GetOrderDetails?.service_title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-[#494A4B]">
                      Basic plan:
                    </p>
                    <h3 className="text-2xl font-extrabold">
                      ${data?.GetOrderDetails.total_amount}
                    </h3>
                  </div>
                </div>
                <p className="text-[#535862] mt-4 lg:text-base text-xs">
                  {data?.GetOrderDetails?.notes}
                </p>
              </div>
              <div className="flex sm:flex-row flex-col sm:items-center gap-3 sm:justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      src={getImageUrl(data?.GetOrderDetails?.personal_image                      )}
                      alt="provider-image"
                      className="sm:size-12 size-10 sm:max-w-12 max-w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#494A4B]">
                      {data?.GetOrderDetails.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-1">
                      <Link to={`tel:${data?.GetOrderDetails?.phone}`} className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
                        <LuPhone /> Phone Call
                      </Link>
                      <Link to={`mailto:${data?.GetOrderDetails?.email}`} className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
                        <MdOutlineMailOutline /> Email
                      </Link>
                      <button className="bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm">
                        <BsChatLeftDots /> Chat
                      </button>
                    </div>
                  </div>
                </div>
              {data?.GetOrderDetails?.scheduleDate &&  <div className="text-end sm:text-start">
                  <p className="text-sm font-medium text-[#494A4B]">
                    Scheduled
                  </p>
                  <h3 className="text-xs text-[#535862]">
                    {data?.GetOrderDetails?.scheduleDate}
                  </h3>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-[#F4F4F4] p-4 rounded-2xl">
            <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-1">
              <div>
                <h4 className="text-[#181D27] text-xl ">
                  Before Delivery Photos:
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[#181D27] text-sm">2/17/2025</p>
                <p className="text-[#181D27] text-sm">3:29 PM</p>
              </div>
            </div>
            <ImagesGrid images={allBeforeImages} />
          </div>
          <div className="bg-[#F4F4F4] p-4 rounded-2xl">
            <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-1">
              <div>
                <h4 className="text-[#181D27] text-xl ">
                  After Delivery Photos:
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[#181D27] text-sm">2/17/2025</p>
                <p className="text-[#181D27] text-sm">3:29 PM</p>
              </div>
            </div>
            <ImagesGrid images={allAfterImages} />
          </div>
        </div>
        <div className="border rounded-xl p-4 mt-5">
          <div className="h-[400px] overflow-y-auto px-3">
            <div className="flex gap-3 mb-3">
              <div>
                <img
                  src={ClientTwo}
                  alt=""
                  className="rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover"
                />
              </div>
              <div className="max-w-[600px] w-full">
                <div className="flex justify-between">
                  <h6 className="font-medium text-[#414651] sm:text-sm text-xs">
                    Phoenix Baker
                  </h6>
                  <p className="text-[#535862] text-xs">Friday 2:20pm</p>
                </div>
                <div className="bg-[#F5F5F5] p-4 rounded-xl mt-2">
                  <p className="text-[#181D27] sm:text-base text-xs">
                    Mauris vel metus ac.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mb-3">
              <div className="max-w-[600px] w-full">
                <div className="flex justify-between">
                  <h6 className="font-medium text-[#414651] text-sm">You</h6>
                  <p className="text-[#535862] text-xs">Friday 2:20pm</p>
                </div>
                <div className="bg-[#0F91D2] p-4 rounded-xl mt-2">
                  <p className="text-[#fff] sm:text-base text-xs">
                    Mauris vel metus ac.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mb-3">
              <div>
                <img
                  src={ClientTwo}
                  alt=""
                  className="rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover"
                />
              </div>
              <div className="max-w-[600px] w-full">
                <div className="flex justify-between">
                  <h6 className="font-medium text-[#414651] sm:text-sm text-xs">
                    Phoenix Baker
                  </h6>
                  <p className="text-[#535862] text-xs">Friday 2:20pm</p>
                </div>
                <div className="bg-[#F5F5F5] p-4 rounded-xl mt-2">
                  <p className="text-[#181D27] sm:text-base text-xs">
                    Mauris vel metus ac.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mb-3">
              <div className="max-w-[600px] w-full">
                <div className="flex justify-between">
                  <h6 className="font-medium text-[#414651] text-sm">You</h6>
                  <p className="text-[#535862] text-xs">Friday 2:20pm</p>
                </div>
                <div className="bg-[#0F91D2] p-4 rounded-xl mt-2">
                  <p className="text-[#fff] sm:text-base text-xs">
                    Mauris vel metus ac.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mb-3">
              <div>
                <img
                  src={ClientTwo}
                  alt=""
                  className="rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover"
                />
              </div>
              <div className="max-w-[600px] w-full">
                <div className="flex justify-between">
                  <h6 className="font-medium text-[#414651] sm:text-sm text-xs">
                    Phoenix Baker
                  </h6>
                  <p className="text-[#535862] text-xs">Friday 2:20pm</p>
                </div>
                <div className="bg-[#F5F5F5] p-4 rounded-xl mt-2">
                  <p className="text-[#181D27] sm:text-base text-xs">
                    Mauris vel metus ac.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mb-3">
              <div className="max-w-[600px] w-full">
                <div className="flex justify-between">
                  <h6 className="font-medium text-[#414651] text-sm">You</h6>
                  <p className="text-[#535862] text-xs">Friday 2:20pm</p>
                </div>
                <div className="bg-[#0F91D2] p-4 rounded-xl mt-2">
                  <p className="text-[#fff] sm:text-base text-xs">
                    Mauris vel metus ac.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form action="">
            <div className="flex items-center gap-2 py-2">
              <div className="border rounded-xl flex justify-between gap-2 px-3 items-center w-full">
                <input
                  type="text"
                  className="w-full rounded-xl bg-transparent p-2"
                  placeholder="Message"
                />
                <label htmlFor="fil">
                  <FaPaperclip className="cursor-pointer" />
                </label>
                <input type="file" name="" id="fil" className="hidden" />
              </div>
              <div>
                <button className="bg-[#0F91D2] text-white text-xl py-3 2xl:px-6 px-3 shadow-lg rounded-md">
                  <IoPaperPlaneOutline />
                </button>
              </div>
            </div>
          </form>
        </div>
          <OrderDeliveryModal
              allAfterImages={allAfterImages}
              allBeforeImages={allBeforeImages}
              isOpen={isDeliveryModalOpen}
              onClose={handleDeliveryModalClose}
              orderId={orderId}
              // scheduleDate={deliverModalData?.order?.scheduleDate}
              />
        <OrderBeforeImagesModal
          isOpen={!!beforeOpen}
          oldImages={allBeforeImages}
          orderId={orderId}
          onClose={handleBeforeClose}
        
          
        />
        <OrderAfterImagesModal
          isOpen={!!afterOpen}
          orderId={orderId}
          onClose={handleAfterClose}
          oldImages={allAfterImages}
        />
      </div>
    );
}

function ImagesGrid({ images }) {
  if (!images.length) {
    return (
      <div className="flex flex-col p-3 items-center justify-center h-full w-full text-gray-500">
        <FaImage className="text-6xl mb-2" />
        <div>No images uploaded yet</div>
      </div>
    );
  }
  return (
    <div className="grid 2xl:grid-cols-4 lg:max-h-[600px] md:max-h-[500px] max-h-[600px] overflow-scroll lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
      {images.map((image, index) => (
        <div key={index} className="lg:h-[300px] md:h-[250px] h-[300px] w-full">
          <img
            src={getImageUrl(image)}
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
}
