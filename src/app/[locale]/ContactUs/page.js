import ContactUsSendMessageSection from "@/components/ContactUsSendMessageSection";
import Footer from "@/components/Footer";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations();
  return (
    <div className="bg-[#FAFAFA] min-h-[988px] flex flex-col gap-[60px]">
      <div className="container overflow-visible mt-[150px] flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-[40px] leading-[60px] tracking-[0px] text-[var(--neutral-1000)]">
            {t("contactUs")}
          </h1>
          <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] max-w-[800px]">
            {t("supportMessage")}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-[2] flex-col gap-4">
            <div className="flex flex-col rounded-[16px] bg-[#f2f2f2] p-6 justify-between flex-1">
              <div className="flex flex-col">
                <span className="font-medium text-[32px] leading-[60px] tracking-[0px] text-[var(--neutral-1000)]">
                  {t("phoneNumber")}
                </span>
                <span className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)]">
                  +966533373079
                </span>
              </div>
              <p className="font-normal text-lg leading-[26px] tracking-[0px] text-[var(--neutral-900)]">
                {t("callOurTeam")}
              </p>
            </div>
            <div className="flex flex-col rounded-[16px] bg-[#f2f2f2] p-6 justify-between flex-1">
              <div className="flex flex-col">
                <span className="font-medium text-[32px] leading-[60px] tracking-[0px] text-[var(--neutral-1000)]">
                  {t("emailLabel")}
                </span>
                <span className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)]">
                  info@hakeem.com.sa
                </span>
              </div>
              <p className="font-normal text-lg leading-[26px] tracking-[0px] text-[var(--neutral-900)]">
                {t("supportTeamAvailable")}
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-[3] rounded-[16px] bg-[#f2f2f2] p-6 gap-[30px]">
            <div className="flex flex-col">
              <span className="font-medium text-[32px] leading-[60px] tracking-[0px] text-[var(--neutral-1000)]">
                {t("dropUsMessage")}
              </span>
              <span className="font-normal text-xl leading-[29px] tracking-[0px] text-[var(--neutral-900)]">
                {t("weAreHereToAssist")}
              </span>
              <span className="font-normal text-xl leading-[29px] tracking-[0px] text-[var(--neutral-900)]">
                {t("supportTeamMessage")}
              </span>
            </div>
            <ContactUsSendMessageSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
