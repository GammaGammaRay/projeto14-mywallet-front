import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const persistedAuth = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(persistedAuth);
  
  function userSignIn(authData) {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  }

  function userSignOut() {
    setAuth(undefined);
    localStorage.removeItem("auth");
  }

  return (
    <UserContext.Provider value={{ auth, userSignIn, userSignOut }}>
      {children}
    </UserContext.Provider>
  );
}
