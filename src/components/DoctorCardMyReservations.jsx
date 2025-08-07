import Image from "next/image";
import React from "react";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import Tag from "./Tag";
import { useTranslations } from "next-intl";
import { Button } from "antd";
import CallIcon from "@/assets/icons/CallIcon";
import CallIcon2 from "@/assets/icons/CallIcon2";

const DoctorCardMyReservations = ({ reservation }) => {
  const t = useTranslations();

  // Helper function to parse booking date and time
  const parseBookingDateTime = (bookingDateString) => {
    if (!bookingDateString) return { date: "", time: "" };

    // Split by '/' to separate date and time
    const parts = bookingDateString.split("/");
    if (parts.length !== 2) return { date: bookingDateString, time: "" };

    const datePart = parts[0].trim();
    const timePart = parts[1].trim();

    // Clean up the date part (remove extra spaces around comma)
    const cleanDate = datePart.replace(/,/g, ", ");

    // Clean up the time part (ensure consistent format)
    const cleanTime = timePart.replace(/-/g, " - ");

    return {
      date: cleanDate,
      time: cleanTime,
    };
  };

  const { date, time } = parseBookingDateTime(reservation?.booking_date);

  return (
    <div className="p-4 rounded-xl shadow-[0_3px_8px_0_#D2D2D240] flex flex-col gap-4 w-full">
      <div className="flex gap-3 items-center flex-wrap">
        <div className="w-[60px] h-[60px] flex-shrink-0">
          <Image
            src={reservation?.serviceProvider?.photo}
            alt="User Name"
            className="w-full h-full object-cover rounded-[50%]"
            width={60}
            height={60}
          />
        </div>
        <div className="flex justify-between items-center flex-1">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-base leading-6 tracking-[0px] text-[#101010] whitespace-nowrap">
              {reservation?.serviceProvider?.first_name}{" "}
              {reservation?.serviceProvider?.last_name}
            </span>
            <Tag
              text={reservation?.status?.title}
              classNameProp="py-1 px-3 font-medium text-xs leading-[22px] tracking-[0px]"
              bgColorProp={statusColors[reservation?.status?.id]?.bgColor}
              textColorProp={statusColors[reservation?.status?.id]?.textColor}
              withoutBorder
              px={12}
              py={4}
              width={`fit-content`}
            />
            {/* <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--DescriptionsColor)]">
              {reservation?.serviceProvider?.type}
            </span> */}
          </div>
          {/* <Tag
            text={reservation?.status?.title}
            classNameProp="py-1 px-3 font-medium text-xs leading-[22px] tracking-[0px]"
            bgColorProp={statusColors[reservation?.status?.id]?.bgColor}
            textColorProp={statusColors[reservation?.status?.id]?.textColor}
            withoutBorder
            px={12}
            py={4}
          /> */}
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E7E7E7]"></div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
            {t("statementNo")}
          </span>
          <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
            {reservation?.order_id}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
            {t("date")}
          </span>
          <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
            {date}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
            {t("time")}
          </span>
          <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
            {time}
          </span>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E7E7E7]"></div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Button className="group hover:!text-[#6441EF] hover:!bg-[var(--neutral-100)] w-full h-12">
            <CallIcon2
              color="white"
              className="group-hover:[&>path]:fill-[#6441EF] transition-colors"
            />
            {t("call")}
          </Button>
        </div>
        {reservation?.can_cancel && (
          <div className="flex-1">
            <div className="flex justify-center items-center cursor-pointer w-full px-[22px] py-[13px] text-[var(--DescriptionsColor)] border border-[var(--DescriptionsColor)] rounded-[100px] font-medium text-sm leading-[22px] tracking-[0px] h-12 whitespace-nowrap">
              {t("cancelReservation")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCardMyReservations;
const statusColors = {
  1: { bgColor: "#FEB05233", textColor: "#FEB052" }, // awaitingAccept
  2: { bgColor: "#F9731633", textColor: "#F97316" }, // awaitingPayment (orange)
  3: { bgColor: "#3B82F633", textColor: "#3B82F6" }, // awaitingImplementation (blue)
  4: { bgColor: "#6366F133", textColor: "#6366F1" }, // inProgress (indigo)
  5: { bgColor: "#00928333", textColor: "#009283" }, // completed
  6: { bgColor: "#D1D5DB33", textColor: "#6B7280" }, // rejected (gray)
  7: { bgColor: "#FF3B301F", textColor: "var(--red)" }, // cancel
};
