"use client";
import { Drawer } from "antd";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import SideBar from "./SideBar";

const DashboardDrawer = ({ sideBarDrawer, setSideBarDrawer }) => {
  const { locale } = useParams();
  const onClose = () => {
    setSideBarDrawer(false);
  };
  return (
    <Drawer
      placement={locale == "ar" ? "right" : "left"}
      closable={false}
      onClose={onClose}
      open={sideBarDrawer}
      key={"placement"}
      autoFocus={false}
      width={330}
      style={{
        fontFamily: "var(--fontFamily)",
      }}
    >
      <SideBar responsive setSideBarDrawer={setSideBarDrawer}/>
    </Drawer>
  );
};

export default DashboardDrawer;
