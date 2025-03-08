import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDeliverOrderMutation } from "../../../services/order";
import Swal from "sweetalert2";
import { getImageUrl } from "../../../utils";

const schema = Yup.object().shape({
  comments: Yup.string().required("Final comments are required"),
  schedule: Yup.string().required("Schedule date and time are required"),
});

export default function DeliveryForm({
  close,
  beforeImgs,
  afterImgs,
  orderId,
  orderScheduleData,
}) {
  const [deliverOrder, { isLoading }] = useDeliverOrderMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comments: "",
      schedule: orderScheduleData || "",
    },
  });

  const onSubmit = async (data) => {
    const deliveryData = {
      comments: data.comments,
      order_id: orderId,
    };
    if (!orderScheduleData) {
      deliveryData.scheduleDate = data.schedule;
    }
    try {
      await deliverOrder(deliveryData).unwrap();
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
    <div className="rounded-[12px] bg-white p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden">
          <p className="text-[#101828] text-lg font-semibold">
            Confirm Delivery
          </p>

          <div className="mt-4">
            <label
              className="text-[#343434] text-sm font-medium"
              htmlFor="comments"
            >
              Final Comments
            </label>
            <Controller
              name="comments"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="border border-[#D7D7D7] block rounded-[8px] w-full mt-1 p-2 outline-none shadow-[0px_1px_2px_0px_#2E2E2E0D]"
                  rows={5}
                  placeholder="Write here..."
                />
              )}
            />
            {errors.comments && (
              <p className="text-red-500 text-sm mt-1">
                {errors.comments.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label
              className="text-[#343434] text-sm font-medium"
              htmlFor="schedule"
            >
              Schedule/ Date & time
            </label>
            <Controller
              name="schedule"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="datetime-local"
                  className="border border-[#D7D7D7] block rounded-[8px] w-full mt-1 p-2 outline-none shadow-[0px_1px_2px_0px_#2E2E2E0D] disabled:text-gray-500 disabled:bg-gray-100 disabled:border-gray-200"
                  disabled={orderScheduleData}
                />
              )}
            />
            {errors.schedule && (
              <p className="text-red-500 text-sm mt-1">
                {errors.schedule.message}
              </p>
            )}
          </div>
          <ImagesList copy={"Before Photos"} images={beforeImgs} />
          <ImagesList copy={"After Photos"} images={afterImgs} />

          <div className="my-4 grid grid-cols-2 gap-3">
            <button
              className="bg-white text-[#343434] text-sm font-semibold border border-[#D7D7D7] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]"
              onClick={close}
              type="button"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#0F91D2] text-white text-sm font-semibold border border-[#0F91D2] p-2 rounded-[8px] shadow-[0px_2px_4px_0px_#2E2E2E0F]"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ImagesList({ images, copy }) {
  if (!images?.length) return;
  return (
    <div className="mt-4">
      <p className="font-medium">{copy}</p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={getImageUrl(image)}
              alt={`After Image ${index}`}
              className="w-full aspect-square object-cover rounded-lg border"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
