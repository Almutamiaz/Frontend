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
        className="h-[369px] rounded-[20px] overflow-hidden shadow-[0px_3px_12px_0px_#88888824] w-full"
        style={{
          fontFamily: "var(--fontFamily)",
          cursor: "pointer",
        }}
      >
        <div
          className="h-[193px] flex items-center justify-center overflow-hidden max-sm:p-[5px]"
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
        <div className="p-6 flex flex-col max-h-[85px] overflow-hidden">
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
        </div>
        <div className="p-6 flex gap-3 items-center">
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
