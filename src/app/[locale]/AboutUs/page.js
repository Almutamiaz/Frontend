import Image from "next/image";
import React from "react";
import AboutUsImage from "@/assets/images/AboutUsImage.png";
import AboutUsImage2 from "@/assets/images/AboutUsImage2.png";
import { useTranslations } from "next-intl";
import { Row } from "antd";
import ValueCard from "@/components/ValueCard";
import CompassionateCareIcon from "@/assets/icons/CompassionateCareIcon";
import ExcellenceInServiceIcon from "@/assets/icons/ExcellenceInServiceIcon";
import TrustAndIntegrityIcon from "@/assets/icons/TrustAndIntegrityIcon";
import Footer from "@/components/Footer";

const Page = () => {
  const t = useTranslations();
  return (
    <div className="bg-[#FAFAFA] min-h-[988px] flex flex-col gap-[60px]">
      <div className="container overflow-visible mt-[150px] flex flex-col gap-[60px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText">
              {t("smartPlatformDescription")}
            </h1>
            <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] whitespace-pre-line">
              {t("connectAndOfferServices")}
              {`\n`}
              {t("safeHands")}
            </p>
          </div>
          <div className="h-[492px] w-full">
            <Image
              src={AboutUsImage}
              alt="About Us"
              className="object-cover rounded-[16px] w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[60px]">
          {/* <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText text-center">
              {t("mission")}
            </h1>
            <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] text-center">
              {t("hakeemMission")}
            </p>
          </div> */}
          {/* <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText text-center">
              {t("ourValues")}
            </h1>
            <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] text-center">
              {t("hakeemValues")}
            </p>
          </div> */}
          {/* <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText text-center">
              {t("vision")}
            </h1>
            <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] text-center">
              {t("hakeemVision")}
            </p>
          </div> */}
          <Row gutter={[16, 16]} className="w-full">
            <ValueCard
              icon={<CompassionateCareIcon />}
              title={t("ourValues")}
              des={t("hakeemValues")}
            />
            <ValueCard
              icon={<ExcellenceInServiceIcon />}
              title={t("vision")}
              des={t("hakeemVision")}
            />
            <ValueCard
              icon={<TrustAndIntegrityIcon />}
              title={t("mission")}
              des={t("hakeemMission")}
            />
          </Row>
          <div className="flex gap-9 max-md:flex-col">
            <div className="flex-1 flex flex-col gap-4 bg-[#F2F2F2] rounded-[16px] p-6">
              <h2 className="font-bold text-3xl leading-[44px] tracking-[0px] text-[var(--Black-900)]">
                {t("healthPriority")}
              </h2>
              <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--Black-400)]">
                {t("accessHealthcare")}
              </p>
            </div>
            <div className="h-[344px] flex-1">
              <Image
                src={AboutUsImage2}
                alt="About Us"
                className="object-cover rounded-[16px] w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
