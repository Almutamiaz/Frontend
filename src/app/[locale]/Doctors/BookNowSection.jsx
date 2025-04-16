"use client";
import ClockIcon from "@/assets/icons/ClockIcon";
import SelectBox from "@/components/SelectBox";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axios";
import LoadingSpinner from "@/components/LoadingSpinner";

const BookNowSection = ({ Offer, Doctor }) => {
  const t = useTranslations();
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [availableDays, setSvailableDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(
    Offer?.providers.length == 1 ? true : false
  );
  const [specialistsLoading, setSpecialistsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [specialists, setSpecialists] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getAvailableDays = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/offer/schedule?offer_id=${Offer.id}&doctor_id=${selectedDoctor || ""}`
      );
      if (response.data.code === 200) {
        setSvailableDays(response?.data?.data?.schedule);
        setSelectedDay(response?.data?.data?.schedule[0].date);
        setAvailableTimeSlots(response?.data?.data?.schedule[0]?.hours);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSpecialists = async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const response = await axiosInstance.get(
        `/hospital/specializations/main-service?mainServicesId=13&page=${pageNumber}&search=&hospitalId=${Doctor?.setting?.hospital?.id}`
      );
      if (response.data.code === 200) {
        const newSpecialists = response?.data?.data?.data;
        setSpecialists((prev) => [...prev, ...newSpecialists]);
        setHasMore(response?.data?.data?.last_page > pageNumber);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setIsLoadingMore(false);
    }
  };
  const handleScrollEnd = () => {
    if (!isLoadingMore && hasMore) {
      setPageNumber((prev) => prev + 1);
    }
  };
  useEffect(() => {
    getAvailableSpecialists();
  }, [pageNumber]);

  // useEffect(() => {
  //   getAvailableDays();
  // }, [selectedSpecialty]);
  return (
    <>
      {true && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[var(--color1)] font-bold text-xl leading-[24.2px] tracking-[0px]">
              {t("selectSpecialty")}
            </span>
            <SelectBox
              value={selectedSpecialty}
              options={specialists?.map((specialty) => ({
                value: specialty.id,
                label: specialty.title,
              }))}
              placeholder={t("selectSpecialty")}
              onChange={(e) => {
                setSelectedSpecialty(e);
                console.log(e);
              }}
              onScrollEnd={handleScrollEnd}
              loading={isLoadingMore}
            />
          </div>
        </div>
      )}
      {Offer?.have_doctors == 0 &&
        (loading ? (
          <div className="w-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[var(--color1)] font-bold text-xl leading-[24.2px] tracking-[0px]">
                  {t("date")}
                </span>
                <span className="text-[var(--neutral-900)] font-medium text-sm leading-[22px] tracking-[0px]">
                  {t("selectAvailableDayForYou")}
                </span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-3">
                {availableDays?.map((day) => (
                  <div
                    className="rounded-[100px] py-[10px] px-2 flex flex-col min-w-[62px] min-h-[90px] justify-center items-center"
                    key={day.date}
                    style={{
                      backgroundColor:
                        selectedDay == day.date
                          ? "#6441EF"
                          : "var(--neutral-200)",
                      border: "1px solid",
                      borderColor:
                        selectedDay == day.date
                          ? "var(--primary-300)"
                          : "var(--neutral-800)",
                      transition: "all ease-in-out 0.3s",
                    }}
                    onClick={() => {
                      setSelectedDay(day.date);
                      setAvailableTimeSlots(day.hours);
                    }}
                  >
                    <span
                      className="text-xs leading-6 tracking-[0px] text-center"
                      style={{
                        color:
                          selectedDay == day.date
                            ? "var(--neutral-100)"
                            : "var(--primary-800)",
                        fontWeight: selectedDay == day.date ? 600 : 400,
                      }}
                    >
                      {day.day.slice(0, 3)}
                    </span>
                    <span
                      className="text-sm leading-6 tracking-[0px] text-center"
                      style={{
                        color:
                          selectedDay == day.date
                            ? "var(--neutral-100)"
                            : "var(--primary-800)",
                        fontWeight: selectedDay == day.date ? 600 : 400,
                      }}
                    >
                      {day.date.slice(5)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
            {availableTimeSlots?.length > 0 && (
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
                  {availableTimeSlots?.map((time) => (
                    <div
                      className="rounded-[100px] flex min-w-[97px] h-10 items-center justify-center gap-3"
                      key={time}
                      style={{
                        backgroundColor:
                          selectedTime == time
                            ? "#6441EF"
                            : "var(--neutral-200)",
                        transition: "all ease-in-out 0.3s",
                      }}
                      onClick={() => setSelectedTime(time)}
                    >
                      <ClockIcon
                        color={
                          !(selectedTime == time)
                            ? "var(--neutral-900)"
                            : "var(--neutral-100)"
                        }
                      />
                      <span
                        className="text-sm leading-6 tracking-[0px] text-center font-normal"
                        style={{
                          color:
                            selectedTime == time
                              ? "var(--neutral-100)"
                              : "var(--primary-800)",
                        }}
                      >
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ))}
    </>
  );
};

export default BookNowSection;
