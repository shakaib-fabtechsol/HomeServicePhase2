
import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetProviderDealsQuery } from "../../services/providerContactPro";

const schema = yup.object().shape({
  service: yup.string().required("Service is required"),
  pricePlan: yup.string().required("Pricing Plan is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(1, "Price must be at least 1")
    .required("Price is required"),
  date: yup.string().required("Date is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "700px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
};

export const OfferModal = ({ handleClose, modalopen, onSubmit, userId, isLoading }) => {
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");

  const { data: deals } = useGetProviderDealsQuery(userId);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const selectedServiceId = watch("service"); 
  const selectedDeal = deals?.data?.find(deal => deal.id === Number(selectedServiceId));
  // Update description and price when plan changes
  const handlePlanChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPlan(selectedValue);
    
    if (selectedDeal?.pricing_model === "Custom") {
      setDescription(selectedDeal[`deliverable${selectedValue}`] || "");
      setPrice(selectedDeal[`price${selectedValue}`]?.split("$")[1] || "");
    }
  };

  // Ensure description and price update when a new service is selected
  React.useEffect(() => {
    if (selectedDeal) {
      if (selectedDeal.pricing_model === "Custom" && selectedPlan) {
        setDescription(selectedDeal[`deliverable${selectedPlan}`] || "");
        setPrice(selectedDeal[`price${selectedPlan}`]?.split("$")[1] || "");
      } else {
        setDescription(selectedDeal.service_description || "");
        setPrice(selectedDeal.hourly_final_list_price?.split("$")[1] || "");
      }
    }
  }, [selectedDeal, selectedPlan]);

  return (
    <Modal
      open={modalopen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{ fontFamily: "inter", p: 2 }} id="modal-modal-title" variant="h6" component="h2">
          Create Offer
        </Typography>
        <Typography id="modal-modal-description" sx={{ fontFamily: "inter", px: 2, pb: 2, overflowY: "auto", maxHeight: "calc(100dvh - 120px)" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="text-sm">Service</label>
              <select {...register("service")} className="border p-2 bg-white rounded-lg">
                {deals?.data?.map((deal) => (
                  <option key={deal._id} value={deal.id}>{deal?.service_title}</option>
                ))}
              </select>
              {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
            </div>
            <div className="flex flex-col gap-2 mt-3 cursor-not-allowed ">
              <label htmlFor="description" className="text-sm">Price Modal</label>
              <input type="text" readOnly={true} value={selectedDeal?.pricing_model} className="border p-2 rounded-lg cursor-not-allowed" />
            </div>
            {selectedDeal?.pricing_model === "Custom" && <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="pricePlan" className="text-sm">Select Pricing Plan</label>
              <select onChange={(e) => { setSelectedPlan(e.target.value) }} className="border p-2 bg-white rounded-lg">
                <option value="" hidden>Select</option>
                <option value="1">{selectedDeal?.title1}</option>
                <option value="2">{selectedDeal?.title2}</option>
                <option value="3">{selectedDeal?.title3}</option>
              </select>
              {/* {errors.pricePlan && <p className="text-red-500 text-sm">{errors.pricePlan.message}</p>} */}
            </div>}

            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="description" className="text-sm">Description and Deliverables</label>
              <textarea {...register("description")} value={selectedDeal?.pricing_model === "Custom" ? selectedDeal?.[`deliverable${selectedPlan}`] : selectedDeal?.service_description} cols="30" rows="4" className="border p-2 rounded-lg"></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="price" className="text-sm">Price</label>
              <input type="number" {...register("price")} value={selectedDeal?.pricing_model === "Custom" ? selectedDeal?.[`price${selectedPlan}`]?.split("$")[1] : selectedDeal?.hourly_final_list_price?.split("$")[1]} className="border p-2 rounded-lg" />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="date" className="text-sm">Date</label>
              <input type="date" {...register("date")} className="border p-2 rounded-lg" />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-6">
              <button type="button" onClick={handleClose} className="bg-gray-200 text-black py-2 rounded-lg w-full shadow-md border">
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg w-full shadow-md">
                {isLoading ? "Loading..." : "Create"}
              </button>
            </div>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};
