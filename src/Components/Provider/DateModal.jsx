
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { HiXMark } from "react-icons/hi2";
import { useScheduleOrderMutation } from "../../services/order";
import Swal from "sweetalert2";

const schema = Yup.object().shape({
  scheduleDate: Yup.string().required("Schedule date and time are required"),
});

export default function DateModal({ close,orderId }) {
  const [scheduleOrder,{isLoading}]=useScheduleOrderMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      scheduleDate: "",
    },
  });

  const onSubmit =async (data) => {
      try {
      await  scheduleOrder({...data,id:orderId}).unwrap();
          Swal.fire({
            icon: "success",
            title: "Request sent!",
          });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: "Please try again later.",
          });
        } finally {
          close();
        }
  };

  return (
    <div className="rounded-[12px] bg-white">
      <div className="py-2 px-3 flex items-center justify-between border-b border-[#00000080]">
        <p className="text-sm font-semibold">Scheduled</p>
        <button onClick={close}>
          <HiXMark />
        </button>
      </div>
      <div className="p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="scheduleDate" className="text-sm text-black">
            Select Date
          </label>
          <Controller
            name="scheduleDate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="border border-[#E5E0EB] block outline-none w-full p-2 rounded-[5px] mt-1"
                type="datetime-local"
                id="scheduleDate"
              />
            )}
          />
          {errors.scheduleDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.scheduleDate.message}
            </p>
          )}
          <div className="mt-5 flex justify-end">
            <button
            disabled={isLoading}
              type="submit"
              className="flex items-center gap-1 text-white bg-[#0F91D2] py-2 px-4 rounded-[5px]"
            >
              {isLoading?"Saving...":"Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}