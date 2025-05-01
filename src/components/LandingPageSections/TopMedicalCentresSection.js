import { BASE_URL } from "@/constants";
import { getLocale } from "next-intl/server";
import React from "react";
import MedicalCentresSwiper from "../LandingPageComponents/MedicalCentresSwiper";

const TopMedicalCentresSection = async () => {
  const locale = await getLocale();
  const res = await fetch(`${BASE_URL}/hospitals`, {
    cache: "no-store",
    headers: {
      "X-localization": locale,
    },
  });
  if (!res.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/hospitals`);
  }
  const { data: hospitals } = await res.json();
  // console.log(hospitals);
  return <MedicalCentresSwiper hospitals={hospitals} />;
};

export default TopMedicalCentresSection;
