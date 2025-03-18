"use client";
import DownArrow from "@/assets/icons/DownArrow";
import { Select } from "antd";
import { useState } from "react";

const SelectBox = ({
  width = "100%",
  height = "56px",
  placeholder,
  classNameProp = "",
}) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);

  return (
    <Select
      // defaultValue="lucy"
      className={classNameProp}
      style={{
        width: width,
        height: height,
      }}
      // allowClear
      showSearch
      // onSearch={(value) => console.log(value)}
      options={[
        {
          value: "lucy",
          label: "Lucy",
        },
        {
          value: "mucy",
          label: "Mucy",
        },
      ]}
      optionFilterProp="label"
      placeholder={placeholder}
      suffixIcon={
        <div
          style={{
            transform: dropdownOpened ? "rotateX(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
            paddingInlineEnd: "8px",
          }}
        >
          <DownArrow color="var(--neutral-900)" />
        </div>
      }
      onDropdownVisibleChange={(open) => {
        setDropdownOpened(open);
      }}
    />
  );
};

export default SelectBox;
