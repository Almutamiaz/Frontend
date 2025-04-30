"use client";
import StarIcon from "@/assets/icons/StarIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const DoctorCard = ({ img, name, rate, id }) => {
  const t = useTranslations();
  const { locale } = useParams();
  const router = useRouter();
  return (
    <div
      className="flex flex-col py-6 items-center justify-center gap-3 bg-[var(--neutral-100)] min-w-[162px] h-[235px] rounded-[12px] cursor-pointer"
      onClick={() => {
        router.push(`/${locale}/Doctors/${id}`);
      }}
    >
      <Image
        src={img}
        alt="Doctor Image"
        className="w-[124px] h-[124px] object-cover rounded-[50%] border-[0.5px] border-[var(--primary-color)] shadow-[0px_3px_12px_0px_#6060604D]"
        width={124}
        height={124}
        sizes="100vw"
      />
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm font-semibold leading-[21px] text-[var(--Black)]">
          {name}
        </span>
        <div className="flex gap-1 items-center">
          <StarIcon />
          <span className="text-[13px] font-semibold leading-[19.5px] text-[var(--Black)] mt-[3px]">
            {rate < 1 ? t("recentlyAdded") : rate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
