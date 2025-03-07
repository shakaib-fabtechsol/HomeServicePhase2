import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import SettingsPreview from "../MUI/SettingsPreview";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
import profileImg from "../../assets/img/service3.png";
import Loader from "../../Components/MUI/Loader";
import { toast } from "react-toastify";
import {useSelector} from "react-redux";

const CertificationHour = ({handleTabChange}) => {
const  token =useSelector((state)=>state.auth.token);
const userId=useSelector((state)=>state.auth.user);
  const [loading, setLoading] = useState(false);
  const [publishValue, setPublishValue] = useState(1);
  const [publishLoading, setPublishLoading] = useState(false);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  const [formData, setFormData] = useState({
    user_id: userId?.id,
    insurance_certificate: null,
    license_certificate: null,
    award_certificate: null,
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [schedule, setSchedule] = useState(
    days.map((day) => ({
      day,
      closed: false,
      Open24Hours: false,
      slots: [{ start: "", end: "" }],
    }))
  );

  const updateSchedule = (dayIndex, newValues) => {
    setSchedule((prev) =>
      prev.map((item, index) =>
        index === dayIndex ? { ...item, ...newValues } : item
      )
    );
  };

  const handleFileChange = (e, fieldName) => {
    const uploadedFile = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: uploadedFile,
    }));
  };

  const [specialSchedule, setSpecialSchedule] = useState([
    {
      text: "",
      date: "",
      hour: [{ start: "", end: "" }],
      closed: false,
      Open24Hours: false,
    },
  ]);

  const updatespecialSchedule = (index, updatedFields) => {
    const updatedSchedule = [...specialSchedule];
    updatedSchedule[index] = { ...updatedSchedule[index], ...updatedFields };
    console.log("Updated Schedule:", updatedSchedule); 
    setSpecialSchedule(updatedSchedule);
  };
  const deleteSlot = (index) => {
    const updatedSchedule = specialSchedule.filter((_, i) => i !== index);
    setSpecialSchedule(updatedSchedule);
  };

  const addNewEntry = () => {
    const newEntry = {
      text: "",
      date: "",
      hour: [{ start: "", end: "" }],
      closed: false,
      Open24Hours: false,
    };
    setSpecialSchedule([...specialSchedule, newEntry]);
  };

  const closeSpecificData = (index) => {
    updatespecialSchedule(index, { closed: !specialSchedule[index].closed });
  };

  const fetchData = async () => {
   
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get(
        `https://marketplace.thefabulousshow.com/api/UserDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const defaultSchedule = days.map((day) => ({
        day,
        closed: false,
        Open24Hours: false,
        slots: [{ start: "", end: "" }],
      }));

      const defaultSpecialSchedule = [
        {
          text: "",
          date: "",
          hour: [{ start: "", end: "" }],
          closed: false,
          Open24Hours: false,
        },
      ];

      console.log("response data", response.data?.businessProfile);
      const businessProfile = response.data?.businessProfile;

      if (businessProfile && businessProfile.length > 0) {
        const profile = businessProfile[0];
        let formattedSchedule = [];
        if (profile.regular_hour) {
          formattedSchedule =
            typeof profile.regular_hour === "string"
              ? JSON.parse(profile.regular_hour)
              : profile.regular_hour;
        }

        const transformedSchedule = formattedSchedule.map((item) => ({
          day: item.day_name,
          Open24Hours: item.Open24Hours,
          closed: item.day_status === "closed",
          slots:
            item.day_status === "closed"
              ? []
              : item.regular_hour.map((slot) => ({
                  start: slot.start_time,
                  end: slot.end_time,
                })),
        }));

        let formattedScheduleSpecial = [];
        if (profile.special_hour) {
          formattedScheduleSpecial =
            typeof profile.special_hour === "string"
              ? JSON.parse(profile.special_hour)
              : profile.special_hour;
        }
        console.log(formattedScheduleSpecial);
        const transformedScheduleSpecial = formattedScheduleSpecial.map(
          (item) => ({
            text: item.text,
            hour: item.hour,
            date: item.date || "",
            closed: item.closed === "closed",
            Open24Hours: item.Open24Hours === "true",
          })
        );

        const insuranceCertificate = profile.insurance_certificate
          ? `https://marketplace.thefabulousshow.com/uploads/${profile.insurance_certificate}`
          : "/default.png";
        const licenseCertificate = profile.license_certificate
          ? `https://marketplace.thefabulousshow.com/uploads/${profile.license_certificate}`
          : "/default.png";
        const awardCertificate = profile.award_certificate
          ? `https://marketplace.thefabulousshow.com/uploads/${profile.award_certificate}`
          : "/default.png";

        setFormData({
          user_id: profile.user_id,
          insurance_certificate: insuranceCertificate,
          license_certificate: licenseCertificate,
          award_certificate: awardCertificate,
        });
        setSchedule(
          transformedSchedule.length > 0 ? transformedSchedule : defaultSchedule
        );
        setSpecialSchedule(
          transformedScheduleSpecial.length > 0
            ? transformedScheduleSpecial
            : defaultSpecialSchedule
        );
        setIsApiLoaded(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch user details.");
    }
  };

  useEffect(() => {
    if (!userId?.id) return;

    fetchData();
  }, [userId?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
   

    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    setLoading(true);

    try {
      const formattedSchedule = schedule.map((item) => ({
        day_name: item.day,
        day_status: item.closed ? "closed" : "open",
        Open24Hours: item.Open24Hours,
        regular_hour: item.closed
          ? []
          : item.slots.map((slot) => ({
              start_time: slot.start,
              end_time: slot.end,
            })),
      }));

      const payload = specialSchedule.map((item) => ({
        text: item.text,
        date: item.date,
        closed: item.closed,
        hour: item.hour,
        Open24Hours: item.Open24Hours,
      }));
      const data = new FormData();

      data.append("regular_hour", JSON.stringify(formattedSchedule));
      data.append("special_hour", JSON.stringify(payload));

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          data.append(key, value);
        }
      });

      const response = await axios.post(
        "https://marketplace.thefabulousshow.com/api/AddCertificateHours",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Success:", response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (publishLoading) return;

    if (!userId?.id) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Service ID is required!",
        });
        return;
    }

    if (!token) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No token found. Please log in.",
        });
        return;
    }

    setPublishLoading(true);

    try {
        const response = await axios.get(
            `https://marketplace.thefabulousshow.com/api/SettingPublish/${userId.id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        console.log("API Response:", response.data);

        if (response.data?.setting?.publish === 1) {
            setFormData((prev) => ({ ...prev, publish: response.data?.setting?.publish }));
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Setting Published successfully.",
                confirmButtonColor: "#0F91D2",
            }).then(() => handleTabChange(4));
        } else {
            throw new Error(response.data.message || "Failed to update deal.");
        }
    } catch (error) {
        console.error("Error updating deal:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "There was an error updating the deal.",
        });
    } finally {
        setPublishLoading(false);
    }
};


  return (
    <div>
     
        <form onSubmit={handleSubmit}>
          <div>
            <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
              <p className="text-lg font-semibold text-[#181D27]">
                Certifications & Hours
              </p>
              <p className="text-[#535862] text-sm">
                Update your certifications & hours details.
              </p>
            </div>
            <div className="py-8 border-b">
              <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
                <div>
                  <p className="text-sm font-semibold text-[#414651]">
                    Upload Insurance Certificate
                  </p>
                </div>
                <div className="md:col-span-2">
                  <SettingsPreview
                    onFileSelect={handleFileChange}
                    fieldName="insurance_certificate"
                    existingImage={formData.insurance_certificate}
                  />
                </div>
              </div>
            </div>
            <div className="py-8 border-b">
              <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
                <div>
                  <p className="text-sm font-semibold text-[#414651]">
                    Upload Licensing Certificate
                  </p>
                </div>
                <div className="md:col-span-2">
                  <SettingsPreview
                    onFileSelect={handleFileChange}
                    fieldName="license_certificate"
                    existingImage={formData.license_certificate || profileImg}
                  />
                </div>
              </div>
            </div>
            <div className="py-8 border-b">
              <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
                <div>
                  <p className="text-sm font-semibold text-[#414651]">
                    Upload Awards Certificate
                  </p>
                </div>
                <div className="md:col-span-2">
                  <SettingsPreview
                    onFileSelect={handleFileChange}
                    fieldName="award_certificate"
                    existingImage={formData.award_certificate || profileImg}
                  />
                </div>
              </div>
            </div>
            <div className="py-8 border-b">
              <div className="py-8 border-b">
                <div className="grid lg:grid-cols-3 gap-2 max-w-[1000px]">
                  <div>
                    <p className="text-sm font-semibold">
                      Regular Hours of Operation
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    {schedule.map((item, dayIndex) => (
                      <div
                        key={item.day}
                        className="mb-4 md:grid grid-cols-3 gap-2"
                      >
                        <div>
                          <p>{item.day}</p>
                          <label className="flex gap-2 mt-2">
                            <input
                              type="checkbox"
                              checked={item.closed}
                              onChange={() =>
                                updateSchedule(dayIndex, {
                                  closed: !item.closed,
                                })
                              }
                            />
                            Closed
                          </label>
                          <label
                            key={item.Open24Hours}
                            className="flex text-nowrap items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={item.Open24Hours}
                              onChange={() =>
                                updateSchedule(dayIndex, {
                                  Open24Hours: !item.Open24Hours,
                                })
                              }
                            />
                            Open 24 Hours
                          </label>
                        </div>

                        {!item.closed && (
                          <div className="col-start-2 col-end-4">
                            {item.slots.map((slot, slotIndex) => (
                              <div
                                key={slotIndex}
                                className="flex items-center gap-2 mt-2"
                              >
                                <input
                                  type="time"
                                  className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow"
                                  value={slot.start}
                                  onChange={(e) => {
                                    const slots = [...item.slots];
                                    slots[slotIndex].start = e.target.value;
                                    updateSchedule(dayIndex, { slots });
                                  }}
                                />
                                <input
                                  type="time"
                                  className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow"
                                  value={slot.end}
                                  onChange={(e) => {
                                    const slots = [...item.slots];
                                    slots[slotIndex].end = e.target.value;
                                    updateSchedule(dayIndex, { slots });
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateSchedule(dayIndex, {
                                      slots: item.slots.filter(
                                        (_, i) => i !== slotIndex
                                      ),
                                    })
                                  }
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              className="py-2"
                              onClick={() =>
                                updateSchedule(dayIndex, {
                                  slots: [
                                    ...item.slots,
                                    { start: "", end: "" },
                                  ],
                                })
                              }
                            >
                              <FaPlusCircle />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-8 border-b">
              <div className="py-8 border-b">
                <div className="grid lg:grid-cols-3 gap-2 max-w-[1000px]">
                  <div>
                    <p className="text-sm font-semibold">
                      Special Hours of Operation
                    </p>
                    <p className="text-[#535862] text-sm">
                      This is to show your hours around holidays. This will be
                      publicly displayed.
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <div>
                      {specialSchedule.map((item, dayIndex) => (
                        <div
                          key={item.day}
                          className="mb-4 md:grid grid-cols-3 gap-2 w-full"
                          style={{ display: item.closed ? "none" : "grid" }}
                        >
                          <div className="sm:col-start-1 md:col-start-2 sm:col-end-2 w-full">
                            <div className="flex  md:flex-row sm:flex-row lg:flex-row gap-12 lg:gap-1   ">
                              <div className="w-full">
                                <input
                                  type="text"
                                  className="border border-[#D5D7DA] p-3 rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none   w-[150px] lg:w-[200px] "
                                  placeholder="list holiday"
                                  value={item.text}
                                  onChange={(e) =>
                                    updatespecialSchedule(dayIndex, {
                                      text: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="w-full">
                                <input
                                  type="date"
                                  className="border border-[#D5D7DA] p-3 rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none w-[150px] sm:w-full lg:w-[200px] "
                                  value={item.date}
                                  onChange={(e) =>
                                    updatespecialSchedule(dayIndex, {
                                      date: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <button
                                type="button"
                                className="text-gray-700 sm:w-auto flex-shrink-0"
                                onClick={() => deleteSlot(dayIndex)}
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <div className="flex justify-between items-center gap-4 mt-2 w-full">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={item.closed}
                                  onChange={() => closeSpecificData(dayIndex)}
                                />
                                Closed
                              </label>
                              <label
                                key={dayIndex}
                                className="flex text-nowrap items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={item.Open24Hours}
                                  onChange={() =>
                                    updatespecialSchedule(dayIndex, {
                                      Open24Hours: !item.Open24Hours, // Toggling the value when clicked
                                    })
                                  }
                                />
                                Open 24 Hours
                              </label>
                            </div>

                            {item.hour?.map((slot, slotIndex) => (
                              <div
                                key={slotIndex}
                                className="flex w-full items-center lg:gap-4 gap-10 mt-2"
                              >
                                <div className="w-full">
                                  <input
                                    type="time"
                                    className="border border-[#D5D7DA] p-3 rounded-[8px]  w-[150px] sm:w-full lg:w-[200px] shadow"
                                    value={slot.start}
                                    onChange={(e) => {
                                      const slots = [...item.hour];
                                      slots[slotIndex].start = e.target.value;
                                      updatespecialSchedule(dayIndex, {
                                        slots,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="w-full">
                                  <input
                                    type="time"
                                    className="border border-[#D5D7DA] p-3 rounded-[8px] w-[150px] sm:w-full lg:w-[200px] shadow"
                                    value={slot.end}
                                    onChange={(e) => {
                                      const slots = [...item.hour];
                                      slots[slotIndex].end = e.target.value;
                                      updatespecialSchedule(dayIndex, {
                                        slots,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            ))}

                            <div className="flex gap-3 mt-2 w-full">
                              <button
                                type="button"
                                className="py-2 sm:w-auto"
                                onClick={addNewEntry}
                              >
                                <FaPlusCircle />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
                defaultValue={userId?.id ? `${userId?.id}` : "0"}
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
                {loading ? "Saving..." : " Save  & Next"}
              </button>
            </div>
          </div>
        </form>
      
    </div>
  );
};

export default CertificationHour;
