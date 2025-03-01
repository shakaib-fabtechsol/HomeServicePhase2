import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FiSearch } from "react-icons/fi";
import { LuEye, LuPlus } from "react-icons/lu";
import { SlPencil } from "react-icons/sl";
import { HiOutlineTrash } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import InviteSRmodal from "../../Components/SuperAdmin/InviteSRmodal";
import { useGetsalesQuery } from "../../services/sales";
import Loader from "../../Components/MUI/Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Sales() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading: loading, isError } = useGetsalesQuery();
  useEffect(() => {
    document.title = "Sales Reps";
  }, []);

  const [addtaskopen, setaddtaskOpen] = React.useState(false);
  const handleaddtaskOpen = () => setaddtaskOpen(true);
  const handleaddtaskClose = () => setaddtaskOpen(false);


  const filteredData = data?.GetSaleRep?.filter((provider) =>
  
    provider?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    provider?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    provider?.phone?.toLowerCase()?.includes(searchTerm?.toLowerCase()) 
  );

  const [checkedRows, setCheckedRows] = useState(
    new Array(filteredData?.length).fill(false)
  );

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedRows(new Array(filteredData?.length).fill(isChecked));
  };

  const handleRowChange = (index) => (event) => {
    const newCheckedRows = [...checkedRows];
    newCheckedRows[index] = event.target.checked;
    setCheckedRows(newCheckedRows);
  };

  const isAllChecked = checkedRows.every(Boolean);
  const isIndeterminate =
    checkedRows.some(Boolean) && !checkedRows.every(Boolean);

  const tableheader = [
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
    "Sales Rep ID",
    "Sales Rep Name",
    "Email",
    "Phone",
    "Action",
  ];

  const tablebody = filteredData?.map((provider, index) => [
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
    provider.id,
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <img
        className="size-10 max-w-10 rounded-full object-cover bg-[#CFCFCF33]"
        src={`${BASE_URL}/uploads/${provider?.personal_image}`} 
        alt={provider.name}
      />
      <p>{provider.name}</p>
    </div>,
    provider.email,
    provider.phone,
    <div className="flex items-center gap-2">
      <Link to="/superadmin/salesrepd">
        <LuEye className="text-[20px]" />
      </Link>
      <Link to="/superadmin/editsalesrep">
        <SlPencil className="text-[20px]" />
      </Link>
      <button>
        <HiOutlineTrash className="text-[20px]" />
      </button>
    </div>,
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isError) {
    return (
      <div className="error">
        <p>Error loading sales. Please try again.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Sales</h2>
        <p className="text-gray-600">Track and manage your sales rep.</p>
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
              name="search"
              id="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </label>
          <div className="ms-auto">
            <button
              onClick={handleaddtaskOpen}
              className="text-white bg-[#0F91D2] border border-[#0F91D2] font-semibold text-sm flex items-center gap-2 py-2 px-4 rounded-[8px]"
            >
              <LuPlus className="text-lg" />
              <span>Invite Sales Rep</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Table headers={tableheader} rows={tablebody} />
      </div>
      <Modal
        open={addtaskopen}
        onClose={handleaddtaskClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[400px] -translate-y-1/2 outline-none">
          <InviteSRmodal close={handleaddtaskClose} />
        </div>
      </Modal>
    </div>
  );
}

