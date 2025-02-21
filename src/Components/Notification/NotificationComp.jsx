import React from "react";

export default function NotificationComp({ data }) {
  return (
    <div>
      {data.map((notification, index) => (
        <div
          key={index}
          className={`flex gap-1 justify-between flex-wrap-reverse p-3 border-b border-[#F2F4F5] ${
            notification.status === "unread" ? "bg-[#F6AD3C1A]" : ""
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <div>
              <img
                src={notification.avatar}
                alt=""
                className="size-12 max-w-12 rounded-full"
              />
            </div>
            <div className="w-[calc(100%-60px)]">
              <div className="flex items-center space-x-2 w-full">
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-black truncate w-[100px]">
                  {notification.Name}
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-extralight text-[#535862] truncate w-[calc(100%-100px)]">
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
          <div className="ms-auto">
            <p className="text-[#535862] text-[10px] sm:text-xs">
              {`${notification.date} ${notification.time}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
