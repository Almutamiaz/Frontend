import Image from "next/image";
import React from "react";
import HakeemHealthCareLogo from "@/assets/icons/HakeemHealthCareLogo";
import { Button, Col } from "antd";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import ShareButton from "./ShareButton";

const OfferCard = async ({ offer }) => {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <Col
      xs={24}
      sm={12}
      md={12}
      lg={8} // 24 / 8 = 3 cards per row on md
      xxl={6} // 24 / 6 = 4 cards per row on lg
    >
      <div
        className="h-[548px] w-full rounded-[12px] shadow-[0_3px_8px_0_#D2D2D240] border border-[#FCFCFC] flex flex-col overflow-hidden relative py-[22px] gap-3"
        style={{
          fontFamily: "var(--fontFamily)",
        }}
      >
        <div className="h-[300px] px-[12px] pb-[12px]">
          <div className="border border-[var(--primary-color)] h-full rounded-[4px] relative">
            <Image
              src={offer?.photo}
              width={0}
              height={0}
              sizes="100vw"
              alt="Offer Img"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
            {/* <div className="w-[105px] h-[40px] rounded-[100px] bg-[#FEFEFE66] absolute top-0 start-1/2 py-[5px] px-[10px]"> */}
            <div className="w-[105px] h-[40px] rounded-[100px] bg-[#FEFEFE66] absolute top-[-25px] start-1/2 -translate-x-1/2 py-[5px] px-[10px] backdrop-blur-sm rtl:translate-x-1/2">
              <HakeemHealthCareLogo
                w={"100%"}
                h={"100%"}
                color="var(--primary-color)"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 px-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-[150%] tracking-[0px] text-[var(--color1)]">
                {offer?.title}
              </span>
              <div className="flex gap-2">
                {offer?.have_discount == 1 && (
                  <span className="font-normal text-base leading-[150%] tracking-[0px] text-[var(--Black-300)] relative">
                    {offer?.price}
                    <div className="h-[2px] w-full bg-[var(--red-200)] top-[50%] absolute start-0 rotate-[-10deg]"></div>
                  </span>
                )}
                <span className="font-bold text-base leading-[150%] tracking-[0px] text-[var(--Black-900)]">
                  {offer?.price_after}
                </span>
              </div>
            </div>
            <div className="rounded-[12px] flex flex-col py-[7px] px-3 bg-[#EFE6FD] justify-between">
              <span className="font-normal text-xs leading-[150%] tracking-[0px] text-[var(--purple-900)]">
                {t("offerCode")}
              </span>
              <span className="font-extrabold text-xs leading-[150%] tracking-[0px] text-[var(--purple-900)]">
                {offer?.uuid}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <Image
                src={offer?.hospital?.photo}
                alt="Hospital Img"
                width={0}
                height={0}
                className="w-[24px] h-[24px] rounded-[50%] object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm leading-[150%] tracking-[0px] text-[var(--color1)]">
                  {offer?.hospital?.first_name}
                </span>
                <span className="font-normal text-xs leading-[150%] tracking-[0px] text-[var(--color1)]">
                  {offer?.hospital?.location?.location}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <ShareButton id={offer?.id} />
              <Button className="flex-[2] font-medium text-sm leading-[22px] tracking-normal text-center align-middle">
                <Link href={`/${locale}/Services/ServiceDetails/${offer?.id}`}>
                  {t("bookNow")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default OfferCard;
