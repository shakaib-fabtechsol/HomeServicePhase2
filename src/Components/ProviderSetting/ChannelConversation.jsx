import React from "react";
import { useState } from "react";

const ChannelConversation = () => {
  const [toggles, setToggles] = useState({
    call: false,
    text: false,
    email: false,
    address: false,
    chat: false,
    form: false,
  });
  const handleToggle = (field) => {
    setToggles((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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
      <form>
        <div>
          <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
            <p className="text-lg font-semibold text-[#181D27]">
              Channels for Conversations
            </p>
            <p className="text-[#535862] text-sm">
              Update your channels details.
            </p>
          </div>
          <div className="">
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 2xl:col-span-5">
                <div className="flex items-center">
                  <p className="font-semibold me-2">Call Pro</p>
                  <label className="switch def-switch relative flex items-center">
                    <input
                      type="checkbox"
                      checked={toggles.call}
                      onChange={() => handleToggle("call")}
                      className="hidden peer"
                    />
                    <span className="slider round"></span>
                    <span className="absolute left-[70px] text-sm mt-1 font-semibold text-gray-700 peer-checked:hidden">
                      Off
                    </span>
                    <span className="absolute right-[-35px] text-sm mt-1 font-semibold text-gray-700 hidden peer-checked:inline">
                      On
                    </span>
                  </label>
                </div>
                <p className="mt-3">
                  Enable the toggle to make your phone number visible to the
                  public. Each time a customer (only one time per customer) uses
                  this channel will incur a charge of <strong>$10</strong>. This charge is waived
                  if your average deal revenue is above <strong>$xxx</strong> for the past 60 day
                  period.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                <input
                  type="text"
                  id="Title"
                  name="conversation_call_number"
                  onChange={handleChange}
                  disabled={!toggles.call}
                  placeholder="Enter Call Number"
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 2xl:col-span-5">
                <div className="flex items-center">
                  <p className="font-semibold me-2">Text Pro</p>
                  <label className="switch def-switch relative flex items-center">
                    <input
                      type="checkbox"
                      checked={toggles.text}
                      onChange={() => handleToggle("text")}
                      className="hidden peer"
                    />
                    <span className="slider round"></span>
                    <span className="absolute left-[70px] text-sm mt-1 font-semibold text-gray-700 peer-checked:hidden">
                      Off
                    </span>
                    <span className="absolute right-[-35px] text-sm mt-1 font-semibold text-gray-700 hidden peer-checked:inline">
                      On
                    </span>
                  </label>
                </div>
                <p className="mt-3">
                  Enable the toggle to make your text number visible to the
                  public. Each time a customer (only one time per customer) uses
                  this channel will incur a charge of <strong>$10</strong>. This charge is waived
                  if your average deal revenue is above <strong>$xxx</strong> for the past 60 day
                  period.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                <input
                  type="text"
                  id="Title"
                  name="conversation_text_number"
                  onChange={handleChange}
                  disabled={!toggles.text}
                  placeholder="Enter Text Number"
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 2xl:col-span-5">
                <div className="flex items-center">
                  <p className="font-semibold me-2">Instant Chat</p>
                  <label className="switch def-switch relative flex items-center">
                    <input
                      type="checkbox"
                      checked={toggles.chat}
                      onChange={() => handleToggle("chat")}
                      className="hidden peer"
                    />
                    <span className="slider round"></span>
                    <span className="absolute left-[70px] text-sm mt-1 font-semibold text-gray-700 peer-checked:hidden">
                      Off
                    </span>
                    <span className="absolute right-[-35px] text-sm mt-1 font-semibold text-gray-700 hidden peer-checked:inline">
                      On
                    </span>
                  </label>
                </div>
                <p className="mt-3">
                  Enable the toggle to make your instant chat visible to the
                  public. Each time a customer (only one time per customer) uses
                  this channel will incur a charge of <strong>$5</strong>. This charge is waived
                  if your average deal revenue is above <strong>$xxx</strong> for the past 60 day
                  period.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 2xl:col-span-6"></div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 2xl:col-span-5">
                <div className="flex items-center">
                  <p className="font-semibold me-2">Email Pro</p>
                  <label className="switch def-switch relative flex items-center">
                    <input
                      type="checkbox"
                      checked={toggles.email}
                      onChange={() => handleToggle("email")}
                      className="hidden peer"
                    />
                    <span className="slider round"></span>
                    <span className="absolute left-[70px] text-sm mt-1 font-semibold text-gray-700 peer-checked:hidden">
                      Off
                    </span>
                    <span className="absolute right-[-35px] text-sm mt-1 font-semibold text-gray-700 hidden peer-checked:inline">
                      On
                    </span>
                  </label>
                </div>
                <p className="mt-3">
                  Enable the toggle to make your email address visible to the
                  public. Each time a customer (only one time per customer) uses
                  this channel will incur a charge of <strong>$10</strong>. This charge is waived
                  if your average deal revenue is above <strong>$xxx</strong> for the past 60 day
                  period.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                <input
                  type="email"
                  id="Title"
                  onChange={handleChange}
                  name="conversation_email"
                  disabled={!toggles.email}
                  placeholder="Enter Email here"
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 2xl:col-span-5">
                <div className="flex items-center">
                  <p className="font-semibold me-2">Address</p>
                  <label className="switch def-switch relative flex items-center">
                    <input
                      type="checkbox"
                      checked={toggles.address}
                      onChange={() => handleToggle("address")}
                      className="hidden peer"
                    />
                    <span className="slider round"></span>
                    <span className="absolute left-[70px] text-sm mt-1 font-semibold text-gray-700 peer-checked:hidden">
                      Off
                    </span>
                    <span className="absolute right-[-35px] text-sm mt-1 font-semibold text-gray-700 hidden peer-checked:inline">
                      On
                    </span>
                  </label>
                </div>
                <p className="mt-3">
                  Enable the toggle to make your address visible to the public.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                <input
                  type="text"
                  id="Title"
                  onChange={handleChange}
                  disabled={!toggles.address}
                  name="conversation_address"
                  placeholder="Enter Address here"
                  className="myinput focus-none w-full"
                />
              </div>
            </div>
          </div>
          <div className="grid max-w-[550px] grid-cols-3 my-4 gap-2 ms-auto">
            <button className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white">
              Cancel
            </button>
            <button className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]">
              Save & Publish
            </button>
            <button className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChannelConversation;
