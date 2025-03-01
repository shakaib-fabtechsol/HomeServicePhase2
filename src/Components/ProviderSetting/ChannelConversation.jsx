import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAddConversationMutation } from "../../services/settings";
import { useSelector ,useDispatch} from "react-redux";

const ChannelConversation = () => {
  const userData = useSelector((state) => state.auth.user);
  const [addConversation, { isLoading }] = useAddConversationMutation();
  const [toggles, setToggles] = useState({
    call: false,
    text: false,
    email: false,
    address: false,
    chat: false,
    form: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    mode: "onChange"
  });

  const handleToggle = (field) => {
    setToggles((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Validation patterns
  const patterns = {
    phone: {
      value: /^\+?[1-9]\d{9,14}$/,
      message: "Please enter a valid phone number"
    },
    email: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address"
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('id', userData.id);
      formData.append('conversation_call_number', data.conversation_call_number);
      formData.append('conversation_text_number', data.conversation_text_number);
      formData.append('conversation_email', data.conversation_email);
      formData.append('conversation_address', data.conversation_address);
      const response = await addConversation(formData);
      
      if (response?.data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Conversation settings updated successfully",
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message || "Something went wrong while updating settings"
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("conversation_call_number", {
                    disabled: !toggles.call,
                    pattern: patterns.phone,
                    required: toggles.call ? "Phone number is required" : false
                  })}
                  placeholder="Enter Call Number"
                  className={`myinput focus-none w-full ${errors.conversation_call_number ? 'border-red-500' : ''}`}
                />
                {errors.conversation_call_number && (
                  <span className="text-red-500 text-sm">{errors.conversation_call_number.message}</span>
                )}
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
                  {...register("conversation_text_number", {
                    disabled: !toggles.text,
                    pattern: patterns.phone,
                    required: toggles.text ? "Phone number is required" : false
                  })}
                  placeholder="Enter Text Number"
                  className={`myinput focus-none w-full ${errors.conversation_text_number ? 'border-red-500' : ''}`}
                />
                {errors.conversation_text_number && (
                  <span className="text-red-500 text-sm">{errors.conversation_text_number.message}</span>
                )}
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
                  {...register("conversation_email", {
                    disabled: !toggles.email,
                    pattern: patterns.email,
                    required: toggles.email ? "Email is required" : false
                  })}
                  placeholder="Enter Email here"
                  className={`myinput focus-none w-full ${errors.conversation_email ? 'border-red-500' : ''}`}
                />
                {errors.conversation_email && (
                  <span className="text-red-500 text-sm">{errors.conversation_email.message}</span>
                )}
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
                  {...register("conversation_address", {
                    disabled: !toggles.address,
                    required: toggles.address ? "Address is required" : false
                  })}
                  placeholder="Enter Address here"
                  className={`myinput focus-none w-full ${errors.conversation_address ? 'border-red-500' : ''}`}
                />
                {errors.conversation_address && (
                  <span className="text-red-500 text-sm">{errors.conversation_address.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="grid max-w-[550px] grid-cols-3 my-4 gap-2 ms-auto">
            <button 
              type="button"
              onClick={() => reset()} 
              className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
            >
              {isLoading ? "Saving..." : "Save & Publish"}
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChannelConversation;
