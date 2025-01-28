"use client";
import SearchIcon from "@/assets/icons/SearchIcon";
import { Input } from "antd";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import React from "react";

const HeroSectionInput = () => {
  const t = useTranslations();

  return (
    <Input
      style={{
        height: "54px",
        borderRadius: "100px",
        // fontFamily: "var(--fontFamily)",
      }}
      placeholder={t("searchPlaceholder")}
      prefix={<SearchIcon />}
      onClick={() => redirect(`/en/Explore`)}
    />
  );
};

export default HeroSectionInput;
