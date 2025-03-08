import DeliveryForm from "./DeliveryForm";
import { Modal } from "@mui/material";

function OrderDeliveryModal({ isOpen, onClose, orderId,allAfterImages,allBeforeImages,scheduleDate }) {
  return (
    <Modal
          open={!!isOpen}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ m: 2 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[500px] -translate-y-1/2 outline-none">
            <DeliveryForm
              afterImgs={allAfterImages}
              beforeImgs={allBeforeImages}
              orderId={orderId}
              close={onClose}
              orderScheduleData={scheduleDate}
            />
          </div>
        </Modal>
  )
}

export default OrderDeliveryModal
