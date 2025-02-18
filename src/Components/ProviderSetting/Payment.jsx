import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    service_title: "",
    bank: "",
    branch_name: "",
    account_number: "",
    bank_routing_number: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("id");
    setFormData((prevState) => ({ ...prevState, user_id: userId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await axios.post(
        "https://homeservice.thefabulousshow.com/api/AddPaymentDetails",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
            <p className="text-lg font-semibold text-[#181D27]">
              Payment/Payout Info
            </p>
            <br />
            <p className="text-[#535862] text-sm">update your payment detail</p>
          </div>
          <div className="">
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="Title" className="font-semibold">
                    Business Name
                  </label>
                  <br />
                  <p className="text-[#535862] text-sm">This is your legal business name for tax purposes. This will not be publicly displayed on your profile.</p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  id="service_title"
                  placeholder="Muhammad Hussnain"
                  className="myinput focus-none w-full"
                  name="service_title" // ✅ Match the formData key
                  value={formData.service_title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="Title" className="font-semibold">
                    Select Bank*
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <select
                  id="bank"
                  name="bank"
                  value={formData.bank} // ✅ Controlled value
                  onChange={handleChange} // ✅ Handle changes
                  className="myinput focus-none w-full"
                >
                  <option value="" disabled hidden>
                    Select a bank
                  </option>
                  <option value="bank1">Bank 1</option>
                  <option value="bank2">Bank 2</option>
                  <option value="bank3">Bank 3</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="Title" className="font-semibold">
                    Branch Name/Code
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  id="Title"
                  placeholder="Enter"
                  name="branch_name"
                  value={formData.branch_name}
                  onChange={handleChange}
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="Title" className="font-semibold">
                    SSN/TIN
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  id="Title"
                  placeholder="Enter"
                  name="branch_name"
                  value={formData.branch_name}
                  onChange={handleChange}
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="Title" className="font-semibold">
                    Account Number*
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  id="account_number" // Match the field name
                  name="account_number" // ✅ Match the formData key
                  value={formData.account_number}
                  onChange={handleChange}
                  placeholder="Enter here..."
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
            <div className="grid py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="Title" className="font-semibold">
                    Bank Routing Number*
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  id="bank_routing_number" // Match the field name
                  name="bank_routing_number" // ✅ Ensure it matches formData key
                  value={formData.bank_routing_number}
                  onChange={handleChange}
                  placeholder="Enter here..."
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="reset"
              className="border border-[#cdcdcd] rounded-lg w-[150px] py-[10px] me-4 font-semibold bg-[#ffffff]"
            >
              {" "}
              Cancel
            </button>
            <button
              type="submit"
              className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
