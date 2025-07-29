"use client";
import DoctorCardMyReservations from "@/components/DoctorCardMyReservations";
import Tag from "@/components/Tag";
import { Col, Row } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState(1);
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-5 pb-3">
      {/* tags section */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-2 ps-1">
        <Tag
          active={activeTab === 1}
          key={1}
          text={t("all")}
          onClick={() => setActiveTab(1)}
          classNameProp={
            activeTab === 1 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
          }
          withoutBorder
          bgColorProp="#F4F4F4"
          textColorProp="#2F2B3DE5"
          activBgColorProp="#7E53FD33"
          activeTextColorProp="var(--primary-color)"
        />
        <Tag
          active={activeTab === 2}
          key={2}
          text={t("confirmed")}
          onClick={() => setActiveTab(2)}
          classNameProp={
            activeTab === 2 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
          }
          withoutBorder
          bgColorProp="#F4F4F4"
          textColorProp="#2F2B3DE5"
          activBgColorProp="#7E53FD33"
          activeTextColorProp="var(--primary-color)"
        />
        <Tag
          active={activeTab === 3}
          key={3}
          text={t("waitingForPayment")}
          onClick={() => setActiveTab(3)}
          classNameProp={
            activeTab === 3 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
          }
          withoutBorder
          bgColorProp="#F4F4F4"
          textColorProp="#2F2B3DE5"
          activBgColorProp="#7E53FD33"
          activeTextColorProp="var(--primary-color)"
        />
        <Tag
          active={activeTab === 4}
          key={4}
          text={t("waitingForConfirm")}
          onClick={() => setActiveTab(4)}
          classNameProp={
            activeTab === 4 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
          }
          withoutBorder
          bgColorProp="#F4F4F4"
          textColorProp="#2F2B3DE5"
          activBgColorProp="#7E53FD33"
          activeTextColorProp="var(--primary-color)"
        />
      </div>
      {/* <div className="flex gap-6 flex-wrap"> */}
      <Row gutter={[12, 12]} className="w-full">
        {Array.from({ length: 5 }, (_, index) => (
          <Col
            key={index}
            // xs={24} sm={24} md={24}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
            xxl={8}
          >
            <DoctorCardMyReservations />
          </Col>
        ))}
      </Row>

      {/* <DoctorCardMyReservations />
        <DoctorCardMyReservations /> */}
      {/* </div> */}
    </div>
  );
};

export default Page;
