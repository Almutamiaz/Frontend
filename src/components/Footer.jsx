import GooglePlayLight from "@/assets/images/GooglePlayLight.png";
import AppStoreLight from "@/assets/images/AppStoreLight.png";
import HakeemHealthCareLogo from "@/assets/icons/HakeemHealthCareLogo";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import TwitterIcon from "@/assets/icons/TwitterIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import CallIcon from "@/assets/icons/CallIcon";
import LetterIcon from "@/assets/icons/LetterIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import { getLocale, getTranslations } from "next-intl/server";
import XIcon from "@/assets/icons/XIcon";
import VisaIcon from "@/assets/icons/VisaIcon";
import MasterCard from "@/assets/icons/MasterCard";
import ApplePay from "@/assets/icons/ApplePay";
import PayTabsIcon from "@/assets/icons/PayTabsIcon";
import TamaraIcon from "@/assets/icons/TamaraIcon";

const Footer = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <div className="min-h-[397px] bg-[#2A193C]">
      <div className="container flex flex-col gap-[75px] pt-[59px] justify-between h-full">
        <div className="flex justify-between gap-8 flex-wrap max-[1440px]:justify-center">
          <div className="flex flex-col gap-5">
            <Link href={`/${locale}`}>
              <HakeemHealthCareLogo />
            </Link>
            <div className="flex flex-col gap-[13px]">
              <span className="text-base font-medium leading-6 text-[var(--neutral-100)] max-[1440px]:text-center">
                {t("downloadOurApp")}
              </span>
              <div className="flex gap-[10px]">
                <a
                  href="https://play.google.com/store/apps/details?id=com.hakeem.patient.hakeem_patient&hl=en_US"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={GooglePlayLight} alt="Google Play Download App" />
                </a>
                <a
                  href="https://apps.apple.com/sa/app/hakeem-%D8%AD%D9%83%D9%8A%D9%85/id1669070452"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={AppStoreLight} alt="App Store Download App" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-12 flex-wrap max-[1440px]:w-full max-[1440px]:justify-between">
            {/* PAGES */}
            <div className="flex flex-col gap-5 [&_a]:text-sm [&_a]:font-medium [&_a]:leading-[16.94px] [&_a]:text-[var(--neutral-100)]">
              <span className="text-lg font-bold leading-[21.78px] text-[var(--neutral-100)] mb-1">
                {t("pages")}
              </span>
              <Link href={`/${locale}/AboutUs`}>{t("aboutUs")}</Link>
              <Link href={`/${locale}/Doctors`}>{t("bestDoctor")}</Link>
              <Link href={`/${locale}/Services`}>{t("offers")}</Link>
              {/* <Link href={"#"}>{t("blogs")}</Link> */}
              <Link href={`/${locale}/privacy-policy`}>
                {t("termsConditions")}
              </Link>
            </div>
            {/* SERVICES */}
            <div className="flex flex-col gap-5 [&_a]:text-sm [&_a]:font-medium [&_a]:leading-[16.94px] [&_a]:text-[var(--neutral-100)]">
              <span className="text-lg font-bold leading-[21.78px] text-[var(--neutral-100)] mb-1">
                {t("services")}
              </span>
              <Link href={`/${locale}/Doctors`}>{t("homeVisits")}</Link>
              <Link href={`/${locale}/Doctors`}>{t("onlineConsultation")}</Link>
              <Link href={`/${locale}/Doctors`}>{t("findDoctor")}</Link>
              <Link href={`/${locale}/Services?category=3`}>
                {t("laboratory")}
              </Link>
              {/* <Link href={"#"}>{t("xRay")}</Link> */}
            </div>
            {/* CONTACT */}
            <div className="flex flex-col gap-5">
              <span className="text-lg font-bold leading-[21.78px] text-[var(--neutral-100)] mb-1">
                {t("contact")}
              </span>
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center w-6 h-6">
                  <CallIcon />
                </div>
                <span
                  className="text-sm font-medium leading-[16.94px] text-[var(--neutral-100)]"
                  style={{ direction: "ltr" }}
                >
                  +966533373079
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center w-6 h-6">
                  <LetterIcon />
                </div>
                <span className="text-sm font-medium leading-[16.94px] text-[var(--neutral-100)]">
                  info@hakeem.com.sa
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center w-6 h-6">
                  <LocationIcon />
                </div>
                <span className="text-sm font-medium leading-[16.94px] text-[var(--neutral-100)]">
                  2895 King Saud St, Al Athir, 9311, Dammam 32248, Saudi Arabia
                </span>
              </div>
            </div>
            {/* FOLLOW US */}
            <div className="flex flex-col gap-6">
              <span className="text-lg font-bold leading-[21.78px] text-[var(--neutral-100)]">
                {t("followUs")}
              </span>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/HakeemMedical"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://x.com/Hakeem_Medical"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <XIcon />
                </a>
                <a
                  href="https://www.linkedin.com/company/1hakeem"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://www.instagram.com/hakeemhealthcare"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center gap-2">
            <div className="h-10 bg-[var(--neutral-100)] rounded overflow-hidden flex justify-center items-center">
              <VisaIcon />
            </div>
            <div className="h-10 bg-[var(--neutral-100)] rounded overflow-hidden flex justify-center items-center">
              <MasterCard />
            </div>
            <div className="h-10 bg-[var(--neutral-100)] rounded overflow-hidden flex justify-center items-center">
              <ApplePay />
            </div>
            <div className="h-10 bg-[var(--neutral-100)] rounded overflow-hidden flex justify-center items-center min-w-[60px]">
              <PayTabsIcon />
            </div>
            <div className="h-10 bg-[var(--neutral-100)] rounded overflow-hidden flex justify-center items-center min-w-[60px]">
              <TamaraIcon />
            </div>
          </div>
          <div className="border-t-[0.5px] border-t-solid border-t-[#E7E7E7] py-[14px] text-base font-normal leading-[19.36px] flex justify-center text-[var(--neutral-100)]">
            {t("copyright")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
