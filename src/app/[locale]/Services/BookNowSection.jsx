"use client";
import ClockIcon from "@/assets/icons/ClockIcon";
import SelectBox from "@/components/SelectBox";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../../utils/axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { Button, Form, Switch } from "antd";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useUser } from "@/Context/UserContext";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import AntdFormItem from "@/components/AntdFormItem";
import CalendarIcon from "@/assets/icons/CalendarIcon";

const BookNowSection = ({ Offer }) => {
  const { user } = useUser();
  const { locale } = useParams();
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const BookingSectionRef = useRef(null);
  const [selectedDoctor, setSelectedDoctor] = useState(
    Offer?.providers.length == 1 ? Offer?.providers[0]?.id : null
  );
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [showSelectDayAlert, setShowSelectDayAlert] = useState(false);
  const [showSelectTimeAlert, setShowSelectTimeAlert] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(0);
  const [loading, setLoading] = useState(
    Offer?.providers.length == 1 ? true : false
  );
  const [fetchWalletDetailsLoading, setFetchWalletDetailsLoading] =
    useState(false);
  const [form] = Form.useForm();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [walletDetails, setWalletDetails] = useState(null);
  const getAvailableDays = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/offer/schedule?offer_id=${Offer.id}&doctor_id=${selectedDoctor || ""}`
      );
      if (response.data.code === 200) {
        setAvailableDays(response?.data?.data?.schedule);
        setSelectedDay(response?.data?.data?.schedule[0].date);
        setAvailableTimeSlots(response?.data?.data?.schedule[0]?.hours);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethods = async () => {
    try {
      const response = await axiosInstance.get(
        `/offer/payment/methods?offer_id=${Offer.id}`
      );
      if (response.data.code === 200) {
        setPaymentMethods(response?.data?.data);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
    }
  };
  const getWalletDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/wallet/details?offer_id=${Offer.id}`
      );
      if (response.data.code === 200) {
        setWalletDetails(response?.data?.data);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
    }
  };

  useEffect(() => {
    getAvailableDays();
  }, [selectedDoctor]);

  const fetchData = async () => {
    setFetchWalletDetailsLoading(true);
    try {
      await Promise.all([getPaymentMethods(), getWalletDetails()]);
      const element = BookingSectionRef.current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 220;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setBookingStatus(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetchWalletDetailsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8" ref={BookingSectionRef}>
      {bookingStatus == 0 ? (
        <>
          {Offer.have_doctors == 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[var(--color1)] font-bold text-xl leading-[24.2px] tracking-[0px]">
                  {t("selectDoctor")}
                </span>
                <SelectBox
                  // options={Offer?.providers}
                  value={selectedDoctor}
                  options={Offer?.providers.map((provider) => ({
                    value: provider.id,
                    label: provider.first_name,
                  }))}
                  placeholder={t("selectDoctor")}
                  onChange={(e) => {
                    setSelectedDoctor(e);
                  }}
                />
              </div>
            </div>
          )}
          {(Offer.have_doctors == 0 || selectedDoctor) &&
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
                  <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
                    {availableDays?.map((day) => (
                      <div
                        className="rounded-[100px] py-[10px] px-2 flex flex-col min-w-[62px] min-h-[90px] justify-center items-center cursor-pointer"
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
                          setShowSelectDayAlert(false);
                          setSelectedTime(null);
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
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <span className="text-[var(--color1)] font-bold text-xl leading-[24.2px] tracking-[0px]">
                      {t("availability")}
                    </span>
                    <span className="text-[var(--neutral-900)] font-medium text-sm leading-[22px] tracking-[0px]">
                      {availableTimeSlots?.length > 0
                        ? t("selectAvailableTimeForYou")
                        : t("noAvailableTimes")}
                    </span>
                  </div>
                  <div className="grid grid-rows-[repeat(2,auto)] grid-flow-col auto-cols-max gap-2 overflow-y-hidden overflow-x-auto pb-3 scrollbar-hide">
                    {availableTimeSlots?.map((time) => (
                      <div
                        className="rounded-[100px] flex min-w-[97px] h-10 items-center justify-center gap-3 cursor-pointer"
                        key={time}
                        style={{
                          backgroundColor:
                            selectedTime == time
                              ? "#6441EF"
                              : "var(--neutral-200)",
                          transition: "all ease-in-out 0.3s",
                        }}
                        onClick={() => {
                          setSelectedTime(time);
                          setShowSelectTimeAlert(false);
                        }}
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
              </>
            ))}
        </>
      ) : (
        <>
          {/* <div className="flex justify-between rtl:[&>svg]:!rotate-[-135deg]">
            <span className="text-[var(--color1)] font-bold text-xl leading-[24.2px] tracking-[0px]">
              {t("bookingDetails")}
            </span>
            <div
              className="cursor-pointer"
              onClick={() => {
                setBookingStatus(0);
              }}
            >
              <ArrowIcon size={12} deg={45} color={"var(--color1)"} mt={1} />
            </div>
          </div> */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                  {t("bookingDate")}
                </span>
                <div
                  className="cursor-pointer rtl:[&>svg]:!rotate-[-135deg]"
                  onClick={() => {
                    setBookingStatus(0);
                  }}
                >
                  <ArrowIcon
                    size={12}
                    deg={45}
                    color={"var(--color1)"}
                    mt={1}
                  />
                </div>
              </div>

              <div className="flex gap-[64px]">
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
                    {t("date")}
                  </span>
                  <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
                    {selectedDay}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
                    {t("time")}
                  </span>
                  <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
                    {selectedTime}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-6 tracking-[0px] text-[#101010]">
                    {t("statementNo")}
                  </span>
                  <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
                    {Offer?.uuid}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <CalendarIcon color={"var(--color1)"} size={17} />
                  <span className="text-[var(--color1)] font-[500] text-[16px] leading-[24.2px] tracking-[0px]">
                    {t("date")}
                  </span>
                </div>
                <span className="text-[var(--Black-400)] font-[500] text-sm leading-[24.2px] tracking-[0px]">
                  {selectedDay}
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <ClockIcon color={"var(--color1)"} />
                  <span className="text-[var(--color1)] font-[500] text-[16px] leading-[24.2px] tracking-[0px]">
                    {t("time")}
                  </span>
                </div>
                <span className="text-[var(--Black-400)] font-[500] text-sm leading-[24.2px] tracking-[0px]">
                  {selectedTime}
                </span>
              </div>
            </div> */}
            <div className="flex rounded-[16px] justify-between py-5 px-4 bg-[#7E53FD1A] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
              <span className="font-bold text-sm leading-6 tracking-[0px] text-[var(--primary-800)]">
                {t("wallet")}{" "}
                {`(${walletDetails?.total_price} ${walletDetails?.currency})`}
              </span>
              <Switch
                className="antdSwitchStyle2"
                onChange={(e) => {
                  // setInsuranceCompanyEnabled(e);
                }}
              />
            </div>
            <Form form={form}>
              <AntdFormItem
                classNameProp="customInputStyle promoCodeInput"
                placeholder={t("enterPromoCode")}
                required
                requiredMessage={t("pleaseEnterPromoCode")}
                name="promoCode"
                suffix={
                  <span
                    className="text-[var(--color1)] font-[500] text-[16px] leading-[24.2px] tracking-[0px] cursor-pointer"
                    onClick={() => {
                      alert("f");
                    }}
                  >
                    {t("apply")}
                  </span>
                }
              />
            </Form>
          </div>
          {/* <span className="text-[var(--color1)] font-bold text-xl leading-[24.2px] tracking-[0px]">
            {t("priceDetails")}
          </span>
          <div className="flex flex-col gap-4 [&>*:last-child]:border-b-0">
            <div className="flex justify-between pb-4 border-b border-[var(--Gray-200)]">
              <span className="text-[var(--Black)] font-bold text-base leading-[24.2px] tracking-[0px]">
                {t("priceDetails")}
              </span>
              <span className="text-[var(--Black-400)] font-[500] text-sm leading-[24.2px] tracking-[0px]">
                13.00 SAR
              </span>
            </div>
            <div className="flex justify-between pb-4 border-b border-[var(--Gray-200)]">
              <span className="text-[var(--Black)] font-bold text-base leading-[24.2px] tracking-[0px]">
                {t("priceDetails")}
              </span>
              <span className="text-[var(--Black-400)] font-[500] text-sm leading-[24.2px] tracking-[0px]">
                13.00 SAR
              </span>
            </div>
            <div className="flex justify-between pb-4 border-b border-[var(--Gray-200)]">
              <span className="text-[var(--Black)] font-bold text-base leading-[24.2px] tracking-[0px]">
                {t("priceDetails")}
              </span>
              <span className="text-[var(--Black-400)] font-[500] text-sm leading-[24.2px] tracking-[0px]">
                13.00 SAR
              </span>
            </div>
          </div>
          <div className="flex rounded-[16px] justify-between py-5 px-4 bg-[var(--gray)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
            <span className="text-[var(--Black)] font-bold text-base leading-[24.2px] tracking-[0px]">
              {t("priceDetails")}
            </span>
            <span className="text-[var(--Black)] font-bold text-base leading-[24.2px] tracking-[0px]">
              13.00 SAR
            </span>
          </div> */}
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
            <div className="flex justify-between items-center h-[61px] bg-[#7E53FD1A] rounded-xl p-[20px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
              <span className="font-bold text-sm leading-6 tracking-[0px] text-[var(--primary-800)]">
                {t("total")}
              </span>
              <span className="font-bold text-sm leading-6 tracking-[0px] text-[var(--primary-800)]">
                700 SR
              </span>
            </div>
          </div>
        </>
      )}
      <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
      <div className="flex flex-col gap-3">
        {(showSelectDayAlert || showSelectTimeAlert) && (
          <div className="flex flex-col gap-1">
            {showSelectDayAlert && (
              <span className="text-red-500 text-[12px]">
                *{t("pleaseSelectAvailableDayForYou")}
              </span>
            )}
            {showSelectTimeAlert && (
              <span className="text-red-500 text-[12px]">
                *{t("pleaseSelectAvailableTimeForYou")}
              </span>
            )}
          </div>
        )}
        <Button
          style={{
            backgroundColor: "#6441EF",
            borderColor: "var(--primary-300)",
          }}
          disabled={fetchWalletDetailsLoading}
          className="hover:!text-[#6441EF] hover:!bg-[var(--neutral-100)] w-full search-button"
          onClick={() => {
            if (!selectedDay || !selectedTime) {
              !selectedDay &&
                availableDays.length > 0 &&
                setShowSelectDayAlert(true);
              !selectedTime &&
                availableTimeSlots.length > 0 &&
                setShowSelectTimeAlert(true);
              return;
            }
            if (user) {
              if (bookingStatus == 0) {
                fetchData();
              } else {
                form
                  .validateFields()
                  .then((values) => {
                    console.log(values);
                  })
                  .catch((error) => {
                    console.log("Validation failed:", error);
                  });
              }
            } else {
              router.push(`/${locale}/Account/SignIn?redirect=${pathname}`);
            }
          }}
        >
          {fetchWalletDetailsLoading && (
            <LoadingSpinner color="var(--neutral-100)" />
          )}
          {t(bookingStatus == 0 ? "bookNow" : "goToPayment")}
        </Button>
      </div>
    </div>
  );
};

export default BookNowSection;
