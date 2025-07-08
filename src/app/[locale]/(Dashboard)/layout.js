"use client";
import SideBar from "@/components/SideBar";
import React from "react";
import "../../../style/general.css";
import "../../../style/componentsStyle.css";
import AuthWrapper from "@/components/AuthWrapper";
const Layout = ({ children, params }) => {
  return (
    <AuthWrapper>
      <div className="container overflow-visible mt-[130px] flex gap-4 pb-5">
        <SideBar />
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </AuthWrapper>
  );
};

export default Layout;
