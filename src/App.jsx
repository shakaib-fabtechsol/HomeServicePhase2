import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProviderLayout from "./Layouts/ProviderLayout";
import Dashboard from "./Pages/ServiceProvider/Dashboard";
import Clients from "./Pages/SuperAdmin/Clients";
import Sales from "./Pages/SuperAdmin/Sales";
import Reports from "./Pages/SuperAdmin/Reports";
import HomeLayout from "./Layouts/HomeLayout";
import Login from "./Pages/Auth/Login";
import Settings from "./Pages/ServiceProvider/Settings";
import Register from "./Pages/Auth/Register";
import Signup from "./Pages/Auth/Signup";
import Support from "./Pages/ServiceProvider/Support";
import PrivacyPolicy from "./Pages/Auth/PrivacyPolicy";
import NewDeals from "./Pages/ServiceProvider/NewDeals";
import SuperAdminLayout from "./Layouts/SuperAdminLayout.";
import Providers from "./Pages/SuperAdmin/Providers";
import Conversation from "./Pages/SuperAdmin/Conversation";
import Dashboardsa from "./Pages/SuperAdmin/Dashboardsa";
import SalesRepd from "./Pages/SuperAdmin/SalesRepd";
import EditSalesRep from "./Pages/SuperAdmin/EditSalesRep";
import Notificationssa from "./Pages/SuperAdmin/Notificationssa";
import Settingsa from "./Pages/SuperAdmin/Settingsa";
import Services from "./Pages/ServiceProvider/Services";
import Favourites from "./Pages/ServiceProvider/Favourites";
import FavouritesC1 from "./Components/Common/CommonFavorites2";
import Notification from "./Pages/ServiceProvider/Notification";
import LandingPage from "./Pages/LandingPage";
import Dashboardc2 from "./Pages/Customer/Dashboard2";
import Payments from "./Pages/ServiceProvider/Payments";
import Chatsa from "./Pages/SuperAdmin/Chatsa";
import Suportsa from "./Pages/SuperAdmin/Suportsa";
import SalesLayout from "./Layouts/SalesLayout";
import Servicessr from "./Pages/Sales/Servicessr";
import ReportsSr from "./Pages/Sales/ReportsSr";
import Notificationsr from "./Pages/Sales/Notificationsr";
import SettingSr from "./Pages/Sales/SettingSr";
import SupportSr from "./Pages/Sales/SupportSr";
import Chatsr from "./Pages/Sales/Chatsr";
import Clientssr from "./Pages/Sales/Clientssr";
import Dashboardsr from "./Pages/Sales/Dashboardsr";
import TaskListsr from "./Pages/Sales/TaskListsr";
import ProDetails from "./Pages/SuperAdmin/ProDetails";
import CustomerLayout from "./Layouts/CustomerLayout";
import OrderDetail from "./Pages/Customer/OrderDetail";
import ProBucks from "./Pages/Customer/ProBucks";
import Order from "./Pages/Customer/Order";
import Setting from "./Pages/Customer/Setting";
import Profile from "./Pages/Customer/Profile";
import Ordersp from "./Pages/ServiceProvider/Ordersp";
import CatalogResult from "./Pages/CatalogResult";
import Conversations from "./Pages/ServiceProvider/Conversations";
import Message from "./Pages/Customer/Message";
import ExploreServices from "./Pages/Customer/ExploreServices";
import Supportc from "./Pages/Customer/Support";
import Notificationc from "./Layouts/Notificationc";
import Profiles from "./Pages/Sales/Profile";
import Profilep from "./Pages/ServiceProvider/Profile";
import ProBucksp from "./Pages/ServiceProvider/ProBucksp";
import OrderDetailsp from "./Pages/ServiceProvider/OrderDetailsp";
import RecentDeals from "./Pages/Sales/RecentDeals";
import DealDetails from "./Pages/ServiceProvider/DealDetails";
import DealDetailsC from "./Pages/Customer/DealDetails2";
import MyDeals from "./Pages/Customer/MyDeals";
import DealDetailsH from "./Pages/DealDetailsH";
import DealDetailsS from "./Pages/SuperAdmin/DealDetails";
import ReportsP from "./Pages/ServiceProvider/Reports";
import ReportsC from "./Pages/Customer/Reports";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import NewPassword from "./Pages/Auth/NewPassword";
import ClientProfilep from "./Pages/ServiceProvider/ClientProfileP";
import ClientProfilesa from "./Pages/SuperAdmin/ClientProfilesa";
import DealsDetailssr from "./Pages/Sales/DealsDetailssr";

import ClientProfilesr from "./Pages/Sales/ClientProfilesr";
import EditClientsa from "./Pages/SuperAdmin/EditClientsa";
import EditClientSr from "./Pages/Sales/EditClientSr";

import { ROUTES, ROLES } from "./config/routeConfig";
import { PrivateRoute } from "./PrivateRoute";
import Prodetailssr1 from "./Pages/Sales/Prodetailssr1";
import EditProvider from "./Pages/SuperAdmin/EditProvider";
import EditsaleProvider from "./Pages/Sales/EditsaleProvider";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <PrivateRoute allowedRoles={[ROLES.PROVIDER]}>
              <ProviderLayout />
            </PrivateRoute>
          }
        >
          <Route path="/provider/settings" element={<Settings />} />
          <Route path="/provider/dashboard" element={<Dashboard />} />
          <Route path="/provider/services" element={<Services />} />
          <Route path="/provider/newDeals" element={<NewDeals />} />
          <Route path="/provider/newDeals/:dealid" element={<NewDeals />} />
          <Route path="/provider/notification" element={<Notification />} />
          <Route path="/provider/support" element={<Support />} />
          <Route path="/provider/favourites" element={<Favourites />} />
          <Route path="/provider/payments" element={<Payments />} />
          <Route path="/provider/probucks" element={<ProBucksp />} />
          <Route path="/provider/orders" element={<Ordersp />} />
          <Route
            path="/provider/orderdetails/:id"
            element={<OrderDetailsp />}
          />
          <Route path="/provider/conversations" element={<Conversations />} />
          <Route path="/provider/dealDetails/:dealid" element={<DealDetails />} />

          <Route path="/provider/profile" element={<Profilep />} />
          <Route path="/provider/clientprofile" element={<ClientProfilep />} />
          <Route path="/provider/reports" element={<ReportsP />} />
        </Route>

        <Route
          element={
            <PrivateRoute allowedRoles={[ROLES.CUSTOMER]}>
              <CustomerLayout />
            </PrivateRoute>
          }
        >
            <Route path="/customer/dashboard" element={<Dashboardc2 />} />
            <Route path="/customer/orderdetails" element={<OrderDetail />} />
            <Route path="/customer/bucks" element={<ProBucks />} />
            <Route path="/customer/order" element={<Order />} />
            <Route path="/customer/setting" element={<Setting />} />
            <Route path="/customer/profile" element={<Profile />} />
            <Route path="/customer/message" element={<Message />} />
            <Route
              path="/customer/explore-service"
              element={<ExploreServices />}
            />
            <Route path="/customer/support" element={<Supportc />} />
            <Route path="/customer/Deals" element={<MyDeals />} />
            <Route path="/customer/notification" element={<Notificationc />} />
            <Route path="/customer/favourites1" element={<FavouritesC1 />} />
            <Route path="/customer/payments" element={<Payments />} />
            <Route path="/customer/dealDetails/:dealid" element={<DealDetailsC />} />
            <Route path="/customer/reports" element={<ReportsC />} />
        </Route>

        <Route
          element={
            <PrivateRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
              <SuperAdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/superadmin/dashboard" element={<Dashboardsa />} />
          <Route path="/superadmin/providers" element={<Providers />} />
          <Route path="/superadmin/editprovider" element={<EditProvider />} />
          <Route path="/superadmin/prodetails" element={<ProDetails />} />
          <Route path="/superadmin/clients" element={<Clients />} />
          <Route
            path="/superadmin/clientprofile"
            element={<ClientProfilesa />}
          />
          <Route path="/superadmin/editclient" element={<EditClientsa />} />
          <Route path="/superadmin/sales" element={<Sales />} />
          <Route path="/superadmin/salesrepd" element={<SalesRepd />} />
          <Route path="/superadmin/editsalesrep" element={<EditSalesRep />} />
          <Route path="/superadmin/reports" element={<Reports />} />
          <Route path="/superadmin/conversation" element={<Conversation />} />
          <Route path="/superadmin/Chatsa" element={<Chatsa />} />
          <Route
            path="/superadmin/notifications"
            element={<Notificationssa />}
          />
          <Route path="/superadmin/setting" element={<Settingsa />} />
          <Route path="/superadmin/suport" element={<Suportsa />} />
          <Route path="/superadmin/dealDetails" element={<DealDetailsS />} />
        </Route>

        <Route
          element={
            <PrivateRoute allowedRoles={[ROLES.SALES]}>
              {" "}
              <SalesLayout />{" "}
            </PrivateRoute>
          }
        >
          <Route path="/sales/dashboard" element={<Dashboardsr />} />
          <Route path="/sales/services" element={<Servicessr />} />
          <Route path="/sales/prodetails" element={<Prodetailssr1 />} />
          <Route path="/sales/editpros" element={<EditsaleProvider />} />
          <Route path="/sales/dealdetails" element={<DealsDetailssr />} />
          <Route path="/sales/reports" element={<ReportsSr />} />
          <Route path="/sales/clients" element={<Clientssr />} />
          <Route path="/sales/clientprofile" element={<ClientProfilesr />} />
          <Route path="/sales/editclient" element={<EditClientSr />} />
          <Route path="/sales/tasklist" element={<TaskListsr />} />
          <Route path="/sales/recentdeals" element={<RecentDeals />} />
          <Route path="/sales/notification" element={<Notificationsr />} />
          <Route path="/sales/setting" element={<SettingSr />} />
          <Route path="/sales/support" element={<SupportSr />} />
          <Route path="/sales/chat" element={<Chatsr />} />
          <Route path="/sales/profile" element={<Profiles />} />
        </Route>
        <Route path={ROUTES.PUBLIC.HOME} element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route
            path={ROUTES.PUBLIC.CATALOG_RESULT}
            element={<CatalogResult />}
          />
          <Route path={ROUTES.PUBLIC.DEAL_DETAILS} element={<DealDetailsH />} />
        </Route>
        <Route path={ROUTES.PUBLIC.LOGIN} element={<Login />} />
        <Route path={ROUTES.PUBLIC.REGISTER} element={<Register />} />
        <Route path={ROUTES.PUBLIC.SIGNUP} element={<Signup />} />
        <Route
          path={ROUTES.PUBLIC.PRIVACY_POLICY}
          element={<PrivacyPolicy />}
        />
        <Route
          path={ROUTES.PUBLIC.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route path={ROUTES.PUBLIC.NEW_PASSWORD} element={<NewPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
