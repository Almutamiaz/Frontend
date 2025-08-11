"use client";
import DownArrow from "@/assets/icons/DownArrow";
import FavoriteIcon from "@/assets/icons/FavoriteIcon";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import MyProfileIcon from "@/assets/icons/MyProfileIcon";
import MyReservationsIcon from "@/assets/icons/MyReservationsIcon";
import NotificationsIcon from "@/assets/icons/NotificationsIcon";
import SettingsIcon2 from "@/assets/icons/SettingsIcon2";
import WalletIcon2 from "@/assets/icons/WalletIcon2";
import { Collapse, Segmented } from "antd";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useParams } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "@/Context/UserContext";
import axiosInstance from "../../utils/axios";
import { useAppNotification } from "@/Context/NotificationProvider";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const AllowedPaths = ["/en/MyReservations"];
const SideBar = ({ responsive = false, setSideBarDrawer }) => {
  const pathname = usePathname();
  const { locale } = useParams();
  const t = useTranslations();
  const router = useRouter();
  const { user, setUser } = useUser();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const notificationApi = useAppNotification();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
    }
  };

  // accountSettings
  return !responsive ? (
    <div className="py-7 px-3 max-[900px]:px-2 max-[900px]:py-2 w-[273px] max-[900px]:w-[60px] shadow-[0_2px_8px_0_#2F2B3D1F] flex flex-col gap-3 max-[600px]:hidden transition-all duration-300 ease-in-out">
      <Segmented
        className="SideBarSegmented notDrawer w-full"
        vertical
        options={[
          {
            value: "MyReservations",
            label: (
              <div className="flex gap-2 items-center">
                <MyReservationsIcon />
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)] max-[900px]:hidden">
                  {t("myReservations")}
                </span>
              </div>
            ),
          },
          {
            value: "MyProfile",
            label: (
              <div className="flex gap-2 items-center">
                <div className="px-[2px]">
                  <MyProfileIcon />
                </div>
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)] max-[900px]:hidden">
                  {t("myProfile")}
                </span>
              </div>
            ),
          },
          {
            value: "Wallet",
            label: (
              <div className="flex gap-2 items-center">
                <WalletIcon2 />
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)] max-[900px]:hidden">
                  {t("wallet")}
                </span>
              </div>
            ),
          },
          // {
          //   value: "Favorite",
          //   label: (
          //     <div className="flex gap-2 items-center">
          //       <FavoriteIcon />
          //       <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)] max-[900px]:hidden">
          //         {t("favorite")}
          //       </span>
          //     </div>
          //   ),
          // },
          {
            value: "Notifications",
            label: (
              <div className="flex gap-2 items-center">
                <NotificationsIcon />
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)] max-[900px]:hidden">
                  {t("notifications")}
                </span>
              </div>
            ),
          },
          ...(isMobile
            ? [
                {
                  value: "settings",
                  label: (
                    <div className="flex gap-2 items-center">
                      <SettingsIcon2 />
                    </div>
                  ),
                },
              ]
            : []),
          ...(isMobile
            ? [
                {
                  value: "logout",
                  label: (
                    <div className="flex gap-2 items-center">
                      <LogoutIcon />
                    </div>
                  ),
                },
              ]
            : []),
        ]}
        value={pathname.split("/").pop()}
        onChange={(e) => {
          if (e === "logout") {
            handleLogout();
          } else {
            router.push(e);
          }
        }}
      />
      {!isMobile && (
        <>
          <div className="w-full h-[1px] bg-[#E7E7E7] max-[900px]:hidden"></div>
          <Collapse
            size="small"
            className="SettingSideBarCollapse"
            expandIconPosition={"end"}
            bordered={false}
            ghost
            expandIcon={({ isActive }) => (
              <DownArrow
                color={"var(--DescriptionColor)"}
                w={14}
                h={7}
                deg={isActive ? -90 : 0}
              />
            )}
            items={[
              {
                key: "1",
                label: (
                  <div className="flex gap-2 items-center">
                    <SettingsIcon2 />
                    <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)] max-[900px]:hidden">
                      {t("accountSettings")}
                    </span>
                  </div>
                ),
                children: (
                  <p
                    onClick={() => {
                      router.push(`/${locale}/Settings`);
                    }}
                    className="cursor-pointer"
                  >
                    {t("personalProfile")}
                  </p>
                ),
              },
            ]}
          />
          <div
            className="flex gap-2 items-center ps-4 cursor-pointer"
            onClick={() => !logoutLoading && handleLogout()}
          >
            <LogoutIcon />
            <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--red)] max-[900px]:hidden">
              {t("logout")}
            </span>
            {logoutLoading && <LoadingSpinner />}
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="py-7 px-1 w-[273px] flex flex-col gap-3 ">
      <Segmented
        className="SideBarSegmented w-full"
        vertical
        options={[
          {
            value: "MyReservations",
            label: (
              <div className="flex gap-2 items-center">
                <MyReservationsIcon />
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)]">
                  {t("myReservations")}
                </span>
              </div>
            ),
          },
          {
            value: "MyProfile",
            label: (
              <div className="flex gap-2 items-center">
                <div className="px-[2px]">
                  <MyProfileIcon />
                </div>
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)]">
                  {t("myProfile")}
                </span>
              </div>
            ),
          },
          {
            value: "Wallet",
            label: (
              <div className="flex gap-2 items-center">
                <WalletIcon2 />
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)]">
                  {t("wallet")}
                </span>
              </div>
            ),
          },
          // {
          //   value: "Favorite",
          //   label: (
          //     <div className="flex gap-2 items-center">
          //       <FavoriteIcon />
          //       <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)]">
          //         {t("favorite")}
          //       </span>
          //     </div>
          //   ),
          // },
          {
            value: "Notifications",
            label: (
              <div className="flex gap-2 items-center">
                <NotificationsIcon />
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)]">
                  {t("notifications")}
                </span>
              </div>
            ),
          },
        ]}
        value={pathname.split("/").pop()}
        onChange={(e) => {
          router.push(e);
          setSideBarDrawer(false);
        }}
      />
      <div className="w-full h-[1px] bg-[#E7E7E7]"></div>
      <Collapse
        size="small"
        className="SettingSideBarCollapse"
        expandIconPosition={"end"}
        bordered={false}
        activeKey={[1]}
        ghost
        expandIcon={({ isActive }) => (
          <DownArrow
            color={"var(--DescriptionColor)"}
            w={14}
            h={7}
            deg={isActive ? -90 : 0}
          />
        )}
        items={[
          {
            key: 1,
            label: (
              <div className="flex gap-2 items-center">
                <SettingsIcon2 />
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)]">
                  {t("accountSettings")}
                </span>
              </div>
            ),
            children: (
              <p
                onClick={() => {
                  router.push(`/${locale}/Settings`);
                }}
                className="cursor-pointer"
              >
                {t("personalProfile")}
              </p>
            ),
          },
        ]}
      />
      <div
        className="flex gap-2 items-center ps-4 cursor-pointer"
        onClick={() => !logoutLoading && handleLogout()}
      >
        <LogoutIcon />
        <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--red)]">
          {t("logout")}
        </span>
        {logoutLoading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default SideBar;
