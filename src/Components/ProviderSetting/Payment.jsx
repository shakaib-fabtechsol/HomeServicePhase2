import React from "react";

const Payment = () => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form>
        <div>
          <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
            <p className="text-lg font-semibold text-[#181D27]">
              Payment/Payout Info
            </p>
            <p className="text-[#535862] text-sm">update your payment detail</p>
          </div>
          <div className="">
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div>
                  <label htmlFor="Title" className="font-semibold">
                    Business Name
                  </label>
                  <p className="text-[#535862] text-sm">
                    This is your legal business name for tax purposes. This will
                    not be publicly displayed on your profile.
                  </p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  id="service_title"
                  placeholder="Muhammad Hussnain"
                  className="myinput focus-none w-full"
                  name="service_title"
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
                  onChange={handleChange}
                  className="myinput focus-none w-full"
                >
                  <option value="" disabled hidden>
                    Select a bank
                  </option>
                  <option value="bank1">Bank 1</option>
                  <option value="bank2">Bank 2</option>
                  <option value="bank3">Bank 3</option>
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
                  id="account_number"
                  name="account_number"
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
                  id="bank_routing_number"
                  name="bank_routing_number"
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
              className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2]`}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
