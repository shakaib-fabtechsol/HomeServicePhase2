import React from "react";
import { useCertificationHour } from "./useCertificationHour";
import Loader from "../../../../Components/MUI/Loader";
import SettingsPreview from "../../../../Components/MUI/SettingsPreview";
import { FaTrash, FaPlusCircle } from "react-icons/fa";

const CertificationHourModule = ({ handleTabChange }) => {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    handleReset,
    handleFileChange,
    onSubmit,
    schedule,
    specialSchedule,
    updateSchedule,
    updatespecialSchedule,
    closeSpecificData,
    deleteSlot,
    addNewEntry,
  } = useCertificationHour({ handleTabChange });

  if (isLoading) return <Loader />;

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
                  {...register("insurance_certificate")}
                />
                {errors.insurance_certificate && (
                  <p className="text-red-500 text-sm mt-1">{errors.insurance_certificate.message}</p>
                )}
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
                  {...register("license_certificate")}
                />
                {errors.license_certificate && (
                  <p className="text-red-500 text-sm mt-1">{errors.license_certificate.message}</p>
                )}
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
                  {...register("award_certificate")}
                />
              </div>
            </div>
          </div>

          {/* Regular Hours of Operation */}
          <div className="py-8 border-b">
            <div className="grid lg:grid-cols-3 gap-2 max-w-[1000px]">
              <div>
                <p className="text-sm font-semibold">
                  Regular Hours of Operation
                </p>
              </div>
              <div className="sm:col-span-2">
                {schedule.map((item, dayIndex) => (
                  <div key={item.day} className="mb-4 md:grid grid-cols-3 gap-2">
                    <div>
                      <p>{item.day}</p>
                      <label className="flex gap-2 mt-2">
                        <input
                          type="checkbox"
                          checked={item.closed}
                          onChange={() => updateSchedule(dayIndex, { closed: !item.closed })}
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
                          <div key={slotIndex} className="flex items-center gap-2 mt-2">
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
                              onClick={() => updateSchedule(dayIndex, {
                                slots: item.slots.filter((_, i) => i !== slotIndex),
                              })}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="py-2"
                          onClick={() => updateSchedule(dayIndex, {
                            slots: [...item.slots, { start: "", end: "" }],
                          })}
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

          {/* Special Hours of Operation */}
          <div className="py-8 border-b">
            <div className="grid lg:grid-cols-3 gap-2 max-w-[1000px]">
              <div>
                <p className="text-sm font-semibold">Special Hours of Operation</p>
                <p className="text-[#535862] text-sm">
                  This is to show your hours around holidays. This will be publicly displayed.
                </p>
              </div>
              <div className="sm:col-span-2">
                <div>
                  {specialSchedule.map((item, dayIndex) => (
                    <div key={dayIndex} className="mb-4 grid md:grid-cols-3">
                      <div className="md:col-start-2 md:col-end-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              className="border border-[#D5D7DA] p-3 rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none w-full"
                              placeholder="List holiday"
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
                          <label className="flex text-nowrap items-center gap-2">
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

                        {!item.closed && !item.Open24Hours && item.hour?.map((slot, slotIndex) => (
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
                                  slots[slotIndex] = {
                                    ...slots[slotIndex],
                                    start: e.target.value
                                  };
                                  updatespecialSchedule(dayIndex, {
                                    hour: slots,
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
                                  slots[slotIndex] = {
                                    ...slots[slotIndex],
                                    end: e.target.value
                                  };
                                  updatespecialSchedule(dayIndex, {
                                    hour: slots,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        ))}

                        {!item.closed && !item.Open24Hours && (
                          <div className="flex gap-3 mt-2 w-full">
                            <button
                              type="button"
                              className="py-2 sm:w-auto"
                              onClick={() => updatespecialSchedule(dayIndex, {
                                hour: [...item.hour, { start: "", end: "" }]
                              })}
                            >
                              <FaPlusCircle />
                            </button>
                          </div>
                        )}
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
              onClick={handleReset}
              className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
              onClick={() => handleSubmit((data) => onSubmit(data, true))}
            >
              Save & Publish
            </button>
            <button
              type="submit"
              className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CertificationHourModule;
