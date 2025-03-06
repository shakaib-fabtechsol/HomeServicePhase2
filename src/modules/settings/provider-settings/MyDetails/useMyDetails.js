import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector} from "react-redux";
import { usePublishMutation } from "../../../../services/settings";
import { useUpdateMyDetailsMutation, useGetMyDetailsQuery } from "../../../../services/settings";

export const useMyDetails = ({ handleTabChange }) => {

 const id=useSelector((state)=>state.auth.user);
 console.log(id,"user");
  const { data: userData, isLoading: isFetching } = useGetMyDetailsQuery();
 
  const [updateMyDetails, { isLoading: isUpdating }] = useUpdateMyDetailsMutation();
  const [publishMyDetails] = usePublishMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      sales_referred: "No",
      sales_representative: "",
      personal_image: null,
    },
  });

 console.log(userData?.user);
  useEffect(() => {
    if (userData) {
      reset({
        id:userData?.user?.id || "",
        name: userData?.user?.name || "",
        email: userData?.user?.email || "",
        phone: userData?.user?.phone || "",
        sales_referred: userData?.user?.sales_referred || "No",
        sales_representative: userData?.user?.sales_representative || "",
        personal_image: userData?.user?.personal_image || null,
      });
    }
  }, [userData, reset]);

  const onSubmit = async (formData) => {
    try {
      console.log("Submitting formData:", formData);

      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "personal_image" && formData[key] instanceof File) {
          payload.append(key, formData[key]);
        } else {
          if (key !== "publish") {
            payload.append(key, formData[key]);
          }
        }
      });

      const response = await updateMyDetails(payload).unwrap();

      if (response) {
        if (formData.publish === true) {
          await publishMyDetails(userData?.user.id);
        }
        handleTabChange(1);
        reset(formData); // Reset with updated data
      }
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  // File change handler
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        console.error("Invalid file type");
        return;
      }

      if (file.size > maxSize) {
        console.error("File size exceeds 5MB");
        return;
      }

      setValue(fieldName, file);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isFetching || isUpdating,
    watch,
    setValue,
    onSubmit,
    handleFileChange,
    userData,
  };
};
