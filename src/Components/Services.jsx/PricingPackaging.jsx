import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import down from "../../assets/img/chevronDown.png";

const PricingPackaging = () => {
  const [selectedRate, setSelectedRate] = useState("Flat");

  const handleRateChange = (event) => {
    setSelectedRate(event.target.value);
  };
  const timeoptions = [
    { value: "", label: "How soon can you get it scheduled?" },
    { value: "b3", label: "Emergency | Same Day" },
    { value: "3p", label: "Rush | 1-2 day" },
    { value: "4p", label: "Fast | 3-5 Days" },
    { value: "5", label: "Standard | 1-2 Weeks" },
    { value: "5", label: "Scheduled | 2-4 Weeks" },
    { value: "5", label: "Backlog | 1 month+" },
  ];

  return (
    <div>
      <form>
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-10 mt-4">
            <p className="font-semibold text-sm text-[#181D27]">
              Pricing Model
            </p>
            <div className="flex flex-wrap justify-between mt-4">
              <div className="flex me-8">
                <input
                  type="radio"
                  id="Flat"
                  name="Rate"
                  value="Flat"
                  className="myinput me-4 peer"
                  onChange={handleRateChange}
                  checked={selectedRate === "Flat"}
                />
                <label
                  className="font-semibold text-sm text-[#5E6670] peer-checked:text-[#181D27]"
                  htmlFor="Flat"
                >
                  Fixed Rate
                </label>
              </div>
              <div className="flex me-8">
                <input
                  type="radio"
                  id="Hourly"
                  name="Rate"
                  value="Hourly"
                  className="myinput me-4 peer"
                  onChange={handleRateChange}
                  checked={selectedRate === "Hourly"}
                />
                <label
                  className="font-semibold text-sm text-[#5E6670] peer-checked:text-[#181D27]"
                  htmlFor="Hourly"
                >
                  Hourly Rate
                </label>
              </div>
              <div className="flex me-8">
                <input
                  type="radio"
                  id="Custom"
                  name="Rate"
                  value="Custom"
                  className="myinput me-4 peer"
                  onChange={handleRateChange}
                  checked={selectedRate === "Custom"}
                />
                <label
                  className="font-semibold text-sm text-[#5E6670] peer-checked:text-[#181D27]"
                  htmlFor="Custom"
                >
                  Custom Package
                </label>
              </div>
            </div>
          </div>

          {/* Flat Rate Fields */}
          {selectedRate === "Flat" && (
            <>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Flatr"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Fixed Rate Price
                  </label>
                  <input
                    type="text"
                    id="Flatr"
                    placeholder="Fixed Rate price should be 200%"
                    className="myinput focus-none mt-1"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="BuyNow"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Buy Now Discount (%)
                  </label>
                  <input
                    type="text"
                    id="BuyNow"
                    placeholder="By Now Discount 10%"
                    className="myinput focus-none mt-1"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Finalp"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Final List Price
                  </label>
                  <input
                    type="text"
                    id="Finalp"
                    placeholder="Final List Price 190%"
                    className="myinput focus-none mt-1"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Estimated"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Estimated Service Time
                  </label>
                  <select
                    name=""
                    className="myselect pe-[30px] focus-none mt-1"
                    id=""
                  >
                    {timeoptions.map((option, index) => (
                      <option
                        className="first:hidden"
                        key={index}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Hourly Rate Fields */}
          {selectedRate === "Hourly" && (
            <>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Hourlyr"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Hourly Rate
                  </label>
                  <input
                    type="text"
                    id="Hourlyr"
                    placeholder="Hour rate should be $25/hour"
                    className="myinput focus-none mt-1"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Discount"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Discount (%)
                  </label>
                  <input
                    type="text"
                    id="Discount"
                    placeholder="Buy Now Discount 10 %"
                    className="myinput focus-none mt-1"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Final"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Final List Price
                  </label>
                  <input
                    type="text"
                    id="Final"
                    placeholder="Final List Price should be $22.25"
                    className="myinput focus-none mt-1"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Estimated"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Estimated Service Time
                  </label>
                  <select
                    name=""
                    className="myselect pe-[30px] focus-none mt-1"
                    id=""
                  >
                    {timeoptions.map((option, index) => (
                      <option
                        className="first:hidden"
                        key={index}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Custom Package Fields */}
          {selectedRate === "Custom" && (
            <>
              <div className="col-span-12 mt-6">
                <p className="text-lg font-semibold text-[#181D27]">
                  Pricing Packages
                </p>
                <div className="bg-[#FAFAFA] rounded-[12px] p-5 mt-6">
                  <div>
                    <div className="grid lg:grid-cols-3 gap-5">
                      <div>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-[#181D27]">Tier 1</p>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier1Title"
                          >
                            Title
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Title"
                            id="tier1Title"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier1Deliverables"
                          >
                            Deliverables
                          </label>
                          <textarea
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            name="tier1Deliverables"
                            id="tier1Deliverables"
                            placeholder="Add specific deliverables for this deal"
                            rows={4}
                          ></textarea>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier1Price"
                          >
                            Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Should be $50"
                            id="tier1Price"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier1BuyNowDiscount"
                          >
                            Buy Now Discount
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Buy Now Discount 10 %"
                            id="tier1BuyNowDiscount"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier1FinalListPrice"
                          >
                            Final List Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Final List Price $45"
                            id="tier1FinalListPrice"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier2EstimatedTiming"
                          >
                            Estimated Service Timing
                          </label>
                          <select
                            name=""
                            className="myselect pe-[30px] focus-none mt-1"
                            id=""
                          >
                            {timeoptions.map((option, index) => (
                              <option
                                className="first:hidden"
                                key={index}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-[#181D27]">Tier 2</p>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier2Title"
                          >
                            Title
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Title"
                            id="tier2Title"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier2Deliverables"
                          >
                            Deliverables
                          </label>
                          <textarea
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            name="tier2Deliverables"
                            id="tier2Deliverables"
                            placeholder="Add specific deliverables for this deal"
                            rows={4}
                          ></textarea>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier2Price"
                          >
                            Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Should be $50"
                            id="tier2Price"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier2BuyNowDiscount"
                          >
                            Buy Now Discount
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Buy Now Discount 10 %"
                            id="tier2BuyNowDiscount"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier2FinalListPrice"
                          >
                            Final List Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Final List Price $45"
                            id="tier2FinalListPrice"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier2EstimatedTiming"
                          >
                            Estimated Service Timing
                          </label>
                          <select
                            name=""
                            className="myselect pe-[30px] focus-none mt-1"
                            id=""
                          >
                            {timeoptions.map((option, index) => (
                              <option
                                className="first:hidden"
                                key={index}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-[#181D27]">Tier 3</p>
                          <HiOutlineTrash className="text-[18px]" />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier3Title"
                          >
                            Title
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Title"
                            id="tier3Title"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier3Deliverables"
                          >
                            Deliverables
                          </label>
                          <textarea
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            name="tier3Deliverables"
                            id="tier3Deliverables"
                            placeholder="Add specific deliverables for this deal"
                            rows={4}
                          ></textarea>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier3Price"
                          >
                            Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Should be $50"
                            id="tier3Price"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier3BuyNowDiscount"
                          >
                            Buy Now Discount
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Buy Now Discount 10 %"
                            id="tier3BuyNowDiscount"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier3FinalListPrice"
                          >
                            Final List Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Final List Price $45"
                            id="tier3FinalListPrice"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-semibold ps-2 text-[#181D27]"
                            htmlFor="tier3EstimatedTiming"
                          >
                            Estimated Service Timing
                          </label>
                          <select
                            name=""
                            className="myselect pe-[30px] focus-none mt-1"
                            id=""
                          >
                            {timeoptions.map((option, index) => (
                              <option
                                className="first:hidden"
                                key={index}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="md:max-w-[550px] w-full mt-4 ms-auto">
          <div className="grid sm:grid-cols-3 gap-3">
            <button
              type="reset"
              className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border rounded-lg py-[10px] w-full text-white font-semibold bg-[#0F91D2]"
            >
              Publish
            </button>
            <button
              type="submit"
              className={`border rounded-lg py-[10px] w-full text-white font-semibold bg-[#0F91D2]`}
            >
              Save & Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PricingPackaging;
