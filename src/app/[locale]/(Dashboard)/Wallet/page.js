"use client";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">{t("wallet")}</h1>
    </div>
  );
};

export default Page;
