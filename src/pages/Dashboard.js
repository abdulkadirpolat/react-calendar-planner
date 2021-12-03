import React from "react";
import Calendar from "../components/Calendar";
import { useUser } from "../context/GlobalContext";
import { auth } from "../firebase";

function Dashboard() {
  const { setCurrentUser } = useUser();
  const logout = () => {
    auth.signOut();
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div>
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
