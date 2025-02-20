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
import Notification from "./Pages/ServiceProvider/Notification";
import LandingPage from "./Pages/LandingPage";
import Dashboardc from "./Pages/Customer/Dashboard";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProviderLayout />}>
          <Route path="/provider/settings" element={<Settings />} />
          <Route path="/provider/dashboard" element={<Dashboard />} />
          <Route path="/provider/services" element={<Services />} />
          <Route path="/provider/newDeals" element={<NewDeals />} />
          <Route path="/provider/notification" element={<Notification />} />
          <Route path="/provider/support" element={<Support />} />
          <Route path="/provider/favourites" element={<Favourites />} />
          <Route path="/provider/payments" element={<Payments />} />
          <Route path="/provider/orders" element={<Ordersp />} />
        </Route>
        <Route element={<CustomerLayout />}>
          <Route path="/customer/dashboard" element={<Dashboardc />} />
          <Route path="/customer/order-detail" element={<OrderDetail />} />
          <Route path="/customer/bucks" element={<ProBucks />} />
          <Route path="/customer/order" element={<Order />} />
          <Route path="/customer/setting" element={<Setting />} />
          <Route path="/customer/profile" element={<Profile />} />
        </Route>
        <Route element={<SuperAdminLayout />}>
          <Route path="/superadmin/dashboard" element={<Dashboardsa />} />
          <Route path="/superadmin/providers" element={<Providers />} />
          <Route path="/superadmin/prodetails" element={<ProDetails />} />
          <Route path="/superadmin/clients" element={<Clients />} />
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
        </Route>

        <Route element={<SalesLayout />}>
          <Route path="/sales/dashboard" element={<Dashboardsr />} />
          <Route path="/sales/services" element={<Servicessr />} />
          <Route path="/sales/reports" element={<ReportsSr />} />
          <Route path="/sales/clients" element={<Clientssr />} />
          <Route path="/sales/tasklist" element={<TaskListsr />} />
          <Route path="/sales/notification" element={<Notificationsr />} />
          <Route path="/sales/setting" element={<SettingSr />} />
          <Route path="/sales/support" element={<SupportSr />} />
          <Route path="/sales/chat" element={<Chatsr />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
