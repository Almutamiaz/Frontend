"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token") || null);
  const [servicesChangePageLoading, setServicesChangePageLoading] =
    useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        servicesChangePageLoading,
        setServicesChangePageLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing user context
export const useUser = () => useContext(UserContext);
