import { Modal } from "@mui/material";
import React from "react";
import UploadPhotos from "../UploadPhotos";
import { useAddOrderAfterImagesMutation } from "../../../services/order";
import Swal from "sweetalert2";

function OrderAfterImagesModal({ isOpen, onClose, orderId,oldImages }) {
  const [addOrderAfterImages, { isLoading }] = useAddOrderAfterImagesMutation();

  const handleAfterImagesUpload = React.useCallback(
    async (images) => {
      try {
        const formData = new FormData();
        formData.append("order_id", orderId);
        images.forEach((image, index) => {
          formData.append(`after_images[${index}]`, image);
        });
        await addOrderAfterImages(formData).unwrap();
        console.log(images, "list of files");
        Swal.fire({
          icon: "success",
          title: "Images uploaded successfully!",
          text: "Your after images have been uploaded and saved successfully.",
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
        });
      } finally {
        onClose();
      }
    },
    [orderId, addOrderAfterImages, onClose]
  );
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="order-after-images"
      aria-describedby="images-uploaded-after-starting-order"
      sx={{ m: 2 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[500px] -translate-y-1/2 outline-none">
        <UploadPhotos
          isLoading={isLoading}
          onUpload={handleAfterImagesUpload}
          title={"After Photos"}
          close={onClose}
          oldImages={oldImages}
        />
      </div>
    </Modal>
  );
}

export default OrderAfterImagesModal;
