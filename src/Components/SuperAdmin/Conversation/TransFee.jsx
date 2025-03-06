import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AmountInput from "../AmountInput";
import Swal from "sweetalert2";

export default function TransFee({data,updatePrice,user_id}) {
  const { register, handleSubmit ,setValue,watch} = useForm({
    defaultValues: {
      customer_service_fee: data?.customer_service_fee,
      provider_service_fee: data?.provider_service_fee,
    },
  });
  useEffect(()=>{
    setValue("customer_service_fee", data?.customer_service_fee)
    setValue("provider_service_fee", data?.provider_service_fee)
  },[data,watch])
  const onSubmit = async (formdata) => {
   
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
      label: "Customer Service fee",
      grouptext: "%",
      id: "customer_service_fee",
    },
    {
      label: "Provider service fee",
      grouptext: "%",
      id: "provider_service_fee",
    },
  ];
  return (
    <div className="md:w-[400px] w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 md:p-0 p-3">
        {inputsdata.map((input, index) => (
          <div key={index} className="flex flex-col">
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
        <button
          className="w-full mt-8 sm:max-w-[250px] bg-[#0F91D2] p-2 text-white font-semibold text-sm rounded-[8px] md:mt-0"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

