import React from 'react'

function RegularHour() {
        const schedule = [
          { day: "Monday", time: "05:50 - 05:50" },
          { day: "Tuesday", time: "04:50 - 06:50" },
          { day: "Wednesday", time: "04:50 - 05:50" },
          { day: "Thursday", time: "04:50 - 05:50" },
          { day: "Friday", time: "04:50 - 05:50" },
          { day: "Saturday", time: "06:50 - 08:50" },
          { day: "Sunday", time: "-" },
        ];
      
        return (
          <div >
            <h2 className="text-xl font-bold mb-4">Weekly Schedule</h2>
            {schedule.map((item, index) => (
              <div key={index} className="py-5 border-b border-[#E9EAEB]">
                <div className="flex items-center flex-wrap gap-3 justify-between py-3 px-4 bg-[#FAFAFA] min-h-[60px] rounded-[8px]">
                  <div className="flex gap-3 items-center">
                    <p className="font-medium text-[#343434]">{item.day}</p>
                  </div>
                  <div className="ms-auto text-right">
                    <p className="font-semibold">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
}

export default RegularHour
