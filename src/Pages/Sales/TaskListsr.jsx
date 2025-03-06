import * as React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { LuBellRing, LuCalendarDays } from "react-icons/lu";
import AddTaskModal from "../../Components/Sales/AddTaskModal";
import { useEffect, useState } from "react";
import { useGettasksQuery } from "../../services/salesrep";
import Loader from "../../Components/MUI/Loader";

export default function TaskListsr() {
  const { data, isLoading, isError } = useGettasksQuery();
  const [addtaskopen, setaddtaskOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const handleaddtaskOpen = () => setaddtaskOpen(true);
  const handleaddtaskClose = () => setaddtaskOpen(false);

  const pendingtask =
    search.trim() === ""
      ? data?.task?.filter((item) => item?.status === "pending")
      : data?.task?.filter(
        (item) => 
          item?.status === "pending" && item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.status === "pending" && item?.description?.toLowerCase().includes(search.toLowerCase())
      );

  const completed =
    search.trim() === ""
      ? data?.task?.filter((item) => item?.status === "completed")
      : data?.task?.filter(
        (item) =>
           (item?.status === "completed" && item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.status === "completed" && item?.description?.toLowerCase().includes(search.toLowerCase()))
      );

  const totalprogress = pendingtask?.length;
  const totalcompleted = completed?.length;

  useEffect(() => {
    document.title = "TaskList";
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div>
        <p className="text-center">failed to fetch tasks</p>
      </div>
    );
  }

  return (
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
          <button
            onClick={handleaddtaskOpen}
            className="text-white bg-[#0F91D2] border border-[#0F91D2] flex items-center gap-2 py-2 px-4 rounded-[8px] text-sm font-semibold"
          >
            <FaPlus /> <span>Add Task</span>
          </button>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-3 border border-[#D5D7DA] rounded-[9px] sm:min-h-[calc(100dvh-235px)] lg:col-span-2">
          <div className="flex gap-3 items-center border-b-[3px] border-[#FFA500] pb-3">
            <div className="flex items-center gap-2">
              <GoDotFill className="text-[#FFA500]" />
              <p className="text-sm font-bold">On Progress</p>
            </div>
            <div className="size-5 bg-[#E0E0E0] flex justify-center items-center rounded-full">
              <p className="text-[10px] leading-none text-[#625F6D]">
                {totalprogress}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
            {pendingtask?.map((task, index) => (
              <div key={index} className="p-3 bg-[#F9F9F9] rounded-[10px]">
                <div className="flex items-center gap-2 justify-between">
                  <p className="text-[#0D062D] font-semibold">{task?.name}</p>
                  <button>
                    <FaEllipsisH />
                  </button>
                </div>
                <p className="text-xs text-[#787486] mt-2">{task?.description}</p>
                <div className="flex gap-2 justify-between mt-3 flex-wrap">
                  <p className="bg-[#FFA50026] text-[#FFA500] text-[10px] font-semibold p-1 rounded-[5px]">
                    {task.status === "pending" ? "On Progress" : task?.status}
                  </p>
                  <div className="flex items-center gap-2 ms-auto">
                    <div className="flex items-center gap-1">
                      <LuBellRing className="text-[#787486]" />
                      <p className="text-[#787486] text-[10px] font-medium">
                        {new Date(task?.due_datetime)?.toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 border border-[#D5D7DA] rounded-[9px] sm:min-h-[calc(100dvh-235px)]">
          <div className="flex gap-3 items-center border-b-[3px] border-[#8BC48A] pb-3">
            <div className="flex items-center gap-2">
              <GoDotFill className="text-[#8BC48A]" />
              <p className="text-sm font-bold">Done</p>
            </div>
            <div className="size-5 bg-[#E0E0E0] flex justify-center items-center rounded-full">
              <p className="text-[10px] leading-none text-[#625F6D]">
                {totalcompleted}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-5 gap-5">
            {completed.map((task, index) => (
              <div key={index} className="p-3 bg-[#F9F9F9] rounded-[10px]">
                <div className="flex items-center gap-2 justify-between">
                  <p className="text-[#0D062D] font-semibold">{task?.name}</p>
                  <button>
                    <FaEllipsisH />
                  </button>
                </div>
                <p className="text-xs text-[#787486] mt-2">{task?.description}</p>
                <div className="flex gap-2 justify-between mt-3 flex-wrap">
                  <p className="bg-[#83C29D33] text-[#68B266] text-[10px] font-semibold p-1 rounded-[5px]">
                    Completed
                  </p>
                  <div className="flex items-center gap-2 ms-auto">
                    <div className="flex items-center gap-1">
                      <LuCalendarDays className="text-[#787486]" />
                      <p className="text-[#787486] text-[10px] font-medium">
                        {new Date(task?.due_datetime)?.toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={addtaskopen}
        onClose={handleaddtaskClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[600px] -translate-y-1/2 outline-none">
          <div className="p-3 rounded-[12px] bg-white">
            <AddTaskModal close={handleaddtaskClose} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

