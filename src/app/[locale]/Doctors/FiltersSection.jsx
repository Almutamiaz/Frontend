"use client";
import SelectBox from "@/components/SelectBox";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../../utils/axios";
import { Col } from "antd";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import SearchButton from "@/components/SearchButton";
import { useParams, useRouter } from "next/navigation";

const FiltersSection = ({
  services,
  searchParams,
  hospitals,
  cities,
  doctors,
}) => {
  // console.log(await searchParams)
  const t = useTranslations();
  const { locale } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const debounceTimer = useRef(null);

  const [currentActiveMainService, setCurrentActiveMainService] = useState(
    +searchParams?.service || undefined
  );
  const [currentActiveClinic, setCurrentActiveClinic] = useState(
    +searchParams?.clinic || undefined
  );
  const [specializations, setSpecializations] = useState([]);
  const fetchSearchResults = async () =>
    // searchTerm = searchTearm,
    // serviceId = activeOption
    {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/specializations/main-service?mainServicesId=${currentActiveMainService}`
        );
        if (response.data.code === 200) {
          setSpecializations(response.data.data.specializations);
        }
      } catch (error) {
        // notificationApi.error({
        //   message:
        //     error.response?.data?.message || "Failed to fetch search results",
        //   showProgress: true,
        //   pauseOnHover: true,
        //   style: {
        //     fontFamily: "var(--fontFamily)",
        //   },
        // });
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    currentActiveMainService && fetchSearchResults();
    // console.log(searchParams)
  }, [currentActiveMainService]);

  useEffect(() => {
    setSearchLoading(false);
  }, [doctors]);

  const onChangeFunction = (e) => {
    const url = new URL(window.location.href);
    url.searchParams.set("search", e.target.value);
    window.history.pushState({}, "", url.toString());

    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      setSearchLoading(true);
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("search", e.target.value);
      router.push(`/${locale}/Doctors?${currentParams.toString()}`);
    }, 500);
  };
  return (
    <>
      <Col xs={24} xxl={4} lg={12} md={8}>
        <HeroSectionInput
          height="56px"
          setLoading={setSearchLoading}
          onChange={onChangeFunction}
          // width="369px"
          placeholder={t("searchOnOffer")}
          value={searchParams?.search}
          // doctors={doctors}
        />
      </Col>
      <Col xs={12} xxl={4} lg={6} md={8}>
        <SelectBox
          // width={"273px"}
          placeholder={t("mainServices")}
          options={services.map((service) => ({
            value: service.id,
            label: service.title,
          }))}
          // isServices="service"
          value={currentActiveMainService}
          onChange={(e) => {
            setCurrentActiveMainService(e);
            const url = new URL(window.location.href);
            url.searchParams.set("service", e);
            window.history.pushState({}, "", url.toString());

            setSearchLoading(true);
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set("service", e);
            router.push(`/${locale}/Doctors?${currentParams.toString()}`);
          }}
        />
      </Col>

      <Col xs={12} xxl={4} lg={6} md={8}>
        <SelectBox
          // disabled={specializations?.length === 0}
          loading={loading}
          // width={"273px"}
          placeholder={t("clinic")}
          options={specializations.map((specialization) => ({
            value: specialization.id,
            label: specialization.title,
          }))}
          isServices="clinic"
          value={currentActiveClinic}
          onChange={(e) => {
            setCurrentActiveClinic(e);
            const url = new URL(window.location.href);
            url.searchParams.set("clinic", e);
            window.history.pushState({}, "", url.toString());

            setSearchLoading(true);
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set("clinic", e);
            router.push(`/${locale}/Doctors?${currentParams.toString()}`);
          }}
        />
      </Col>

      <Col xs={12} xxl={4} lg={6} md={8}>
        <SelectBox
          // width={"273px"}
          placeholder={t("hospital")}
          options={hospitals.map((hospital) => ({
            value: hospital.id,
            label: hospital.name,
          }))}
          isServices="hospital"
          value={+searchParams?.hospital || undefined}
          onChange={(e) => {
            const url = new URL(window.location.href);
            url.searchParams.set("hospital", e);
            window.history.pushState({}, "", url.toString());

            setSearchLoading(true);
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set("hospital", e);
            router.push(`/${locale}/Doctors?${currentParams.toString()}`);
          }}
        />
      </Col>
      <Col xs={12} xxl={4} lg={6} md={8}>
        <SelectBox
          // width={"273px"}
          placeholder={t("city")}
          options={cities.map((city) => ({
            value: city.id,
            label: city.title,
          }))}
          isServices="city"
          value={+searchParams?.city || undefined}
          onChange={(e) => {
            const url = new URL(window.location.href);
            url.searchParams.set("city", e);
            window.history.pushState({}, "", url.toString());

            setSearchLoading(true);
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set("city", e);
            router.push(`/${locale}/Doctors?${currentParams.toString()}`);
          }}
        />
      </Col>
      <Col xs={12} xxl={4} lg={6} md={8}>
        <div className="flex gap-2">
          <div className="w-[56px] h-[56px] bg-[var(--neutral-200)] rounded-[1000px] flex justify-center items-center shrink-0">
            <SettingsIcon />
          </div>
          <SearchButton
            destination={`Doctors`}
            doctors={doctors}
            loading={searchLoading}
          />
        </div>
      </Col>
    </>
  );
};

export default FiltersSection;
