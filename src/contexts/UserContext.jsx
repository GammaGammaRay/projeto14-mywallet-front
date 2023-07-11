import { useState, createContext } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState({name:"", email:""});
  const [entriesArray, setEntriesArray] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, entriesArray, setEntriesArray }}>
      {children}
    </UserContext.Provider>
  );
}
