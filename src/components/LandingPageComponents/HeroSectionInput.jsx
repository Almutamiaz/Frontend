"use client";
import SearchIcon from "@/assets/icons/SearchIcon";
import { Input } from "antd";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const HeroSectionInput = ({
  suffix,
  height = "54px",
  onClick,
  onChange,
  width,
  placeholder,
  isServices,
  value,
  margin = "0px",
}) => {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useParams();
  const [newValue, setNewValue] = useState(value);

  const handleSearch = (e) => {
    if (onChange) {
      onChange(e);
    } else {
      // Default behavior: update URL with search query while preserving locale
      setNewValue(e.target.value);
      const url = new URL(window.location.href);
      url.searchParams.set("search", e.target.value);
      window.history.pushState({}, "", url.toString());
    }
  };
  return (
    <Input
      style={{
        height: height,
        borderRadius: "100px",
        maxWidth: width || "auto",
        margin: margin,
        // fontFamily: "var(--fontFamily)",
      }}
      placeholder={placeholder || t("searchPlaceholder")}
      value={newValue}
      prefix={<SearchIcon />}
      onClick={
        ["/en", "/ar"].includes(pathname)
          ? () => router.push(`/${locale}/Explore`)
          : onClick
      }
      onChange={handleSearch}
      suffix={suffix || null}
    />
  );
};

export default HeroSectionInput;
