import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import SettingsPreview from "../MUI/SettingsPreview";
import { useAddCertificateHoursMutation, usePublishMutation } from "../../services/settings";
import { setUser } from "../../redux/reducers/authSlice";
import Loader from "../MUI/Loader";
const CertificationHour = ({handleTabChange}) => {
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [addCertificationHours, { isLoading }] = useAddCertificateHoursMutation();
  const [publishCertificationHours] = usePublishMutation();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    mode: "onChange",
    defaultValues: {
      insurance_certificate: userData?.businessProfile?.insurance_certificate,
      license_certificate: userData?.businessProfile?.license_certificate,
      award_certificate: userData?.businessProfile?.award_certificate,
      regular_hour: userData?.businessProfile?.regular_hour && JSON.parse(userData?.businessProfile?.regular_hour) || userData?.businessProfile?.regular_hour,
      special_hour: userData.businessProfile?.special_hour && JSON.parse(userData.businessProfile?.special_hour) || userData.businessProfile?.special_hour
    }
  });

  const [formData, setFormData] = useState({
    insurance_certificate: null,
    license_certificate: null,
    award_certificate: null
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [schedule, setSchedule] = useState(
    userData.businessProfile?.regular_hour && JSON.parse(userData.businessProfile?.regular_hour) || userData.businessProfile?.regular_hour ? JSON.parse(userData.businessProfile?.regular_hour) : days.map((day) => ({
      day,
      closed: false,
      slots: [{ start: "", end: "" }],
    }))
  );

  // Validation function for time slots
  const validateTimeSlots = (slots) => {
    return slots.every(slot => slot.start && slot.end && slot.start < slot.end);
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5242880) { // 5MB limit
        Swal.fire({
          icon: 'error',
          title: 'File too large',
          text: 'File size should not exceed 5MB'
        });
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const onSubmit = async () => {
    try {
      console.log("formData",formData)
      // Validate regular hours
      const invalidDays = schedule.filter(day => 
        !day.closed && !validateTimeSlots(day.slots)
      );


      const formDataToSend = new FormData();
      formDataToSend.append('user_id', userData.id);
      
      // Append certificates
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append schedules
      formDataToSend.append('regular_hour', JSON.stringify(schedule));
      formDataToSend.append('special_hour', JSON.stringify(specialSchedule));

      const response = await addCertificationHours(formDataToSend);
      if (response?.data) {
        
        // dispatch(setUser(payload));
        handleTabChange(4);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Certification and hours updated successfully',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.message || 'Something went wrong while updating'
      });
    }
  };

  const updateSchedule = (dayIndex, newValues) => {
    setSchedule((prev) =>
      prev.map((item, index) =>
        index === dayIndex ? { ...item, ...newValues } : item
      )
    );
  };

  const [specialSchedule, setSpecialSchedule] = useState(
    userData.special_hour && JSON.parse(userData.special_hour) || userData.special_hour ? JSON.parse(userData.special_hour) : [
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

  console.log("userData.........",userData)

  if(isLoading){
    return <Loader/>
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  existingImage={watch("insurance_certificate")}
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
                  existingImage={watch("license_certificate")}
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
                  existingImage={watch("award_certificate")}
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
                              updateSchedule(dayIndex, { closed: !item.closed })
                            }
                          />
                          Closed
                        </label>
                        <label className="flex gap-2 mt-2">
                          <input type="checkbox" />
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
                                slots: [...item.slots, { start: "", end: "" }],
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
                    <div key={item.day} className="mb-4 grid md:grid-cols-3">
                      <div className="md:col-start-2 md:col-end-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              className="border border-[#D5D7DA] p-3 rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none w-full"
                              placeholder="list holiday"
                              value={item.text}
                              onChange={(e) =>
                                updatespecialSchedule(dayIndex, {
                                  text: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="date"
                              className="border border-[#D5D7DA] p-3 rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none w-[calc(100%-25px)]"
                              value={item.date}
                              onChange={(e) =>
                                updatespecialSchedule(dayIndex, {
                                  date: e.target.value,
                                })
                              }
                            />
                            <button
                              type="button"
                              className="text-gray-700 sm:w-auto flex-shrink-0"
                              onClick={() => deleteSlot(dayIndex)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 w-full">
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
                                  Open24Hours: !item.Open24Hours,
                                })
                              }
                            />
                            Open 24 Hours
                          </label>
                        </div>
                        {item.hour?.map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className="grid grid-cols-2 gap-4 mt-2"
                          >
                            <div>
                              <input
                                type="time"
                                className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow"
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
                            <div>
                              <input
                                type="time"
                                className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow"
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

export default CertificationHour;
