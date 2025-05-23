"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import SaudiHospital from "@/assets/images/SaudiHospital.png";
import { useParams, useRouter } from "next/navigation";
const MedicalCentresSwiper = ({ hospitals }) => {
  const { locale } = useParams();
  const router = useRouter();
  return (
    <div className="py-3 flex gap-2 flex-nowrap overflow-x-auto w-full testr1">
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        freeMode={true}
        modules={[Autoplay, FreeMode, Pagination]}
        // autoplay={{
        //   delay: 0.5,
        //   disableOnInteraction: true,
        //   // pauseOnMouseEnter: true,
        //   // reverseDirection: true,
        // }}
        loop={true}
        speed={2500}
        className="mySwiper2"
        key="re1232131er3321"
      >
        {hospitals?.map((hospital) => (
          <SwiperSlide
            key={hospital?.id}
            className="max-w-[72px] max-h-[72px] min-w-[72px] min-h-[72px] cursor-pointer flex"
            onClick={() => {
              router.push(`/${locale}/Hospital/${hospital?.id}`);
            }}
          >
            {/* <div className="h-[100%] w-[100%] rounded-[50%] border-[0.5px] border-solid border-[var(--primary-color)] flex justify-center items-center bg-[var(--neutral-100)]"></div> */}
            <Image
              src={hospital?.photo}
              alt={hospital?.name}
              // className="h-[100%] w-[100%] rounded-[50%] border-[0.5px] border-solid border-[var(--Primary-Color)]"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                border: "0.5px solid var(--primary-color)",
                borderRadius: "50%",
                backgroundColor: "var(--neutral-100)",
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MedicalCentresSwiper;
