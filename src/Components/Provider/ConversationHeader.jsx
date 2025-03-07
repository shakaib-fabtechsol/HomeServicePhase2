import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";

function ConversationHeader({ title, subtitle, backLink, comName , exportToJson }) {
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {comName !== "chat" && (
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
                placeholder="Search"
                id="search"
              />
            </label>
            <div className="ms-auto flex items-center gap-3">
              <button   onClick={exportToJson} className="text-[#0F91D2] border border-[#0F91D2] flex items-center gap-2 py-2 px-4 rounded-[8px]">
                <MdOutlineFileDownload />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConversationHeader;
