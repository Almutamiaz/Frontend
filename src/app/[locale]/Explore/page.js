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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeOption, setActiveOption] = useState(
    +searchParams.get("service_id")
  );
  const [startTyping, setStartTyping] = useState(false);
  const [viewResults, setViewResults] = useState(!false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTearm, setSearchTearm] = useState(searchParams.get("q") || "");
  const { locale } = useParams();
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
        if (!+searchParams.get("service_id")) {
          setActiveOption(response.data.data[0].id);
        }
        await fetchSearchResults("", activeOption || response.data.data[0].id);
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

  const params = new URLSearchParams(searchParams.toString());
  const onChange = (e) => {
    const value = e.target.value;
    setSearchTearm(value);
    value.length > 0 && setSearchLoading(true);

    // Update URL search params
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);

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

  return (
    <div className="flex flex-col">
      <div className="ExploreSection h-[384px] w-full flex flex-col justify-end">
        <div className="container h-[calc(100%-156px)] flex justify-center items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-[56px] font-extrabold leading-[67.2px] text-[var(--primary-200)] text-center max-[853px]:text-[32px] max-[853px]:leading-[40px]">
              {/* <span className="">{t("exploreHakeemServices")}</span>{" "} */}
              {/* <span className="text-[var(--primary-200)] text-[20px]"> */}
              {t("exploreHakeemServices")}
              {/* </span>{" "} */}
              {/* <span className="">{t("options")}</span> */}
            </h1>
            <h6 className="text-[var(--neutral-900)] text-center max-w-[800px] max-sm:mb-4">
              {t("hakeemAllInOneApp")}
            </h6>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-[13px]  overflow-hidden transform translate-y-[-27px] items-center">
        <div className="ExplorePageParentOfInput !max-w-[658px] w-full overflow-hidden">
          <HeroSectionInput
            suffix={
              <div className="w-10 h-10 rounded-[50%] bg-[var(--neutral-200)] flex justify-center items-center">
                <SettingsIcon />
              </div>
            }
            width={"100%"}
            height="60px"
            fullWidthInSm
            onChange={onChange}
          />
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex mt-[11px] gap-2 max-[965px]:w-full overflow-x-auto scrollbar-hide">
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
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("service_id", service.id);
                  router.push(`?${params.toString()}`);
                  fetchSearchResults(searchTearm, service.id);
                }}
              />
            ))}
          </div>
        )}

        {searchTearm == "" &&
        searchResults.doctors.length === 0 &&
        searchResults.hospitals.length === 0 &&
        searchResults.offers.length === 0 ? (
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
                      <Link href={`/${locale}/Doctors?${params.toString()}`}>
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
                  searchResults.offers.length === 0 &&
                  searchTearm.length != 0 && (
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
