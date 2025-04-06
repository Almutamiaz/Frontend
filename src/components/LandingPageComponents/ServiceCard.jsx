import { useTranslations } from "next-intl";
import HeaderOfSection from "../HeaderOfSection";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Image from "next/image";
import BookAppointmentImg from "@/assets/images/BookAppointmentIcon.png";

const ServiceCard = ({ bgColor, icon, title, description }) => {
  const t = useTranslations();

  // min-w-[364px] max-[450px]:min-w-[300px]

  return (
    <div
      className="h-[369px] rounded-[20px] overflow-hidden shadow-[0px_3px_12px_0px_#88888824] w-full"
      style={{
        fontFamily: "var(--fontFamily)",
      }}
    >
      <div
        className="h-[193px] flex items-center justify-center overflow-hidden"
        style={{ background: bgColor }}
      >
        <Image
          src={icon}
          alt={title || "Service Icon"}
          // layout="fill"
          // width={369}
          // height={193}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div className="p-6 flex flex-col gap-8">
        <HeaderOfSection
          title={title}
          description={description}
          titleColor="var(--darkColor)"
          titleSize={24}
          titleLH={24}
          DesColor="var(--DescriptionColor2)"
          DesSize={14}
          DesLH={21}
          titleWeight={700}
          DesWeight={400}
          DesAlignSelfStart
          DesMaxWidth={320}
        />
        <div className="flex gap-3 items-center">
          <span className="text-[var(--color1)] text-base font-medium leading-6 tracking-[-0.03em]">
            {t("bookNow")}
          </span>
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;
