import { Modal } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

export const ContactProModal = ({providerId,  activeModal, handleModalClose, submitApi, dealid , loading}) => {
  const { user } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    // description: "",
    dealId: Number(dealid),
    subject: "",
    location: "",
    userId: 5,
    providerId,
  });

  // Define fields dynamically based on the modal type
  const formFields = {
    "Call Pro": ["text"],
    "Text Pro": ["text"],
    "Instant Chat": ["text"],
    "Email Pro": ["subject", "text"],
    "Get Directions": ["text"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitApi(activeModal, formData);
    handleModalClose();
  };

  return (
    <Modal
      open={!!activeModal}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ m: 2 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] outline-none">
        <div className="bg-white rounded-[12px] p-4 max-h-[calc(100dvh-200px)] overflow-y-auto">
          <p className="text-lg font-semibold">{activeModal}</p>
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              {formFields[activeModal]?.map((field) => (
                <div key={field} className="mt-3">
                  <label htmlFor={field} className="block font-medium capitalize">
                    {field.replace("_", " ")}
                  </label>
                  {field === "text" ? (
                    <textarea
                      className="w-full p-2 rounded-lg bg-white border"
                      rows={5}
                      name={field}
                      required
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder="Write here..."
                    ></textarea>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-2 rounded-lg bg-white border"
                      name={field}
                      required
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field === "location" ? "Enter address" : "Write here..."}
                    />
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-1 mt-5">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-[#fff] text-black py-2 rounded-lg w-full shadow-md border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0F91D2] text-white py-2 rounded-lg w-full shadow-md"
                >
                 {loading ? "loading..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
