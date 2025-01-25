import ArrowIcon from "@/assets/icons/ArrowIcon";
import Image from "next/image";
import React from "react";

const HakeemCard = ({
  title,
  subTitle,
  actionText,
  bgColor,
  imgSrc,
  bgCircleColor,
  textColor,
  flexSize,
  tailwindStyles = "",
}) => {
  return (
    <div
      className="h-[232px] rounded-[20px] flex items-center px-5 relative overflow-hidden min-w-[300px] max-[380px]:min-w-full"
      style={{ backgroundColor: bgColor, flex: flexSize }}
    >
      <div className="blurDiv hidden max-[950px]:block  max-[783px]:hidden max-[500px]:block"></div>
      <div className="flex flex-col gap-5 z-[3]">
        <div className="flex flex-col gap-1" style={{ color: textColor }}>
          <span className="text-2xl font-bold leading-[48px]">{title}</span>
          <span className="text-base font-normal leading-6 max-w-[330px]">
            {subTitle}
          </span>
        </div>
        <div className="flex gap-2 items-center rtl:[&>svg]:!rotate-[-135deg] hakeemCardDiv">
          <span
            className="text-sm font-semibold leading-[21px]"
            // style={{ color: textColor }}
          >
            {actionText}
          </span>
          <ArrowIcon size={8} deg={45} color={"#5A92AC"} mt={1} />
        </div>
      </div>
      <div
        // className="absolute w-[232px] top-0 right-0 h-[100%] bg-slate-500 rounded-[50%] translate-x-[50%]"
        className="absolute w-[232px] top-0 end-0 h-[100%] rounded-[50%] ltr:translate-x-[46%] rtl:translate-x-[-46%]"
        style={{ backgroundColor: bgCircleColor }}
      >
        <Image
          src={imgSrc}
          alt="Icon"
          className={`h-full w-full object-contain ${tailwindStyles}`}
        />
      </div>
    </div>
  );
};

export default HakeemCard;
