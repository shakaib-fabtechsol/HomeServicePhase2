import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AmountInput from "../AmountInput";
import Swal from "sweetalert2";

export default function Channels({ data, updatePrice, user_id }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      call_pro: data?.call_pro ?? 0,
      text_pro: data?.text_pro ?? 0,
      instant_chat: data?.instant_chat ?? 0,
      email_pro: data?.email_pro ?? 0,
      get_direction: data?.get_direction ?? 0,
      th_call_pro: data?.th_call_pro ?? 0,
      th_text_pro: data?.th_text_pro ?? 0,
      th_instant_chat: data?.th_instant_chat ?? 0,
      th_email_pro: data?.th_email_pro ?? 0,
      th_get_direction: data?.th_get_direction ?? 0,
    },
  });

  useEffect(() => {
    setValue("call_pro", data?.call_pro ?? 0);
    setValue("text_pro", data?.text_pro ?? 0);
    setValue("instant_chat", data?.instant_chat ?? 0);
    setValue("email_pro", data?.email_pro ?? 0);
    setValue("get_direction", data?.get_direction ?? 0);
    setValue("th_call_pro", data?.th_call_pro ?? 0);
    setValue("th_text_pro", data?.th_text_pro ?? 0);
    setValue("th_instant_chat", data?.th_instant_chat ?? 0);
    setValue("th_email_pro", data?.th_email_pro ?? 0);
    setValue("th_get_direction", data?.th_get_direction ?? 0);
  }, [data, watch]);

  const onSubmit = async (formdata) => {
    if (!user_id) {
      return 0;
    }
    try {
      await updatePrice({ ...formdata, user_id }).unwrap();
      Swal.fire({
        icon: "success",
        text: "Pricing Add Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "Failed to add Pricing. Please try again.",
      });
    }
  };

  const inputsdata = [
    {
      label: "Call Pro",
      grouptext: "USD",
      id: "call_pro",
    },
    {
      label: "Text Pro",
      grouptext: "USD",
      id: "text_pro",
    },
    {
      label: "Instant Chat",
      grouptext: "USD",
      id: "instant_chat",
    },
    {
      label: "Email Pro",
      grouptext: "USD",
      id: "email_pro",
    },
    {
      label: "Get Directions",
      grouptext: "USD",
      id: "get_direction",
    },
  ];

  const th_inputsdata = [
    {
      label: "Call Pro",
      grouptext: "USD",
      id: "th_call_pro",
    },
    {
      label: "Text Pro",
      grouptext: "USD",
      id: "th_text_pro",
    },
    {
      label: "Instant Chat",
      grouptext: "USD",
      id: "th_instant_chat",
    },
    {
      label: "Email Pro",
      grouptext: "USD",
      id: "th_email_pro",
    },
    {
      label: "Get Directions",
      grouptext: "USD",
      id: "th_get_direction",
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col md:flex-row gap-40 w-full">
          <div className="md:max-w-[400px] flex flex-col gap-3 mt-4 md:mt-0">
            <p className="text-lg font-semibold">Fixed Lead Pricing</p>
            {inputsdata.map((input, index) => (
              <div key={index}>
                <label className="text-sm font-medium" htmlFor={input.id}>
                  {input.label}
                </label>
                <AmountInput
                  grouptext={input.grouptext}
                  id={input.id}
                  name={input.id}
                  className={"mt-1"}
                  register={register}
                />
              </div>
            ))}
          </div>
          <div className="md:max-w-[400px] flex flex-col gap-3 mt-4 md:mt-0">
            <p className="text-lg font-semibold">Thrash hold Pricing</p>
            {th_inputsdata.map((input, index) => (
              <div key={index}>
                <label className="text-sm font-medium" htmlFor={input.id}>
                  {input.label}
                </label>
                <AmountInput
                  grouptext={input.grouptext}
                  id={input.id}
                  name={input.id}
                  className={"mt-1"}
                  register={register}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="w-full mt-8 sm:max-w-[250px] bg-[#0F91D2] p-2 text-white font-semibold text-sm rounded-[8px]"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

