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

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProviderLayout />}>
          <Route path="/serviceprovider/dashboard" element={<Dashboard />} />
          <Route path="/user/notification" element={<Notification />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/test" element={<Test />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
