"use client";
import SideBar from "@/components/SideBar";
import React from "react";
import "../../../style/general.css";
import "../../../style/componentsStyle.css";
const Layout = ({ children, params }) => {
  return (
    <div className="container overflow-visible mt-[130px] flex gap-4 pb-5">
      <SideBar />
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
};

export default Layout;
