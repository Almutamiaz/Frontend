"use client";
import React, { useState, useEffect, useRef } from "react";
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
import axiosInstance from "../../../../utils/axios";
import { useAppNotification } from "@/Context/NotificationProvider";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useParams } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const t = useTranslations();
  const [activeOption, setActiveOption] = useState(1);
  const [startTyping, setStartTyping] = useState(false);
  const [viewResults, setViewResults] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTearm, setSearchTearm] = useState("");
  const { locale } = useParams();
  console.log(locale);
  const [searchResults, setSearchResults] = useState({
    doctors: [],
    hospitals: [],
    offers: [],
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const notificationApi = useAppNotification();
  const debounceTimeout = useRef(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/main/services");
      if (response.data.code === 200) {
        setServices(response.data.data);
        setActiveOption(response.data.data[0].id);
      }
    } catch (error) {
      notificationApi.error({
        message: error.response?.data?.message || "Failed to fetch services",
        showProgress: true,
        pauseOnHover: true,
        style: {
          fontFamily: "var(--fontFamily)",
        },
      });
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (
    searchTerm = searchTearm,
    serviceId = activeOption
  ) => {
    setSearchLoading(true);
    try {
      const response = await axiosInstance.get(
        `/home/search?search=${searchTerm}&main_service_id=${serviceId}`
      );
      if (response.data.code === 200) {
        console.log(response.data.data.doctors.data);
        setSearchResults({
          doctors: response.data.data.doctors.data?.slice(0, 4) || [],
          hospitals: response.data.data.hospitals.data?.slice(0, 4) || [],
          offers: response.data.data.offers.data?.slice(0, 4) || [],
        });
      }
    } catch (error) {
      notificationApi.error({
        message:
          error.response?.data?.message || "Failed to fetch search results",
        showProgress: true,
        pauseOnHover: true,
        style: {
          fontFamily: "var(--fontFamily)",
        },
      });
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const onChange = (e) => {
    const value = e.target.value;
    setSearchTearm(value);
    value.length > 0 && setSearchLoading(true);
    // Clear existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new timeout
    debounceTimeout.current = setTimeout(() => {
      if (value.length > 0) {
        fetchSearchResults(value);
      } else {
        setSearchResults({
          doctors: [],
          hospitals: [],
          offers: [],
        });
      }
    }, 500); // 500ms delay
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
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex mt-[11px] gap-2">
            {services.map((service) => (
              <Tag
                active={activeOption === service.id}
                key={service.id}
                text={service.title}
                icon={
                  <div className={`w-6 h-6 relative transform scale-125`}>
                    <Image
                      src={service.photo}
                      alt={service.title}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                }
                onClick={() => {
                  setActiveOption(service.id);
                  searchTearm != "" &&
                    fetchSearchResults(searchTearm, service.id);
                }}
              />
            ))}
          </div>
        )}

        {searchTearm == "" ? (
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
            {searchLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {searchResults.doctors.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                      <span className="text-[16px] leading-6 font-bold text-[var(--neutral-1000)]">
                        {t("doctors")}
                      </span>
                      <Link href={`/${locale}/Services`}>
                        <span
                          className="font-normal text-sm leading-[21px] text-[var(--neutral-700)] cursor-pointer"
                          onClick={() => setViewResults(true)}
                        >
                          {t("viewMore")}
                        </span>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      {searchResults.doctors.map((doc) => (
                        <DoctorCardSearchSuggestion
                          key={doc.id}
                          name={doc.first_name}
                          specialization={`${doc.speciality} | ${doc.hospital.first_name}`}
                          img={doc.photo}
                          href={`/${locale}/Doctors/${doc.id}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {searchResults.hospitals.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                      <span className="text-[16px] leading-6 font-bold text-[var(--neutral-1000)]">
                        {t("hospitals")}
                      </span>
                      <Link href={`/${locale}/Services`}>
                        <span
                          className="font-normal text-sm leading-[21px] text-[var(--neutral-700)] cursor-pointer"
                          onClick={() => setViewResults(true)}
                        >
                          {t("viewMore")}
                        </span>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      {searchResults.hospitals.map((hospital) => (
                        <DoctorCardSearchSuggestion
                          key={hospital.id}
                          name={hospital.name}
                          specialization={hospital.city.title}
                          img={hospital.photo}
                          href={`/${locale}/Hospital/${hospital.id}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {searchResults.offers.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                      <span className="text-[16px] leading-6 font-bold text-[var(--neutral-1000)]">
                        {t("offers")}
                      </span>
                      <Link href={`/${locale}/Services`}>
                        <span
                          className="font-normal text-sm leading-[21px] text-[var(--neutral-700)] cursor-pointer"
                          onClick={() => setViewResults(true)}
                        >
                          {t("viewMore")}
                        </span>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      {searchResults.offers.map((offer) => (
                        <DoctorCardSearchSuggestion
                          key={offer.id}
                          name={offer.title}
                          specialization={offer.description}
                          img={offer.photo}
                          href={`/${locale}/Services/ServiceDetails/${offer.id}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {!searchLoading &&
                  searchResults.doctors.length === 0 &&
                  searchResults.hospitals.length === 0 &&
                  searchResults.offers.length === 0 && (
                    <div className="text-center text-[var(--neutral-700)]">
                      {t("noResultsFound")}
                    </div>
                  )}
              </>
            )}
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
          {searchResults.doctors.map((doc) => (
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
