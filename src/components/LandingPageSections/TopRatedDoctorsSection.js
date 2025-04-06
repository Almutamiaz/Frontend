import { BASE_URL } from "@/constants";
import { getLocale } from "next-intl/server";
import React from "react";
import DoctorCard from "../LandingPageComponents/DoctorCard";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import DoctorsListSwiper from "../LandingPageComponents/DoctorsListSwiper";

const TopRatedDoctorsSection = async () => {
  const locale = await getLocale();
  const res = await fetch(`${BASE_URL}/doctors`, {
    cache: "no-store",
    headers: {
      "X-localization": locale,
    },
  });

  const { data: doctors } = await res.json();
  // console.log(doctors)
  return <DoctorsListSwiper doctors={doctors} />;
  // return (
  //   <>
  //     {doctors.map((doctor) => (
  //       <DoctorCard
  //         key={doctor?.id}
  //         img={doctor?.photo}
  //         name={doctor?.first_name}
  //         rate={doctor?.rating}
  //       />
  //     ))}
  //   </>
  // );
};

export default TopRatedDoctorsSection;
