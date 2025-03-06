import React, { useState, useEffect } from "react";
import { useGetMyDetailsQuery } from "../../services/settings";

function RegularHour() {
  const { data: userData, isLoading } = useGetMyDetailsQuery();
  const [formData, setFormData] = useState(null);
  const [regularHours, setRegularHours] = useState([]);

  useEffect(() => {
    if (userData) {
      setFormData(userData?.businessProfile?.[0]?.special_hour);

      let formattedScheduleRegular = [];
      const regularHourData = userData?.businessProfile?.[0]?.regular_hour;
      if (regularHourData) {
        formattedScheduleRegular =
          typeof regularHourData === "string"
            ? JSON.parse(regularHourData)
            : regularHourData;
      }
      console.log("Formatted Schedule Regular:", formattedScheduleRegular);

      const transformedScheduleRegular = formattedScheduleRegular.map((item) => ({
        dayName: item.day_name,
        dayStatus: item.day_status,
        regularHour: item.regular_hour,
      }));

      console.log("Transformed Schedule Regular:", transformedScheduleRegular);
      setRegularHours(transformedScheduleRegular);
    }
  }, [userData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {regularHours.length > 0 ? (
        regularHours.map((row, index) => (
          <div key={index} className="py-5 border-b border-[#E9EAEB]">
            <div className="flex items-center flex-wrap gap-3 justify-between py-3 px-4 bg-[#FAFAFA] min-h-[60px] rounded-[8px]">
              <div className="flex gap-3 items-center">
                <p className="font-medium text-[#343434]">{row.dayName}</p>
              </div>
              <div className="ms-auto text-right">
                {row.dayStatus === "open" ? (
                  <div>
                    {row?.regularHour?.map((hour, index) => (
                      <p key={index} className="font-semibold">
                        {hour.start_time} - {hour.end_time}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="font-semibold">Closed</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No regular hours available.</p>
      )}
    </>
  );
}

export default RegularHour;
