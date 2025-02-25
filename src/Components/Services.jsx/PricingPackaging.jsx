import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import down from "../../assets/img/chevronDown.png";

const PricingPackaging = () => {
  const [selectedRate, setSelectedRate] = useState("Flat");

  const handleRateChange = (event) => {
    setSelectedRate(event.target.value);
  };
  const [showTier3, setShowTier3] = useState(true);

  return (
    <div>
      <form>
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-10 mt-4">
            <p className="font-medium text-sm text-[#181D27]">Pricing Model</p>
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
                  className="font-medium text-sm text-[#5E6670] peer-checked:text-[#181D27]"
                  htmlFor="Flat"
                >
                  Flat Rate
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
                  className="font-medium text-sm text-[#5E6670] peer-checked:text-[#181D27]"
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
                  className="font-medium text-sm text-[#5E6670] peer-checked:text-[#181D27]"
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
                    className="font-medium text-sm text-[#181D27]"
                  >
                    Flat Rate Price
                  </label>
                  <input
                    type="text"
                    id="Flatr"
                    placeholder="$100"
                    className="myinput focus-none mt-1"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="BuyNow"
                    className="font-medium text-sm text-[#181D27]"
                  >
                    Buy Now Discount
                  </label>
                  <input
                    type="text"
                    id="BuyNow"
                    placeholder="10 %"
                    className="myinput focus-none mt-1"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Finalp"
                    className="font-medium text-sm text-[#181D27]"
                  >
                    Final List Price
                  </label>
                  <input
                    type="text"
                    id="Finalp"
                    placeholder="$90"
                    className="myinput focus-none mt-1"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Estimated"
                    className="font-medium text-sm text-[#181D27]"
                  >
                    Estimated Service Time
                  </label>
                  <select
                    name=""
                    className="myselect pe-[30px] focus-none mt-1"
                    id=""
                  >
                    <option value="" selected hidden>
                      How soon can you get it scheduled?
                    </option>
                    <option value="">Same day</option>
                    <option value="">2 days</option>
                    <option value="">3 days</option>
                    <option value="">1 week</option>
                    <option value="">2 week</option>
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
                    className="font-medium text-sm text-[#181D27]"
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
                    className="font-medium text-sm text-[#181D27]"
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
                    className="font-medium text-sm text-[#181D27]"
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
                    className="font-medium text-sm text-[#181D27]"
                  >
                    Estimated Service Time
                  </label>
                  <select
                    name=""
                    className="myselect pe-[30px] focus-none mt-1"
                    id=""
                  >
                    <option value="" selected hidden>
                      How soon can you get it scheduled?
                    </option>
                    <option value="">Same day</option>
                    <option value="">2 days</option>
                    <option value="">3 days</option>
                    <option value="">1 week</option>
                    <option value="">2 week</option>
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
                            className="text-sm font-medium ps-2 text-[#181D27]"
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
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier1Deliverables"
                          >
                            Deliverables
                          </label>
                          <textarea
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            name="tier1Deliverables"
                            id="tier1Deliverables"
                            placeholder="Write here.."
                            rows={4}
                          ></textarea>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier1Price"
                          >
                            Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="$50"
                            id="tier1Price"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier1BuyNowDiscount"
                          >
                            Buy Now Discount
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="10 %"
                            id="tier1BuyNowDiscount"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier1FinalListPrice"
                          >
                            Final List Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Final List Price should be $22.25"
                            id="tier1FinalListPrice"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier2EstimatedTiming"
                          >
                            Estimated Service Timing
                          </label>
                          <select
                            style={{
                              backgroundImage: `url(${down})`,
                              backgroundPosition: "calc(100% - 10px) center",
                              backgroundRepeat: "no-repeat",
                            }}
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 ps-3 pe-6 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none appearance-none"
                            name="tier2EstimatedTiming"
                            id="tier2EstimatedTiming"
                          >
                            <option value="" selected hidden>
                              How soon can you get it scheduled?
                            </option>
                            <option value="">1 Day</option>
                            <option value="">2 Day</option>
                            <option value="">3 Day</option>
                            <option value="">4 Day</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-[#181D27]">Tier 2</p>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-medium ps-2 text-[#181D27]"
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
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier2Deliverables"
                          >
                            Deliverables
                          </label>
                          <textarea
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            name="tier2Deliverables"
                            id="tier2Deliverables"
                            placeholder="Write here.."
                            rows={4}
                          ></textarea>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier2Price"
                          >
                            Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="$50"
                            id="tier2Price"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier2BuyNowDiscount"
                          >
                            Buy Now Discount
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="10 %"
                            id="tier2BuyNowDiscount"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier2FinalListPrice"
                          >
                            Final List Price
                          </label>
                          <input
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Final List Price should be $22.25"
                            id="tier2FinalListPrice"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label
                            className="text-sm font-medium ps-2 text-[#181D27]"
                            htmlFor="tier2EstimatedTiming"
                          >
                            Estimated Service Timing
                          </label>
                          <select
                            style={{
                              backgroundImage: `url(${down})`,
                              backgroundPosition: "calc(100% - 10px) center",
                              backgroundRepeat: "no-repeat",
                            }}
                            className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 ps-3 pe-6 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none appearance-none"
                            name="tier2EstimatedTiming"
                            id="tier2EstimatedTiming"
                          >
                            <option value="" selected hidden>
                              How soon can you get it scheduled?
                            </option>
                            <option value="">1 Day</option>
                            <option value="">2 Day</option>
                            <option value="">3 Day</option>
                            <option value="">4 Day</option>
                          </select>
                        </div>
                      </div>
                      <>
      {showTier3 && (
        <div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[#181D27]">Tier 3</p>
            <HiOutlineTrash
              className="text-[18px] cursor-pointer text-red-500"
              onClick={() => setShowTier3(false)}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label
              className="text-sm font-medium ps-2 text-[#181D27]"
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
              className="text-sm font-medium ps-2 text-[#181D27]"
              htmlFor="tier3Deliverables"
            >
              Deliverables
            </label>
            <textarea
              className="shadow-[0px_1px_2px_0px_#1018280D] py-2 mt-1 px-3 bg-white border border-[#D0D5DD] rounded-[8px] focus:outline-none"
              name="tier3Deliverables"
              id="tier3Deliverables"
              placeholder="Write here.."
              rows={4}
            ></textarea>
          </div>
          {/* Baqi fields yahin rahengi */}
        </div>
      )}
    </>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="col-span-12 mt-4">
            <div className="flex justify-end">
              <button
                type="reset"
                className="border border-[#cdcdcd] rounded-lg w-[150px] py-[10px] me-4 font-semibold bg-[#ffffff]"
                onClick={() => setSelectedRate("")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border border-[#0F91D2] rounded-lg w-[150px] py-[10px] text-[#ffffff] font-semibold bg-[#0F91D2]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PricingPackaging;
