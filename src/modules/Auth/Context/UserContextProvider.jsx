import React, { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [UserData, setUserData] = useState({});
  return (
    <UserContext.Provider value={{ UserData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
