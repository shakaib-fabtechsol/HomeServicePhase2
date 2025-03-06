import React from "react";
import Table from "../../Table.jsx";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FiSearch, FiEdit } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { useGetAllSupportTicketsQuery } from "../../../services/customer-support/index.js";
import LoadingSpinner from "../LoadingSpinner.jsx";
import RemoteError from "../RemoteError.jsx";
import { getImageUrl } from "../../../utils/index.js";
import SupportTicketStatus from "../SupportTicketStatus.jsx";
import { getRoleName } from "../../../config/routeConfig.js";
import UpdateSupportTicket from "./UpdateSupportTicket.jsx";

export default function CommonSupportData() {
  const [selectedTicket, setSelectedTicket] = React.useState(null);

  const { data, isFetching, isError, error } = useGetAllSupportTicketsQuery();
  const [checkedRows, setCheckedRows] = React.useState(
    new Array(data?.GetSupport?.length).fill(false)
  );
  const handleTicketSelect = React.useCallback((ticketData) => setSelectedTicket(ticketData), []);
  const clearTicketSelect = React.useCallback(() => setSelectedTicket(null), []);

  React.useEffect(() => {
    document.title = "Support";
  }, []);

  if (isFetching) return <LoadingSpinner />;
  if (isError)
    return <RemoteError hasError={isError} message={error?.message} />;

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedRows(new Array(data?.GetSupport?.length).fill(isChecked));
  };

  const handleRowChange = (index) => (event) => {
    const newCheckedRows = [...checkedRows];
    newCheckedRows[index] = event.target.checked;
    setCheckedRows(newCheckedRows);
  };

  const isAllChecked = checkedRows.every(Boolean);
  const isIndeterminate =
    checkedRows.some(Boolean) && !checkedRows.every(Boolean);

  const tableHeader = [
    <FormControlLabel
      key="parent-checkbox"
      control={
        <Checkbox
          sx={{
            color: "#34A853",
            "&.Mui-checked": {
              color: "#34A853",
            },
            "&.MuiCheckbox-indeterminate": {
              color: "#34A853",
            },
            py: 0,
          }}
          checked={isAllChecked}
          indeterminate={isIndeterminate}
          onChange={handleParentChange}
        />
      }
    />,
    "ID",
    "Name",
    "Email",
    "Role",
    "Subject",
    "Message",
    "Status",
    "Action",
  ];

  const tableBody = data?.GetSupport?.map((ticketDetails, index) => [
    <FormControlLabel
      key={`checkbox-${index}`}
      control={
        <Checkbox
          sx={{
            color: "#34A853",
            "&.Mui-checked": {
              color: "#34A853",
            },
            py: 0,
          }}
          checked={checkedRows[index]}
          onChange={handleRowChange(index)}
        />
      }
    />,
    `#ID${ticketDetails.id}`,
    <div className="flex items-center gap-3" key={`name-${index}`}>
      {ticketDetails.personal_image && <img
        className="size-10 max-w-10 rounded-full object-cover bg-[#CFCFCF33]"
        src={getImageUrl(ticketDetails.personal_image)}
        alt={ticketDetails.name}
      />}
      <p>{ticketDetails.name}</p>
    </div>,
    ticketDetails.email,
    getRoleName(ticketDetails.role),
    <p key={ticketDetails.id} className="truncate max-w-[100px]">{ticketDetails.subject}</p>,
    <p key={ticketDetails.id} className="truncate max-w-[100px]">{ticketDetails.message}</p>,
    <SupportTicketStatus status={ticketDetails.status} key={ticketDetails.id} />,
    <button onClick={handleTicketSelect.bind(null, ticketDetails)} key={ticketDetails.id} className="btn btn-success">
      <FiEdit className="text-lg" />
    </button>,
  ]);

  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Support</h2>
        <p className="text-gray-600">Track and manage complaints.</p>
      </div>
      <div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <label
            className="flex items-center border w-full sm:max-w-[300px] rounded-[8px] overflow-hidden"
            htmlFor="search"
          >
            <FiSearch className="ms-2" />
            <input
              className="w-full p-2 outline-none"
              type="search"
              placeholder="Search"
              name="search"
              id="search"
            />
          </label>
          <div className="ms-auto">
            <button className="text-[#16151C] border flex items-center gap-2 py-2 px-4 rounded-[8px]">
              <RiEqualizerLine /> <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Table headers={tableHeader} rows={tableBody} />
      </div>
      <UpdateSupportTicket isOpen={!!selectedTicket?.id} onClose={clearTicketSelect} ticketId={selectedTicket?.id} />
    </div>
  );
}
