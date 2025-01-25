import ArrowIcon from "@/assets/icons/ArrowIcon";
import { useTranslations } from "next-intl";
import React from "react";

const ServiceCategoryCard = ({ title, des, img, flex, minWidthMobile }) => {
  const t = useTranslations();

  return (
    <div
      className={`flex flex-col rounded-[40px] pt-10 pb-[30px] ps-8 justify-between h-[320px] bg-[var(--gray)] min-w-[300px] ${
        minWidthMobile
          ? "max-[785px]:!min-w-[166.5px] max-[785px]:h-[200px]"
          : ""
      } max-[1190px]:h-[245px] max-[380px]:min-w-full`}
      style={{ flex: flex }}
    >
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold  tracking-[-0.03em]">
          Skin care
        </span>
        <span className="text-base font-medium tracking-[-0.03em]">
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
