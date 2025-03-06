import React from "react";

function RegularHour({ regular_hour }) {

  const regularHourArray = JSON.parse(regular_hour);
  console.log(regularHourArray, "this is regular Hour Array")


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Weekly Schedule</h2>
      {regularHourArray?.map((item, index) => (
        <div key={index} className="py-5 border-b border-[#E9EAEB]">
          <div className="flex items-center flex-wrap gap-3 justify-between py-3 px-4 bg-[#FAFAFA] min-h-[60px] rounded-[8px]">
            <div className="flex gap-3 items-center">
              <p className="font-medium text-[#343434]">{item.day_name}</p>
            </div>
            {item?.regular_hour?.map((item) => {
              return <div className="ms-auto text-right">
                <p className="font-semibold">{item?.start_time} - {item?.end_time}</p>
              </div>

            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RegularHour;
