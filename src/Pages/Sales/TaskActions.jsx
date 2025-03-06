import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { FaEllipsisH, FaEdit, FaTrash } from "react-icons/fa";

export default function TaskActions({onEditClick,task,onDeleteClick}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = React.useCallback((event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }, [anchorEl]);

  const handleClickAway = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        <FaEllipsisH />
      </button>
      <Popper placement="bottom" id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box className="border p-3 bg-white rounded-lg">
            <button onClick={onEditClick.bind(null,task)} className="flex items-center  mb-2 w-full py-2 px-6 bg-gray-100 hover:bg-gray-200 rounded">
              <FaEdit className="mr-2" /> Edit
            </button>
            <button onClick={onDeleteClick.bind(null,task)} className="flex items-center w-full py-2 px-6 bg-gray-100 hover:bg-gray-200 rounded">
              <FaTrash className="mr-2" /> Delete
            </button>
          </Box>
        </ClickAwayListener>
      </Popper>
    </div>
  );
}
