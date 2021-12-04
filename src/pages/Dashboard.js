import React from "react";
import { useNavigate } from "react-router";
import Calendar from "../components/Calendar";
import { useUser } from "../context/GlobalContext";
import { auth } from "../firebase";

function Dashboard() {
  const { setCurrentUser } = useUser();
  let navigate = useNavigate()
  const logout = () => {
    auth.signOut();
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");   
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      <div className="absolute right-6 top-6" >
        <button
          className="text-2xl text-indigo-500 font-bold"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      <Calendar />
    </div>
  );
}

export default Dashboard;
