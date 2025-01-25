"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import SaudiHospital from "@/assets/images/SaudiHospital.png";
const MedicalCentresSwiper = () => {
  return (
    <div className="py-3 flex gap-2 flex-nowrap overflow-x-auto w-full testr1">
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
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
        {[...dummyData, ...dummyData, ...dummyData, ...dummyData].map(
          (item) => (
            <SwiperSlide
              key={Math.random()}
              className="max-w-[72px] max-h-[72px] min-w-[72px] min-h-[72px]"
            >
              <div className="h-[100%] w-[100%] rounded-[50%] border-[0.5px] border-solid border-[var(--primary-color)] flex justify-center items-center bg-[var(--neutral-100)]"></div>
              {/* <Image
                src={SaudiHospital}
                alt="Medical Center"
                className="h-[100%] w-[100%] rounded-[50%] border-[0.5px] border-solid border-[var(--Primary-Color)]"
              ></Image> */}
            </SwiperSlide>
          )
        )}
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
export default MedicalCentresSwiper;
