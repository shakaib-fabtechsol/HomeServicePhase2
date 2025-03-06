import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AmountInput from "../AmountInput";

export default function ReferralCom({data,updatePrice,user_id}) {
  const { register, handleSubmit,setValue ,watch} = useForm({
    defaultValues: {
      customer_call_commission: data?.customer_call_commission,
      customer_text_commission: data?.customer_text_commission,
      customer_chat_commission: data?.customer_chat_commission,
      customer_email_commission: data?.customer_email_commission,
      customer_transaction_commission: data?.customer_transaction_commission,
    }
  });
  useEffect(()=>{
    setValue("customer_call_commission", data?.customer_call_commission );
    setValue("customer_text_commission", data?.customer_text_commission);
    setValue("customer_chat_commission", data?.customer_chat_commission );
    setValue("customer_email_commission", data?.customer_email_commission );
    setValue("customer_transaction_commission", data?.customer_transaction_commission);
  },[data,watch])

    const onSubmit = async (formdata) => {
      console.log(data);
      try {
        await updatePrice({...formdata,user_id}).unwrap()
        Swal.fire({
          icon: 'success',
          text: 'Pricing Add Successfully',
          timer: 1500,
          showConfirmButton: false,
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: error?.message || 'Failed to add Pricing. Please try again.',
        });
      }

    };
  

  const inputsdata = [
    {
      label: "Customer Call Commission",
      grouptext: "%",
      id: "customer_call_commission",
    },
    {
      label: "Customer Text Commission",
      grouptext: "%",
      id: "customer_text_commission",
    },
    {
      label: "Customer Chat Commission",
      grouptext: "%",
      id: "customer_chat_commission",
    },
    {
      label: "Customer Email Commission",
      grouptext: "%",
      id: "customer_email_commission",
    },
    {
      label: "Customer Transaction Commission",
      grouptext: "%",
      id: "customer_transaction_commission",
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:max-w-[400px] flex flex-col gap-3">
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

