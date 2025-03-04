import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import down from "../../assets/img/chevronDown.png";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/MUI/Loader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useUploadMediaMutation,
  usePublishDealMutation,
  useFetchDealQuery,
  useGetDealQuery,
  usePriceAndPackageMutation,
  useUpdatePriceAndPackageMutation,
} from "../../services/base-api/index";

const PricingPackaging = ({ serviceId, setValue }) => {
  const navigate = useNavigate();
  const { dealid } = useParams();

  // Fetch deal details via RTK Query.
  const {
    data: dealData,
    isLoading: isDealLoading,
    isError: isDealError,
  } = useGetDealQuery(dealid, {
    skip: !dealid,
  });

  // Mutations for pricing/packaging and publishing.
  const [priceAndPackage] = usePriceAndPackageMutation();
  const [updatePriceAndPackage, { isLoading: isUpdating }] =
    useUpdatePriceAndPackageMutation();
  const [publishDeal, { isLoading: isPublishing }] = usePublishDealMutation();
  const [uploadMedia] = useUploadMediaMutation();

  const [loading, setLoading] = useState(false);
  const [publishValue, setPublishValue] = useState(1);
  const [publishLoading, setPublishLoading] = useState(false);

  const user_id = localStorage.getItem("id");
  const [formdata, setFormData] = useState({
    id: "",
    pricing_model: "",
    flat_rate_price: "",
    fine_print: "",
    flat_by_now_discount: "",
    flat_final_list_price: "",
    flat_estimated_service_time: "",
    hourly_rate: "",
    discount: "",
    hourly_final_list_price: "",
    hourly_estimated_service_time: "",
    title1: "",
    deliverable1: "",
    price1: "",
    by_now_discount1: "",
    final_list_price1: "",
    estimated_service_timing1: "",
    title2: "",
    deliverable2: "",
    price2: "",
    by_now_discount2: "",
    final_list_price2: "",
    estimated_service_timing2: "",
    title3: "",
    deliverable3: "",
    price3: "",
    by_now_discount3: "",
    final_list_price3: "",
    estimated_service_timing3: "",
  });
  const [selectedRate, setSelectedRate] = useState("Flat");

  useEffect(() => {
    console.log("📦 PricingPackaging Received Service ID:", serviceId);
  }, [serviceId]);

  // When dealData is available, populate form state.
  useEffect(() => {
    if (dealData && dealData.deal && dealData.deal[0]) {
      const BasicInfo = dealData.deal[0];
      console.log("BasicInfo:", BasicInfo);
      setFormData({
        id: BasicInfo.id || "",
        pricing_model: BasicInfo.pricing_model || "",
        estimated_service_time: BasicInfo.estimated_service_time || "",
        ...(BasicInfo.pricing_model === "Flat"
          ? {
              fine_print: BasicInfo.fine_print,
              flat_rate_price: BasicInfo.flat_rate_price || "",
              flat_by_now_discount: BasicInfo.flat_by_now_discount || "",
              flat_final_list_price: BasicInfo.flat_final_list_price || "",
              flat_estimated_service_time:
                BasicInfo.flat_estimated_service_time || "",
            }
          : BasicInfo.pricing_model === "Hourly"
            ? {
                fine_print: BasicInfo.fine_print,
                hourly_rate: BasicInfo.hourly_rate || "",
                discount: BasicInfo.discount || "",
                hourly_final_list_price:
                  BasicInfo.hourly_final_list_price || "",
                hourly_estimated_service_time:
                  BasicInfo.hourly_estimated_service_time || "",
              }
            : BasicInfo.pricing_model === "Custom"
              ? {
                  title1: BasicInfo.title1 || "",
                  deliverable1: BasicInfo.deliverable1 || "",
                  price1: BasicInfo.price1 || "",
                  by_now_discount1: BasicInfo.by_now_discount1 || "",
                  final_list_price1: BasicInfo.final_list_price1 || "",
                  estimated_service_timing1:
                    BasicInfo.estimated_service_timing1 || "",
                  title2: BasicInfo.title2 || "",
                  deliverable2: BasicInfo.deliverable2 || "",
                  price2: BasicInfo.price2 || "",
                  by_now_discount2: BasicInfo.by_now_discount2 || "",
                  final_list_price2: BasicInfo.final_list_price2 || "",
                  estimated_service_timing2:
                    BasicInfo.estimated_service_timing2 || "",
                  title3: BasicInfo.title3 || "",
                  deliverable3: BasicInfo.deliverable3 || "",
                  price3: BasicInfo.price3 || "",
                  by_now_discount3: BasicInfo.by_now_discount3 || "",
                  final_list_price3: BasicInfo.final_list_price3 || "",
                  estimated_service_timing3:
                    BasicInfo.estimated_service_timing3 || "",
                }
              : {}),
      });
      setSelectedRate(BasicInfo.pricing_model || "Flat");
      setLoading(false);
    }
  }, [dealData]);

  const handleRateChange = (event) => {
    const newRate = event.target.value;
    setSelectedRate(newRate);
    setFormData((prevData) => ({
      ...prevData,
      pricing_model: newRate,
    }));
  };

  const formatCurrency = (value, key) => {
    if (!value) return "";
    const numericValue = value.toString().replace(/[^0-9.]/g, "");
    if (
      key === "flat_by_now_discount" ||
      key === "discount" ||
      key === "by_now_discount1" ||
      key === "by_now_discount2" ||
      key === "by_now_discount3"
    ) {
      return `${numericValue} %`;
    }
    return `$${numericValue}`;
  };

  const parseCurrency = (value) => {
    if (!value) return "";
    return value.replace(/[^0-9.]/g, "");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    let payload = {
      id: serviceId,
      pricing_model: selectedRate,
    };

    if (selectedRate === "Flat") {
      payload = {
        ...payload,
        fine_print: e.target.FinePrint?.value || "",
        flat_rate_price: e.target.flat_rate_price?.value,
        flat_by_now_discount: e.target.flat_by_now_discount?.value,
        flat_final_list_price: e.target.flat_final_list_price?.value,
        flat_estimated_service_time:
          e.target.flat_estimated_service_time?.value,
      };
    } else if (selectedRate === "Hourly") {
      payload = {
        ...payload,
        fine_print: e.target.FinePrint?.value || "",
        hourly_rate: e.target.hourly_rate.value,
        discount: e.target.discount ? e.target.discount?.value : null,
        hourly_final_list_price: e.target.hourly_final_list_price?.value,
        hourly_estimated_service_time:
          e.target.hourly_estimated_service_time?.value,
      };
    } else if (selectedRate === "Custom") {
      payload = {
        ...payload,
        title1: e.target.title1?.value,
        deliverable1: e.target.deliverable1?.value,
        price1: e.target.price1?.value,
        by_now_discount1: e.target.by_now_discount1?.value,
        final_list_price1: e.target.final_list_price1?.value,
        estimated_service_timing1: e.target?.estimated_service_timing1?.value,
        title2: e.target.title2?.value,
        deliverable2: e.target.deliverable2?.value,
        price2: e.target.price2?.value,
        by_now_discount2: e.target.by_now_discount2?.value,
        final_list_price2: e.target.final_list_price2?.value,
        estimated_service_timing2: e.target?.estimated_service_timing2?.value,
        title3: e.target.title3?.value,
        deliverable3: e.target.deliverable3?.value,
        price3: e.target.price3?.value,
        by_now_discount3: e.target.by_now_discount3?.value,
        final_list_price3: e.target.final_list_price3?.value,
        estimated_service_timing3: e.target?.estimated_service_timing3?.value,
      };
    }

    try {
      if (dealid) {
        await updatePriceAndPackage({ ...payload, serviceId }).unwrap();
      } else {
        await priceAndPackage(payload).unwrap();
      }
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: dealid
          ? "Pricing details updated successfully."
          : "Pricing details saved successfully.",
        confirmButtonColor: "#0F91D2",
      }).then(() => {
        setValue(2);
      });
      e.target.reset();
      setSelectedRate("Flat");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.data?.message || "Failed to update pricing details.",
        confirmButtonColor: "#D33",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, key) => {
    const rawValue = parseCurrency(e.target.value);
    setFormData((prev) => {
      const updatedData = { ...prev, [key]: rawValue };
      if (updatedData.flat_rate_price && updatedData.flat_by_now_discount) {
        const flatRate = parseFloat(updatedData.flat_rate_price) || 0;
        const discount = parseFloat(updatedData.flat_by_now_discount) || 0;
        updatedData.flat_final_list_price = (
          flatRate -
          (flatRate * discount) / 100
        ).toFixed(2);
      }
      return updatedData;
    });
  };

  const handleHourlyInputChange = (e, key) => {
    const rawValue = parseCurrency(e.target.value);
    setFormData((prev) => {
      const updatedData = { ...prev, [key]: rawValue };
      if (updatedData.hourly_rate && updatedData.discount) {
        const hourlyRate = parseFloat(updatedData.hourly_rate) || 0;
        const discount = parseFloat(updatedData.discount) || 0;
        updatedData.hourly_final_list_price = (
          hourlyRate -
          (hourlyRate * discount) / 100
        ).toFixed(2);
      }
      return updatedData;
    });
  };

  const handlePriceInputChange = (e, key) => {
    const rawValue = parseCurrency(e.target.value);
    setFormData((prev) => {
      const updatedData = { ...prev, [key]: rawValue };
      if (updatedData.price1 && updatedData.by_now_discount1) {
        const price = parseFloat(updatedData.price1) || 0;
        const discount = parseFloat(updatedData.by_now_discount1) || 0;
        updatedData.final_list_price1 = (
          price -
          (price * discount) / 100
        ).toFixed(2);
      }
      return updatedData;
    });
  };

  const handlePriceInputChanged = (e, key) => {
    const rawValue = parseCurrency(e.target.value);
    setFormData((prev) => {
      const updatedData = { ...prev, [key]: rawValue };
      if (updatedData.price2 && updatedData.by_now_discount2) {
        const price = parseFloat(updatedData.price2) || 0;
        const discount = parseFloat(updatedData.by_now_discount2) || 0;
        updatedData.final_list_price2 = (
          price -
          (price * discount) / 100
        ).toFixed(2);
      }
      return updatedData;
    });
  };

  const handlePriceInput = (e, key) => {
    const rawValue = parseCurrency(e.target.value);
    setFormData((prev) => {
      const updatedData = { ...prev, [key]: rawValue };
      if (updatedData.price3 && updatedData.by_now_discount3) {
        const price = parseFloat(updatedData.price3) || 0;
        const discount = parseFloat(updatedData.by_now_discount3) || 0;
        updatedData.final_list_price3 = (
          price -
          (price * discount) / 100
        ).toFixed(2);
      }
      return updatedData;
    });
  };

  const handleBulletKeyDown = (fieldName) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const bullet = "• ";
      const { selectionStart, selectionEnd, value } = e.target;
      const newValue =
        value.substring(0, selectionStart) +
        "\n" +
        bullet +
        value.substring(selectionEnd);
      setFormData((prev) => ({ ...prev, [fieldName]: newValue }));
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd =
          selectionStart + bullet.length + 1;
      }, 0);
    }
  };

  const handleBulletFocus = (fieldName) => (e) => {
    if (!formdata[fieldName] || formdata[fieldName].trim() === "") {
      setFormData((prev) => ({ ...prev, [fieldName]: "• " }));
    }
  };

  const handleFocus = (e) => {
    if (formdata.fine_print.trim() === "") {
      setFormData({ ...formdata, fine_print: "•" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const bullet = "• ";
      const { selectionStart, selectionEnd, value } = e.target;
      const newValue =
        value.substring(0, selectionStart) +
        "\n" +
        bullet +
        value.substring(selectionEnd);
      setFormData({ ...formdata, fine_print: newValue });
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd =
          selectionStart + bullet.length + 1;
      }, 0);
    }
  };

  const handlePublish = async () => {
    if (publishLoading) return;
    setPublishLoading(true);

    const dealid = localStorage.getItem("deal_id");

    if (!dealid) {
      toast.error("Deal ID is missing. Please try again.");
      setPublishLoading(false);
      return;
    }

    try {
      const response = await publishDeal({ deal_id: dealid }).unwrap();

      if (response) {
        setFormData((prev) => ({ ...prev, publish: 1 }));
        toast.success("Published successfully!");
        setPublishValue(1);
      }
    } catch (error) {
      console.error("Error publishing deal:", error);
      toast.error("Failed to publish. Please try again.");
    } finally {
      setPublishLoading(false);
    }
  };

  if (isDealLoading || loading) return <Loader />;
  if (isDealError) return <div>Error loading deal data.</div>;

  return (
    <>
      {/* {dealid && !isApiLoaded ? (
        <Loader />
      ) : ( */}
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-10 mt-4">
              <input
                type="text"
                id="Flatr"
                value={formdata.id || "0"}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, id: e.target.value }))
                }
                className="focus-none border hidden"
                readOnly
              />

              <div className="flex flex-wrap justify-between mt-4">
                <div className="flex me-8">
                  <input
                    type="radio"
                    id="Flat"
                    name="Rate"
                    className="myinput me-4"
                    value="Flat"
                    onChange={handleRateChange}
                    checked={formdata.pricing_model === "Flat"}
                  />
                  <label htmlFor="Flat">Fixed Rate</label>
                </div>

                <div className="flex me-8">
                  <input
                    type="radio"
                    id="Hourly"
                    name="Rate"
                    value="Hourly"
                    className="myinput me-4"
                    onChange={handleRateChange}
                    checked={formdata.pricing_model === "Hourly"}
                  />
                  <label htmlFor="Hourly">Hourly Rate</label>
                </div>

                <div className="flex me-8">
                  <input
                    type="radio"
                    id="Custom"
                    name="Rate"
                    value="Custom"
                    className="myinput me-4"
                    onChange={handleRateChange}
                    checked={formdata.pricing_model === "Custom"}
                  />
                  <label htmlFor="Custom">Custom Package</label>
                </div>
              </div>
            </div>

            {formdata.pricing_model === "Flat" && (
              <>
                <div className="col-span-12 lg:col-span-7 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="Flatr" className="font-semibold">
                      Fixed Rate Price
                    </label>

                    <input
                      type="text"
                      id="flat_rate_price"
                      placeholder="Fixed Rate price should be 200%"
                      value={formatCurrency(formdata.flat_rate_price || "")}
                      onChange={(e) => handleInputChange(e, "flat_rate_price")}
                      className="myinput focus-none"
                    />
                  </div>
                </div>

                {/* Buy Now Discount */}
                <div className="col-span-12 lg:col-span-7 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="BuyNow" className="font-semibold">
                      Buy Now Discount (%)
                    </label>
                    <input
                      type="text"
                      id="flat_by_now_discount"
                      placeholder="By Now Discount 10%"
                      value={formatCurrency(
                        formdata.flat_by_now_discount,
                        "flat_by_now_discount"
                      )}
                      onChange={(e) =>
                        handleInputChange(e, "flat_by_now_discount")
                      }
                      className="myinput focus-none"
                    />
                  </div>
                </div>

                {/* Final List Price (Calculated) */}
                <div className="col-span-12 lg:col-span-7 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="Finalp" className="font-semibold">
                      Final List Price
                    </label>

                    <input
                      type="text"
                      id="flat_final_list_price"
                      placeholder="Final List Price 180%"
                      value={formatCurrency(
                        formdata.flat_final_list_price || ""
                      )}
                      readOnly
                      className="myinput focus-none"
                    />
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-7 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="Estimated" className="font-semibold">
                      Estimated Service Time
                    </label>
                    <select
                      id="flat_estimated_service_time"
                      className="myselect pe-[30px] focus-none"
                      value={formdata.flat_estimated_service_time || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          flat_estimated_service_time: e.target.value,
                        }))
                      }
                    >
                      <option value="" hidden>
                        How soon can you get it scheduled?
                      </option>
                      <option value="Same day">Same day</option>
                      <option value="2 days">2 days</option>
                      <option value="3 days">3 days</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-12 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="FinePrint" className="font-semibold">
                      Fine Print{" "}
                      <span className="text-[13px] text-[#cdcdcd]">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      id="FinePrint"
                      className="myinput"
                      placeholder="Add specific deliverables for this deal. For example: what is included & what is not included."
                      rows={4}
                      value={formdata.fine_print}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fine_print: e.target.value, // Ensure it's always set
                        }))
                      }
                      onKeyDown={handleKeyDown}
                      onFocus={handleFocus}
                    />
                  </div>
                </div>
              </>
            )}

            {formdata.pricing_model === "Hourly" && (
              <>
                <div className="col-span-12 lg:col-span-7 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="HourlyRate" className="font-semibold">
                      Hourly Rate
                    </label>
                    <input
                      type="text"
                      id="hourly_rate"
                      placeholder="Hour rate should be$25/hour"
                      value={formatCurrency(formdata.hourly_rate || "")}
                      onChange={(e) =>
                        handleHourlyInputChange(e, "hourly_rate")
                      }
                      className="myinput focus-none"
                    />
                  </div>
                </div>

                {/* Discount */}
                <div className="col-span-12 lg:col-span-7 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="HourlyDiscount" className="font-semibold">
                      Discount (%)
                    </label>
                    <input
                      type="text"
                      id="discount"
                      placeholder="By Now Discount 10 %"
                      value={formatCurrency(formdata.discount, "discount")}
                      onChange={(e) => handleHourlyInputChange(e, "discount")}
                      className="myinput focus-none"
                    />
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-7 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="HourlyFinalPrice" className="font-semibold">
                      Final List Price
                    </label>
                    <input
                      type="text"
                      id="hourly_final_list_price"
                      placeholder="Final List Price should be $22.25"
                      value={formatCurrency(
                        formdata.hourly_final_list_price || ""
                      )}
                      readOnly
                      className="myinput focus-none"
                    />
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-7 mt-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="HourlyEstimatedTime"
                      className="font-semibold"
                    >
                      Estimated Service Time
                    </label>
                    <select
                      id="hourly_estimated_service_time"
                      className="myselect pe-[30px] focus-none"
                      value={formdata.hourly_estimated_service_time || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          hourly_estimated_service_time: e.target.value,
                        }))
                      }
                    >
                      <option value="" hidden>
                        How soon can you get it scheduled?
                      </option>
                      <option value="Same day">Same day</option>
                      <option value="2 days">2 days</option>
                      <option value="3 days">3 days</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-12 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="FinePrint" className="font-semibold">
                      Fine Print{" "}
                      <span className="text-[13px] text-[#cdcdcd]">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      id="FinePrint"
                      className="myinput"
                      placeholder="Add specific deliverables for this deal. For example: what is included & what is not included."
                      rows={4}
                      value={formdata.fine_print}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fine_print: e.target.value, // Ensure it's always set
                        }))
                      }
                      onKeyDown={handleKeyDown}
                      onFocus={handleFocus}
                    />
                  </div>
                </div>
              </>
            )}

            {formdata.pricing_model === "Custom" && (
              <>
                <div className="col-span-12 mt-6">
                  <p className="text-lg font-semibold">Pricing Packages</p>
                  <div className="bg-[#FAFAFA] rounded-[12px] p-5 mt-6">
                    <div>
                      <div className="grid lg:grid-cols-3 gap-5">
                        <div>
                          <div className="flex justify-between items-center">
                            <p className="text-lg font-medium">Tier 1</p>
                            <HiOutlineTrash className="text-[20px]" />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="title1"
                            >
                              Title
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="Title"
                              id="title1"
                              value={formdata.title1 || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  title1: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="deliverable"
                            >
                              Deliverable 1
                            </label>
                            <textarea
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              name="deliverable"
                              id="deliverable"
                              value={formdata.deliverable}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  deliverable: e.target.value,
                                }))
                              }
                              onFocus={handleBulletFocus("deliverable")}
                              onKeyDown={handleBulletKeyDown("deliverable")}
                              placeholder="Write here..."
                            ></textarea>
                          </div>

                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="price1"
                            >
                              Price
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="Should be $50"
                              id="price1"
                              onChange={(e) =>
                                handlePriceInputChange(e, "price1")
                              }
                              value={formatCurrency(formdata.price1 || "")}
                            />
                          </div>

                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="by_now_discount1"
                            >
                              Buy Now Discount (%)
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder=" Buy Now Discount 10 %"
                              id="by_now_discount1"
                              onChange={(e) =>
                                handlePriceInputChange(e, "by_now_discount1")
                              }
                              value={formatCurrency(
                                formdata.by_now_discount1,
                                "by_now_discount1"
                              )}
                            />
                          </div>

                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="final_list_price1"
                            >
                              Final List Price
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="  Final List Price $45"
                              id="final_list_price1"
                              value={formatCurrency(
                                formdata.final_list_price1 || ""
                              )}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="estimated_service_timing1"
                            >
                              Estimated Service Timing
                            </label>
                            <select
                              style={{
                                backgroundImage: `url(${down})`,
                                backgroundPosition: "calc(100% - 10px) center",
                                backgroundRepeat: "no-repeat",
                              }}
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none appearance-none"
                              name="estimated_service_timing1"
                              id="estimated_service_timing1"
                              value={formatCurrency(
                                formdata.estimated_service_timing1
                              )}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  estimated_service_timing1: e.target.value,
                                }))
                              }
                            >
                              <option value="" disabled hidden>
                                How soon can you get it scheduled?
                              </option>
                              <option value="1">1 Day</option>
                              <option value="2">2 Days</option>
                              <option value="3">3 Days</option>
                              <option value="4">4 Days</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <p className="text-lg font-medium">Tier 2</p>
                            <HiOutlineTrash className="text-[20px]" />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="title2"
                            >
                              Title
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="Title"
                              id="title2"
                              value={formdata.title2 || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  title2: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="deliverable2"
                            >
                              Deliverable 2
                            </label>
                            <textarea
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              name="deliverable2"
                              id="deliverable2"
                              value={formdata.deliverable2}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  deliverable2: e.target.value,
                                }))
                              }
                              onFocus={handleBulletFocus("deliverable2")}
                              onKeyDown={handleBulletKeyDown("deliverable2")}
                              placeholder="Write here..."
                            ></textarea>
                          </div>

                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="price2"
                            >
                              Price
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="Should be $100"
                              id="price2"
                              onChange={(e) =>
                                handlePriceInputChanged(e, "price2")
                              }
                              value={formatCurrency(formdata.price2 || "")}
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="by_now_discount2"
                            >
                              Buy Now Discount
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="  buy now discount 10%"
                              id="by_now_discount2"
                              onChange={(e) =>
                                handlePriceInputChanged(e, "by_now_discount2")
                              }
                              value={formatCurrency(
                                formdata.by_now_discount2,
                                "by_now_discount2"
                              )}
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="final_list_price2"
                            >
                              Final List Price
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder=" final list price $90"
                              id="final_list_price2"
                              onChange={(e) =>
                                handlePriceInputChanged(e, "final_list_price2")
                              }
                              value={formatCurrency(
                                formdata.final_list_price2 || ""
                              )}
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="estimated_service_timing2"
                            >
                              Estimated Service Timing
                            </label>
                            <select
                              style={{
                                backgroundImage: `url(${down})`,
                                backgroundPosition: "calc(100% - 10px) center",
                                backgroundRepeat: "no-repeat",
                              }}
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none appearance-none"
                              name="estimated_service_timing2"
                              id="estimated_service_timing2"
                              value={formdata.estimated_service_timing2}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  estimated_service_timing2: e.target.value,
                                }))
                              }
                            >
                              <option value="" disabled hidden>
                                How soon can you get it scheduled?
                              </option>
                              <option value="1">1 Day</option>
                              <option value="2">2 Days</option>
                              <option value="3">3 Days</option>
                              <option value="4">4 Days</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <p className="text-lg font-medium">Tier 3</p>
                            <HiOutlineTrash className="text-[20px]" />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="title3"
                            >
                              Title
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="Title"
                              id="title3"
                              value={formdata.title3 || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  title3: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="deliverable3"
                            >
                              Deliverable 3
                            </label>
                            <textarea
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              name="deliverable3"
                              id="deliverable3"
                              value={formdata.deliverable3}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  deliverable3: e.target.value,
                                }))
                              }
                              onFocus={handleBulletFocus("deliverable3")}
                              onKeyDown={handleBulletKeyDown("deliverable3")}
                              placeholder="Write here..."
                            ></textarea>
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="price3"
                            >
                              Price
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="should be $200"
                              id="price3"
                              onChange={(e) => handlePriceInput(e, "price3")}
                              value={formatCurrency(formdata.price3 || "")}
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="by_now_discount3"
                            >
                              Buy Now Discount
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="buy now discount 10 %"
                              id="by_now_discount3"
                              onChange={(e) =>
                                handlePriceInput(e, "by_now_discount3")
                              }
                              value={formatCurrency(
                                formdata.by_now_discount3,
                                "by_now_discount3"
                              )}
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="final_list_price3"
                            >
                              Final List Price
                            </label>
                            <input
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                              type="text"
                              placeholder="final list price $90"
                              id="final_list_price3"
                              onChange={(e) =>
                                handlePriceInput(e, "final_list_price3")
                              }
                              value={formatCurrency(
                                formdata.final_list_price3 || ""
                              )}
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              className="text-sm font-medium ps-2"
                              htmlFor="estimated_service_timing3"
                            >
                              Estimated Service Timing
                            </label>
                            <select
                              style={{
                                backgroundImage: `url(${down})`,
                                backgroundPosition: "calc(100% - 10px) center",
                                backgroundRepeat: "no-repeat",
                              }}
                              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none appearance-none"
                              name="estimated_service_timing3"
                              id="estimated_service_timing3"
                              value={formdata.estimated_service_timing3}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  estimated_service_timing3: e.target.value,
                                }))
                              }
                            >
                              <option value="" defaultValue hidden>
                                How soon can you get it scheduled?
                              </option>
                              <option value="1">1 Day</option>
                              <option value="2">2 Days</option>
                              <option value="3">3 Days</option>
                              <option value="4">4 Days</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="col-span-12 mt-4 flex justify-end gap-4">
              <button
                type="reset"
                className="border border-gray-300 rounded-lg w-[150px] py-[10px] font-semibold bg-white"
              >
                Cancel
              </button>
              <input
                type="text"
                id="Flatr"
                defaultValue={formdata?.id ? `${formdata?.id}` : "0"}
                className="focus-none border hidden"
                readOnly
              />
              <input
                type="text"
                id="publish"
                value={publishValue}
                className="focus-none border hidden"
                readOnly
              />
              <button
                type="button"
                className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                  publishLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handlePublish}
                disabled={publishLoading}
              >
                {publishLoading ? "Publishing..." : "Publish"}
              </button>

              <button
                type="submit"
                className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save & Next"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PricingPackaging;
