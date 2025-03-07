import React, { useState, useMemo } from "react";
import { BsSliders } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Table from "../../Components/Table";
import { useGetallsalesdealsbuilderQuery } from "../../services/dashboard";
import Loader from "../../Components/MUI/Loader";
import RemoteError from "../../Components/Common/RemoteError";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import camera from "../../assets/img/userprofile.png";

export default function RecentDeals() {
  const { data, isLoading, isError, error } = useGetallsalesdealsbuilderQuery();
  const [searchTerm, setSearchTerm] = useState("");

  console.log(data, "this is data for all services");

  const tableHeader = [
    "Service",
    "Service Provider",
    "Category",
    "Published Date",
    "Action",
  ];

  const getimage = (img) => {
    const imgdata = JSON.parse(img);
    return imgdata?.length ? `${BASE_URL}/uploads/${imgdata[0]}` : "";
  };

  const filteredDeals = useMemo(() => {
    if (!data?.recetPublishDeals) return [];
    return data.recetPublishDeals.filter((order) =>
      order.service_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const tablerows = filteredDeals.map((order) => [
    <div className="flex items-center gap-2" key={order.id}>
      <img
        src={getimage(order?.images)}
        alt=""
        className="w-[112px] max-w-[112px] h-[88px] rounded-lg object-cover"
      />
      <div>
        <p className="text-nowrap text-sm text-[#181D27]">
          {order?.service_title}
        </p>
        <p className="text-xs text-wrap text-[#535862] line-clamp-2 w-[250px]">
          {order?.service_description}
        </p>
        <div className="flex items-center gap-1">
          <p className="text-[10px] text-[#535862]">Starting Price:</p>
          <p className="font-extrabold text-lg text-[#181D27]">
            {order.pricing_model === "Flat"
              ? order.flat_rate_price
              : order.pricing_model === "Hourly"
                ? order.hourly_rate
                : order.price1}
          </p>

        </div>
      </div>
    </div>,
    <div className="flex items-center gap-2">
      <img
        className="size-10 object-cover rounded-full"
        src={
          order?.personal_image
            ? `${BASE_URL}/uploads/${order?.personal_image}`
            : camera
        }
        alt="img"
      />
      <p>{order?.name}</p>
    </div>,
    <p className="text-[#181D27] text-sm">{order?.service_category}</p>,
    <p className="text-[#181D27] text-sm">
      {new Date(order?.created_at)?.toDateString()}
    </p>,
    <div className="flex text-nowrap gap-5 items-center">
      <div>
        <button className="bg-[#42B443] text-white text-sm font-semibold p-2 min-w-[100px] text-center border text-nowrap rounded-lg inline-block">
          Approve
        </button>
        <button className="mt-3 text-[#FF1D1D] text-sm font-semibold bg-white p-2 border border-[#FF1D1D] rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D]">
          Flag for Removal
        </button>
      </div>
    </div>,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <RemoteError hasError={isError} message={error?.message} />;
  }

  return (
    <div>
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-2">
        <div className="flex items-center p-2 border rounded-lg w-full sm:max-w-[400px]">
          <label>
            <CiSearch className="text-[#717680] text-xl" />
          </label>
          <input
            type="search"
            placeholder="Search"
            className="w-full px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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

