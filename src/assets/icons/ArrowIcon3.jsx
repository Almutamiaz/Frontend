import React from "react";
import { useLocale } from "next-intl";

const ArrowIcon3 = () => {
  const locale = useLocale();
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14.735 8.368"
      style={{ transform: locale === "ar" ? "rotate(90deg)" : "rotate(270deg)" }}
    >
      <path
        d="m1.414 1.414 5.953 5.953 5.954-5.953"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        data-name="Down Arrow Icon"
      ></path>
    </svg>
  );
};

export default ArrowIcon3;
