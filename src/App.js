import React from "react";
// import { Home, Projects, About, Error } from "./pages/index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useUser } from "./context/GlobalContext";

function App() {
  const { currentUser } = useUser();

  return (
    <div className="w-full min-h-screen font-sans bg-gray-light">
      <Router>
        <Routes>
          {currentUser ? (
            <Route path="dashboard" element={<Dashboard />} />
          ) : null}
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
