"use client";
import RateIcon from "@/assets/icons/RateIcon";
import Image from "next/image";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import DummyChildImage from "@/assets/images/DummyChildImage.png";
import { useTranslations } from "next-intl";
import Tag from "@/components/Tag";
import { useState } from "react";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import SelectBox from "@/components/SelectBox";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import DoctorCardResults from "@/components/DoctorCardResults";
import LocationIcon from "@/assets/icons/LocationIcon";
import StarIcon2 from "@/assets/icons/StarIcon2";

const Page = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="container overflow-visible mt-[170px] flex flex-col gap-4">
        <div className="p-6 flex gap-4 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
          <div className="w-[100px] h-[100px] rounded-[50%] flex-shrink-0">
            <Image
              className="w-full h-full rounded-[50%] object-cover"
              src={DummyDoctorImage}
              alt="Doctor Image"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="font-semibold text-2xl leading-9 tracking-[0px] text-[var(--Black)]">
                  NERA MEDICAL SPECIALIST CENTRE Hospital
                </span>
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
              <div className="flex gap-[20px] items-center">
                {/* noViews */}
                {/* speciality */}
                {/* noDoctors */}
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--DescriptionsColor)]">
                    {t("noViews")}
                  </span>
                  <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--titleColor)]">
                    300
                  </span>
                </div>
                <div className="h-[43px] w-[1px] bg-[#71717199]"></div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--DescriptionsColor)]">
                    {t("speciality")}
                  </span>
                  <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--titleColor)]">
                    11
                  </span>
                </div>
                <div className="h-[43px] w-[1px] bg-[#71717199]"></div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--DescriptionsColor)]">
                    {t("noDoctors")}
                  </span>
                  <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--titleColor)]">
                    20
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tags section */}
        <div className="flex gap-1">
          <Tag
            active={activeTab === 1}
            key={1}
            text={t("doctor")}
            onClick={() => setActiveTab(1)}
            classNameProp={
              activeTab === 1 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
          />
          <Tag
            active={activeTab === 2}
            key={2}
            text={t("aboutHospital")}
            onClick={() => setActiveTab(2)}
            classNameProp={
              activeTab === 2 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
          />
          <Tag
            active={activeTab === 3}
            key={3}
            text={t("reviews")}
            onClick={() => setActiveTab(3)}
            classNameProp={
              activeTab === 3 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
          />
          <Tag
            active={activeTab === 4}
            key={4}
            text={t("insurance")}
            onClick={() => setActiveTab(4)}
            classNameProp={
              activeTab === 4 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
          />
        </div>
        {/* Doctor Tab */}
        {activeTab == 1 && (
          <div className="flex flex-col gap-1">
            <div className="flex inputStyles gap-4 flex-wrap">
              <div className="flex-[2]">
                <HeroSectionInput
                  height="56px"
                  // width="369px"
                  placeholder={t("searchOnDoctorsName")}
                />
              </div>
              <div className="flex-1">
                <SelectBox placeholder={t("selectSpecialist")} />
              </div>
              <div className="flex-1">
                <SelectBox placeholder={t("branches")} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-xl leading-[24.2px] text-[#181C32] py-4">
                {t("doctors")} (380)
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
        )}
        {/* About Hospital Tab */}
        {activeTab == 2 && (
          <div className="flex flex-col">
            <div className="flex flex-col gap-3 py-6">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                {t("aboutHospital")}
              </span>
              <span className="font-[Inter] font-medium text-base leading-6 tracking-[0px] text-[var(--DescriptionColor)]">
                Specialized hands and one day surgery center under the
                supervision of Saudi consultants, with the latest international
                technologies
              </span>
            </div>
            <div className="flex flex-col gap-3 py-4">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                {t("branches")}
              </span>
              <div className="flex gap-3 items-center">
                <LocationIcon color="var(--color1)" w={12} h={17} />
                <span className="font-[Inter] font-medium text-base leading-6 tracking-[0px] text-[var(--DescriptionColor)]">
                  King Abdullah Road , Jeddah
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <LocationIcon color="var(--color1)" w={12} h={17} />
                <span className="font-[Inter] font-medium text-base leading-6 tracking-[0px] text-[var(--DescriptionColor)]">
                  Prince Hassan Ibn Ali Street , Jeddah
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 py-6">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                {t("specialists")}
              </span>
              <div className="flex gap-4 pt-4">
                {doctors.map((doc, i) => (
                  <div
                    className="flex flex-col w-[272px] h-[180px] rounded-xl items-center justify-center gap-7 bg-[#F4F4F4]"
                    key={i}
                  >
                    <div className="w-full h-[89px] overflow-hidden">
                      <Image src={DummyChildImage} alt="specialist Image" />
                    </div>
                    <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--darkColor)]">
                      Paediatrics
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab == 3 && (
          <div className="p-[20px] bg-[var(--neutral-100)] rounded-xl flex flex-col gap-3 shadow-[0_3px_8px_0_#D2D2D240]">
            <div className="flex justify-between">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--darkColor)]">
                {t("reviews")}
              </span>
              <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
                {t("seeMore")}
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
            <div className="mt-1 flex gap-4">
              {[1, 1, 1].map((e, i) => (
                <div
                  key={i}
                  className="p-5 flex flex-col gap-3 bg-[#F4F4F4] rounded-[12px] mt-1"
                >
                  <div className="flex gap-[6px]">
                    <StarIcon2 color="var(--secondary-200)" />
                    <StarIcon2 color="var(--secondary-200)" />
                    <StarIcon2 color="var(--secondary-200)" />
                    <StarIcon2 color="var(--secondary-200)" />
                    <StarIcon2 color="var(--secondary-200)" />
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
        )}

        {/* Insurance Tab */}
        {activeTab == 4 && (
          <div className="py-7 flex flex-col gap-3">
            <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
              {t("insurance")}
            </span>
            {[1, 1, 1].map((e, i) => (
              <div
                key={i}
                className="flex gap-3 items-center border-b border-b-[#E7E7E7] pb-3"
              >
                <div className="w-[52px] h-[52px] rounded-[8px] shadow-[0_3px_8px_0_#D2D2D240] overflow-hidden">
                  <Image
                    className="w-full h-full rounded-[8px] object-cover shadow-[0_3px_8px_0_#D2D2D240]"
                    src={DummyDoctorImage}
                    alt="Doctor Image"
                  />
                </div>
                <div className="font-semibold text-base leading-6 tracking-[0px] text-[#101010]">
                  Arabian insurance
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
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
