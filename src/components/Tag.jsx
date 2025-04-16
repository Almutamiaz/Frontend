"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const Tag = ({
  text,
  active = false,
  icon,
  onClick,
  classNameProp,
  withoutBorder = false,
  bgColorProp,
  activBgColorProp,
  textColorProp,
  activeTextColorProp,
  href,
  categoryId,
  tabId,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }

    if (href) {
      const params = new URLSearchParams(searchParams.toString());

      if (categoryId) {
        if (categoryId === "all") {
          params.delete("category");
        } else {
          params.set("category", categoryId);
        }
      }

      if (tabId) {
        params.set("tab", tabId);
      }

      // Remove page parameter when changing category
      params.delete("page");

      const newUrl = `${href.split("?")[0]}?${params.toString()}`;
      router.push(newUrl);
    }
  };

  const content = (
    <div
      className={`px-6 py-[10px] rounded-[1000px] cursor-pointer text-[16px] font-medium leading-[19.36px] flex gap-[10px] items-center ${classNameProp}`}
      style={{
        background: active
          ? activBgColorProp || "var(--primary-300)"
          : bgColorProp || "var(--neutral-100)",
        color: active
          ? activeTextColorProp || "var(--neutral-100)"
          : textColorProp || "var(--neutral-900)",
        border: withoutBorder
          ? "none"
          : `1px solid ${active ? "var(--primary-300)" : "var(--neutral-200)"}`,
        transition: "all ease-in-out 0.3s",
      }}
      onClick={handleClick}
    >
      {icon}
      {text}
    </div>
  );

  return content;
};

export default Tag;
