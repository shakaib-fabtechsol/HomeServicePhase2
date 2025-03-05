import { Modal } from "@mui/material";
import React from "react";
import UploadPhotos from "../UploadPhotos";
import { useAddOrderBeforeImagesMutation } from "../../../services/order";
import Swal from "sweetalert2";

function OrderBeforeImagesModal({ isOpen, onClose, orderId }) {
  const [addOrderBeforeImages, { isLoading }] =
    useAddOrderBeforeImagesMutation();

  const handleBeforeImagesUpload = React.useCallback(
    async (images) => {
      try {
        const formData = new FormData();
        formData.append("order_id", orderId);
        images.forEach((image, index) => {
          formData.append(`before_images[${index}]`, image);
        });
        await addOrderBeforeImages(formData).unwrap();
        console.log(images, "list of files");
        Swal.fire({
          icon: "success",
          title: "Images uploaded successfully!",
          text: "Your before images have been uploaded and saved successfully.",
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
    [orderId, addOrderBeforeImages, onClose]
  );
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ m: 2 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[500px] -translate-y-1/2 outline-none">
        <UploadPhotos
          isLoading={isLoading}
          onUpload={handleBeforeImagesUpload}
          title={"Before Photos"}
          close={onClose}
        />
      </div>
    </Modal>
  );
}

export default OrderBeforeImagesModal;
