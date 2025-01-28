"use client";
import { Collapse, Drawer } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PriceIcon from "@/assets/icons/PriceIcon";
import MedicalInsuranceIcon from "@/assets/icons/MedicalInsuranceIcon";
import RateIcon from "@/assets/icons/RateIcon";
import GenderIcon from "@/assets/icons/GenderIcon";
import DownArrow from "@/assets/icons/DownArrow";
import { Checkbox } from "antd";

const options = [
  { label: "Any", value: "any" },
  { label: "Less than 50", value: "<50" },
  { label: "From 50 to 100", value: "50-100" },
  { label: "From 100 to 200", value: "100-200" },
  { label: "From 200 to 300", value: "200-300" },
  { label: "From 300 to 500", value: "300-500" },
  { label: "Greater than 500", value: ">500" },
];

const FiltersDrawer = () => {
  const { locale } = useParams();
  const [open, setOpen] = useState(!false);
  const [pricesCheckBoxesValues, setPricesCheckBoxesValues] = useState([]);
  const t = useTranslations();
  const [openedCollapses, setOpenedCollapses] = useState(["1"]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onChangeCheckBox = (checkedValues) => {
    setPricesCheckBoxesValues(checkedValues);
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-3 ">
          <PriceIcon
            color={
              openedCollapses.includes("1")
                ? "var(--primary-400)"
                : "var(--primary-800)"
            }
          />
          <span
            className="text-[16px] font-semibold leading-[19.36px]"
            style={{
              color: openedCollapses.includes("1")
                ? "var(--primary-400)"
                : "var(--primary-800)",
            }}
          >
            {t("priceRange")}
          </span>
        </div>
      ),
      children: (
        <Checkbox.Group
          options={options}
          value={pricesCheckBoxesValues}
          onChange={onChangeCheckBox}
          className="FiltersDrawerCheckBox flex-col gap-5 [&>.ant-checkbox-wrapper.ant-checkbox-group-item]:gap-[18px]"
        />
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex gap-3 ">
          <MedicalInsuranceIcon
            color={
              openedCollapses.includes("2")
                ? "var(--primary-400)"
                : "var(--primary-800)"
            }
          />
          <span
            className="text-[16px] font-semibold leading-[19.36px]"
            style={{
              color: openedCollapses.includes("2")
                ? "var(--primary-400)"
                : "var(--primary-800)",
            }}
          >
            {t("medicalInsurance")}
          </span>
        </div>
      ),
      children: <div>{"text"}</div>,
    },
    {
      key: "3",
      label: (
        <div className="flex gap-3 ">
          <RateIcon
            color={
              openedCollapses.includes("3")
                ? "var(--primary-400)"
                : "var(--primary-800)"
            }
          />
          <span
            className="text-[16px] font-semibold leading-[19.36px]"
            style={{
              color: openedCollapses.includes("3")
                ? "var(--primary-400)"
                : "var(--primary-800)",
            }}
          >
            {t("rate")}
          </span>
        </div>
      ),
      children: <div>{"text"}</div>,
    },
    {
      key: "4",
      label: (
        <div className="flex gap-3 ">
          <GenderIcon
            color={
              openedCollapses.includes("4")
                ? "var(--primary-400)"
                : "var(--primary-800)"
            }
          />
          <span
            className="text-[16px] font-semibold leading-[19.36px]"
            style={{
              color: openedCollapses.includes("4")
                ? "var(--primary-400)"
                : "var(--primary-800)",
            }}
          >
            {t("gender")}
          </span>
        </div>
      ),
      children: <div>{"text"}</div>,
    },
  ];

  const onChange = (key) => {
    setOpenedCollapses(key);
  };

  const resetFilters = () => {
    setPricesCheckBoxesValues([]);
  };

  // useEffect(() => {
  //   console.log(pricesCheckBoxesValues);
  // }, [pricesCheckBoxesValues]);

  return (
    <Drawer
      placement={locale == "en" ? "left" : "right"}
      closable={false}
      onClose={onClose}
      open={open}
      key={"placement"}
      autoFocus={false}
      width={393}
      getContainer={false}
      style={{
        fontFamily: "var(--fontFamily)",
      }}
      className="[&>.ant-drawer-body]:px-5 [&>.ant-drawer-body]:pt-10"
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <span className="text-[20px] font-bold leading-[24.2px] text-[#181C32]">
            {t("advancedFilter")}
          </span>
          <span
            className="text-[14px] font-medium leading-[16.94px] cursor-pointer transition-colors duration-300"
            style={{
              color: pricesCheckBoxesValues.length
                ? "#181C32"
                : "var(--DescriptionColor2)",
            }}
            onClick={resetFilters}
          >
            {t("reset")}
          </span>
        </div>
        <Collapse
          className="FiltersDrawerCollapse"
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition={"end"}
          items={items}
          bordered={false}
          ghost
          expandIcon={({ isActive }) => (
            <DownArrow
              color={isActive ? "var(--primary-400)" : "var(--primary-800)"}
              w={14}
              h={7}
              deg={isActive ? -90 : 0}
            />
          )}
        />
      </div>
    </Drawer>
  );
};

export default FiltersDrawer;
