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
import { usePathname } from "next/navigation";
import React from "react";
const AllowedPaths = ["/en/MyReservations"];
const SideBar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const t = useTranslations();
  // return AllowedPaths.includes(pathname) ? <div>test</div> : null;

  // accountSettings
  return (
    <div className="py-7 px-3 w-[273px] shadow-[0_2px_8px_0_#2F2B3D1F] flex flex-col gap-3">
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
            value: "wallet",
            label: (
              <div className="flex gap-2 items-center">
                <WalletIcon2 />
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)]">
                  {t("wallet")}
                </span>
              </div>
            ),
          },
          {
            value: "favorite",
            label: (
              <div className="flex gap-2 items-center">
                <FavoriteIcon />
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)]">
                  {t("favorite")}
                </span>
              </div>
            ),
          },
          {
            value: "notifications",
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
        onChange={(e) => (window.location.href = e)}
      />
      <div className="w-full h-[1px] bg-[#E7E7E7]"></div>
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
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor)]">
                  {t("accountSettings")}
                </span>
              </div>
            ),
            children: <p>accountSettings</p>,
          },
        ]}
      />
      <div className="flex gap-2 items-center ps-4 cursor-pointer">
        <LogoutIcon />
        <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--red)]">
          {t("logout")}
        </span>
      </div>
    </div>
  );
};

export default SideBar;
