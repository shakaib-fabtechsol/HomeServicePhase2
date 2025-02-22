import React from "react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";
import ServiceDet from "../../assets/img/service-det.png";
import ClientTwo from "../../assets/img/client2.png";
import DeliveryOne from "../../assets/img/delivery1.png";
import DeliveryFour from "../../assets/img/delivery4.png";
import DeliveryThree from "../../assets/img/delivery3.png";
import { IoPaperPlaneOutline } from "react-icons/io5";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdOutlineMailOutline, MdUpload } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import PhotosModal from "../../Components/Provider/PhotosModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  maxWidth: "600px",
};

export default function OrderDetailsp() {
  useEffect(() => {
    document.title = "OrderDetails";
  }, []);
  const [photosopen, setphotosOpen] = React.useState(false);
  const handlephotosOpen = () => setphotosOpen(true);
  const handlephotosClose = () => setphotosOpen(false);

  const deliveryImages = [
    DeliveryOne,
    DeliveryOne,
    DeliveryThree,
    DeliveryFour,
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (imageUrl) => {
    setImages(images.filter((img) => img !== imageUrl));
  };
  return (
    <div>
      <div className="flex justify-between flex-wrap gap-3">
        <div className="flex items-center sm:gap-4 gap-2 sm:mt-4">
          <div>
            <Link to="/provider/orders">
              <FaArrowLeft className="md:text-xl text-sm" />
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
        <div className="flex items-center w-full lg:w-auto flex-wrap justify-end gap-2 ms-auto">
          <button
            onClick={handlephotosOpen}
            className="bg-[#FB8803] w-full min-[480px]:w-auto py-2 px-4 text-white rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            Before Photos
          </button>
          <button className="bg-[#4EB53B] w-full min-[480px]:w-auto py-2 px-4 text-white rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]">
            After Photos
          </button>
          <button className="bg-[#0F91D2] w-full min-[480px]:w-auto py-2 px-4 text-white rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]">
            Deliver
          </button>
        </div>
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
                    Service Name
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-[#494A4B]">
                    Basic plan:
                  </p>
                  <h3 className="text-2xl font-extrabold">$200</h3>
                </div>
              </div>
              <p className="text-[#535862] mt-4 lg:text-base text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                tellus diam, dignissim tincidunt quam vel, rutrum egestas lacus.
                Phasellus accumsan fermentum dolor eu gravida. Vivamus dignissim
                augue sed orci interdum vehicula.
              </p>
            </div>
            <div className="flex sm:flex-row flex-col sm:items-center gap-3 sm:justify-between mt-4">
              <div className="flex items-center gap-3">
                <div>
                  <img
                    src={ClientTwo}
                    alt=""
                    className="sm:size-12 size-10 sm:max-w-12 max-w-10 rounded-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#494A4B]">
                    Frances Swann
                  </p>
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
              <div className="text-end sm:text-start">
                <p className="text-sm font-medium text-[#494A4B]">Scheduled</p>
                <h3 className="text-xs text-[#535862]">Dec 21, 2024 7:59 pm</h3>
              </div>
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
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 gap-4 mt-4">
            {deliveryImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
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
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 gap-4 mt-4">
            {deliveryImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
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
