import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProviderLayout from "./Layouts/ProviderLayout";
import Dashboard from "./Pages/ServiceProvider/Dashboard";
import Test from "./Pages/SuperAdmin/Test";
import Clients from "./Pages/SuperAdmin/Clients";
import Sales from "./Pages/SuperAdmin/Sales";
import Reports from "./Pages/SuperAdmin/Reports";
import HomeLayout from "./Layouts/HomeLayout";
import Login from "./Pages/Auth/Login";
import Settings from "./Pages/ServiceProvider/Settings";
import Register from "./Pages/Auth/Register";
import Signup from "./Pages/Auth/Signup";
import PrivacyPolicy from "./Pages/Auth/PrivacyPolicy";
import Services from "./Pages/ServiceProvider/Services";
import NewDeals from "./Pages/ServiceProvider/NewDeals";
import Notification from "./Pages/ServiceProvider/Notification";
import Support from "./Pages/ServiceProvider/Support";

import SuperAdminLayout from "./Layouts/SuperAdminLayout.";
import LandingPage from "./Pages/LandingPage";

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
        </Route>
        <Route element={<SuperAdminLayout />}>
          <Route path="/superAdmin/clients" element={<Clients />} />
          <Route path="/superAdmin/sales" element={<Sales />} />
          <Route path="/superAdmin/reports" element={<Reports />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/test" element={<Test />} />
       
      </Routes>
    </Router>
  );
}

export default App;
