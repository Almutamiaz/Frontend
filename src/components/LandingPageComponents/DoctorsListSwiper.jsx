"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import DoctorCard from "./DoctorCard";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";

const DoctorsListSwiper = () => {
  return (
    <div className="py-3 flex gap-2 flex-nowrap overflow-x-auto w-full testr1">
      <Swiper
        slidesPerView="auto"
        spaceBetween={8}
        freeMode={true}
        modules={[Autoplay, FreeMode, Pagination]}
        autoplay={{
          delay: 0.5,
          disableOnInteraction: true,
          // pauseOnMouseEnter: true,
          // reverseDirection: true,
        }}
        loop={true}
        speed={2500}
        className="mySwiper2"
        key="re1232131er3321"
      >
        {[...dummyData, ...dummyData].map((item) => (
          <SwiperSlide key={Math.random()} className="max-w-[162px]">
            <DoctorCard
              img={DummyDoctorImage}
              name={"DR. Sami yasser"}
              rate={"4.9"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

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
export default DoctorsListSwiper;
