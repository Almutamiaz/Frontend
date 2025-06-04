import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import HakeemApp from "@/assets/images/HakeemApp.png";
import HakeemAppQR4 from "@/assets/images/HakeemAppQR4.png";
import GooglePlayDark from "@/assets/images/GooglePlayDark.png";
import AppStoreDark from "@/assets/images/AppStoreDark.png";
import Arrow from "@/assets/images/Arrow.png";

const Page = () => {
  const t = useTranslations();
  return (
    <div className="bg-[#FAFAFA] flex flex-col gap-[60px] min-h-screen">
      <div className="container overflow-visible mt-[150px] flex flex-col gap-[60px]">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText">
            {t("hakeemApp")}
          </h1>
          <div className="rounded-[24px] bg-[#F3F1FD] flex py-[70px] px-[60px] max-sm:px-5 gap-5 flex-wrap">
            <div className="flex justify-center items-center flex-1 h-full min-w-[300px] max-sm:min-w-full">
              <Image src={HakeemApp} alt="Hakeem App" />
            </div>
            <div className="flex flex-col gap-[50px] flex-1">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 align-center">
                  <span className="text-[32px] font-extrabold leading-[38.4px] text-[var(--color1)] max-[750px]:text-center">
                    {t("downloadHakeemAppNow")}
                  </span>
                  <span className="text-base font-medium leading-[19.84px] text-[var(--DescriptionColor2)] max-[750px]:text-center">
                    {t("downloadHakeemAppDetails")}
                  </span>
                </div>
                <div className="flex gap-6 flex-wrap justify-center">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.hakeem.patient.hakeem_patient&hl=en_US"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={GooglePlayDark}
                      alt="Google Play Download App"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/sa/app/hakeem-%D8%AD%D9%83%D9%8A%D9%85/id1669070452"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src={AppStoreDark} alt="App Store Download App" />
                  </a>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="h-[1px] bg-[#ccc] flex-1"></div>
                  <span className="text-[20px] font-semibold leading-6 text-[var(--color1)] mx-6">
                    {t("or").toUpperCase()}
                  </span>
                  <div className="h-[1px] bg-[#ccc] flex-1"></div>
                </div>
              </div>
              <div className="flex gap-5 justify-between max-sm:justify-center max-sm:flex-wrap">
                <div className="flex flex-col items-center gap-[6px] ms-[auto] max-sm:ms-0">
                  <div className="text-2xl font-bold leading-[28.8px] text-[var(--color1)] flex flex-col items-center self-start">
                    <span className="block">{t("scanQr")}</span>
                    <span className="block text-center">
                      {t("forDownloadApp")}
                    </span>
                  </div>
                  <Image
                    src={Arrow}
                    alt="Arrow"
                    className="rtl:[transform:rotateY(180deg)]"
                  />
                </div>
                <div className="h-[200px] max-w-[200px] rounded-xl overflow-hidden">
                  <Image
                    src={HakeemAppQR4}
                    alt="Hakeem App QR Code"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
