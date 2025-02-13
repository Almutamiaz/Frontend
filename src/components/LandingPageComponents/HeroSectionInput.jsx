"use client";
import SearchIcon from "@/assets/icons/SearchIcon";
import { Input } from "antd";
import { useTranslations } from "next-intl";
import { redirect, usePathname } from "next/navigation";
import React from "react";

const HeroSectionInput = ({
  suffix,
  height = "54px",
  onClick,
  onChange,
  width,
  placeholder,
}) => {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <Input
      style={{
        height: height,
        borderRadius: "100px",
        maxWidth: width || "auto",
        // fontFamily: "var(--fontFamily)",
      }}
      placeholder={placeholder || t("searchPlaceholder")}
      prefix={<SearchIcon />}
      onClick={
        ["/en", "/ar"].includes(pathname)
          ? () => redirect(`/en/Explore`)
          : onClick
      }
      onChange={onChange}
      suffix={suffix || null}
    />
  );
};

export default HeroSectionInput;
