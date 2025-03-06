import React, { useState } from "react";
import Table from "../../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { LuFlag } from "react-icons/lu";
import RemoteError from "../../Common/RemoteError";
import PaginationComponent from "../../Pagination";
import { useGetassignedsaleProviderQuery } from "../../../services/serviceprovider";
import Loader from "../../MUI/Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL
import camera from "../../../assets/img/userprofile.png";
import { useNavigate } from "react-router-dom";
export default function Assigned() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, isLoading, isError, error, isFetching } = useGetassignedsaleProviderQuery({ page: page + 1, providers: rowsPerPage, search: search });


  const [checkedRows, setCheckedRows] = useState(
    new Array(data?.assignProviders?.data.length).fill(false)
  );

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedRows(new Array(data?.assignProviders?.data.length).fill(isChecked));
  };

  const handleRowChange = (index) => (event) => {
    const newCheckedRows = [...checkedRows];
    newCheckedRows[index] = event.target.checked;
    setCheckedRows(newCheckedRows);
  };

  const isAllChecked = checkedRows.every(Boolean);
  const isIndeterminate =
    checkedRows.some(Boolean) && !checkedRows.every(Boolean);


  const handleChangePage = (event, newPage) => {

    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event, newPage) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0)

  };


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
    "Service Provider",
    "Email",
    "Phone",
    "Number of Services",

    "Rating",
    "Action",
  ];

  const tablebody = data?.assignProviders?.data?.map((provider, index) => [
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
        src={provider?.personal_image ? `${BASE_URL}/uploads/${provider?.personal_image}` : camera}
        alt={provider?.name}
      />
      <p>{provider.name}</p>
    </div>,
    provider.email,
    provider.phone,
    provider?.total_deals,
    provider.rating || 0,
    <div className="flex items-center gap-2">
      <IoEyeOutline onClick={() => {
        navigate("/sales/prodetails", { state: { Id: provider?.id } })
      }} />


      <CiEdit onClick={() => {
        
        navigate("/sales/editpros", { state: { Id: provider?.id } })
      }} />
      <Link className="text-xl">
        <LuFlag />
      </Link>
    </div>,
  ]);


  if (isError) {

    <RemoteError hasError={isError} message={error?.message} />
  }


  return (
    <div>
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
              onChange={(e) => {
                setSearch(e.target.value)

              }}
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
          count={data?.totalAssignProviders}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
