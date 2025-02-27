import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

// import { updateProfile } from "../../../../redux/slices/settingsSlice";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { useUpdateMyDetailsMutation } from "../../../../services/settings";

export const useMyDetails = () => {
    const [updateMyDetails , { isLoading }]  = useUpdateMyDetailsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user data from Redux store
  const  userData = useSelector((state) => state.auth.user);

  // Form initialization with default values from Redux
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues: {
      id: userData?.id,
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      sales_referred: userData?.sales_referred || "No",
      sales_representative: userData?.sales_representative || "",
      personal_image: userData?.personal_image || null
    }
  });

  // Form submission handler
  const onSubmit = async (formData) => {
    try {
        console.log("formData", formData);
      // Create FormData for file upload
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'personal_image' && formData[key] instanceof File) {
          payload.append(key, formData[key]);
        } else {
          payload.append(key, formData[key]);
        }
      });

    console.log("payload", JSON.stringify(payload));
      // Dispatch update profile action
      const response = await updateMyDetails(payload).unwrap();

      if (response.success) {
        // toast.success("Profile updated successfully!");
        reset(formData); // Reset form with new values
      } else {
        // toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
    //   toast.error(error.message || "Something went wrong");
      console.error("Profile update error:", error);
    }
  };

  // File change handler
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        // toast.error("Please upload a valid image file (JPG, JPEG, PNG)");
        return;
      }

      if (file.size > maxSize) {
        // toast.error("File size should be less than 5MB");
        return;
      }

      setValue(fieldName, file);
    }
  };

  // Phone number formatter
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Validation rules
  const validationRules = {
    fullName: { required: "Full name is required" },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
      }
    },
    phoneNumber: {
      required: "Phone number is required",
      pattern: {
        value: /^\(\d{3}\) \d{3}-\d{4}$/,
        message: "Invalid phone number format"
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    watch,
    setValue,
    onSubmit,
    handleFileChange,
    formatPhoneNumber,
    validationRules,
    userData
  };
};