import Image from "next/image";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import LocationIcon from "@/assets/icons/LocationIcon";
import RateIcon from "@/assets/icons/RateIcon";
import WalletIcon from "@/assets/icons/WalletIcon";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import ClientLink from "./ClientLink";

const DoctorCardResults = ({ name, specialization, city, rate, img }) => {
  const t = useTranslations();

  return (
    <div className="h-[330px] w-[271px] rounded-[12px] border border-[var(--neutral-200)] flex flex-col overflow-hidden relative">
      <div className="h-[94px] bg-[var(--neutral-200)]"></div>
      <div className="absolute top-9 left-6 flex flex-col gap-4">
        <div className="w-20 h-20 rounded-[50%]">
          <Image
            className="w-full h-full rounded-[50%] object-cover"
            src={img}
            alt={name}
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-base leading-6 text-[var(--primary-800)]">
            {name}
          </span>
          <span className="font-medium text-sm leading-[21px] text-[var(--neutral-700)]">
            {specialization}
          </span>
          <div className="flex gap-[6px] items-center">
            <LocationIcon w={11} h={13} color="var(--neutral-900)" />
            <span className="font-medium text-xs leading-[18px] text-[var(--primary-800)] mt-[3px]">
              {city}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-[6px] items-center">
            <RateIcon color="var(--secondary-300)" />
            <span className="font-medium text-xs leading-[18px] text-[var(--primary-800)] mt-[3px]">
              {rate}
            </span>
          </div>
          <span className="text-[#979797]">|</span>
          <div className="flex gap-[6px] items-center">
            <WalletIcon />
            <span className="font-medium text-xs leading-[14.52px] text-[var(--primary-800)] mt-[3px]">
              240 SR
            </span>
          </div>
        </div>
        <Button className="h-[48px] w-[223px] font-medium text-sm leading-[22px] text-[var(--neutral-700)] bg-[var(--neutral-100)] border border-[var(--neutral-700)]">
          <ClientLink href={"Explore/DoctorList"}>
            {t("viewProfile")}
          </ClientLink>
        </Button>
      </div>
    </div>
  );
};

export default DoctorCardResults;
