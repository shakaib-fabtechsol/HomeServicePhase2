import React from 'react'

const SpecialHour = () => {
    const SpecialHours = [
        { Dates: "24 Dec 2025", time: "9AM - 5PM", dayName: "Chrismas Eve" },
        { Dates: "25 Dec 2025", time: "9AM - 5PM", dayName: "Christmas" },
      ];
    return (
        <div>
            <div>
                {SpecialHours.map((row, index) => (
                    <div key={index} className="py-5 border-b border-[#E9EAEB]">
                        <div className="flex items-center flex-wrap gap-3 justify-between py-3 px-4 bg-[#FAFAFA] min-h-[60px] rounded-[8px]">
                            <div className="flex gap-3 items-center">
                                <div>
                                    <p className="font-medium text-[#343434]">
                                        {row.Dates}
                                    </p>
                                </div>
                            </div>
                            <div className="ms-auto">
                                <p>{row.dayName}</p>
                                <p>{row.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SpecialHour