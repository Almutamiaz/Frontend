import Image from "next/image";
import React from "react";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import CoinImage from "@/assets/images/CoinImage.png";
import WaitingRoomImage from "@/assets/images/WaitingRoomImage.png";
import RateIcon from "@/assets/icons/RateIcon";
import { useTranslations } from "next-intl";
import StarIcon2 from "@/assets/icons/StarIcon2";
import ClockIcon from "@/assets/icons/ClockIcon";
import { Button } from "antd";
import DoctorHomeVisits from "@/assets/images/DoctorHomeVisits.png";
import OnlineConsolations from "@/assets/images/OnlineConsolations.png";
const Page = () => {
  const t = useTranslations();

  return (
    <div className="bg-[#FAFAFA]">
      <div className="container mt-[170px] flex gap-4 flex-wrap max-md:flex-col">
        <div className="flex flex-col flex-1 gap-2">
          <div className="p-6 flex gap-4 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
            <div className="w-[100px] h-[100px] rounded-[50%]">
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
              Consultant of Pediatrics and  i s a board-certified cardiologist
              with over 15 years of experience specializing in the treatment of
              cardiovascular diseases. She is passionate about p
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
