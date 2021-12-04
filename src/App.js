import React,{ useEffect, useState } from "react";
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
  const [user , setUser] = useState( currentUser || null);
  useEffect(() => {
    if(currentUser){
      setUser(currentUser);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="w-full min-h-screen font-sans bg-gray-light">
      <Router>
        <Routes>
          {user ? (
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
