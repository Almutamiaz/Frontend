"use client";
import { Button } from "antd";
// import HakeemHealthCareLogo from "./HakeemHealthCareLogo";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import HakeemHealthCareLogo from "@/assets/icons/HakeemHealthCareLogo";
import LoginSignUpHeaderLink from "./LoginSignUpHeaderLink";
import HeaderDrawer from "./HeaderDrawer";
import ClientLink from "./ClientLink";
import { usePathname } from "next/navigation";

const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const pathName = pathname.replace(/^\/[a-z]{2}/, "");
  console.log(!["/en", "/ar"].includes(pathname));
  return (
    <div
      className="HakeemHeader border-2 border-[#FFFFFFAD] h-[76px] rounded-[100px] absolute top-8 container self-center px-10 flex items-center justify-between overflow-hidden"
      style={{
        background: !["/en", "/ar"].includes(pathname)
          ? `var(--primary-300)`
          : "transparent",
        borderColor: !["/en", "/ar"].includes(pathname)
          ? `var(--primary-100)`
          : "#FFFFFFAD",
      }}
    >
      {/* <HakeemHealthCareLogo /> */}
      <HakeemHealthCareLogo w={100} h={45} />
      {/* *:font-['Public_Sans'] */}
      <div className="flex gap-[30px] *:text-[15px] *:font-medium *:leading-[22px] *:text-[#EBEDF0] max-[850px]:hidden">
        <ClientLink
          className="!font-[700] !text-[var(--neutral-100)]"
          href={"/"}
        >
          {t("home")}
        </ClientLink>
        <ClientLink href={"Explore"}> {t("explore")}</ClientLink>
        <Link href={"#"}> {t("services")}</Link>
        <Link href={"#"}> {t("aboutUs")}</Link>
        <Link href={"#"}> {t("contactUs")}</Link>
      </div>
      <div className="flex gap-6 items-center max-[1200px]:hidden">
        <span className="text-base font-normal leading-[19.2px] text-[var(--neutral-100)]">
          {t("support")}
        </span>
        <LanguageSwitcher />
        <Button
          style={{
            background: `var(--neutral-100)`,
            color: `var(--color2)`,
          }}
          className="text-base font-normal leading-5 px-5 py-3 hover:!border hover:!border-solid hover:!border-[var(--neutral-100)] border-[var(--neutral-100)] hover:!bg-transparent hover:!text-[var(--neutral-100)]"
        >
          <LoginSignUpHeaderLink />
        </Button>
      </div>
      <HeaderDrawer />
    </div>
  );
};

export default Header;
