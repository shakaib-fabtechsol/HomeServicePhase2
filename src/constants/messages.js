export const VALIDATION_MESSAGES = {
  REQUIRED: {
    NAME: "Name is required",
    EMAIL: "Email is required",
    PHONE: "Phone number is required",
    PASSWORD: "Password is required",
  },
  FORMAT: {
    EMAIL: "Invalid email format",
    PASSWORD: {
      MIN_LENGTH: "Password must be at least 8 characters",
      PATTERN:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    },
    PHONE: "Invalid phone number format",
  },
  GENERAL: {
    FIELD_REQUIRED: "This field is required",
    INVALID_INPUT: "Invalid input",
  },
};

export const AUTH_MESSAGES = {
  SUCCESS: {
    REGISTRATION: "Registration successful",
    LOGIN: "Login successful",
    LOGOUT: "Logout successful",
  },
  ERROR: {
    REGISTRATION: "Registration failed",
    LOGIN: "Login failed",
    INVALID_CREDENTIALS: "Invalid email or password",
    SERVER_ERROR: "Something went wrong, please try again",
  },
};
