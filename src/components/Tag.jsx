"use client";

const Tag = ({ text, active = false, icon, onClick }) => {
  return (
    <div
      className="px-6 py-[10px] rounded-[1000px] cursor-pointer text-[16px] font-medium leading-[19.36px] flex gap-[10px] items-center"
      style={{
        background: active ? "var(--primary-300)" : "var(--neutral-100)",
        color: active ? "var(--neutral-100)" : "var(--neutral-900)",
        border: `1px solid ${
          active ? "var(--primary-300)" : "var(--neutral-200)"
        }`,
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
