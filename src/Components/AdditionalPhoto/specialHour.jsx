import React, { useState, useEffect } from "react";
import { useGetMyDetailsQuery } from "../../services/settings";

const SpecialHour = () => {
  const { data: userData, isLoading } = useGetMyDetailsQuery();
  const [formData, setFormData] = useState(null);
  const [specialHours, setSpecialHours] = useState([]);

  useEffect(() => {
    if (userData) {
      try {
        setFormData(userData?.businessProfile?.[0]?.special_hour);
        let formattedScheduleSpecial = [];
        if (userData?.businessProfile?.[0]?.special_hour) {
          formattedScheduleSpecial =
            typeof userData.businessProfile[0].special_hour === "string"
              ? JSON.parse(userData.businessProfile[0].special_hour)
              : userData.businessProfile[0].special_hour;
        }
        console.log("Formatted Schedule Special:", formattedScheduleSpecial);

        const transformedScheduleSpecial = formattedScheduleSpecial.map((item) => ({
          dayName: item.text,
          time: item.date || "",
          closed: item.closed === "closed",
          is247Open: item.is247Open === "true",
        }));
        console.log("Transformed Schedule Special:", transformedScheduleSpecial);
        setSpecialHours(transformedScheduleSpecial);
      } catch (error) {
        console.error("Error processing special hours:", error);
      }
    }
  }, [userData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {specialHours.length > 0 ? (
        specialHours.map((row, index) => (
          <div key={index} className="py-5 border-b border-[#E9EAEB]">
            <div className="flex items-center flex-wrap gap-3 justify-between py-3 px-4 bg-[#FAFAFA] min-h-[60px] rounded-[8px]">
              <div className="flex gap-3 items-center">
                <p className="font-medium text-[#343434]">{row.dayName}</p>
              </div>
              <div className="ms-auto">
                <p>{row.time}</p>
                {row.closed && <p>Closed</p>}
                {row.is247Open && <p>Open 24/7</p>}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No special hours available.</p>
      )}
    </div>
  );
};

export default SpecialHour;
