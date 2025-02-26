import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import down from "../../assets/img/chevronDown.png";

const PricingPackaging = () => {
  const [fixedRate, setFixedRate] = useState(""); // Fixed Rate Price
  const [discount, setDiscount] = useState(""); // Buy Now Discount (%)
  const [finalPrice, setFinalPrice] = useState(""); // Final List Price

  // Function to handle Fixed Rate Price input
  const handleFixedRateChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric values
    if (value) {
      value = `$${value}`; // Add $ at the beginning
    }
    setFixedRate(value);
    calculateFinalPrice(value, discount);
  };

  // Function to handle Buy Now Discount input
  const handleDiscountChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric values
    if (value) {
      value = `${value}%`; // Add % at the end
    }
    setDiscount(value);
    calculateFinalPrice(fixedRate, value);
  };

  // Function to calculate Final List Price
  const calculateFinalPrice = (fixed, disc) => {
    let fixedValue = parseFloat(fixed.replace("$", "")) || 0; // Extract numeric value
    let discountValue = parseFloat(disc.replace("%", "")) || 0; // Extract numeric value
    let final = fixedValue - (fixedValue * discountValue) / 100; // Calculate discounted price
    setFinalPrice(`$${final.toFixed(2)}`); // Format final price
  };

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
  const [showTier3, setShowTier3] = useState(true);
  const [hourlyPrice, setHourlyPrice] = useState(""); // Hourly Rate
  const [hourlyDiscount, setHourlyDiscount] = useState(""); // Discount (%)
  const [hourlyFinal, setHourlyFinal] = useState(""); // Final List Price

  // Handle Hourly Price Input
  const handleHourlyPriceChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ""); // Only allow numbers
    if (value) {
      value = `$${value}/hour`; // Add "$" at the start and "/hour" at the end
    }
    setHourlyPrice(value);
    calculateHourlyFinal(value, hourlyDiscount);
  };

  // Handle Hourly Discount Input
  const handleHourlyDiscountChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ""); // Only allow numbers
    if (value) {
      value = `${value}%`; // Add "%" at the end
    }
    setHourlyDiscount(value);
    calculateHourlyFinal(hourlyPrice, value);
  };

  const calculateHourlyFinal = (hourly, disc) => {
    let hourlyValue =
      parseFloat(hourly.replace("$", "").replace("/hour", "")) || 0;
    let discountValue = parseFloat(disc.replace("%", "")) || 0;
    let final = hourlyValue - (hourlyValue * discountValue) / 100;
    setHourlyFinal(`$${final.toFixed(2)}/hour`);
  };

  // --------------tiers calculation--------
  const [tiers, setTiers] = useState([
    {
      id: 1,
      title: "",
      deliverables: "",
      price: "",
      discount: "",
      finalPrice: "",
      estimatedTiming: "",
    },
    {
      id: 2,
      title: "",
      deliverables: "",
      price: "",
      discount: "",
      finalPrice: "",
      estimatedTiming: "",
    },
    {
      id: 3,
      title: "",
      deliverables: "",
      price: "",
      discount: "",
      finalPrice: "",
      estimatedTiming: "",
    },
  ]);
  const handleInputChange = (tierId, field, value) => {
    const updatedTiers = tiers.map((tier) => {
      if (tier.id === tierId) {
        let newValue = value.replace(/[^0-9.]/g, ""); // Allow only numbers and dot
        if (field === "discount") newValue = value.replace(/[^0-9]/g, ""); // Only numbers for discount
  
        // Ensure each new line starts with a bullet point
        if (field === "deliverables") {
          newValue = value
            .split("\n")
            .map((line) => (line.trim().startsWith("•") ? line : `• ${line}`))
            .join("\n");
        }
  
        let updatedTier = { ...tier, [field]: newValue };
  
        // Ensure the price field always starts with $
        if (field === "price") {
          updatedTier.price = newValue ? `$${newValue}` : "";
        }
  
        // Ensure the discount field always ends with %
        if (field === "discount") {
          updatedTier.discount = newValue ? `${newValue}%` : "";
        }
  
        // Calculate final price
        let numericPrice =
          parseFloat(updatedTier.price.replace(/[^0-9.]/g, "")) || 0;
        let numericDiscount =
          parseFloat(updatedTier.discount.replace(/[^0-9]/g, "")) || 0;
        let discountAmount = (numericPrice * numericDiscount) / 100;
        let finalAmount = numericPrice - discountAmount;
        updatedTier.finalPrice = finalAmount ? `$${finalAmount.toFixed(2)}` : "";
  
        return updatedTier;
      }
      return tier;
    });
  
    setTiers(updatedTiers);
  };
  
  const handleDeleteTier3 = () => {
    setTiers(tiers.filter((tier) => tier.id !== 3));
  };

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
                    value={fixedRate}
                    onChange={handleFixedRateChange}
                  />
                </div>
              </div>

              {/* Buy Now Discount */}
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
                    placeholder="Buy Now Discount 10%"
                    className="myinput focus-none mt-1"
                    value={discount}
                    onChange={handleDiscountChange}
                  />
                </div>
              </div>

              {/* Final List Price (Readonly) */}
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
                    placeholder="Final List Price"
                    className="myinput focus-none mt-1"
                    value={finalPrice}
                    readOnly
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
                    htmlFor="HourlyPrice"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Hourly Rate
                  </label>
                  <input
                    type="text"
                    id="HourlyPrice"
                    placeholder="Hour rate should be $25/hour"
                    className="myinput focus-none mt-1"
                    value={hourlyPrice}
                    onChange={handleHourlyPriceChange}
                  />
                </div>
              </div>

              {/* Hourly Discount */}
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="HourlyDiscount"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Discount (%)
                  </label>
                  <input
                    type="text"
                    id="HourlyDiscount"
                    placeholder="Buy Now Discount 10%"
                    className="myinput focus-none mt-1"
                    value={hourlyDiscount}
                    onChange={handleHourlyDiscountChange}
                  />
                </div>
              </div>

              {/* Final Hourly Price (Readonly) */}
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="HourlyFinal"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Final List Price
                  </label>
                  <input
                    type="text"
                    id="HourlyFinal"
                    placeholder="Final List Price should be $22.25/hour"
                    className="myinput focus-none mt-1"
                    value={hourlyFinal}
                    readOnly
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
                  <div className="grid lg:grid-cols-3 gap-5">
                    {tiers.map((tier) => (
                      <div key={tier.id} className="relative">
                        <p className="font-semibold text-[#181D27] flex justify-between">
                          Tier {tier.id}
                          {tier.id === 3 && (
                            <button onClick={handleDeleteTier3}>
                              <HiOutlineTrash className="text-[20px] cursor-pointer text-red-500" />
                            </button>
                          )}
                        </p>
                        <div className="flex flex-col mt-4">
                          <label className="text-sm font-semibold ps-2 text-[#181D27]">
                            Title
                          </label>
                          <input
                            className=" py-2 mt-1 px-3 bg-white border rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Title"
                            value={tier.title}
                            onChange={(e) =>
                              handleInputChange(
                                tier.id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label className="text-sm font-semibold ps-2 text-[#181D27]">
                            Deliverables
                          </label>
                         <textarea
                         className="py-2 mt-1 px-3 bg-white border rounded-[8px] focus:outline-none"
                         placeholder="Add specific deliverables for this deal"
                         rows={4}
                         value={tier.deliverables}
                         onChange={(e) =>
                           handleInputChange(tier.id, "deliverables", e.target.value)
                         }
                       />
                       
                        </div>
                        <div className="flex flex-col mt-4">
                          <label className="text-sm font-semibold ps-2 text-[#181D27]">
                            Price
                          </label>
                          <input
                            className=" py-2 mt-1 px-3 bg-white border rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Should be $50"
                            value={tier.price}
                            onChange={(e) =>
                              handleInputChange(
                                tier.id,
                                "price",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label className="text-sm font-semibold ps-2 text-[#181D27]">
                            Buy Now Discount
                          </label>
                          <input
                            className=" py-2 mt-1 px-3 bg-white border rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Buy Now Discount 10 %"
                            value={tier.discount}
                            onChange={(e) =>
                              handleInputChange(
                                tier.id,
                                "discount",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label className="text-sm font-semibold ps-2 text-[#181D27]">
                            Final Price
                          </label>
                          <input
                            className=" py-2 mt-1 px-3 bg-white border rounded-[8px] focus:outline-none"
                            type="text"
                            placeholder="Final Price"
                            value={tier.finalPrice}
                            readOnly
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label className="text-sm font-semibold ps-2 text-[#181D27]">
                            Estimated Service Timing
                          </label>
                          <select
                            className="myselect pe-[30px] focus-none mt-1"
                            value={tier.estimatedTiming}
                            onChange={(e) =>
                              handleInputChange(
                                tier.id,
                                "estimatedTiming",
                                e.target.value
                              )
                            }
                          >
                            <option value="" selected hidden>
                              How soon can you get it scheduled?
                            </option>
                            <option value="1-3 days">1-3 days</option>
                            <option value="3-5 days">3-5 days</option>
                            <option value="5-7 days">5-7 days</option>
                          </select>
                        </div>
                      </div>
                    ))}
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
