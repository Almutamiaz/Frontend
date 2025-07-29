import Image from "next/image";
import React from "react";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import Tag from "./Tag";
import { useTranslations } from "next-intl";
import { Button } from "antd";
import CallIcon from "@/assets/icons/CallIcon";
import CallIcon2 from "@/assets/icons/CallIcon2";

const DoctorCardMyReservations = () => {
  const t = useTranslations();
  return (
    <div className="p-6 rounded-xl shadow-[0_3px_8px_0_#D2D2D240] flex flex-col gap-4 w-full">
      <div className="flex gap-3 items-center">
        <div className="w-[60px] h-[60px] flex-shrink-0">
          <Image
            src={DummyDoctorImage}
            alt="User Name"
            className="w-full h-full object-cover rounded-[50%]"
          />
        </div>
        <div className="flex justify-between items-center flex-1">
          <div className="flex flex-col">
            <span className="font-medium text-base leading-6 tracking-[0px] text-[#101010] whitespace-nowrap">
              Dr. Salim Samy
            </span>
            <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--DescriptionsColor)]">
              Dentist
            </span>
          </div>
          <Tag
            text={t("pending")}
            classNameProp={
              "py-1 px-3 font-medium text-xs leading-[22px] tracking-[0px]"
            }
            bgColorProp={"#FEB05233"}
            textColorProp={"#FEB052"}
            // bgColorProp={"#00928333"}
            // textColorProp={"#009283"}

            // bgColorProp={"#FF3B301F"}
            // textColorProp={"var(--red)"}
            withoutBorder
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E7E7E7]"></div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
            {t("statementNo")}
          </span>
          <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
            #230909
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
            {t("date")}
          </span>
          <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
            Thr 09 May
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
            {t("time")}
          </span>
          <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
            10:00 Pm
          </span>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E7E7E7]"></div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Button className="hover:!text-[#6441EF] hover:!bg-[var(--neutral-100)] w-full h-12">
            <CallIcon2 />
            {t("call")}
          </Button>
        </div>
        <div className="flex-1">
          <div className="flex justify-center items-center cursor-pointer w-full px-[22px] py-[13px] text-[var(--DescriptionsColor)] border border-[var(--DescriptionsColor)] rounded-[100px] font-medium text-sm leading-[22px] tracking-[0px] h-12 whitespace-nowrap">
            {t("cancelReservation")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCardMyReservations;
