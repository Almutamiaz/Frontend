"use client";
import React, { useState } from "react";
import { Drawer } from "antd";
import BurgerIcon from "@/assets/icons/BurgerIcon";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
const HeaderDrawer = () => {
  const { locale } = useParams();
  const pathname = usePathname();
  const t = useTranslations();
  const cleanPathname = () => {
    const components = pathname.replace(/^\/|\/$/g, "").split("/");
    if (components[0] === "ar" || components[0] === "en") {
      return components.length === 1 ? "" : "/" + components.slice(1).join("/");
    }
    return pathname;
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={showDrawer}
        className="DrawerIconClass hidden max-[1200px]:flex"
      >
        <BurgerIcon w={25} h={23} />
      </div>
      <Drawer
        placement={locale == "ar" ? "left" : "right"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"placement"}
        autoFocus={false}
        width={300}
        style={{
          fontFamily: "var(--fontFamily)",
        }}
      >
        <div className="flex flex-col gap-7">
          <h2 className="text-[16px] text-[var(--DescriptionColor2)] font-semibold">
            {t("hakeem")}
          </h2>
          <div className="flex flex-col *:text-[15px] *:font-medium *:leading-[22px] *:text-[var(--DescriptionsColor)] *:border-b *:border-b-solid *:border-b-[#ddd] *:py-3">
            <Link
              href={`/${locale}/Account/SignIn`}
              className="hover:text-[var(--primary-color)]"
            >
              {" "}
              {t("loginSignup")}
            </Link>
            <Link
              href={`/${locale}`}
              className="hover:text-[var(--primary-color)]"
            >
              {" "}
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/Explore`}
              className="hover:text-[var(--primary-color)]"
            >
              {" "}
              {t("explore")}
            </Link>
            <Link
              href={`/${locale}/Services`}
              className="hover:text-[var(--primary-color)]"
            >
              {" "}
              {t("services")}
            </Link>
            <Link
              href={`/${locale}/AboutUs`}
              className="hover:text-[var(--primary-color)]"
            >
              {" "}
              {t("aboutUs")}
            </Link>
            <Link
              href={`/${locale}/ContactUs`}
              className="hover:text-[var(--primary-color)]"
            >
              {" "}
              {t("contactUs")}
            </Link>
            <Link
              href="https://api.whatsapp.com/send/?phone=966533373079"
              className="hover:text-[var(--primary-color)]"
            >
              {" "}
              {t("support")}
            </Link>
            <Link
              href={`${locale == "ar" ? "/en" : "/ar"}${cleanPathname()}`}
              className={`hover:text-[var(--primary-color)] ${
                locale == "en" ? "AlmaraiFont" : "InterFont"
              }`}
            >
              {" "}
              {locale == "ar" ? "English" : "العربية"}
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default HeaderDrawer;
