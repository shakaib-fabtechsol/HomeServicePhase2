import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { signUpSchema } from "./validationSchema";
import { useRegisterMutation } from "../../../services/auth";

export const useSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "";
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    control, // Add this
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  useEffect(() => {
    document.title = "Signup";
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: userType,
      }).unwrap();

      if (response?.user) {
        reset();
        const userId = response?.user?.id; // Extract the user ID from the API response
        Swal.fire({
          icon: "success",
          title: "Good Job",
          text: "You must accept the terms of service to sign up.",
          showConfirmButton: false,
        });

        // Navigate to PrivacyPolicy page with the user ID
        navigate("/PrivacyPolicy", { state: { userId } });
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return {
    registerField,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    Controller,
    control, // Add this
  };
};
