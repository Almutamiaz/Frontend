import { Button } from "antd";
import HakeemHealthCareLogo from "./HakeemHealthCareLogo";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";

const Header = () => {
  const t = useTranslations();

  return (
    <div className="border-2 border-[#FFFFFFAD] h-[76px] rounded-[100px] absolute top-8 container self-center px-10 flex items-center justify-between overflow-hidden">
      <HakeemHealthCareLogo />
      {/* *:font-['Public_Sans'] */}
      <div className="flex gap-[30px] *:text-[15px] *:font-medium *:leading-[22px] *:text-[#EBEDF0]">
        <Link className="!font-[700] !text-[var(--neutral-100)]" href={"#"}>
          {t("home")}
        </Link>
        <Link href={"#"}> {t("explore")}</Link>
        <Link href={"#"}> {t("services")}</Link>
        <Link href={"#"}> {t("aboutUs")}</Link>
        <Link href={"#"}> {t("contactUs")}</Link>
      </div>
      <div className="flex gap-6 items-center">
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
          {t("loginSignup")}
        </Button>
      </div>
    </div>
  );
};

export default Header;
