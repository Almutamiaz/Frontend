import ArrowIcon from "@/assets/icons/ArrowIcon";
import { useTranslations } from "next-intl";
import React from "react";

const ServiceCategoryCard = ({ title, des, img, flex }) => {
  const t = useTranslations();

  return (
    <div
      className="flex flex-col rounded-[40px] pt-10 pb-[30px] ps-8 justify-between h-[320px] bg-[var(--gray)]"
      style={{ flex: flex }}
    >
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold leading-[60px] tracking-[-0.03em]">
          Skin care
        </span>
        <span className="text-base font-medium leading-[60px] tracking-[-0.03em]">
          Skin care Skin care
        </span>
      </div>
      <div className="flex gap-[9px] items-center">
        <span className="text-base font-medium leading-[60px] tracking-[-0.03em]">
          {t("exploreServices")}
        </span>
        <ArrowIcon size={11} />
      </div>
    </div>
  );
};

export default ServiceCategoryCard;
