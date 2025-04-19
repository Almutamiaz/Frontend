"use client";

import { Button } from "antd";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const SearchButton = ({ destination }) => {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations();
  const params = new URLSearchParams(searchParams);
  const href = `/${locale}/${destination}?${params.toString()}`;

  return (
    <Link href={href}>
      <Button className="py-[18.5px] px-7 font-semibold text-base leading-[19.36px] text-[var(--neutral-100)]">
        {t("search")}
      </Button>
    </Link>
  );
};

export default SearchButton;
