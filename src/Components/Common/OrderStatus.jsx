function OrderStatus({ status }) {
  return (
    <p
      className={`inline text-xs capitalize py-1 px-2 rounded-[4px] ${
        status === "new"
          ? "bg-[#0F91D21A]  text-[#0F91D2]"
          : status === "scheduled"
            ? "bg-[#D20F8A1A]  text-[#D20F8A]"
            : status === "in progress"
              ? "bg-[#FB86031A]  text-[#FB8603]"
              : status === "completed"
                ? "bg-[#4CB53C1A]  text-[#4CB53C]"
                : status === "delivered"
                  ? "bg-[#0000FF1A]  text-[#0000FF]"
                  : status === "pending"
                    ? "bg-[#FFA5001A]  text-[#FFA500]"
                    : ""
      }`}
    >
      {status}
    </p>
  );
}

export default OrderStatus;
