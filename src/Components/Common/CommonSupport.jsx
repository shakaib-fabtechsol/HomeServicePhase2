
import { useEffect, } from "react";
import SupportSlider from "../SupportSlider";
import SupportForm from "./SupportForm";

export default function CommonSupport({ Role }) {
  useEffect(() => {
    document.title = "Support";
  }, []);


  return (
    <div className="border border-[#A2A1A833] rounded-[10px] p-3 px-6">
      <div className="flex items-center sm:gap-4 gap-2 sm:mt-4">
        <div>
          <p className="font-semibold 2xl:text-3xl sm:text-xl text-lg">
            Support
          </p>
          <p className="text-[#535862] md:text-base text-xs">
            If you have any issues or complaints, please fill out the form
            below, and we will get back to you as soon as possible.
          </p>
        </div>
      </div>
      {Role === "provider" && (
        <div className="my-5">
          <SupportSlider />
        </div>
      )}
    <SupportForm/>
    </div>
  );
}
