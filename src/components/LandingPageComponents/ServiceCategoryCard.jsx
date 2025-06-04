import ArrowIcon from "@/assets/icons/ArrowIcon";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceCategoryCard = async ({
  title,
  des,
  img,
  flex,
  minWidthMobile,
  id,
  blurDiv = false,
  scale = 0.7,
  scaleMobile = 0.6,
}) => {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <Link href={`${locale}/Services?category=${id}`} style={{ flex: flex }}>
      <div
        className={`relative flex flex-col rounded-[40px] pt-10 pb-[30px] ps-8 justify-between h-[320px] bg-[var(--gray)] min-w-[300px] ${
          minWidthMobile
            ? "max-[785px]:!min-w-[166.5px] max-[785px]:h-[200px]"
            : ""
        } max-[1190px]:h-[245px] max-[380px]:min-w-full relative`}
        // style={{ flex: flex }}
      >
        {blurDiv && (
          <div className="blurDiv2 hidden max-md:block"></div>
        )}

        <div className="flex flex-col gap-2 z-[2]">
          <span className="text-2xl font-bold  tracking-[-0.03em]">
            {title}
          </span>
          {/* <span className="text-base font-medium tracking-[-0.03em]">
            Skin care Skin care
          </span> */}
        </div>
        <div className="flex gap-[9px] items-center z-[2]">
          <span className="text-base font-medium leading-[60px] tracking-[-0.03em]">
            {t("exploreServices")}
          </span>
          <ArrowIcon size={11} />
        </div>
        <Image
          src={img}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className={`scale-[${scale}] max-[430px]:scale-[${scaleMobile}]`}
          style={{
            width: "50%",
            height: "100%",
            objectFit: "contain",
            position: "absolute",
            bottom: 0,
            insetInlineEnd: 0,
            zIndex: 1,
          }}
        />
      </div>
    </Link>
  );
};

export default ServiceCategoryCard;
