import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateBusinessProfileMutation,usePublishMutation } from "../../../../services/settings";
import { setUser } from "../../../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  business_name: yup.string().required("Business name is required"),
  business_logo: yup.mixed(),
  about: yup.string(),
  business_primary_category: yup.string().required("Primary category is required"),
  business_secondary_categories: yup.array().of(yup.string()),
  website: yup.string().url("Please enter a valid URL"),
});

export const useBusinessProfile = ({handleTabChange}) => {
  const [publishBusinessProfile] = usePublishMutation();
  const [updateBusinessProfile, { isLoading }] = useUpdateBusinessProfileMutation();
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      business_name: userData?.businessProfile?.business_name || "",
      business_logo:  userData?.businessProfile?.business_logo || "",
      about: userData?.businessProfile?.about || "",
      business_primary_category: userData?.businessProfile?.business_primary_category || "",
      business_secondary_categories: userData?.businessProfile?.business_secondary_categories && userData?.businessProfile?.business_secondary_categories?.split(",") || [],
      website: userData?.businessProfile?.website || "",
    },
  });

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

  const handleReset = () => {
    reset();
  };

  const onSubmit = async (data, saveAndPublish = false) => {

    try {
    

      // Create FormData for file upload
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'business_secondary_categories') {
          formData.append(key, JSON.stringify(data[key]));
        } 
        if (key === 'business_logo' && formData[key] instanceof File) {
            formData.append(key, formData[key]);
          }
        else {
          if(key != 'publish'){
            formData.append(key, data[key]);
          }
        }
      });
      formData.append('user_id', userData?.id);


      const response = await updateBusinessProfile(formData).unwrap();
      if(data.publish ){
        await publishBusinessProfile(userData?.id);
      }
      console.log("response", response);
      handleTabChange(3);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  console.log("userData>>>>>>", userData);
  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    handleReset,
    handleFileChange,
    onSubmit,
    watch,
    setValue,
  };
};
