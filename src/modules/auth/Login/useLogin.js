import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../services/auth";
import { loginSchema } from "./validationSchema";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/reducers/authSlice";
import { ROLE_ROUTES } from "../../../constants/routeConfig";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLoginSuccess = (response) => {
    const { token, user } = response;

    console.log(token,"this is token data for the user")
    dispatch(login({ token, user }));
    const targetRoute = ROLE_ROUTES[user.role] || ROLE_ROUTES.default;

    Swal.fire({
      icon: "success",
      title: "Welcome Back!",
      text: "Successfully logged in",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate(targetRoute, { replace: true });
    });
  };

  const handleLoginError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error?.data?.message || "Invalid credentials. Please try again.",
    });
  };

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();

      if (response?.token) {
        handleLoginSuccess(response);
      } else {
        handleLoginError({ data: { message: "Invalid credentials" } });
      }
    } catch (error) {
      handleLoginError(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  };
};
