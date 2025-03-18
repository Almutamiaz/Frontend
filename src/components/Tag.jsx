"use client";

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
}) => {
  return (
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
      onClick={onClick}
    >
      {icon}
      {text}
    </div>
  );
};

export default Tag;
