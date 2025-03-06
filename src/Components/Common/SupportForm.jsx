import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateSupportTicketMutation } from "../../services/customer-support";
import React from "react";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  email: yup.string().trim().email("Invalid email").required("Email is required"),
  subject: yup.string().trim().required("Subject is required"),
  message: yup.string().trim().required("Message is required"),
});

function SupportForm() {
  const [createSupportTicket,{isLoading}]=useCreateSupportTicketMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = React.useCallback(async (data) => {
    try {
      await createSupportTicket(data).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your request has been received successfully. We will get back to you very soon!",
        showConfirmButton: false,

      });
      reset();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:  "An error occurred while submitting the form. Please try again.",
      });
  
    }
  }, [createSupportTicket, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-4 gap-3 md:max-w-[500px]">
        {[{field:"name",type:'text'}, {field:"email",type:'email'}, {field:"subject",type:'text'}].map(({field,type}, index) => (
          <div key={index}>
            <label className="text-sm capitalize font-medium" htmlFor={field}>
              {field}
            </label>
            <input
              className="border-2 focus-within:border-gray-400 border-gray-200 w-full block p-3 rounded-[8px] outline-none mt-1"
              placeholder="Type here..."
              type={type}
              id={field}
              {...register(field)}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]?.message}</p>
            )}
          </div>
        ))}
        <div>
          <label className="text-sm font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows={7}
            placeholder="Type your message here..."
            className="border-2 focus-within:border-gray-400 border-gray-200 w-full block p-3 rounded-[8px] outline-none mt-1"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message?.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="text-[#16151C] py-2 px-4 border border-[#A2A1A833] rounded-[10px]"
          type="reset"
        >
          Cancel
        </button>
        <button
          className="text-white bg-[#0F91D2] py-2 px-6 border border-[#A2A1A833] rounded-[10px]"
          type="submit"
          disabled={isLoading}
        >
        {!isLoading? "Submit":"Submitting"}
        </button>
      </div>
    </form>
  );
}

export default SupportForm;
