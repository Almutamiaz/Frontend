"use client";

import DownArrow from "@/assets/icons/DownArrow";
import { Dropdown } from "antd";
import { redirect, useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LanguageSwitcher = () => {
  const [dropDownOpened, setDropDownOpened] = useState(false);
  const { locale } = useParams();
  const pathname = usePathname();
  const items = [
    {
      label: locale == "ar" ? "EN" : "AR",
      key: 1,
    },
  ];

  const menuProps = {
    items,
    onClick: () => {
      window.location.href = `${locale == "ar" ? "/en" : "/ar"}${cleanPathname(pathname)}`;
      // redirect(`${locale == "ar" ? "/en" : "/ar"}${cleanPathname(pathname)}`);
    },
  };

  const cleanPathname = (pathname) => {
    const components = pathname.replace(/^\/|\/$/g, "").split("/");
    if (components[0] === "ar" || components[0] === "en") {
      return components.length === 1 ? "" : "/" + components.slice(1).join("/");
    }
    return pathname;
  };

  return (
    <Dropdown
      menu={menuProps}
      // trigger={["click"]}
      onOpenChange={(open) => {
        setDropDownOpened(open);
      }}
      // getPopupContainer={() => dropDown?.current}
      // overlayClassName="antdDropdown"
    >
      <div className="flex gap-[5px] items-center text-[var(--neutral-100)] cursor-pointer">
        <span>{locale.toUpperCase()}</span>
        <DownArrow
          deg={dropDownOpened ? 180 : 0}
        />
      </div>
    </Dropdown>
  );
};

export default LanguageSwitcher;
