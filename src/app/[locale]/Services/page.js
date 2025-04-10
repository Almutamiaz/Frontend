"use client";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import Footer from "@/components/Footer";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import OfferCard from "@/components/OfferCard";
import SelectBox from "@/components/SelectBox";
import Tag from "@/components/Tag";
import { Button, Row } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const Page = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col gap-[60px]">
      <div className="container overflow-visible mt-[170px] flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex inputStyles gap-4 flex-wrap">
            <HeroSectionInput
              height="56px"
              // onChange={onChange}
              width="369px"
              placeholder={t("searchOnOffer")}
            />
            <SelectBox width={"273px"} placeholder={t("city")} />
            <div className="flex gap-2 ms-auto">
              <div className="w-[56px] h-[56px] bg-[var(--neutral-200)] rounded-[1000px] flex justify-center items-center">
                <SettingsIcon />
              </div>
              <Button className="py-[18.5px] px-7 font-semibold text-base leading-[19.36px] text-[var(--neutral-100)]">
                {t("search")}
              </Button>
            </div>
          </div>
          <div className="flex gap-1">
            <Tag
              active={activeTab === 2}
              key={2}
              text={t("allOffers")}
              onClick={() => setActiveTab(2)}
              classNameProp={
                activeTab === 2 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
              }
              withoutBorder
              bgColorProp="#F4F4F4"
              textColorProp="#2F2B3DE5"
            />
            <Tag
              active={activeTab === 3}
              key={3}
              text={t("skin")}
              onClick={() => setActiveTab(3)}
              classNameProp={
                activeTab === 3 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
              }
              withoutBorder
              bgColorProp="#F4F4F4"
              textColorProp="#2F2B3DE5"
            />
            <Tag
              active={activeTab === 4}
              key={4}
              text={t("laser")}
              onClick={() => setActiveTab(4)}
              classNameProp={
                activeTab === 4 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
              }
              withoutBorder
              bgColorProp="#F4F4F4"
              textColorProp="#2F2B3DE5"
            />
            <Tag
              active={activeTab === 5}
              key={5}
              text={t("laboratories")}
              onClick={() => setActiveTab(5)}
              classNameProp={
                activeTab === 5 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
              }
              withoutBorder
              bgColorProp="#F4F4F4"
              textColorProp="#2F2B3DE5"
            />
            <Tag
              active={activeTab === 6}
              key={6}
              text={t("dental")}
              onClick={() => setActiveTab(6)}
              classNameProp={
                activeTab === 6 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
              }
              withoutBorder
              bgColorProp="#F4F4F4"
              textColorProp="#2F2B3DE5"
            />
            <Tag
              active={activeTab === 7}
              key={7}
              text={t("cosmetic")}
              onClick={() => setActiveTab(7)}
              classNameProp={
                activeTab === 7 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
              }
              withoutBorder
              bgColorProp="#F4F4F4"
              textColorProp="#2F2B3DE5"
            />
            <Tag
              active={activeTab === 8}
              key={8}
              text={t("maternityAndChildCare")}
              onClick={() => setActiveTab(8)}
              classNameProp={
                activeTab === 8 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
              }
              withoutBorder
              bgColorProp="#F4F4F4"
              textColorProp="#2F2B3DE5"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-xl leading-[24.2px] text-[var(--primary-700)]">
            {t("results")} (380)
          </span>
          <Row gutter={[16, 16]} className="w-full">
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
