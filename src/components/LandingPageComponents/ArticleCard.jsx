import Milk from "@/assets/images/Milk.jpg";
import Image from "next/image";
const ArticleCard = ({ drName, title }) => {
  return (
    <div
      className="ArticleCard rounded-[12px] h-[500px] relative overflow-hidden px-6 pb-8 flex items-end"
      style={{
        background: `url(${Milk.src})`,
        backgroundSize: "cover !important", // Ensures the image covers the entire div
        backgroundPosition: "center !important", // Centers the image
        backgroundRepeat: "no-repeat !important", // Prevents tiling
        flex: 1,
      }}
    >
      <div className="flex flex-col gap-6 z-[2]">
        <p className="text-[20px] font-semibold leading-[28px] text-[var(--neutral-100)]">
          {title}
        </p>
        <div className="flex gap-[9px]">
          <Image
            src={Milk}
            alt="Doctor Image"
            className="rounded-[50%] w-[24px] h-[24px]"
          />
          <span className="text-base font-medium leading-[22.4px] text-[var(--neutral-100)]">
            {drName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
