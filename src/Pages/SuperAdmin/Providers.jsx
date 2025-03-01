import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { SlPencil } from "react-icons/sl";
import BlueSwitch from "../../Components/SuperAdmin/settings/BlueSwitch";
import { useGetprovidersQuery } from "../../services/serviceprovider";
import Loader from "../../Components/MUI/Loader";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../Components/Pagination";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL
export default function Providers() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, isLoading, isFetching,isError} = useGetprovidersQuery({page:page+1,providers:rowsPerPage,search:search});
  useEffect(() => {
    document.title = "Providers";
  }, []);


  const handleChangePage = (event, newPage) => {
   
    setPage(newPage);
   
  };

  const handleChangeRowsPerPage = (event,newPage) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0)
  
  };

  const [checkedRows, setCheckedRows] = useState(
    new Array(data?.serviceProviders?.data?.length).fill(false)
  );

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedRows(new Array(data?.serviceProviders?.data?.length).fill(isChecked));
  };

  const handleRowChange = (index) => (event) => {
    const newCheckedRows = [...checkedRows];
    newCheckedRows[index] = event.target.checked;
    setCheckedRows(newCheckedRows);
  };

  const isAllChecked = checkedRows.every(Boolean);
  const isIndeterminate =
    checkedRows.some(Boolean) && !checkedRows.every(Boolean);





  if(isError){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong. Please try again.",
    });
  }

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
    "Service Provider ID",
    "Service Provider Name & Logo",
    "Email",
    "Phone",
    "Number of Deals",

    "Action",
    "Ban",
  ];

  const tablebody = data?.serviceProviders?.data?.map((provider, index) => [
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
    provider?.id,
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <img
        className="size-10 max-w-10 rounded-full object-cover bg-[#CFCFCF33]"
        src={`${BASE_URL}/uploads/${provider?.personal_image}`} 
        alt={provider?.name}
      />
      <p>{provider?.name}</p>
    </div>,
    provider?.email,
    provider?.phone,
    provider?.total_deals,

    <div className="flex items-center gap-2">

      <LuEye className="text-[20px]" onClick={() => {
        navigate("/superadmin/prodetails", { state: { Id: provider?.id } })
      }} />

      <button>
        <SlPencil className="text-[20px]" />
      </button>
    </div>,
    <div>
      <BlueSwitch />
    </div>,
  ]);
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Providers</h2>
        <p className="text-gray-600">Track and manage your providers.</p>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        {isLoading || isFetching ? <Loader /> : <Table headers={tableheader} rows={tablebody} />}
        <PaginationComponent
         count={data?.totalProviders} 
         page={page}
         rowsPerPage={rowsPerPage}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
