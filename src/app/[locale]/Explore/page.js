"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import Tag from "@/components/Tag";
import BookAppointmentIcon from "@/assets/icons/BookAppointmentIcon";
import HomeVisitsIcon from "@/assets/icons/HomeVisitsIcon";
import VideoConsultationIcon from "@/assets/icons/VideoConsultationIcon";
import PulseIcon from "@/assets/icons/PulseIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import DoctorCardSearchSuggestion from "@/components/DoctorCardSearchSuggestion";
import SelectBox from "@/components/SelectBox";
import { Button } from "antd";
import DoctorCardResults from "@/components/DoctorCardResults";

const Page = () => {
  const t = useTranslations();
  const [activeOption, setActiveOption] = useState(1);
  const [startTyping, setStartTyping] = useState(false);
  const [viewResults, setViewResults] = useState(false);

  const onChange = (e) => {
    setStartTyping(Boolean(e.target.value.length));
  };

  return !viewResults ? (
    <div className="flex flex-col">
      <div className="ExploreSection h-[384px] w-full flex flex-col justify-end">
        <div className="container h-[calc(100%-156px)] flex justify-center items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-[56px] font-extrabold leading-[67.2px] text-[var(--primary-800)]">
              <span className="">{t("explore")}</span>{" "}
              <span className="text-[var(--primary-200)]">
                {t("healthcare")}
              </span>{" "}
              <span className="">{t("options")}</span>
            </h1>
            <h6 className="text-[var(--neutral-900)] text-center">
              {t("searchHealthcareProviders")}
            </h6>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-[13px]  overflow-hidden transform translate-y-[-27px] items-center">
        <div className="ExplorePageParentOfInput !max-w-[658px] min-w-[658px] overflow-hidden">
          <HeroSectionInput
            suffix={
              <div className="w-10 h-10 rounded-[50%] bg-[var(--neutral-200)] flex justify-center items-center">
                <SettingsIcon />
              </div>
            }
            height="60px"
            onChange={onChange}
          />
        </div>
        <div className="flex mt-[11px] gap-2">
          {/* // active ? "var(--primary-300)" : "var(--neutral-200)" */}

          <Tag
            active={activeOption === 1}
            key={1}
            text="Book Appointment"
            icon={
              <BookAppointmentIcon
                color={activeOption === 1 ? false : "var(--neutral-900)"}
              />
            }
            onClick={() => setActiveOption(1)}
          />
          <Tag
            active={activeOption === 2}
            key={2}
            text="Home visits"
            icon={
              <HomeVisitsIcon
                color={activeOption === 2 ? "var(--neutral-100)" : false}
              />
            }
            onClick={() => setActiveOption(2)}
          />
          <Tag
            active={activeOption === 3}
            key={3}
            text="Video Consultation"
            icon={
              <VideoConsultationIcon
                color={activeOption === 3 ? "var(--neutral-100)" : false}
              />
            }
            onClick={() => setActiveOption(3)}
          />
        </div>

        {!startTyping ? (
          <div className="container flex flex-col gap-4 items-center">
            <div className="flex gap-1 items-center">
              <PulseIcon color={"var(--titleColor)"} />
              <span className="text-sm font-bold leading-[16.94px] text-[var(--titleColor)]">
                {t("lookingFor")}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap justify-center max-w-[346px]">
              {dummyData.map((item) => (
                <div
                  className="px-4 py-[10px] bg-[var(--neutral-200)] text-[var(--Black)] text-xs font-normal leading-[14.52px] rounded-[87px] cursor-pointer"
                  key={item.id}
                >
                  {item.category}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-[7px] flex flex-col gap-4 w-full max-w-[657px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-[16px] leading-6 font-bold text-[var(--neutral-1000)]">
                  {t("doctors")}
                </span>
                <span
                  className="font-normal text-sm leading-[21px] text-[var(--neutral-700)] cursor-pointer"
                  onClick={() => setViewResults(true)}
                >
                  {t("viewMore")}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {doctors.map((doc) => (
                  <DoctorCardSearchSuggestion
                    key={doc.name}
                    name={doc.name}
                    specialization={`${doc.specialty} | ${doc.hospital}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-[16px] leading-6 font-bold text-[var(--neutral-1000)]">
                  {t("Specialists")}
                </span>
                <span className="font-normal text-sm leading-[21px] text-[var(--neutral-700)]">
                  {t("viewMore")}
                </span>
              </div>
              {/* <div className="flex flex-col gap-3">
                <DoctorCardSearchSuggestion />
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="container h-[calc(100%-156px)] mt-[156px] flex flex-col gap-6  pt-4">
      <div className="flex inputStyles gap-4 flex-wrap">
        <HeroSectionInput
          height="56px"
          onChange={onChange}
          width="369px"
          placeholder={t("searchOnDoctorsMedicalCenter")}
        />
        <SelectBox width={"273px"} placeholder={t("selectSpecialist")} />
        <SelectBox width={"273px"} placeholder={t("city")} />
        <div className="flex gap-2 ms-auto">
          <div className="w-[56px] h-[56px] bg-[var(--neutral-200)] rounded-[1000px] flex justify-center items-center">
            <SettingsIcon />
          </div>
          <Button className="py-[18.5px] px-7 font-semibold text-base leading-[19.36px] text-[var(--neutral-100)]">
            {t("search")}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl leading-[24.2px] text-[var(--primary-700)]">
          {t("results")} (380)
        </span>
        <div className="flex gap-[18px] flex-wrap">
          {doctors.map((doc) => (
            <DoctorCardResults
              key={doc.name}
              name={doc.name}
              specialization={`${doc.specialty} | ${doc.hospital}`}
              city={"Jeddah - Al Ruwais"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
const dummyData = [
  {
    id: 1,
    category: "Eye Specialist",
  },
  {
    id: 2,
    category: "Dentist",
  },
  {
    id: 3,
    category: "Dermatology",
  },
  {
    id: 4,
    category: "Pulmonologist",
  },
  {
    id: 5,
    category: "Audiology",
  },
];

const doctors = [
  {
    name: "DR.Bassem Abdullah",
    specialty: "Dentist",
    hospital: "Future Hospital",
  },
  {
    name: "DR.Bassma Ahmed",
    specialty: "Dentist",
    hospital: "Saudi Hospital",
  },
  {
    name: "DR.Belal Khaled",
    specialty: "Dentist",
    hospital: "German Hospital",
  },
  {
    name: "DR.Belal Khaled",
    specialty: "Dentist",
    hospital: "German Hospital",
  },
];
