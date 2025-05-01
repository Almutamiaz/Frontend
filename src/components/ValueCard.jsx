import { Col } from "antd";
import React from "react";

const ValueCard = ({ icon, title, des }) => {
  return (
    <Col xs={24} sm={12} md={8}>
      <div
        className="flex flex-col p-6 gap-3 bg-[#F2F2F2] rounded-[16px] items-center min-h-[350px] rtl:min-h-[372px]"
        style={{
          fontFamily: "var(--fontFamily)",
        }}
      >
        <div className="h-[60px] w-[60px] flex justify-center items-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl leading-[60px] tracking-[0px] text-center text-[var(--neutral-1000)]">
            {title}
          </h2>
          <p className="font-medium text-base leading-6 tracking-[0px] text-[var(--neutral-700)] text-justify">
            {des}
          </p>
        </div>
      </div>
    </Col>
  );
};

export default ValueCard;
