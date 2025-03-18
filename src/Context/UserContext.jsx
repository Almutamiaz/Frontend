"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState(null);

  // Fetch user data on mount (client-side only)
  useEffect(() => {
    const fetchUser = async () => {
      // const response = await fetch("/api/user");
      // const data = await response.json();
      setUser(123);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing user context
export const useUser = () => useContext(UserContext);
