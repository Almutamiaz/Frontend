import React, { Suspense } from "react";
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
import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/constants";
import BookNowSection from "../BookNowSection";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { locale, docId } = params;
  const t = await getTranslations();
  const doctorRes = await fetch(`${BASE_URL}/doctor/profile?userId=${docId}`, {
    headers: {
      "X-localization": locale,
    },
  });
  const { data: Doctor } = await doctorRes.json();
  const title = `${t("doctor")} ${Doctor?.first_name} ${
    Doctor?.last_name
  } | ${t("hakeem")}`;
  const description = `Book an appointment with Dr. ${Doctor?.first_name} ${
    Doctor?.last_name
  }, ${Doctor?.setting?.speciality} specialist at ${
    Doctor?.setting?.hospital?.first_name
  }. ${Doctor?.experiences?.[0]?.description?.slice(0, 150) || ""}`;

  return {
    title: title,
    description: description,
    // openGraph: {
    //   title: title,
    //   description: description,
    //   type: "profile",
    //   images: [
    //     {
    //       url: Doctor?.photo,
    //       width: 800,
    //       height: 600,
    //       alt: `${Doctor?.first_name} ${Doctor?.last_name} profile picture`,
    //     },
    //   ],
    //   profile: {
    //     firstName: Doctor?.first_name,
    //     lastName: Doctor?.last_name,
    //     username: `${Doctor?.first_name}${Doctor?.last_name}`,
    //   },
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: title,
    //   description: description,
    //   images: [Doctor?.photo],
    // },
    // alternates: {
    //   canonical: `/Doctors/${docId}`,
    // },
    // robots: {
    //   index: true,
    //   follow: true,
    //   googleBot: {
    //     index: true,
    //     follow: true,
    //   },
    // },
  };
}

const Page = async ({ params }) => {
  const { locale, docId } = await params;
  const t = await getTranslations();
  const doctorRes = await fetch(`${BASE_URL}/doctor/profile?userId=${docId}`, {
    headers: {
      "X-localization": locale,
    },
  });
  const { data: Doctor } = await doctorRes.json();
  console.log(Doctor);

  // DOCTOR REVIEWS
  const doctorReviewsRes = await fetch(
    `${BASE_URL}/doctor/rate?doctor_id=${docId}`,
    {
      headers: {
        "X-localization": locale,
      },
    }
  );
  const { data: doctorReviews } = await doctorReviewsRes.json();
  // console.log(doctorReviews);

  return (
    <div className="bg-[#FAFAFA] min-h-[988px] pb-10">
      <div className="container overflow-visible mt-[170px] flex gap-4 flex-wrap max-md:flex-col">
        <div className="flex flex-col flex-1 gap-2">
          <div className="p-6 flex gap-4 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
            <div className="w-[100px] h-[100px] rounded-[50%] flex-shrink-0">
              <Image
                className="w-full h-full rounded-[50%] object-cover"
                src={Doctor?.photo}
                alt={`${Doctor?.first_name} ${Doctor?.last_name}`}
                width={100}
                height={100}
                sizes="100vw"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="font-semibold text-2xl leading-9 tracking-[0px] text-[var(--neutral-1000)]">
                  {`${Doctor?.first_name} ${Doctor?.last_name}`}
                </span>
                <span className="font-medium text-base leading-6 tracking-[0px] text-[var(--neutral-700)]">
                  {`${Doctor?.setting?.speciality} | ${Doctor?.setting?.hospital?.first_name}`}
                </span>
              </div>
              <div className="flex gap-[8px] items-center">
                <RateIcon color="var(--secondary-300)" />
                <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--primary-800)] mt-[3px]">
                  {Doctor?.rate < 1 ? t("recentlyAdded") : Doctor?.rate}
                  <span className="ps-1 text-[var(--neutral-800)]">
                    ({doctorReviews?.length} {t("rating")})
                  </span>
                </span>
              </div>
            </div>
          </div>
          {Doctor?.experiences?.length > 0 && (
            <div className="flex flex-col gap-3 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                {t("aboutDoctor")}
              </span>
              <p className="font-medium text-base leading-6 tracking-[0px] text-[var(--neutral-900)] whitespace-pre-line">
                {`${Doctor?.experiences?.[0]?.title ?? ""}\n${
                  Doctor?.experiences?.[0]?.sub_title ?? ""
                }\n${Doctor?.experiences?.[0]?.description ?? ""}`}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-3 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
            <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
              {t("hospitalDetails")}
            </span>
            <div className="flex gap-3 items-center">
              <div className="w-[32px] h-[32px] rounded-[8px]">
                <Image
                  className="w-full h-full rounded-[8px] object-cover"
                  src={Doctor?.setting?.hospital?.photo}
                  alt={Doctor?.setting?.hospital?.first_name}
                  width={32}
                  height={32}
                  sizes="100vw"
                  loading="lazy"
                />
              </div>
              <div className="font-medium text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                {`${Doctor?.setting?.hospital?.first_name} , ${Doctor?.setting?.hospital?.city?.title}`}
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col gap-3 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
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
          </div> */}
          <div className="flex flex-col gap-2 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
            <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
              {t("reviews")}
            </span>
            {doctorReviews?.length === 0 ? (
              <div className="text-[var(--neutral-900)] font-bold text-sm leading-6 tracking-[0px]">
                {t("noReviewsFound")}
              </div>
            ) : (
              <>
                <div className="flex gap-[8px] items-center">
                  <RateIcon size={15} color="var(--secondary-300)" />
                  <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--primary-800)] mt-[3px]">
                    {Doctor?.rate}
                    <span className="ps-1 text-[var(--neutral-800)]">
                      ({doctorReviews.length} {t("rating")})
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {doctorReviews.map((review, i) => (
                    <div
                      key={review.id}
                      className="py-5 px-[30px] flex flex-col gap-3 bg-[var(--neutral-200)] rounded-[12px] mt-1"
                    >
                      <div className="flex gap-[6px]">
                        {Array.from(
                          { length: review?.order_average_rate },
                          (_, index) => (
                            <StarIcon2 key={index} />
                          )
                        )}
                      </div>
                      <span className="font-[Almarai] text-[var(--neutral-900)] font-bold text-sm leading-6 tracking-[0px]">
                        {review.comment}
                      </span>
                      <span className="text-[var(--primary-800)] font-normal text-xs leading-6 tracking-[0px]">
                        {review.created_at}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
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
                      {Doctor?.setting?.in_hospital_price} SR
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
                      {Doctor?.appointment_count} {t("visits")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
              <BookNowSection Doctor={Doctor} />
              <Button
                style={{
                  backgroundColor: "#6441EF",
                  borderColor: "var(--primary-300)",
                }}
                className="hover:!text-[#6441EF] hover:!bg-[var(--neutral-100)]"
              >
                <Link href={`/${locale}/Download`}>{t("bookNow")}</Link>
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
