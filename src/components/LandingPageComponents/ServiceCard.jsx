import { useTranslations } from "next-intl";
import HeaderOfSection from "../HeaderOfSection";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Image from "next/image";
import BookAppointmentImg from "@/assets/images/BookAppointmentIcon.png";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

const ServiceCard = async ({ bgColor, icon, title, description, id }) => {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <Link href={`${locale}/Explore?service_id=${id}`}>
      <div
        className="h-[379px] rounded-[20px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-full max-[430px]:h-[270px]"
        style={{
          fontFamily: "var(--fontFamily)",
          cursor: "pointer",
        }}
      >
        <div
          className="h-[193px] flex items-center justify-center overflow-hidden max-[430px]:h-[150px] [&>img]:scale-[0.7]  max-[430px]:[&>img]:scale-[0.6]"
          // max-[430px]:[&>img]:!w-[70%]
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
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: "scale(0.6)",
            }}
          />
        </div>
        <div className="p-6 flex flex-col overflow-hidden max-[430px]:pt-0">
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
            responsiveFontSizes
            lineClamp={2}
            extraClass="serviceCard min-h-[98px]"
          />
        </div>
        <div className="p-6 flex gap-3 items-center max-[430px]:hidden pt-0">
          <span className="text-[var(--color1)] text-base font-medium leading-6 tracking-[-0.03em]">
            {t("bookNow")}
          </span>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  );
};
export default ServiceCard;
