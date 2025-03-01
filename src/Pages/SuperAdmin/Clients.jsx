import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useDeleteClientMutation, useGetclientsQuery } from "../../services/clients";
import Loader from "../../Components/MUI/Loader";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import confirmDelete from "../../constants/deleteconfirm";
import Swal from "sweetalert2";
import PaginationComponent from "../../Components/Pagination";
const BASE_URL = import.meta.env.VITE_BASE_URL
export default function Clients() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: clientsdata, isLoading: loading, isError: error, isFetching } = useGetclientsQuery({ page: page + 1, providers: rowsPerPage, search: search });
  const [deletecustomer, { isLoading: deleting, isError }] = useDeleteClientMutation();
  const [checkedRows, setCheckedRows] = useState(new Array(clientsdata?.Customers?.data?.length).fill(false));

  const handleChangePage = (event, newPage) => {

    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event, newPage) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0)

  };

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedRows(new Array(clientsdata?.Customers?.data?.length).fill(isChecked));
  };

  const handleRowChange = (index) => (event) => {
    const newCheckedRows = [...checkedRows];
    newCheckedRows[index] = event.target.checked;
    setCheckedRows(newCheckedRows);
  };

  console.log(clientsdata)

  const isAllChecked = checkedRows.every(Boolean);
  const isIndeterminate = checkedRows.some(Boolean) && !checkedRows.every(Boolean);
  console.log(clientsdata, "this is client data")


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
    "Client ID",
    "Client Name",
    "Email",
    "Phone",
    "Address",
    "Action",
  ];
  const handleDelete = async (id) => {
    try {
      const response = await deletecustomer(id).unwrap();
      Swal.fire("Deleted!", "Customer has been deleted.", "success").then(() => {
        navigate("/superadmin/clients");
      });

    } catch (error) {
      Swal.fire("Error", "Failed to delete customer. Please try again.", "error").then(() => {
        navigate("/superadmin/clients");
      });
    }
  };


  const tablebody = clientsdata?.Customers?.data?.map((provider, index) => [
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
        src={`${BASE_URL}/uploads/${provider?.personal_image}`} // Replace with your image URL or path provider?.personal_image}
        alt={provider?.name}
      />
      <p>{provider?.name}</p>
    </div>,
    provider?.email,
    provider?.phone,
    provider?.location || "N/A",
    <div className="flex items-center gap-2">

      <LuEye className="text-[20px]" onClick={() => {
        navigate(`/superadmin/clientprofile`, { state: { id: provider?.id } });
      }} />


      <SlPencil className="text-[20px]" onClick={() => {
        navigate(`/superadmin/editclient`, { state: { id: provider?.id } });
      }} />

      <HiOutlineTrash onClick={() => {
        confirmDelete("Client").then((result) => {
          if (result && provider?.id) {
            handleDelete(provider?.id);
            navigate(`/superadmin/clients`, { state: { id: provider?.id } });
          }
        })
      }}
        className="text-[20px]" />

    </div>,
  ]);



  if (error) {
    return (
      <div className="error text-center flex items-center justify-center h-screen">
        <p>Error loading clients. Please try again.</p>
      </div>
    );
  }




  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Clients</h2>
        <p className="text-gray-600">Track and manage your clients.</p>
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
        {isFetching || loading || deleting ? <Loader /> : <Table headers={tableheader} rows={tablebody} />}

        <PaginationComponent
          count={clientsdata?.total_customers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

