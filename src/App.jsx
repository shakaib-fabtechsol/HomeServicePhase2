import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import Dashboard from "./Pages/User/Dashboard";
import Notification from "./Pages/User/Notification";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/notification" element={<Notification />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
