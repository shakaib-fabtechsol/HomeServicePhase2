import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetDealQuery,
  usePostBasicInfoMutation,
  usePublishDealMutation,
} from "../../services/base-api/index";
import Swal from "sweetalert2";
import Loader from "../MUI/Loader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function BasicInfo({ setServiceId, setValue }) {
  const [tags, setTags] = useState([]);
  const { dealid } = useParams();
  const id = localStorage.getItem("id");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [publishValue, setPublishValue] = useState(1);
  const [publishLoading, setPublishLoading] = useState(false);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    service_title: "",
    commercial: 0,
    residential: 0,
    service_category: "",
    search_tags: "",
    service_description: "",
  });

  const {
    data: dealData,
    isLoading: isDealLoading,
    isError: isDealError,
  } = useGetDealQuery(dealid, {
    skip: !dealid,
  });

  const [postBasicInfo] = usePostBasicInfoMutation();
  const [publishDeal] = usePublishDealMutation();

  useEffect(() => {
    if (dealData) {
      const BasicInfo = dealData?.deal[0];
      setFormData({
        id: BasicInfo.id || "",
        service_title: BasicInfo.service_title || "",
        commercial: BasicInfo.commercial || 0,
        residential: BasicInfo.residential || 0,
        service_category: BasicInfo.service_category || "",
        search_tags: BasicInfo.search_tags || "",
        service_description: BasicInfo.service_description || "",
      });
      setTags(BasicInfo.search_tags ? BasicInfo.search_tags.split(",") : []);
      setIsApiLoaded(true);
    }
  }, [dealData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const submitData = {
      user_id: id,
      service_title: e.target.Title.value,
      commercial: e.target.Commercial.checked ? 1 : 0,
      residential: e.target.Residential.checked ? 1 : 0,
      service_category: e.target.Category.value,
      search_tags: tags.join(","),
      service_description: e.target.Description.value,
    };

    try {
      const updatedFormData = { ...submitData };
      if (dealid) {
        updatedFormData.id = dealid;
      }
      const response = await postBasicInfo(updatedFormData).unwrap();
      if (response) {
        setServiceId(response.deal.id);
        localStorage.setItem("deal_id", response.deal.id);

        Swal.fire({
          icon: "success",
          title: dealid ? "Updated Successfully!" : "Created Successfully!",
          text: dealid
            ? "Your data has been updated successfully."
            : "Your data has been saved successfully.",
          confirmButtonColor: "#0F91D2",
        }).then(() => {
          setValue(1);
        });
        e.target.reset();
        setTags([]);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: dealid ? "Update Failed" : "Submission Failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const Businesscategories = [
    "Plumbing",
    "Electrical",
    "HVAC / Heating & Cooling",
    "Landscaping",
    "Roofing",
    "Painting",
    "Moving",
    "Security",
    "Cleaning Service",
    "Appliance Repair",
  ];
   const handlePublish = async () => {
       if (publishLoading) return;
       setPublishLoading(true);
     
       const dealid = localStorage.getItem("deal_id");
     
       if (!dealid) {
         toast.error("Deal ID is missing. Please try again.");
         setPublishLoading(false);
         return;
       }
     
       try {
         
         const response = await publishDeal({ deal_id: dealid }).unwrap();
     
         if (response) {
           setFormData((prev) => ({ ...prev, publish: 1 }));
           toast.success("Published successfully!");
           setPublishValue(1);
         }
       } catch (error) {
         console.error("Error publishing deal:", error);
         toast.error("Failed to publish. Please try again.");
       } finally {
         setPublishLoading(false);
       }
     };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setFormData({
          ...formData,
          search_tags: newTags.join(","),
        });
      }
      setInputValue("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setFormData({
      ...formData,
      search_tags: newTags.join(","),
    });
  };

  return (
    <>
      {dealid && !isApiLoaded ? (
        <Loader />
      ) : (
        <div>
          <ToastContainer position="top-right" autoClose={3000} />

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label htmlFor="Title" className="font-semibold">
                    Deal Title
                  </label>
                  <input
                    type="text"
                    id="Title"
                    placeholder="Enter deal name"
                    value={formData.service_title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_title: e.target.value,
                      })
                    }
                    className="myinput"
                    required
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 mt-4">
                <p className="font-semibold">Service Type</p>
                <p className="text-[#535862] text-sm">
                  Select which type of customers this offer is intended for.
                </p>
                <div className="flex mt-4">
                  <label className="flex me-4">
                    <input
                      type="checkbox"
                      id="Commercial"
                      name="Commercial"
                      checked={formData.commercial == 1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          commercial: e.target.checked ? 1 : 0,
                        })
                      }
                      className="me-2"
                    />
                    Commercial
                  </label>
                  <label className="flex">
                    <input
                      type="checkbox"
                      id="Residential"
                      name="Residential"
                      checked={formData.residential == 1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          residential: e.target.checked ? 1 : 0,
                        })
                      }
                      className="me-2"
                    />
                    Residential
                  </label>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label htmlFor="Category" className="font-semibold">
                    Service Category
                  </label>
                  <select
                    id="Category"
                    className="myselect w-full"
                    required
                    value={formData.service_category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_category: e.target.value,
                      })
                    }
                  >
                    <option value="" hidden>
                      Select the primary category for this deal
                    </option>
                    {Businesscategories.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <div className="col-span-12 lg:col-span-7 mt-4">
                    <div className="flex flex-col">
                      <label htmlFor="Tags" className="font-semibold">
                        Search Tags
                      </label>
                      <div className="border rounded-lg p-2 myinput flex flex-wrap min-h-[40px]">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-[#E7F4FB] text-[#0F91D2] px-3 py-2 rounded-full me-2"
                          >
                            {tag}
                            <button
                              type="button"
                              className="ml-2 text-white bg-[#0F91D2] rounded-full w-5 h-5 flex items-center justify-center text-xs"
                              onClick={() => handleRemoveTag(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <input
                          type="text"
                          id="Tags"
                          placeholder="Enter keywords to match your deal with buyers. Not publicly visible."
                          className="outline-none flex-grow"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleAddTag}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 mt-4">
                <div className="flex flex-col">
                  <label htmlFor="Description" className="font-semibold">
                    Service Description
                  </label>
                  <textarea
                    id="Description"
                    className="myinput"
                    placeholder="Describe your deal in detail, this is publicly visible."
                    rows={4}
                    required
                    value={formData.service_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="col-span-12 mt-4 flex justify-end gap-4">
                <button
                  type="reset"
                  className="border border-gray-300 rounded-lg w-[150px] py-[10px] font-semibold bg-white"
                >
                  Cancel
                </button>
                <input
                  type="text"
                  id="Flatr"
                  defaultValue={formData?.id ? `${formData?.id}` : "0"}
                  className="focus-none border hidden"
                  readOnly
                />
                <input
                  type="text"
                  id="publish"
                  value={publishValue}
                  className="focus-none border hidden"
                  readOnly
                />
                <button
                  type="button"
                  className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                    publishLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handlePublish}
                  disabled={publishLoading}
                >
                  {publishLoading ? "Publishing..." : "Publish"}
                </button>

                <button
                  type="submit"
                  className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save & Next"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default BasicInfo;
