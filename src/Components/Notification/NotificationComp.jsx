import React from "react";

export default function NotificationComp({ data }) {
  return (
    <div>
      {data.map((notification, index) => (
        <div
          key={index}
          className={`md:flex gap-1 justify-between  p-3 border-b border-[#F2F4F5] ${
            notification.status === "unread" ? "bg-[#F6AD3C1A]" : ""
          }`}
        >
          <div className="flex w-full items-center gap-2 ">
            <div>
              <img
                src={notification.avatar}
                alt=""
                className="size-12 max-w-12 rounded-full"
              />
            </div>
            <div className="">
              <div className="sm:flex items-center ">
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-black  w-[140px]">
                  {notification.Name}
                </p>
                <p className="text-sm notification-text sm:text-base lg:text-lg font-extralight text-[#535862] sm:w-[calc(100%-100px)] 
                 ">
                  {`${notification.task}: ${notification.comment}`}
                </p>
              </div>
              {notification.task === "message you" && (
                <button className="text-[#0F91D2] bg-[#0F91D21A] p-1 rounded-[5px] font-semibold text-sm mt-1">
                  Replay
                </button>
              )}
            </div>
          </div>
          <div className="md:max-w-[140px] text-end w-full">
            <p className="text-[#535862] text-[10px] sm:text-xs">
              {`${notification.date} ${notification.time}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
