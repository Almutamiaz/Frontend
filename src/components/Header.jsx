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
import { useParams, usePathname } from "next/navigation";
import { useUser } from "@/Context/UserContext";
// import axiosServices from "../../utils/axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import axiosInstance from "../../utils/axios";
import LoadingSpinner from "./LoadingSpinner";
import ProfileSection from "./ProfileSection";

const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const pathName = pathname.replace(/^\/[a-z]{2}/, "");
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const { locale } = useParams();
  
  const fetchUserData = async () => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axiosInstance.get("/my-profile");
      if (data?.data) {
        setUser(data.data);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Header authentication error:", error.response?.data || error.message);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If user is already authenticated, no need to check again
    if (user?.id) {
      setLoading(false);
      return;
    }
    
    fetchUserData();
  }, [user?.id, setUser]);

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
      <Link href={`/${locale}`}>
        <HakeemHealthCareLogo w={100} h={45} />
      </Link>
      <div className="flex gap-[30px] *:text-[15px] *:font-medium *:leading-[22px] *:text-[#EBEDF0] max-[850px]:hidden">
        <ClientLink
          className="!font-[700] !text-[var(--neutral-100)]"
          href={"/"}
        >
          {t("home")}
        </ClientLink>
        <ClientLink href={"Explore"}> {t("explore")}</ClientLink>
        <ClientLink href={"Services"}> {t("services")}</ClientLink>
        {/* <Link href={"#"}> {t("services")}</Link> */}
        {/* <Link href={"#"}> {t("aboutUs")}</Link> */}
        <ClientLink href={"AboutUs"}> {t("aboutUs")}</ClientLink>
        {/* <Link href={"#"}> {t("contactUs")}</Link> */}
        <ClientLink href={"ContactUs"}> {t("contactUs")}</ClientLink>
      </div>
      <div className="flex gap-6 items-center max-[1200px]:hidden">
        <Link
          href="https://api.whatsapp.com/send/?phone=966533373079"
          target="_blank"
          className="text-base font-normal leading-[19.2px] text-[var(--neutral-100)]"
        >
          {t("support")}
        </Link>
        <LanguageSwitcher />
        {loading ? (
          <LoadingSpinner color="white" />
        ) : user ? (
          <ProfileSection />
        ) : (
          <Button
            style={{
              background: `var(--neutral-100)`,
              color: `var(--color2)`,
            }}
            className="text-base font-normal leading-5 px-5 py-3 hover:!border hover:!border-solid hover:!border-[var(--neutral-100)] border-[var(--neutral-100)] hover:!bg-transparent hover:!text-[var(--neutral-100)]"
          >
            <LoginSignUpHeaderLink />
          </Button>
        )}
      </div>
      <HeaderDrawer />
    </div>
  );
};

export default Header;
