function SupportTicketStatus({ status }) {
  return (
    <p
      className={`inline text-xs capitalize py-1 px-2 rounded-[4px] ${
        status === "progress" ? "bg-[#FB86031A] text-[#FB8603]" 
        : status === "resolved" ? "bg-[#4CB53C1A] text-[#4CB53C]" 
        : "bg-[#FBBF241A] text-[#FBBF24]"
      }`}
    >
      {status}
    </p>
  );
}

export default SupportTicketStatus;
