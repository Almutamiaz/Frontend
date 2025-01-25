"use client";
import { Drawer } from "antd";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const FiltersDrawer = () => {
  const { locale } = useParams();
  const [open, setOpen] = useState(!false);
  const t = useTranslations();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      placement={locale == "en" ? "left" : "right"}
      closable={false}
      onClose={onClose}
      open={open}
      key={"placement"}
      autoFocus={false}
      width={393}
      getContainer={false}
      style={{
        fontFamily: "var(--fontFamily)",
        // background:"red"
        // padding:'20px'
      }}
      className="[&>.ant-drawer-body]:px-5 [&>.ant-drawer-body]:pt-10"
    >
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="text-[20px] font-bold leading-[24.2px] text-[#181C32]">
            {t("advancedFilter")}
          </span>
          <span className="text-[14px] font-medium leading-[16.94px] text-[var(--DescriptionColor2)]">
            {t("reset")}
          </span>
        </div>
      </div>
    </Drawer>
  );
};

export default FiltersDrawer;
