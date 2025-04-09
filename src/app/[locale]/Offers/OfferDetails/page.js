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
import { Button, InputNumber, Radio, Row, Switch, Upload } from "antd";
import DoctorHomeVisits from "@/assets/images/DoctorHomeVisits.png";
import OnlineConsolations from "@/assets/images/OnlineConsolations.png";
import CloudIcon from "@/assets/icons/CloudIcon";
import { Input } from "antd";
import CashIcon from "@/assets/icons/CashIcon";
import AntdFormItem from "@/components/AntdFormItem";
import OfferCard from "@/components/OfferCard";
const { TextArea } = Input;
const Page = () => {
  const t = useTranslations();
  const [bookNow, setBookNow] = useState(false);
  const [goToCheckOut, setGoToCheckOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [insuranceCompanyEnabled, setInsuranceCompanyEnabled] = useState(false);
  const [bookingForSomeone, setBookingForSomeone] = useState(false);

  return (
    <div className="bg-[#FAFAFA] min-h-[988px] pb-10 flex flex-col gap-[34px]">
      <div className="container overflow-visible mt-[170px] flex gap-4 flex-wrap max-md:flex-col">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex gap-2 flex-wrap">
            <div className="py-[20px] px-[24px] gap-4 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)] flex-[2] min-w-[280px] flex flex-col justify-between">
              {/* <div className="flex flex-col justify-between"> */}
              <div className="flex flex-col gap-[6px]">
                <span className="font-bold text-xl leading-[150%] tracking-[0px] text-[var(--color1)]">
                  Laser Hair Removal
                </span>
                <p className="font-normal text-base leading-[150%] tracking-[0px] text-[var(--Black-300)]">
                  Get 20% off your first session - smooth, hair-free skin starts
                  here.
                </p>
              </div>
              <div className="rounded-[12px] flex flex-col py-[7px] px-3 bg-[#EFE6FD] justify-between max-w-fit">
                <span className="font-normal text-xs leading-[150%] tracking-[0px] text-[var(--purple-900)]">
                  {t("offerCode")}
                </span>
                <span className="font-extrabold text-xs leading-[150%] tracking-[0px] text-[var(--purple-900)]">
                  12908
                </span>
              </div>
              {/* </div> */}
            </div>
            <div className="border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)] flex-[3] h-[332px] overflow-hidden min-w-[280px]">
              <Image
                src={DummyDoctorImage}
                alt="Offer Image"
                className="w-full h-full object-cover"
              />
            </div>
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
              {t("exploreMoreOffer")}
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
      </div>
      <div className="container flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="font-bold text-2xl leading-6 tracking-[0px] text-[var(--purple-900)]">
            {t("suggestedOffer")}
          </span>
          <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
            {t("seeMore")}
          </span>
        </div>
        <Row gutter={[16, 16]} className="w-full">
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
          </Row>
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
