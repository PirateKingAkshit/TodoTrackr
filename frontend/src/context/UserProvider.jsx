import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const[myList,setMyList]=useState("Personal")
  const navigate = useNavigate();



  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        setUser(userData);
      } else {
        console.log("User Not Logged In");
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  }, [navigate]);


  return (
    <UserContext.Provider value={{ user, setUser, myList, setMyList }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
