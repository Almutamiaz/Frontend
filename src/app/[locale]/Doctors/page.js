"use client";
import React, { useState } from "react";
import Image from "next/image";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import ApplePayImage from "@/assets/images/ApplePayImage.png";
import CreditCardImage from "@/assets/images/CreditCardImage.png";
import CoinImage from "@/assets/images/CoinImage.png";
import WaitingRoomImage from "@/assets/images/WaitingRoomImage.png";
import RateIcon from "@/assets/icons/RateIcon";
import { useTranslations } from "next-intl";
import StarIcon2 from "@/assets/icons/StarIcon2";
import ClockIcon from "@/assets/icons/ClockIcon";
import { Button, InputNumber, Radio, Switch, Upload } from "antd";
import DoctorHomeVisits from "@/assets/images/DoctorHomeVisits.png";
import OnlineConsolations from "@/assets/images/OnlineConsolations.png";
import CloudIcon from "@/assets/icons/CloudIcon";
import { Input } from "antd";
import CashIcon from "@/assets/icons/CashIcon";
import AntdFormItem from "@/components/AntdFormItem";
const { TextArea } = Input;
const Page = () => {
  const t = useTranslations();
  const [bookNow, setBookNow] = useState(false);
  const [goToCheckOut, setGoToCheckOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [insuranceCompanyEnabled, setInsuranceCompanyEnabled] = useState(false);
  const [bookingForSomeone, setBookingForSomeone] = useState(false);

  return (
    <div className="bg-[#FAFAFA] min-h-[988px] pb-10">
      <div className="container overflow-visible mt-[170px] flex gap-4 flex-wrap max-md:flex-col">
        {!bookNow ? (
          <>
            <div className="flex flex-col flex-1 gap-2">
              <div className="p-6 flex gap-4 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
                <div className="w-[100px] h-[100px] rounded-[50%] flex-shrink-0">
                  <Image
                    className="w-full h-full rounded-[50%] object-cover"
                    src={DummyDoctorImage}
                    alt="Doctor Image"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-2xl leading-9 tracking-[0px] text-[var(--neutral-1000)]">
                      DR.Bassem Abdullah
                    </span>
                    <span className="font-medium text-base leading-6 tracking-[0px] text-[var(--neutral-700)]">
                      Dentist | Future Hospital
                    </span>
                  </div>
                  <div className="flex gap-[8px] items-center">
                    <RateIcon color="var(--secondary-300)" />
                    <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--primary-800)] mt-[3px]">
                      4.7
                      <span className="ps-1 text-[var(--neutral-800)]">
                        (200 {t("rating")})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
                <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                  {t("aboutDoctor")}
                </span>
                <p className="font-medium text-base leading-6 tracking-[0px] text-[var(--neutral-900)]">
                  Head of Pediatrics Department -Doctor of Pediatrics and
                  Neonatology - Bachelor of Medicine and Surgery - Professor and
                  Consultant of Pediatrics and  i s a board-certified
                  cardiologist with over 15 years of experience specializing in
                  the treatment of cardiovascular diseases. She is passionate
                  about p
                </p>
              </div>
              <div className="flex flex-col gap-3 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
                <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                  {t("hospitalDetails")}
                </span>
                <div className="flex gap-3 items-center">
                  <div className="w-[32px] h-[32px] rounded-[8px]">
                    <Image
                      className="w-full h-full rounded-[8px] object-cover"
                      src={DummyDoctorImage}
                      alt="Doctor Image"
                    />
                  </div>
                  <div className="font-medium text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                    Clinic 9 , Palastine st. ,Jaddah
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
                <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                  {t("insurance")}
                </span>
                {[1, 1, 1].map((e, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-center border-b border-b-[#E7E7E7] pb-1"
                  >
                    <div className="w-[52px] h-[52px] rounded-[8px]">
                      <Image
                        className="w-full h-full rounded-[8px] object-cover"
                        src={DummyDoctorImage}
                        alt="Doctor Image"
                      />
                    </div>
                    <div className="font-semibold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                      Arabian insurance
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
                <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                  {t("reviews")}
                </span>
                <div className="flex gap-[8px] items-center">
                  <RateIcon size={15} color="var(--secondary-300)" />
                  <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--primary-800)] mt-[3px]">
                    4.7
                    <span className="ps-1 text-[var(--neutral-800)]">
                      (200 {t("rating")})
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {[1, 1, 1].map((e, i) => (
                    <div
                      key={i}
                      className="py-5 px-[30px] flex flex-col gap-3 bg-[var(--neutral-200)] rounded-[12px] mt-1"
                    >
                      <div className="flex gap-[6px]">
                        <StarIcon2 />
                        <StarIcon2 />
                        <StarIcon2 />
                        <StarIcon2 />
                        <StarIcon2 />
                      </div>
                      <span className="font-[Almarai] text-[var(--neutral-900)] font-bold text-sm leading-6 tracking-[0px]">
                        انصح بالدكتور مررره ممتاز رقي واخلاق فالتعامل
                      </span>
                      <span className="text-[var(--primary-800)] font-normal text-xs leading-6 tracking-[0px]">
                        Visit in Sunday, 25 June 2023 09:04 PM
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
            <div className="w-[40%] flex flex-col gap-2 max-md:w-full">
              <div className="border border-[#E7E7E7] rounded-[12px] bg-[var(--neutral-100)] relative flex flex-col h-fit pb-[30px]">
                <div
                  className="absolute top-[-1px] start-[-1px] z-10 rounded-[12px] flex justify-center items-center h-[63px] font-bold text-base leading-[19.36px] tracking-[0px] text-[var(--primary-800)] bg-[var(--gray)]"
                  style={{
                    width: "calc(100% + 2px)",
                  }}
                >
                  {t("bookAppointment")}
                </div>
                <div className="mt-[96px] px-[17px] flex flex-col gap-8 ">
                  <div className="flex gap-8 flex-wrap">
                    <div className="flex gap-3">
                      <div className="w-[56px] h-[56px] flex justify-center items-center bg-[var(--neutral-200)] rounded-[50%] overflow-hidden">
                        <Image src={CoinImage} alt="Coin Image" />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <span className="text-[var(--primary-800)] font-semibold text-lg leading-[27px] tracking-[0px]">
                          {t("servicePrice")}
                        </span>
                        <span className="text-[var(--primary-800)] font-semibold text-base leading-6 tracking-[0px]">
                          200 SR
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-[56px] h-[56px] flex justify-center items-center bg-[var(--neutral-200)] rounded-[50%] overflow-hidden">
                        <Image src={WaitingRoomImage} alt="Coin Image" />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <span className="text-[var(--primary-800)] font-semibold text-lg leading-[27px] tracking-[0px]">
                          {t("noVisits")}
                        </span>
                        <span className="text-[var(--primary-800)] font-semibold text-base leading-6 tracking-[0px]">
                          12 {t("visits")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <span className="text-[var(--color1)] font-bold text-xl leading-[24.2px] tracking-[0px]">
                        {t("date")}
                      </span>
                      <span className="text-[var(--neutral-900)] font-medium text-sm leading-[22px] tracking-[0px]">
                        {t("selectAvailableDayForYou")}
                      </span>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                      {days.map((day) => (
                        <div
                          className="rounded-[100px] py-[10px] px-2 flex flex-col w-12"
                          key={day.date}
                          style={{
                            backgroundColor: day.isSelected
                              ? "#6441EF"
                              : "var(--neutral-200)",
                            border: "1px solid",
                            borderColor: day.isSelected
                              ? "var(--primary-300)"
                              : "var(--neutral-800)",
                          }}
                        >
                          <span
                            className="text-xs leading-6 tracking-[0px] text-center"
                            style={{
                              color: day.isSelected
                                ? "var(--neutral-100)"
                                : "var(--primary-800)",
                              fontWeight: day.isSelected ? 600 : 400,
                            }}
                          >
                            {day.day}
                          </span>
                          <span
                            className="text-sm leading-6 tracking-[0px] text-center"
                            style={{
                              color: day.isSelected
                                ? "var(--neutral-100)"
                                : "var(--primary-800)",
                              fontWeight: day.isSelected ? 600 : 400,
                            }}
                          >
                            {day.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <span className="text-[var(--color1)] font-bold text-xl leading-[24.2px] tracking-[0px]">
                        {t("availability")}
                      </span>
                      <span className="text-[var(--neutral-900)] font-medium text-sm leading-[22px] tracking-[0px]">
                        {t("selectAvailableTimeForYou")}
                      </span>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                      {timeSlots.map((time) => (
                        <div
                          className="rounded-[100px] flex min-w-[97px] h-10 items-center justify-center gap-3"
                          key={time.time}
                          style={{
                            backgroundColor: time.isSelected
                              ? "#6441EF"
                              : "var(--neutral-200)",
                          }}
                        >
                          <ClockIcon
                            color={
                              !time.isSelected
                                ? "var(--neutral-900)"
                                : "var(--neutral-100)"
                            }
                          />
                          <span
                            className="text-sm leading-6 tracking-[0px] text-center font-normal"
                            style={{
                              color: time.isSelected
                                ? "var(--neutral-100)"
                                : "var(--primary-800)",
                            }}
                          >
                            {time.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
                  <Button
                    style={{
                      backgroundColor: "#6441EF",
                      borderColor: "var(--primary-300)",
                    }}
                    className="hover:!text-[#6441EF] hover:!bg-[var(--neutral-100)]"
                    onClick={() => setBookNow(true)}
                  >
                    {t("bookNow")}
                  </Button>
                </div>
              </div>
              <div className="border border-[#E7E7E7] rounded-[12px] bg-[var(--neutral-100)] relative flex flex-col h-fit p-6 pb-[38px] gap-6">
                <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                  {t("availableServices")}
                </span>
                <div className="flex gap-[10px] flex-wrap">
                  <div className="flex flex-col rounded-[12px] max-w-[204px] w-[204px] h-[234px] overflow-hidden bg-gradient-to-r from-[#FC9A69] via-[#F99267] to-[#FCA16C]">
                    <Image
                      src={DoctorHomeVisits}
                      alt="Available Service"
                      className="flex-1 object-cover"
                    />
                    <div className="flex justify-center items-center bg-[var(--neutral-200)] h-[66px]">
                      <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                        Home visits
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col rounded-[12px] max-w-[204px] w-[204px] h-[234px] overflow-hidden bg-gradient-to-r from-[#F4A7B1] to-[#DB7E89]">
                    <Image
                      src={OnlineConsolations}
                      alt="Available Service"
                      className="flex-1"
                    />
                    <div className="flex justify-center items-center bg-[var(--neutral-200)] h-[66px]">
                      <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                        Online Consultation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {goToCheckOut ? (
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex rounded-[16px] justify-between py-5 px-4 border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240] items-center">
                  <span className="text-[var(--Black)] font-medium text-[16px] leading-6 tracking-[0px]">
                    {t("areYouBookingForSomeoneElse")}
                  </span>
                  <Switch
                    className="antdSwitchStyle2"
                    onChange={(e) => {
                      setBookingForSomeone(e);
                    }}
                  />
                </div>
                <div
                  className="flex flex-col rounded-[16px] justify-between py-6 px-5 border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240] gap-6"
                  style={{
                    height: bookingForSomeone ? "276px" : "0px",
                    borderWidth: bookingForSomeone ? "1px" : "0px",
                    paddingTop: bookingForSomeone ? "30px" : "0px",
                    paddingBottom: bookingForSomeone ? "30px" : "0px",
                    overflow: "hidden",
                    transition: "all ease-in-out 0.6s",
                  }}
                >
                  <span className="font-semibold text-xl leading-6 tracking-[0px] text-[var(--Black)]">
                    {t("enterPatientInfo")}
                  </span>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2 flex-1">
                        {/* phoneNumber lastName firstName */}
                        <span className="font-medium text-base leading-6 tracking-[0px] text-[var(--DescriptionColor2)]">
                          {t("firstName")}
                        </span>
                        <AntdFormItem classNameProp="customInputStyle" />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <span className="font-medium text-base leading-6 tracking-[0px] text-[var(--DescriptionColor2)]">
                          {t("lastName")}
                        </span>
                        <AntdFormItem classNameProp="customInputStyle" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <span className="font-medium text-base leading-6 tracking-[0px] text-[var(--DescriptionColor2)]">
                        {t("phoneNumber")}
                      </span>
                      {/* <AntdFormItem classNameProp="customInputStyle" /> */}
                      <InputNumber
                        className="customInputNumberStyle"
                        addonBefore={
                          <div className="flex gap-3 items-center">
                            <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[var(--DescriptionColor2)]">
                              +966
                            </span>
                            <span className="w-[1px] h-[32px] bg-[#D4D4D48C]"></span>
                          </div>
                        }
                        defaultValue={100}
                        controls={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex rounded-[16px] justify-between py-5 px-4 border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240]">
                  <span className="text-[var(--Black)] font-medium text-[16px] leading-6 tracking-[0px]">
                    {t("insuranceCompany")}
                  </span>
                  <Switch
                    className="antdSwitchStyle2"
                    onChange={(e) => {
                      setInsuranceCompanyEnabled(e);
                    }}
                  />
                </div>
                {true && (
                  <div
                    className="flex flex-col gap-2"
                    style={{
                      height: insuranceCompanyEnabled ? "202px" : "0px",
                      // borderWidth: bookingForSomeone ? "1px" : "0px",
                      // paddingTop: bookingForSomeone ? "30px" : "0px",
                      // paddingBottom: bookingForSomeone ? "30px" : "0px",
                      overflow: false ? "visible" : "hidden",
                      transition: "all ease-in-out 0.6s",
                    }}
                  >
                    <div className="flex rounded-[16px] py-2 px-6 border border-[#E7E7E7] bg-[var(--neutral-100)] justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <CashIcon />
                        <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                          {t("cash")}
                        </span>
                      </div>
                      <Radio
                        className="radioPaymentMethod"
                        checked={paymentMethod == 0}
                        onClick={() => setPaymentMethod(0)}
                      />
                    </div>
                    <div className="flex rounded-[16px] py-2 px-6 border border-[#E7E7E7] bg-[var(--neutral-100)] justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <Image src={CreditCardImage} alt="CreditCardImage" />

                        <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                          {t("creditCard")}
                        </span>
                      </div>
                      <Radio
                        className="radioPaymentMethod"
                        checked={paymentMethod == 1}
                        onClick={() => setPaymentMethod(1)}
                      />
                    </div>
                    <div className="flex rounded-[16px] py-2 px-6 border border-[#E7E7E7] bg-[var(--neutral-100)] justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <Image src={ApplePayImage} alt="ApplePayImage" />
                        <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                          {t("applePay")}
                        </span>
                      </div>
                      <Radio
                        className="radioPaymentMethod"
                        checked={paymentMethod == 2}
                        onClick={() => setPaymentMethod(2)}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-center rounded-[16px] pt-[32px] pb-[21px] border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240]">
                  <div className="flex flex-col gap-4 items-center">
                    <CloudIcon />
                    <span>{t("uploadAdditionalFiles")}</span>
                    <Upload {...props}>
                      <Button className="w-[300px] bg-[var(--neutral-100)] text-[var(--primary-color)] hover:!text-[var(--neutral-100)] hover:!bg-[var(--primary-color)]">
                        {t("upload")}
                      </Button>
                    </Upload>
                  </div>
                </div>
                <TextArea
                  className="BookAppointmentTextArea rounded-[16px] py-5 px-4 border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240] hover:!border-[#E7E7E7] focus:!border-[#E7E7E7] focus:shadow-none"
                  rows={4}
                  placeholder="maxLength is 6"
                />
              </div>
            ) : (
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex rounded-[16px] py-6 px-4 border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240] gap-4">
                  <div className="w-12 h-12">
                    <Image
                      src={DummyDoctorImage}
                      alt="User Name"
                      className="w-full h-full object-cover rounded-[50%]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-base leading-6 tracking-[0px] text-center text-[var(--primary-800)]">
                      Mohamed Eslam
                    </span>
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[var(--DescriptionColor2)]">
                      +9662789349
                    </span>
                  </div>
                </div>

                <div className="flex justify-between rounded-[16px] py-6 px-4 border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240] gap-4">
                  <span className="font-medium text-sm leading-6 tracking-[0px] text-[var(--DescriptionColor2)]">
                    {t("enterPromoCode")}
                  </span>
                  <span className="font-medium text-base leading-6 tracking-[0px] text-[var(--primary-color)] cursor-pointer">
                    {t("apply")}
                  </span>
                </div>

                {/* ///////////////// */}
                <div className="flex flex-col mt-2 gap-3">
                  <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                    {t("selectPaymentMethod")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <div className="flex rounded-[16px] py-2 px-6 border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240] justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <CashIcon />
                        <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                          {t("cash")}
                        </span>
                      </div>
                      <Radio
                        className="radioPaymentMethod"
                        checked={paymentMethod == 0}
                        onClick={() => setPaymentMethod(0)}
                      />
                    </div>
                    <div className="flex rounded-[16px] py-2 px-6 border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240] justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <Image src={CreditCardImage} alt="CreditCardImage" />

                        <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                          {t("creditCard")}
                        </span>
                      </div>
                      <Radio
                        className="radioPaymentMethod"
                        checked={paymentMethod == 1}
                        onClick={() => setPaymentMethod(1)}
                      />
                    </div>
                    <div className="flex rounded-[16px] py-2 px-6 border border-[#E7E7E7] bg-[var(--neutral-100)] shadow-[0_-3px_8px_0_#D2D2D240] justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <Image src={ApplePayImage} alt="ApplePayImage" />
                        <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                          {t("applePay")}
                        </span>
                      </div>
                      <Radio
                        className="radioPaymentMethod"
                        checked={paymentMethod == 2}
                        onClick={() => setPaymentMethod(2)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="w-[40%] flex flex-col gap-6 max-md:w-full rounded-[16px] border border-[#E7E7E7] bg-[var(--neutral-100)] px-4 pt-6 pb-[30px]">
              <div className="flex gap-4">
                <div className="w-[100px] h-[100px] rounded-[50%] flex-shrink-0">
                  <Image
                    className="w-full h-full rounded-[50%] object-cover"
                    src={DummyDoctorImage}
                    alt="Doctor Image"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-2xl leading-9 tracking-[0px] text-[var(--neutral-1000)]">
                      DR.Bassem Abdullah
                    </span>
                    <span className="font-medium text-base leading-6 tracking-[0px] text-[var(--neutral-700)]">
                      Dentist | Future Hospital
                    </span>
                  </div>
                  <div className="flex gap-[8px] items-center">
                    <RateIcon color="var(--secondary-300)" />
                    <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--primary-800)] mt-[3px]">
                      4.7
                      <span className="ps-1 text-[var(--neutral-800)]">
                        (200 {t("rating")})
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
              <div className="flex flex-col gap-3">
                <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                  {t("hospitalDetails")}
                </span>
                <div className="flex gap-3 items-center">
                  <div className="w-[32px] h-[32px] rounded-[8px]">
                    <Image
                      className="w-full h-full rounded-[8px] object-cover"
                      src={DummyDoctorImage}
                      alt="Doctor Image"
                    />
                  </div>
                  <div className="font-medium text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                    Clinic 9 , Palastine st. ,Jaddah
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
              <div className="flex flex-col gap-3">
                <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                  {t("bookingDate")}
                </span>
                <div className="flex gap-[64px]">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
                      {t("date")}
                    </span>
                    <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
                      Thr 09 May
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
                      {t("time")}
                    </span>
                    <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
                      10:00 Pm
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
                      {t("statementNo")}
                    </span>
                    <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
                      #230909
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
              <div className="flex flex-col gap-3">
                <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                  {t("paymentDetails")}
                </span>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[var(--darkColor)]">
                      {t("servicesCost")}
                    </span>
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[var(--DescriptionColor)]">
                      700 SR
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[var(--darkColor)]">
                      {t("fees")}
                    </span>
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[var(--DescriptionColor)]">
                      0 SR
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[var(--darkColor)]">
                      {t("discount")}
                    </span>
                    <span className="font-medium text-sm leading-6 tracking-[0px] text-[var(--DescriptionColor)]">
                      0 SR
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center h-[61px] bg-[#7E53FD1A] rounded-xl p-[20px]">
                  <span className="font-bold text-sm leading-6 tracking-[0px] text-[var(--primary-800)]">
                    {t("total")}
                  </span>
                  <span className="font-bold text-sm leading-6 tracking-[0px] text-[var(--primary-800)]">
                    700 SR
                  </span>
                </div>
              </div>
              <Button
                style={{
                  backgroundColor:
                    !goToCheckOut || [0, 1, 2].includes(paymentMethod)
                      ? "#6441EF"
                      : "var(--neutral-600)",
                  borderColor:
                    !goToCheckOut || [0, 1, 2].includes(paymentMethod)
                      ? "var(--primary-300)"
                      : "var(--neutral-600)",
                  pointerEvents:
                    !goToCheckOut || [0, 1, 2].includes(paymentMethod)
                      ? "auto"
                      : "none",
                }}
                className="hover:!text-[#6441EF] hover:!bg-[var(--neutral-100)]"
                onClick={() => setGoToCheckOut(true)}
                // disabled={paymentMethod == null && goToCheckOut}
              >
                {t(!goToCheckOut ? "goToCheckout" : "goToPayment")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
const days = [
  { day: "SUN", date: 18, isSelected: true },
  { day: "Mon", date: 19, isSelected: false },
  { day: "Tue", date: 20, isSelected: false },
  { day: "Wed", date: 21, isSelected: false },
  { day: "Thr", date: 22, isSelected: false },
  { day: "Fri", date: 23, isSelected: false },
  { day: "Sat", date: 24, isSelected: false },
];

const timeSlots = [
  { time: "10:00", isSelected: false },
  { time: "10:30", isSelected: true },
  { time: "11:00", isSelected: false },
  { time: "11:30", isSelected: false },
  { time: "12:00", isSelected: false },
  { time: "12:30", isSelected: false },
  { time: "13:00", isSelected: false },
  { time: "13:30", isSelected: false },
];

const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
