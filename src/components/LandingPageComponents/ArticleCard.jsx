import Milk from "@/assets/images/Milk.jpg";
import Image from "next/image";
const ArticleCard = ({ hospitalName, title, hospitalImg, articleImg }) => {
  return (
    <div
      className="ArticleCard rounded-[12px] h-[500px] relative overflow-hidden px-6 pb-8 flex items-end min-w-[300px] max-[450px]:min-w-full"
      style={{
        backgroundImage: `url(${articleImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        flex: 1,
      }}
    >
      <div className="flex flex-col gap-6 z-[2]">
        <p className="text-[20px] font-semibold leading-[28px] text-[var(--neutral-100)]">
          {title}
        </p>
        <div className="flex gap-[9px]">
          <Image
            src={hospitalImg}
            alt="Doctor Image"
            className="rounded-[50%] w-[24px] h-[24px]"
            width={24}
            height={24}
          />
          <span className="text-base font-medium leading-[22.4px] text-[var(--neutral-100)]">
            {hospitalName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
