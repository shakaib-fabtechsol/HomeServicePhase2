import * as yup from "yup";
import { VALIDATION_MESSAGES } from "../../../constants/messages";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(VALIDATION_MESSAGES.FORMAT.EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED.EMAIL),
  password: yup.string().required(VALIDATION_MESSAGES.REQUIRED.PASSWORD),
});
