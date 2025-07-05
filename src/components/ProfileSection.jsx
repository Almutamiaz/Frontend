"use client";
import Image from "next/image";
import React, { useState } from "react";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import { useUser } from "@/Context/UserContext";
import { useTranslations } from "next-intl";
import { Dropdown } from "antd";
import { useParams, useRouter } from "next/navigation";
import MyProfileIcon from "@/assets/icons/MyProfileIcon";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import axiosInstance from "../../utils/axios";
import { useAppNotification } from "@/Context/NotificationProvider";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const ProfileSection = () => {
  const { user, setUser } = useUser();
  const t = useTranslations();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { locale } = useParams();
  const router = useRouter();
  const notificationApi = useAppNotification();
  const items = [
    {
      label: (
        <div className="flex gap-2 items-center">
          <MyProfileIcon />
          <span>{t("myProfile")}</span>
        </div>
      ),
      key: "profile",
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          {logoutLoading ? (
            <LoadingSpinner size={18} />
          ) : (
            <LogoutIcon size={18} />
          )}
          <span>{t("logout")}</span>
        </div>
      ),
      key: "logout",
      disabled: logoutLoading,
    },
  ];

  const menuProps = {
    items,
    onClick: ({ key }) => {
      if (key === "profile") {
        router.push(`/${locale}/MyProfile`);
      } else if (key === "logout") {
        handleLogout();
      }
    },
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
    }
  };

  return (
    <Dropdown
      menu={menuProps}
      open={logoutLoading || dropdownOpen}
      trigger={["hover"]}
      onOpenChange={(open) => {
        if (!logoutLoading) {
          setDropdownOpen(open);
        }
      }}
    >
      <div className="cursor-pointer">
        <Image
          src={user?.photo || DummyDoctorImage}
          alt={t("userProfileImage")}
          width={43}
          height={43}
          className="w-[43px] h-[43px] object-cover rounded-[50%] border border-[#FFFFFF]"
        />
      </div>
    </Dropdown>
  );
};

export default ProfileSection;
