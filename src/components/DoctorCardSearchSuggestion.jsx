import Image from "next/image";
import Link from "next/link";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import { useTranslations } from "next-intl";

const DoctorCardSearchSuggestion = ({ img, name, specialization, href = "" }) => {
  const t = useTranslations();

  return (
    <div className="flex gap-3 items-center border-b-[0.5px] border-[var(--neutral-200)] pb-[9px]">
      <div className="w-[44px] h-[44px] overflow-hidden">
        <Image
          className="w-full h-full rounded-[50%] object-cover"
          src={img}
          alt="Doctor Image"
          width={44}
          height={44}
          sizes="100vw"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-base leading-6 text-[var(--neutral-1000)]">
          {name}
        </span>
        <span className="font-medium text-sm leading-[21px] text-[var(--neutral-700)]">
          {specialization}
        </span>
      </div>
      <Link href={href} className="ms-auto">
        <div className="px-4 py-[10px] bg-[var(--neutral-200)] text-[var(--neutral-1000)] rounded-[87px] font-normal text-sm leading-[16.94px] h-[37px]">
          {t("view")}
        </div>
      </Link>
    </div>
  );
};

export default DoctorCardSearchSuggestion;
