"use client";
import SelectBox from "@/components/SelectBox";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axios";
import { Tooltip } from "antd";

const FiltersSection = ({ services, searchParams }) => {
  // console.log(await searchParams)
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
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
  return (
    <>
      {/* <SelectBox
        width={"273px"}
        placeholder={t("city")}
        options={cities.map((city) => ({
          value: city.id,
          label: city.title,
        }))}
        isServices
        value={searchParams?.city}
      /> */}
      <SelectBox
        width={"273px"}
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
        }}
      />
      <SelectBox
        // disabled={specializations?.length === 0}
        loading={loading}
        width={"273px"}
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
        }}
      />
    </>
  );
};

export default FiltersSection;
