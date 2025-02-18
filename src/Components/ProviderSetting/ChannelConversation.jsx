import React from 'react'
import {useNavigate} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ChannelConversation = () => {
    const navigate=useNavigate();
     const [loading, setLoading] = useState(false);
      const [formData, setFormData] = useState({
        user_id: "",
        conversation_call_number:"",
        conversation_text_number:"",
        conversation_email:"",
        conversation_address:"",
       
      });

      const [toggles, setToggles] = useState({
        call: false,
        text: false,
        email: false,
        address: false,
        chat:false,
        form:false,
      });
      const handleToggle = (field) => {
        setToggles((prev) => ({
          ...prev,
          [field]: !prev[field],
        }));
      };
    
    
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
      
    
        setLoading(true);
    
        try {
          const data = new FormData();
          Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
          });
    
          const response = await axios.post(
            "https://homeservice.thefabulousshow.com/api/AddConversation",
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
                                    <input type="checkbox"  checked={toggles.call} onChange={() => handleToggle("call")} className="hidden peer" />
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
                                public. Each time a customer (only one time per customer)
                                uses this channel will incur a charge of $10. This charge
                                is waived if your average deal revenue is above $xxx for the
                                past 60 day period.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                            <input
                                type="text"
                                id="Title"
                                value={formData.conversation_call_number}
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
                                    <input type="checkbox"  checked={toggles.text} onChange={() => handleToggle("text")} className="hidden peer" />
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
                                public. Each time a customer (only one time per customer)
                                uses this channel will incur a charge of $10. This charge
                                is waived if your average deal revenue is above $xxx for the
                                past 60 day period.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                            <input
                                type="text"
                                id="Title"
                                name="conversation_text_number"
                                value={formData.conversation_text_number}
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
                                    <input type="checkbox"  checked={toggles.chat} onChange={() => handleToggle("chat")} className="hidden peer" />
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
                                public. Each time a customer (only one time per customer)
                                uses this channel will incur a charge of $5. This charge
                                is waived if your average deal revenue is above $xxx for the
                                past 60 day period.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-6 2xl:col-span-6"></div>
                    </div>
                    <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-6 2xl:col-span-5">
                            <div className="flex items-center">
                                <p className="font-semibold me-2">Email Pro</p>
                                <label className="switch def-switch relative flex items-center">
                                    <input type="checkbox"   checked={toggles.email} onChange={() => handleToggle("email")} className="hidden peer" />
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
                                public. Each time a customer (only one time per customer)
                                uses this channel will incur a charge of $10. This charge
                                is waived if your average deal revenue is above $xxx for the
                                past 60 day period.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                            <input
                                type="email"
                                id="Title"
                                value={formData.conversation_email}
                                onChange={handleChange}
                                name="conversation_email"
                                disabled={!toggles.email}
                                placeholder="Enter Email here"
                                className="myinput focus-none w-full"
                            />
                        </div>
                    </div>
                    {/* <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-6 2xl:col-span-5">
                            <div className="flex items-center">
                                <p className="font-semibold me-2">Direct Form</p>
                                <label className="switch def-switch relative flex items-center">
                                    <input type="checkbox"  checked={toggles.form} onChange={() => handleToggle("form")}  className="hidden peer" />
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
                                Enable the toggle to make your direct form visible to the
                                public. Each time a customer (only one time per customer)
                                uses this channel will incur a charge of $xxx. This charge
                                is waived if your average deal revenue is above $xxx for the
                                past 60 day period.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-6 2xl:col-span-6"></div>
                    </div> */}
                    <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-6 2xl:col-span-5">
                            <div className="flex items-center">
                                <p className="font-semibold me-2">Address</p>
                                <label className="switch def-switch relative flex items-center">
                                    <input type="checkbox"  checked={toggles.address} onChange={() => handleToggle("address")}  className="hidden peer" />
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
                                Enable the toggle to make your address visible to the
                                public.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                            <input
                                type="text"
                                id="Title"
                                value={formData.conversation_address}
                                onChange={handleChange}
                                disabled={!toggles.address}
                                name="conversation_address"
                                placeholder="Enter Address here"
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
                        className="border border-[#0F91D2] rounded-lg w-[150px] py-[10px] text-[#ffffff] font-semibold bg-[#0F91D2]"
                    >
                        Save
                    </button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default ChannelConversation