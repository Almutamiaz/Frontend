import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
const LoadingSpinner = ({ color = "var(--primary-color)", size = 24 }) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined spin style={{ fontSize: size, color: color }} />
      }
    />
  );
};

export default LoadingSpinner;
