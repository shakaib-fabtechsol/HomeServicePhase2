import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import Dashboard from "./Pages/User/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
