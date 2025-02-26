import * as yup from 'yup';
import { VALIDATION_MESSAGES } from '../../../constants/messages';

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED.NAME),
  
  email: yup
    .string()
    .email(VALIDATION_MESSAGES.FORMAT.EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED.EMAIL),
  
  phone: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED.PHONE),
  
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED.PASSWORD)
    .min(8, VALIDATION_MESSAGES.FORMAT.PASSWORD.MIN_LENGTH)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      VALIDATION_MESSAGES.FORMAT.PASSWORD.PATTERN
    ),
});