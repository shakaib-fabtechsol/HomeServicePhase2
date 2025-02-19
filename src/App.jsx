import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProviderLayout from "./Layouts/ProviderLayout";
import Dashboard from "./Pages/ServiceProvider/Dashboard";
import Test from "./Pages/SuperAdmin/Test";
import Clients from "./Pages/SuperAdmin/Clients";
import Sales from "./Pages/SuperAdmin/Sales";
import Reports from "./Pages/SuperAdmin/Reports";
import Notification from "./Pages/User/Notification";
import HomeLayout from "./Layouts/HomeLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Signup from "./Pages/Auth/Signup";
import PrivacyPolicy from "./Pages/Auth/PrivacyPolicy";
import Services from "./Pages/ServiceProvider/Services";
import NewDeals from "./Pages/ServiceProvider/NewDeals";
import SuperAdminLayout from "./Layouts/SuperAdminLayout.";
import Providers from "./Pages/SuperAdmin/Providers";
import Conversation from "./Pages/SuperAdmin/Conversation";
import Dashboardsa from "./Pages/SuperAdmin/Dashboardsa";
import ProDetails from "./Pages/SuperAdmin/Prodetails";
import SalesRepd from "./Pages/SuperAdmin/SalesRepd";
import EditSalesRep from "./Pages/SuperAdmin/EditSalesRep";
import Notificationssa from "./Pages/SuperAdmin/Notificationssa";
import Settingsa from "./Pages/SuperAdmin/Settingsa";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProviderLayout />}>
          <Route path="/provider/dashboard" element={<Dashboard />} />
          <Route path="/provider/services" element={<Services />} />
          <Route path="/provider/newDeals" element={<NewDeals />} />
          <Route path="/user/notification" element={<Notification />} />
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
          <Route
            path="/superadmin/notifications"
            element={<Notificationssa />}
          />
          <Route path="/superadmin/setting" element={<Settingsa />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
