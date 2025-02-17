import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import Dashboard from "./Pages/User/Dashboard";
import Test from "./Pages/SuperAdmin/Test";
import Clients from "./Pages/SuperAdmin/Clients";
import Sales from "./Pages/SuperAdmin/Sales";
import Reports from "./Pages/SuperAdmin/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
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
