import WhatsAppIcon from "@/assets/icons/WhatsAppIcon";
import { FloatButton } from "antd";
import React from "react";

const WhatsAppFloatButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=966533373079"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FloatButton icon={<WhatsAppIcon />} />
    </a>
  );
};

export default WhatsAppFloatButton;
