"use client";
import SideBar from "@/components/SideBar";
import React, { useState } from "react";
import "../../../style/general.css";
import "../../../style/componentsStyle.css";
import AuthWrapper from "@/components/AuthWrapper";
import DashboardDrawer from "@/components/DashboardDrawer";
import ArrowIcon3 from "@/assets/icons/ArrowIcon3";
const Layout = ({ children }) => {
  const [sideBarDrawer, setSideBarDrawer] = useState(false);
  return (
    <AuthWrapper>
      <DashboardDrawer
        sideBarDrawer={sideBarDrawer}
        setSideBarDrawer={setSideBarDrawer}
      />
      <div className="container overflow-visible mt-[130px] flex gap-4 pb-5 max-[600px]:!max-w-[94%]">
        <div
          className="w-[35px] h-[35px] rounded-[50%] bg-[var(--primary-color)] absolute top-[190px] start-[3px] shrink-0 flex items-center justify-center min-[601px]:hidden shadow-[rgba(0,0,0,0.19)_0px_10px_20px,rgba(0,0,0,0.23)_0px_6px_6px] z-[2]"
          onClick={() => setSideBarDrawer(!sideBarDrawer)}
        >
          <ArrowIcon3 />
        </div>
        <SideBar />
        <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
      </div>
    </AuthWrapper>
  );
};

export default Layout;
