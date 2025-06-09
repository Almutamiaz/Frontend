"use client";

import { Button } from "antd";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
const SearchButton = ({ destination, doctors, loading }) => {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations();
  const params = new URLSearchParams(searchParams);
  const href = `/${locale}/${destination}?${params.toString()}`;
  const [buttonLoading, setButtonLoading] = useState(false);
  useEffect(() => {
    setButtonLoading(false);
  }, [doctors]);
  return (
    <Link
      href={href}
      onClick={() => {
        setButtonLoading(true);
      }}
    >
      <Button
        className="py-[18.5px] px-7 font-semibold text-base leading-[19.36px] text-[var(--neutral-100)] transition-all duration-500 ease-in-out search-button"
        style={{
          width: buttonLoading || loading ? "144px" : "112px",
        }}
      >
        {t("search")}
        {(buttonLoading || loading) && (
          <LoadingSpinner color="var(--neutral-100)" />
        )}
      </Button>
    </Link>
  );
};

export default SearchButton;
