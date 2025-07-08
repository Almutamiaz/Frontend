"use client";
import React, { useState } from "react";
import { Drawer } from "antd";
import BurgerIcon from "@/assets/icons/BurgerIcon";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useUser } from "@/Context/UserContext";
import axiosInstance from "../../utils/axios";
import { useAppNotification } from "@/Context/NotificationProvider";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
const HeaderDrawer = () => {
  const { locale } = useParams();
  const pathname = usePathname();
  const t = useTranslations();
  const { user, setUser } = useUser();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  const notificationApi = useAppNotification();
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

  const fetchCSRF = async () => {
    try {
      const response = await axios.get("/backend/sanctum/csrf-cookie", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
    }
  };
  const handleLogout = async () => {
    setLogoutLoading(true);
    await fetchCSRF();
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.data.code === 200) {
        router.push(`/${locale}`);
        notificationApi.success({
          message: response.data.message,
          showProgress: true,
          pauseOnHover: true,
          style: {
            fontFamily: "var(--fontFamily)",
          },
        });
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      notificationApi.error({
        message: error.response?.data?.message,
        showProgress: true,
        pauseOnHover: true,
        style: {
          fontFamily: "var(--fontFamily)",
        },
      });
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLogoutLoading(false);
      onClose();
    }
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
              href={user ? `/${locale}/MyProfile` : `/${locale}/Account/SignIn`}
              className="hover:text-[var(--primary-color)]"
              onClick={onClose}
            >
              {" "}
              {user ? t("myProfile") : t("loginSignup")}
            </Link>
            <Link
              href={`/${locale}`}
              className="hover:text-[var(--primary-color)]"
              onClick={onClose}
            >
              {" "}
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/Explore`}
              className="hover:text-[var(--primary-color)]"
              onClick={onClose}
            >
              {" "}
              {t("explore")}
            </Link>
            <Link
              href={`/${locale}/Services`}
              className="hover:text-[var(--primary-color)]"
              onClick={onClose}
            >
              {" "}
              {t("services")}
            </Link>
            <Link
              href={`/${locale}/AboutUs`}
              className="hover:text-[var(--primary-color)]"
              onClick={onClose}
            >
              {" "}
              {t("aboutUs")}
            </Link>
            <Link
              href={`/${locale}/ContactUs`}
              className="hover:text-[var(--primary-color)]"
              onClick={onClose}
            >
              {" "}
              {t("contactUs")}
            </Link>
            <Link
              href="https://api.whatsapp.com/send/?phone=966533373079"
              className="hover:text-[var(--primary-color)]"
              onClick={onClose}
            >
              {" "}
              {t("support")}
            </Link>
            <Link
              href={`${locale == "ar" ? "/en" : "/ar"}${cleanPathname()}`}
              className={`hover:text-[var(--primary-color)] ${
                locale == "en" ? "AlmaraiFont" : "InterFont"
              }`}
              onClick={onClose}
            >
              {" "}
              {locale == "ar" ? "English" : "العربية"}
            </Link>
            {user && (
              <span
                className="hover:!text-[var(--primary-color)] !text-[var(--red)] cursor-pointer flex items-center gap-2"
                onClick={() => {
                  !logoutLoading && handleLogout();
                }}
              >
                {" "}
                {t("logout")}
                {logoutLoading && <LoadingSpinner />}
              </span>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default HeaderDrawer;
