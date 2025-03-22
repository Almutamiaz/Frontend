"use client";
// NotificationProvider.jsx
import React, { createContext, useContext } from "react";
import { notification } from "antd";

// 1. Create a Context
const NotificationContext = createContext();

// 2. Export a custom hook to consume the context
export const useAppNotification = () => {
  return useContext(NotificationContext);
};

// 3. Create a Context Provider component
function NotificationProvider({ children }) {
  // Get the [api, contextHolder] from antd's useNotification
  const [api, contextHolder] = notification.useNotification();

  return (
    // Provide "api" to all descendant components
    <NotificationContext.Provider value={api}>
      {/* The contextHolder must be rendered somewhere in the DOM */}
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
