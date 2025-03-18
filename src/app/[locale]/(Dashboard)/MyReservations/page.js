"use client";
import DoctorCardMyReservations from "@/components/DoctorCardMyReservations";
import Tag from "@/components/Tag";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState(1);
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-5">
      {/* tags section */}
      <div className="flex gap-1">
        <Tag
          active={activeTab === 1}
          key={1}
          text={t("all")}
          onClick={() => setActiveTab(1)}
          classNameProp={
            activeTab === 1 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
          }
          withoutBorder
          bgColorProp="#F4F4F4"
          textColorProp="#2F2B3DE5"
          activBgColorProp="#7E53FD33"
          activeTextColorProp="var(--primary-color)"
        />
        <Tag
          active={activeTab === 2}
          key={2}
          text={t("confirmed")}
          onClick={() => setActiveTab(2)}
          classNameProp={
            activeTab === 2 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
          }
          withoutBorder
          bgColorProp="#F4F4F4"
          textColorProp="#2F2B3DE5"
          activBgColorProp="#7E53FD33"
          activeTextColorProp="var(--primary-color)"
        />
        <Tag
          active={activeTab === 3}
          key={3}
          text={t("waitingForPayment")}
          onClick={() => setActiveTab(3)}
          classNameProp={
            activeTab === 3 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
          }
          withoutBorder
          bgColorProp="#F4F4F4"
          textColorProp="#2F2B3DE5"
          activBgColorProp="#7E53FD33"
          activeTextColorProp="var(--primary-color)"
        />
        <Tag
          active={activeTab === 4}
          key={4}
          text={t("waitingForConfirm")}
          onClick={() => setActiveTab(4)}
          classNameProp={
            activeTab === 4 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
          }
          withoutBorder
          bgColorProp="#F4F4F4"
          textColorProp="#2F2B3DE5"
          activBgColorProp="#7E53FD33"
          activeTextColorProp="var(--primary-color)"
        />
      </div>
      <div className="flex gap-6 flex-wrap">
        <DoctorCardMyReservations />
      </div>
    </div>
  );
};

export default Page;
