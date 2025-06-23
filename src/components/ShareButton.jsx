"use client";
import { useAppNotification } from "@/Context/NotificationProvider";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

const ShareButton = ({ id }) => {
  const t = useTranslations();
  const { locale } = useParams();
  const notificationApi = useAppNotification();

  const handleShare = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/${locale}/Services/ServiceDetails/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        notificationApi.success({
          message: t("offerLinkCopied"),
          showProgress: true,
          pauseOnHover: true,
          style: {
            fontFamily: "var(--fontFamily)",
          },
        });
      })
      .catch(() => {});
  };

  return (
    <Button
      className="flex-1 font-medium text-sm leading-[22px] tracking-normal text-[var(--neutral-700)] bg-[var(--neutral-100)] border border-[var(--neutral-700)]"
      onClick={handleShare}
    >
      {t("share")}
    </Button>
  );
};

export default ShareButton;
