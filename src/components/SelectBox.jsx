"use client";
import DownArrow from "@/assets/icons/DownArrow";
import { Grid, Select, Spin } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
const { useBreakpoint } = Grid;
const SelectBox = ({
  width = "100%",
  height = "56px",
  placeholder,
  classNameProp = "",
  options = [],
  isServices,
  value,
  onChange,
  onScrollEnd,
  loading,
  fullWidthInSm,
  disabled = false,
  showImageInDropdown = false,
}) => {
  const screens = useBreakpoint();
  const isLessThanSM = !screens.sm;
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const handlePopupScroll = (event) => {
    const target = event.target;
    if (
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 5 &&
      !loading
    ) {
      onScrollEnd?.();
    }
  };

  // const handlePopupScroll = (e) => {
  //   const { scrollTop, scrollHeight, clientHeight } = e.target;

  //   // Check if we've reached the bottom (you can adjust a small threshold if needed)
  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     console.log("Reached the bottom of the dropdown!");
  //     // Trigger additional actions here (e.g., load more options)
  //   }
  // };
  return (
    <Select
      // defaultValue="lucy"
      className={classNameProp}
      style={{
        width: isLessThanSM && fullWidthInSm ? "100%" : width,
        height: height,
      }}
      disabled={disabled}
      // allowClear
      showSearch
      // onSearch={(value) => console.log(value)}
      options={
        !showImageInDropdown
          ? options
          : (options || []).map((option) => {
              if (option && option.flag) {
                return {
                  ...option,
                  // keep a plain-text label for searching
                  searchLabel:
                    typeof option.label === "string" ? option.label : "",
                  // render flag + label in UI
                  label: (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {/* use img to avoid SSR/Next Image constraints inside dropdown */}
                      <Image
                        src={option.flag}
                        alt=""
                        width={18}
                        height={12}
                        style={{
                          display: "block",
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                      />
                      <span>
                        {typeof option.label === "string"
                          ? option.label
                          : option?.text || ""}
                      </span>
                    </div>
                  ),
                };
              }
              return option;
            })
      }
      loading={loading}
      value={onChange ? value : +newValue || null}
      optionFilterProp={
        !showImageInDropdown
          ? "label"
          : (options || []).some((o) => o && o.flag)
          ? "searchLabel"
          : "label"
      }
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
      onPopupScroll={handlePopupScroll}
      dropdownRender={(menu) => (
        <>
          {menu}
          {loading && (
            <div style={{ padding: "8px", textAlign: "center" }}>
              <Spin size="small" />
            </div>
          )}
        </>
      )}
      onChange={
        onChange
          ? onChange
          : (e) => {
              if (isServices) {
                setNewValue(e);
                const url = new URL(window.location.href);
                url.searchParams.set(isServices, e);
                window.history.pushState({}, "", url.toString());
              }
            }
      }
    />
  );
};

export default SelectBox;
