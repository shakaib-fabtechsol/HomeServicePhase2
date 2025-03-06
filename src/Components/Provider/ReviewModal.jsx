
import before1 from "../../assets/img/before1.png";
import before2 from "../../assets/img/before2.png";
import before3 from "../../assets/img/before3.png";
import logo from "../../assets/img/logo.png";
import { Rating } from "@mui/material";
import BlueSwitch from "../SuperAdmin/settings/BlueSwitch";
import { getImageUrl } from "../../utils/index.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMarkOrderAsCompleteMutation } from "../../services/order/index.js";

const schema = yup.object().shape({
  rating: yup.number().required("Rating is required"),
  comments: yup.string().required("Comments are required"),
  reviewPhotos: yup.boolean(),
});

export default function ReviewModal({ close }) {
  const beforeimgs = [before1, before2, before3, before3];
  const afterimgs = [before1, before2, before3, before3];
  const [markOrderAsComplete,{isLoading}]=useMarkOrderAsCompleteMutation()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reviewPhotos: true,
    },
  });

  const showImages = watch("reviewPhotos");
  const onSubmit =async (data) => {
    try{
      console.log("Form Data:", data);
      await markOrderAsComplete(data).unwrap()
    }
    catch(err){
      console.log("err :", err);
    }
  };

  return (
    <div className="rounded-[12px] bg-white p-3">
      <form
        className="max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center">
          <div>
            <img className="size-16 object-contain" src={logo} alt="logo" />
          </div>
          <p className="text-[#101828] text-lg font-medium">Leave a Review</p>
          <div className="flex items-center gap-1 mt-2">
            <img
              className="size-12 aspect-square object-cover rounded-full"
              src={before1}
              alt="provider"
            />
            <p className="font-medium text-lg">Provider Name</p>
          </div>
          <p className="text-[#535862] mt-2 text-sm">
            How would you rate your service?
          </p>
          <div className="mt-2 ps-4">
            <Rating
              precision={0.5}
              sx={{ fontSize: "40px", gap: "16px" }}
              {...register("rating")}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
            )}
          </div>
        </div>
        <div>
          <div className="mt-4">
            <textarea
              className="border border-[#F6F6F6] bg-[#F6F6F6] block rounded-[8px] w-full mt-1 p-2 outline-none shadow-[0px_1px_2px_0px_#2E2E2E0D]"
              rows={5}
              id="comments"
              placeholder="Write here..."
              {...register("comments")}
            ></textarea>
            {errors.comments && (
              <p className="text-red-500 text-sm mt-1">{errors.comments.message}</p>
            )}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <label htmlFor="reviewPhotos">
              Attach before & after photos to review?
            </label>
            <BlueSwitch
              id="reviewPhotos"
              defaultChecked={showImages}
              onChange={(e) => setValue('reviewPhotos',e.target.checked)}

            />
          </div>
          {showImages && (
            <div className="mt-4">
              <ImagesList copy={"Before Photos"} images={beforeimgs} />
              <ImagesList copy={"After Photos"} images={afterimgs} />
            </div>
          )}
          <div className="my-4 grid grid-cols-2 gap-3">
            <button
              className="bg-white text-[#343434] text-sm font-semibold border border-[#D7D7D7] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]"
              onClick={close}
              type="button"
            >
              Skip
            </button>
            <button disabled={isLoading} type="submit" className="bg-[#0F91D2] text-white text-sm font-semibold border border-[#0F91D2] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]">
              {isLoading?"Submitting":"Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ImagesList({ images, copy }) {
  if (!images?.length) return null;
  return (
    <div className="mt-4">
      <p className="font-medium">{copy}</p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={getImageUrl(image)}
              alt={`${copy} ${index}`}
              className="w-full aspect-square object-cover rounded-lg border"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
