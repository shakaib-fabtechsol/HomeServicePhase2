export const END_POINTS = {
  LOGIN: "/Userlogin",
  REGISTER: "/Register",
  LOGOUT: "/logout",
  GET_USER: "/get-user",
  TERMS_UPDATE: "/UpdateUser",
  MY_DETAILS: "/MyDetails",
  CUSTOMER_DETAILS:"/Customer/MyDetail",
  ADD_CUSTOMER_PROFILE:"/Customer/AddSocial",
  UPDATE_CUSTOMER_PASSWORD:"/Customer/NewPassword",
  BUSINESS_PROFILE: "/BusinessProfile",
  ADD_CERTIFICATE_HOURS: "/AddCertificateHours",
  ADD_ADDITIONAL_INFO: "/AdditionalPhotos",
  ADD_SOCIAL_PROFILE: "/AddSocial",
  SOCIAL_DELETE: "/SocialDelete",
  UPDATE_PASSWORD: "/UpdatePassword",
  ADD_CONVERSATION: "/AddConversation",
  ADD_PAYMENT_DETAILS: "/AddPaymentDetails",
  ADD_BUSINESS_LOCATION: "/AddBusinessLocation",
  SETTING_PUBLISH: "/SettingPublish",
  CUSTOMER_PUBLISH: "/SettingPublish",
  USER_DETAILS: "/UserDetails",
  UPDATE_ADMIN: "/SuperAdmin/UpdatePersonal",
  UPDATE_SECURITY: "/SuperAdmin/Security",
  SERVICE_PROVIDERS_SUMMARY: "/SuperAdmin/GetProvidersSummary",
  SERVICE_REPS_SUMMARY: "/SuperAdmin/SaleSummary",
  SERVICE_SUMMARY: "/SuperAdmin/ServiceSummary",
  CLIENT_SUMMARY: "/SuperAdmin/GetClientsSummary",
  CUSTOM_ORDERS: "/OrdersList",
  My_ORDERS_As_CUSTOMER: "/Customer/Orders",
  GET_ORDER_DETAILS: "/GetOrderDetails",
  ORDER_CONFIRMED: "/OrderConfirm",
  ORDER_BEFORE_IMAGES: "/OrderBeforeImages",
  ORDER_AFTER_IMAGES: "/OrdeAfterImages",
  MARK_COMPLETE: "/Customer/UploadReview",
  COMPLETE_ORDER_WITHOUT_REVIEW: "/Customer/OrderStatus",
  My_ORDERS_DETAILS_As_CUSTOMER: "/Customer/Order",
  CUSTOMER_SUPPORT: "/CustomerSupport",
  UPDATE_CUSTOMER_SUPPORT: "/UpdateSupport",
  GET_SUPPORT: "/GetSupport",
  CREATE_OFFER: "/CreateOffer",
  SCHEDULE_ORDER: "/AddScheduleOrder",
};

export const PRO_POINTS = {
  GET_PROVIDERS: "/SuperAdmin/ServiceProviders",
  GET_CLIENTS: "/SuperAdmin/Customers",
  GET_SALES: "/SuperAdmin/GetAllSaleRep",
  UPDATE_CLIENT: "/SuperAdmin/UpdateCustomer",
  UPDATE_SALE: "/SuperAdmin/UpdateSalesReps",
  SEND_INVITATION: "/SuperAdmin/sendInvite",
  AddPRICING: "/SuperAdmin/AddPriceDetails",
  UPDATE_PROVIDER:"/SuperAdmin/UpdateProvider",
  BAN:"/SuperAdmin/banProvider"
};

export const SALEREP_POINTS = {
    GET_CUSTOMERS: "/SaleRep/SaleCustomers",
    GET_SINGLE_CUSTOMER: "/SaleRep/SaleCustomer",
    EDIT_CUSTOMER: "/SaleRep/UpdateSaleCustomer",
    UPDATE_SALES: "/SaleRep/SalesPersonal",
    UPDATE_SALES_SECURITY:"/SaleRep/SalesSecurity",
    GET_ALL_TASKS:"/SaleRep/FetchAllTask",
    Add_TASK:"/SaleRep/AddTask",
    UPDATE_TASK:"/SaleRep/UpdateTask",
    VIEW_TASK:"/SaleRep/ViewTask",
    DELETE_TASK:"/SaleRep/DeleteTask",
    GET_SERVICE_REVENUE:"/SaleRep/GetServiceRevenue",
    GET_REVENUE_SUMMARY:"SaleRep/quarterlyReport",
    GET_PROVIDER_ALL:"/SaleRep/SaleAllProviders",
    GET_ASSIGNED_PROVIDER:"/SaleRep/SaleAssignProviders",
    EDIT_SALE_PROS:"/SaleRep/UpdateSaleProvider",
    SALES_REPOS:"/salesrep"

}
export const SALE_POINTS = {
  GET_SALES: "/SaleRep/GetSettingSale",
      };

  export const GET_ORDER={
   ORDER:"/GetInprogressOrder"

   
  }
  export const FAV={
   FAVOURITES:"/FavoritService",
  GET_FAVOURITES:"/GetFavoritService",
  FAVOURITES1:"/Customer/FavoritDeal",
  GET_FAVOURITES1:"/Customer/GetCustomerFavoritService",
   }
  
   
   export const PROVIDER_CONTACT_PRO={
    GET_RECORDS:"/api/contact-pro/provider",
    SEND_CALL:"/api/contact-pro/send-call-sms",
    SEND_SMS:"/api/contact-pro/send-sms",
    SEND_INSTANT_MESSAGE:"/api/contact-pro/send-instant-chat",
    SEND_EMAIL:"/api/contact-pro/send-email",
    SEND_GET_DIRECTION:"/api/contact-pro/send-get-direction",
    PROVIDER_DEALS:"/api/contact-pro/deals",
    }
   
  

