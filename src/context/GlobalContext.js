import { useContext, createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null,);
  const values = {
    currentUser,
    setCurrentUser,
 
  };

  return (
    <UserContext.Provider value={values}>{children} </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
