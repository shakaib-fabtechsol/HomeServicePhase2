
import { FaXmark } from "react-icons/fa6";
import BlueSwitch from "../SuperAdmin/settings/BlueSwitch";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddOrUpdateTaskMutation } from "../../services/salesrep";
import Swal from "sweetalert2";
import { Loader } from "lucide-react";
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  due_datetime: yup.date().required("Due date/time is required"),
  status: yup.string().required("Status is required"),
  files: yup.mixed().required("File is required"),
  description: yup
    .string()
    .required("Description is required")
    .max(200, "Description should not be more than 200 characters"),
});

export default function AddTaskModal({ close,taskData }) {
  const [addOrUpdateTask, { isLoading, isError, error }] = useAddOrUpdateTaskMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  watch,
    setValue, 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: taskData?.name || "",
      due_datetime: taskData?.due_datetime,
      notification: taskData?.notification ?? 0,
      status:taskData?.status,
      description: taskData?.description,
      files: taskData?.files,
    },
  });
  const onSubmit = async (data) => {
    const date = new Date(data.due_datetime);
    const formattedDateTime = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
  
    data.due_datetime = formattedDateTime; 
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "files" && data[key] instanceof File) {
          formData.append("files", data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });
    if(taskData.id){
      formData.append('id', taskData.id);
    }
    try {
      await addOrUpdateTask({formData,isUpdating:!!taskData.id}).unwrap();
      Swal.fire({
        icon: "success",
        title: taskData.id ? "Task Updated" : "Task Added",
        text: taskData.id ? "The task has been updated successfully." : "The task has been added successfully.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        close();
      });
    } catch  {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "An error occurred while submitting the form. Please try again.",
        });
    }
    close();
  };
  
  const file = watch("files");
  const fileName = file && typeof file === 'string' ? file : file?.name? file.name:  ""; 
  if (isError) {

    Swal.fire({
      icon: 'error',
      title: 'Failed to Add Task',
      text: error?.message || 'Failed to Add Task',
    }).then(() => {
      close();
    })
  }
  return (
    <div className="max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end">
          <button
            onClick={close}
            className="size-6 bg-[rgba(120,116,134,0.2)] flex justify-center items-center rounded-[6px] outline-none"
          >
            <FaXmark className="text-sm" />
          </button>
        </div>
        <div className="flex items-center gap-2 justify-between mt-2 flex-wrap">
          <p className="text-2xl font-medium">Add Task</p>
          <p className="text-sm text-[#787486] ms-auto">
            {new Date().toLocaleString("default", { month: "short" })}{" "}
            {new Date().getUTCDate()}/{new Date().getUTCFullYear()}
          </p>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium" htmlFor="test">
            Name the task
          </label>
          <input
            className="block border outline-none border-[#787486] w-full p-2 rounded-[8px] mt-1"
            type="name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium" htmlFor="due_datetime">
            Due Date/Time
          </label>
          <input
            className="block border outline-none border-[#787486] w-full p-2 rounded-[8px] mt-1"
            type="datetime-local"
            {...register("due_datetime")}
          />
          {errors.due_datetime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.due_datetime.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Activate Notifications</p>
          <div className="flex items-center gap-4 mt-2">
            <label
              className="text-[#787486] font-medium text-sm"
              htmlFor="notification"
            >
              Task will be reminded
            </label>
            <Controller
              name="notification"
              control={control}
              render={({ field }) => (
                <BlueSwitch
                  {...field}
                  defaultChecked={taskData.notification?true:false}
                  checked={field.value === 1} // Convert 1 to true for the switch
                  onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                  id="notification"
                />
              )}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium" htmlFor="status">
            Status
          </label>
          <select
            className="block border outline-none border-[#787486] w-full p-2 rounded-[8px] mt-1"
            {...register("status")}
          >
            <option value="">Select</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            className="block border outline-none border-[#787486] w-full p-2 rounded-[8px] mt-1"
            {...register("description")}
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Attached File</p>
          <input
            className="hidden"
            type="file"
            id="files"
            onChange={(e) => {
              const file = e.target.files[0];
              setValue("files", file); 
            }}
          />
          <label
            className="text-[#787486] font-medium text-sm border border-dotted rounded-[4px] border-[#787486] py-2 mt-2 cursor-pointer px-3 inline-block"
            htmlFor="files"
          >
            {fileName ? `+ ${fileName}` : "+ Attach File"}
          </label>
        </div>
        {errors.files && (
            <p className="text-red-500 text-sm mt-1">{errors.files.message}</p>
          )}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={close}
            className="text-[#16151C] py-2 px-4 border border-[#A2A1A833] rounded-[10px]"
            type="button"
          >
            Cancel
          </button>
          <button
            className="text-white bg-[#0F91D2] py-2 px-6 border border-[#A2A1A833] rounded-[10px]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading?<Loader/>:"Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
