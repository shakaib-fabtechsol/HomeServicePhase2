import React from "react";
import { useForm } from "react-hook-form";
import SettingsPreview from "../MUI/SettingsPreview";
import PreviewVideo from "../MUI/PreviewVideo";
import { useAddAdditionalInfoMutation } from "../../services/settings";
import Swal from "sweetalert2";
import { useGetMyDetailsQuery } from "../../services/settings";
import Loader from "../MUI/Loader";
import { useSelector } from "react-redux";

const AdditionalInfo = ({ handleTabChange,useGetMyDetailsQuery }) => {
  
 
  const { data: userData, isLoading: isFetching } = useGetMyDetailsQuery();
  const [addAdditionalInfo, { isLoading }] = useAddAdditionalInfoMutation();
const userId=useSelector((state)=>state.auth.user);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      about_video: userData?.businessProfile?.[0].about_video || "",
      technician_photo: userData?.businessProfile?.[0].technician_photo || "",
      vehicle_photo: userData?.businessProfile?.[0].vehicle_photo || "",
      facility_photo: userData?.businessProfile?.[0].facility_photo || "",
      project_photo: userData?.businessProfile?.[0].project_photo || "",
    },
  });

  const formData = watch();

  const handleFileChange = (e, fieldName) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      // Add file validation if needed
      const validTypes = ["video/mp4", "image/jpeg", "image/png", "image/jpg"];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(uploadedFile.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text:
            fieldName === "about_video"
              ? "Please upload a valid video file (MP4)"
              : "Please upload a valid image file (JPG, JPEG, PNG)",
        });
        return;
      }

      if (uploadedFile.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "File size should be less than 10MB",
        });
        return;
      }

      setValue(fieldName, uploadedFile);
    }
  };

  const onSubmit = async (data) => {
    try {
      const submitData = new FormData();

      // Only append files that are actually Files (newly uploaded) or existing strings (URLs)
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          if (data[key] instanceof File || typeof data[key] === "string") {
            submitData.append(key, data[key]);
          }
        }
      });

      submitData.append("user_id", userId?.id);

      const response = await addAdditionalInfo(submitData).unwrap();

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Additional info updated successfully",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          handleTabChange(5);
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.data?.message || "Failed to update additional info",
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
          <p className="text-lg font-semibold text-[#181D27]">
            Additional Info
          </p>
          <p className="text-[#535862] text-sm">
            Upload optional additional info.
          </p>
        </div>

        {/* About Video section */}
        <div className="py-8 border-b">
          <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
            <div>
              <p className="text-sm font-semibold text-[#414651]">
                Upload About Us Video
              </p>
              <p className="text-[#535862] text-sm">
                Optional info which will be publicly displayed.
              </p>
            </div>
            <div className="md:col-span-2">
              <PreviewVideo
                onFileSelect={handleFileChange}
                fieldName="about_video"
                existingVideo={watch("about_video")}
              />
            </div>
          </div>
        </div>

        {/* Photo sections with existing images */}
        {[
          { name: "technician_photo", label: "Technician Photos" },
          { name: "vehicle_photo", label: "Vehicle Photos" },
          { name: "facility_photo", label: "Facility Photos" },
          { name: "project_photo", label: "Project Photos" },
        ].map(({ name, label }) => (
          <div key={name} className="py-8 border-b">
            <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
              <div>
                <p className="text-sm font-semibold text-[#414651]">
                  Upload {label}
                </p>
                <p className="text-[#535862] text-sm">
                  Optional info which will be publicly displayed.
                </p>
              </div>
              <div className="md:col-span-2">
                <SettingsPreview
                  onFileSelect={handleFileChange}
                  fieldName={name}
                  existingImage={watch(name)}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Action buttons */}
        <div className="grid max-w-[550px] grid-cols-3 my-4 gap-2 ms-auto">
          <button
            type="button"
            onClick={() => {
              const defaultValues = {
                about_video: userData?.businessProfile?.about_video || "",
                technician_photo:
                  userData?.businessProfile?.technician_photo || "",
                vehicle_photo: userData?.businessProfile?.vehicle_photo || "",
                facility_photo: userData?.businessProfile?.facility_photo || "",
                project_photo: userData?.businessProfile?.project_photo || "",
              };
              Object.keys(defaultValues).forEach((key) =>
                setValue(key, defaultValues[key])
              );
            }}
            className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
            disabled={isLoading}
          >
            Save & Publish
          </button>
          <button
            type="submit"
            className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
            disabled={isLoading}
          >
            Save  & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdditionalInfo;
