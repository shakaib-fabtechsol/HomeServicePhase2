export const ROLES = {
  CUSTOMER: 1,
  PROVIDER: 2,
  ADMIN: 3,
  SALES: 4
};

export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    SIGNUP: '/signup',
    PRIVACY_POLICY: '/privacyPolicy',
    FORGOT_PASSWORD: '/forgotpassword',
    NEW_PASSWORD: '/newpassword',
    CATALOG_RESULT: '/catalogResult',
    DEAL_DETAILS: '/dealdetails'
  },
  PROVIDER: {
    ROOT: '/provider/*',
    DASHBOARD: '/provider/dashboard',
    SERVICES: '/provider/services',
    // ... other provider routes
  },
  CUSTOMER: {
    ROOT: '/customer/*',
    DASHBOARD: '/customer/dashboard',
    // ... other customer routes
  },
  ADMIN: {
    ROOT: '/superadmin/*',
    DASHBOARD: '/superadmin/dashboard',
    // ... other admin routes
  },
  SALES: {
    ROOT: '/sales/*',
    DASHBOARD: '/sales/dashboard',
    // ... other sales routes
  }
};