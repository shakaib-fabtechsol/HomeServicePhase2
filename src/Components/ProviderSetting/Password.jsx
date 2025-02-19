import React, { useState } from "react";

const Password = () => {
  const [formData, setFormData] = useState({});

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
            <p className="text-lg font-semibold text-[#181D27]">Password</p>
            <p className="text-[#535862] text-sm">
              Update your account password.
            </p>
          </div>
          <div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <label htmlFor="current_password" className="font-semibold">
                  Current Password
                </label>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="password"
                  id="current_password"
                  name="current_password"
                  onChange={handleChange}
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <label htmlFor="password" className="font-semibold">
                  New Password
                </label>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <label htmlFor="confirm_password" className="font-semibold">
                  Confirm New Password
                </label>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  onChange={handleChange}
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="reset"
                className="border border-[#cdcdcd] rounded-lg w-[150px] py-[10px] me-4 font-semibold bg-[#ffffff]"
              >
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
        </div>
      </form>
    </div>
  );
};

export default Password;
