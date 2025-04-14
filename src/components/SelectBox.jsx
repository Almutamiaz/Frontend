"use client";
import DownArrow from "@/assets/icons/DownArrow";
import { Select } from "antd";
import { useEffect, useState } from "react";

const SelectBox = ({
  width = "100%",
  height = "56px",
  placeholder,
  classNameProp = "",
  options = [],
  isServices,
  value,
  onChange,
}) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [newValue, setNewValue] = useState(value);
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
      options={options}
      value={+newValue || null}
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
      onChange={
        onChange
          ? onChange
          : (e) => {
              if (isServices) {
                console.log(e);
                setNewValue(e);
                const url = new URL(window.location.href);
                url.searchParams.set("city", e);
                window.history.pushState({}, "", url.toString());
              }
            }
      }
    />
  );
};

export default SelectBox;
