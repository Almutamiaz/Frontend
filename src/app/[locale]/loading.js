import React from "react";
import HakeemHealthCareLogo from "@/assets/icons/HakeemHealthCareLogo";

const loading = () => {
  return (
    <div className="text-[#000] min-h-screen flex items-center justify-center z-[1] bg-[var(--neutral-100)]">
      <div className="animate-spin-slow">
        <HakeemHealthCareLogo color="var(--primary-color)" />
      </div>
    </div>
  );
};

export default loading;
