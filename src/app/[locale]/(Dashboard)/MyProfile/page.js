"use client";

import Image from "next/image";
import React, { useState } from "react";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import profileCompletedSuccessfullyGif from "@/assets/images/profileCompletedSuccessfullyGif.gif";
import ProfileImage from "@/assets/images/ProfileImage.png";
import LocationIcon2 from "@/assets/icons/LocationIcon2";
import CallIcon3 from "@/assets/icons/CallIcon3";
import MessageIcon from "@/assets/icons/MessageIcon";
import { Button, DatePicker, InputNumber, Radio } from "antd";
import { useTranslations } from "next-intl";
import HeaderOfSection from "@/components/HeaderOfSection";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import ArrowIcon2 from "@/assets/icons/ArrowIcon2";
import SelectBox from "@/components/SelectBox";
import { useUser } from "@/Context/UserContext";

const Page = () => {
  const t = useTranslations();
  const [completeProfileStatus, setCompleteProfileStatus] = useState(0);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const { user } = useUser();
  console.log(user);
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "test";
      case 1:
        return (
          <>
            <HeaderOfSection
              title={t("selectYourDateOfBirth")}
              titleSize={24}
              titleColor={"var(--primary-800)"}
              titleLH={24}
              titleWeight={700}
              description={t("dobInfo")}
              DesColor={"var(--neutral-700)"}
              DesMaxWidth={380}
              DesCenter
            />
            <DatePicker
              format={{
                format: "DD-MM-YYYY",
                type: "mask",
              }}
              className="dobCompleteProfile"
              suffixIcon={null}
              prefix={
                <div className="ps-3 pe-[14px]">
                  <CalendarIcon />
                </div>
              }
              placeholder="DD-MM-YYYY"
              onChange={(e) => setDob(e)}
            />
          </>
        );
      case 2:
        return (
          <>
            <HeaderOfSection
              title={t("selectYourNationality")}
              titleSize={24}
              titleColor={"var(--primary-800)"}
              titleLH={24}
              titleWeight={700}
              description={t("nationalityInfo")}
              DesColor={"var(--neutral-700)"}
              DesMaxWidth={380}
              DesCenter
            />
            <SelectBox classNameProp="selectBoxStyle" />
          </>
        );
      case 3:
        return (
          <>
            <HeaderOfSection
              title={t("specifyYourGender")}
              titleSize={24}
              titleColor={"var(--primary-800)"}
              titleLH={24}
              titleWeight={700}
              description={t("genderInfo")}
              DesColor={"var(--neutral-700)"}
              DesMaxWidth={380}
              DesCenter
            />
            <div className="flex gap-4">
              <div
                className="ps-6 gap-3 py-4 rounded-[100px] flex-1"
                style={{
                  border: `1px solid ${
                    gender == "male" ? "#BFA9FE" : "#C0C0C0"
                  }`,
                  backgroundColor: gender == "male" ? "#BFA9FE33" : "#F3F3F3",
                }}
              >
                <Radio
                  checked={gender == "male"}
                  onClick={() => setGender("male")}
                  className="radioInputStyle"
                />
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#020617]">
                  {t("male")}
                </span>
              </div>
              <div
                className="ps-6 gap-3 py-4 rounded-[100px] flex-1"
                style={{
                  border: `1px solid ${
                    gender == "female" ? "#BFA9FE" : "#C0C0C0"
                  }`,
                  backgroundColor: gender == "female" ? "#BFA9FE33" : "#F3F3F3",
                }}
              >
                <Radio
                  checked={gender == "female"}
                  onClick={() => setGender("female")}
                  className="radioInputStyle"
                />
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#020617]">
                  {t("female")}
                </span>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <HeaderOfSection
              title={t("yourIdentificationNumber")}
              titleSize={24}
              titleColor={"var(--primary-800)"}
              titleLH={24}
              titleWeight={700}
              description={t("idNumberInfo")}
              DesColor={"var(--neutral-700)"}
              DesMaxWidth={380}
              DesCenter
            />
            <InputNumber
              className="InputNumberStyle"
              defaultValue={100}
              controls={false}
              type="number"
            />
          </>
        );
      default:
        return "Unknown Status";
    }
  };

  return (
    <>
      {completeProfileStatus == 0 ? (
        <div className="flex flex-col gap-3">
          <div className="p-6 flex flex-col gap-4 shadow-[0_3px_12px_0_#2F2B3D24] rounded-[6px]">
            <div className="flex gap-5 items-center flex-wrap">
              <div className="w-[91px] h-[91px]">
                <Image
                  src={user?.photo || DummyDoctorImage}
                  alt="User Name"
                  className="w-full h-full object-cover rounded-[50%]"
                  width={91}
                  height={91}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-2xl leading-[38px] tracking-[0px] text-[#2F2B3DE5]">
                  {user?.first_name} {user?.last_name}
                </span>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex gap-2 items-center">
                    <LocationIcon2 />
                    <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2]">
                      {user?.country?.title}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <CallIcon3 />
                    <span
                      className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2]"
                      dir="ltr"
                    >
                      +{user?.intro} {user?.phone}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <MessageIcon />
                    <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2]">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl flex p-7 bg-[#6441EF1F] gap-5 flex-wrap">
              <Image src={ProfileImage} alt="P rofile Image" />
              <div className="flex flex-col gap-4 justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-xl leading-[38px] tracking-[0px] text-[var(--color1)]">
                    Your Profile is 75% Complete!
                  </span>
                  <p className="font-medium text-sm leading-[22px] tracking-[0px] text-[var(--darkColor)]">
                    You’re almost done! Complete your profile to enjoy a better
                    experience and get personalized recommendations.
                  </p>
                </div>
                <Button
                  className="hover:!text-[#6441EF] hover:!bg-[var(--neutral-100)] font-medium text-[15px] leading-[22px] tracking-[0px] py-[8px] px-[20px] max-w-[158px] h-[40px]"
                  onClick={() => setCompleteProfileStatus(1)}
                >
                  {t("completeProfile")}
                </Button>
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-6 shadow-[0_3px_12px_0_#2F2B3D24] rounded-[6px]">
            <span className="font-bold text-lg leading-[28px] tracking-[0px] text-[#2F2B3DE5]">
              {t("personalInformation")}
            </span>
            <div className="flex gap-x-6 gap-y-3 flex-wrap overflow-hidden">
              <div className="flex justify-between w-[48%] max-lg:w-full flex-wrap">
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DE5] capitalize w-[50%]">
                  {t("fullName")}:
                </span>
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2] w-[50%]">
                  {user?.first_name} {user?.last_name}
                </span>
              </div>
              <div className="flex justify-between w-[48%] max-lg:w-full flex-wrap">
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DE5] capitalize w-[50%]">
                  {t("birthDate")}:
                </span>
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2] w-[50%]">
                  {user?.birth_date}
                </span>
              </div>
              <div className="flex justify-between w-[48%] max-lg:w-full flex-wrap">
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DE5] capitalize w-[50%]">
                  {t("email")}:
                </span>
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2] w-[50%]">
                  {user?.email}
                </span>
              </div>
              <div className="flex justify-between w-[48%] max-lg:w-full flex-wrap">
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DE5] capitalize w-[50%]">
                  {t("phoneNumber")}:
                </span>
                <span
                  className="font-normal text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2] w-[50%] rtl:text-right"
                  dir="ltr"
                >
                  +{user?.intro} {user?.phone}
                </span>
              </div>
              <div className="flex justify-between w-[48%] max-lg:w-full flex-wrap">
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DE5] capitalize w-[50%]">
                  {t("gender")}:
                </span>
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2] w-[50%] capitalize">
                  {user?.gender}
                </span>
              </div>
              <div className="flex justify-between w-[48%] max-lg:w-full flex-wrap">
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DE5] capitalize w-[50%]">
                  {t("country")}:
                </span>
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2] w-[50%]">
                  {user?.country?.title}
                </span>
              </div>
              <div className="flex justify-between w-[48%] max-lg:w-full flex-wrap">
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DE5] capitalize w-[50%]">
                  {t("passportId")}:
                </span>
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2] w-[50%]">
                  {user?.passport_id}
                </span>
              </div>
              <div className="flex justify-between w-[48%] max-lg:w-full flex-wrap">
                <span className="font-medium text-sm leading-[22px] tracking-[0px] text-[#2F2B3DE5] capitalize w-[50%]">
                  {t("age")}:
                </span>
                <span className="font-normal text-sm leading-[22px] tracking-[0px] text-[#2F2B3DB2] w-[50%]">
                  {user?.age}
                </span>
              </div>
            </div>
            <Button className="hover:!text-[#6441EF] hover:!bg-[var(--neutral-100)] font-medium text-[15px] leading-[22px] tracking-[0px] py-[6px] px-[32px] max-w-[158px] h-[32px]">
              {t("editProfile")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col shadow-[0_3px_12px_0_#2F2B3D24] flex-1 rounded-[6px] justify-center items-center">
          {completeProfileStatus == 5 ? (
            <div className="flex flex-col gap-6 justify-between items-center pb-5">
              <Image
                src={profileCompletedSuccessfullyGif}
                alt="GIF"
                width={240}
                height={204}
                unoptimized
              />
              <HeaderOfSection
                title={t("profileCompletedSuccessfully")}
                titleSize={24}
                titleColor={"var(--primary-800)"}
                titleLH={24}
                titleWeight={700}
                description={t("congratulationsProfileComplete")}
                DesColor={"var(--neutral-700)"}
                DesMaxWidth={380}
                DesCenter
              />
              <Button
                className="flex-1 w-full"
                style={{
                  minHeight: "56px",
                }}
                onClick={() => {
                  completeProfileStatus < 4 &&
                    setCompleteProfileStatus((p) => p + 1);
                }}
              >
                {t("continue")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-28 items-center">
              <div className="flex gap-3">
                {[1, 1, 1, 1].map((step, index) => (
                  <div
                    className="flex h-[4px] rounded-xl w-[84px]"
                    style={{
                      backgroundColor:
                        index + 1 <= completeProfileStatus
                          ? "var(--primary-color)"
                          : "var(--primary-100)",
                    }}
                    key={index}
                  ></div>
                ))}
              </div>
              <div className="flex flex-col gap-6">
                {getStatusText(completeProfileStatus)}
                {dob && (
                  <div className="flex gap-3">
                    {completeProfileStatus > 1 && (
                      <div className="flex w-1/3 justify-center items-center gap-[10px]">
                        <ArrowIcon2 />
                        <span
                          className="font-semibold text-base leading-[19.36px] tracking-[0px] text-[var(--neutral-1000)] cursor-pointer"
                          onClick={() => setCompleteProfileStatus((p) => p - 1)}
                        >
                          {t("back")}
                        </span>
                      </div>
                    )}
                    <Button
                      className="flex-1"
                      onClick={() => {
                        completeProfileStatus < 5 &&
                          setCompleteProfileStatus((p) => p + 1);
                      }}
                    >
                      {t("continue")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
// ... existing code ...
