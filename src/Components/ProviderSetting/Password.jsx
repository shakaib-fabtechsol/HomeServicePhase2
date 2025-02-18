import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Password = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    current_password: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("id");
    setFormData((prevState) => ({ ...prevState, user_id: userId }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }
   
    if (formData.password !== formData.confirm_password) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await axios.post(
        "https://homeservice.thefabulousshow.com/api/UpdatePassword",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
            <p className="text-lg font-semibold text-[#181D27]">Password</p>
            <p className="text-[#535862] text-sm">
              Update your account password.
            </p>
          </div>
          <div>
            {/* Current Password */}
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
                  value={formData.current_password}
                  onChange={handleChange}
                  className="myinput focus-none w-full"
                />
              </div>
            </div>

            {/* New Password */}
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
                  value={formData.password}
                  onChange={handleChange}
                  className="myinput focus-none w-full"
                />
              </div>
            </div>

            {/* Confirm New Password */}
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
                  value={formData.confirm_password}
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
                className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Password;
