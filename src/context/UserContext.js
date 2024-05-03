import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../util/Api";

const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("access_token"));
  //todo update to refresh token when not valid
  /* useEffect(() => {
    const storedUser = localStorage.getItem("refresh_token");
    if (storedUser) {
      api.get("/auth/refresh-token").then((response) => {
        console.log(response);
        if (storedUser && response?.data?.status_code === 200) {
          setUser(JSON.parse(storedUser));
        } else {
          logout();
        }
      });
    }
  }, []);*/
  const login = (data) => {
    try {
      setUser(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    } catch (error) {
      console.error("Error saving user to localStorage", error);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
