import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import React from "react";
import Swal from "sweetalert2";
import { Modal } from "@mui/material";
import { useUpdateSupportTicketMutation } from "../../../services/customer-support/index.js";

const schema = yup.object().shape({
  status: yup.string().oneOf(["resolved", "progress", "pending"]).required("Status is required"),
});

function UpdateSupportTicket({ isOpen, onClose, ticketId }) {
  const [updateSupportTicket, { isLoading }] = useUpdateSupportTicketMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (data) => {
      try {
        await updateSupportTicket({ status: data.status, id: ticketId }).unwrap();
        onClose()
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "The support ticket has been updated successfully.",
          showConfirmButton: false,
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an issue updating the support ticket. Please try again.",
        });
      }
    },
    [onClose, updateSupportTicket, ticketId]
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ m: 2 }}
    >
      <div className="absolute top-1/2 left-1/2 rounded-[12px] p-4 -translate-x-1/2 bg-white -translate-y-1/2 w-full max-w-[400px] outline-none">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-medium" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="border-2 focus-within:border-gray-400 border-gray-200 w-full block p-3 rounded-[8px] outline-none mt-1"
              {...register("status")}
            >
              <option value="">Select status...</option>
              <option value="resolved">Resolved</option>
              <option value="progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status?.message}</p>
            )}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              className="text-[#16151C] py-2 px-4 border border-[#A2A1A833] rounded-[10px]"
              type="reset"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="text-white bg-[#0F91D2] py-2 px-6 border border-[#A2A1A833] rounded-[10px]"
              type="submit"
              disabled={isLoading}
            >
              {!isLoading ? "Submit" : "Submitting"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default UpdateSupportTicket;
