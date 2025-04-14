import React from "react";
import Image from "next/image";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import CoinImage from "@/assets/images/CoinImage.png";
import WaitingRoomImage from "@/assets/images/WaitingRoomImage.png";
import RateIcon from "@/assets/icons/RateIcon";
import StarIcon2 from "@/assets/icons/StarIcon2";
import ClockIcon from "@/assets/icons/ClockIcon";
import { Button, Row } from "antd";
import DoctorHomeVisits from "@/assets/images/DoctorHomeVisits.png";
import OnlineConsolations from "@/assets/images/OnlineConsolations.png";
import OfferCard from "@/components/OfferCard";
import { getLocale, getTranslations } from "next-intl/server";
import { BASE_URL } from "@/constants";
import Link from "next/link";
import SelectBox from "@/components/SelectBox";
import BookNowSection from "../../BookNowSection";
const Page = async ({ params }) => {
  const { offerID } = await params;
  console.log(offerID);
  const t = await getTranslations();
  const locale = await getLocale();

  // Fetch Service Details
  const offerDetailsRes = await fetch(
    `${BASE_URL}/offer/details?offer_id=${offerID}`,
    {
      headers: {
        "X-localization": locale,
      },
    }
  );
  const { data: Offer } = await offerDetailsRes.json();
  console.log(Offer);
  const offersRes = await fetch(`${BASE_URL}/offer`, {
    headers: {
      "X-localization": locale,
    },
  });
  const { data: offersData } = await offersRes.json();
  const offers = offersData.data;

  // Step 1: Exclude the item with the given id.
  const filtered = offers.filter((item) => item.id !== +offerID);

  // Step 2: Split the filtered array into two parts:
  // The first part contains the first two elements (if available).
  const firstTwo = filtered.slice(0, 2);

  // The second part contains the rest of the elements.
  const rest = filtered.slice(2);

  console.log(filtered, firstTwo, rest);

  return (
    <div className="bg-[#FAFAFA] min-h-[988px] pb-10 flex flex-col gap-[34px]">
      <div className="container overflow-visible mt-[170px] flex gap-4 flex-wrap max-md:flex-col">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex gap-2 flex-wrap">
            <div className="py-[20px] px-[24px] gap-4 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)] flex-[2] min-w-[280px] flex flex-col justify-between">
              {/* <div className="flex flex-col justify-between"> */}
              <div className="flex flex-col gap-[6px]">
                <span className="font-bold text-xl leading-[150%] tracking-[0px] text-[var(--color1)]">
                  {Offer?.title}
                </span>
                <p className="font-normal text-base leading-[150%] tracking-[0px] text-[var(--Black-300)]">
                  {Offer?.description}
                </p>
              </div>
              <div className="rounded-[12px] flex flex-col py-[7px] px-3 bg-[#EFE6FD] justify-between max-w-fit">
                <span className="font-normal text-xs leading-[150%] tracking-[0px] text-[var(--purple-900)]">
                  {t("offerCode")}
                </span>
                <span className="font-extrabold text-xs leading-[150%] tracking-[0px] text-[var(--purple-900)]">
                  {Offer?.uuid}
                </span>
              </div>
              {/* </div> */}
            </div>
            <div className="border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)] flex-[3] h-[332px] overflow-hidden min-w-[280px]">
              <Image
                src={Offer?.photo}
                alt={Offer?.title}
                className="w-full h-full object-cover"
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
            <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
              {t("hospitalDetails")}
            </span>
            <div className="flex gap-3 items-center">
              <div className="w-[32px] h-[32px] rounded-[8px]">
                <Image
                  className="w-full h-full rounded-[8px] object-cover"
                  src={Offer?.hospital?.photo}
                  alt={Offer?.hospital?.first_name}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
              <div className="font-medium text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                {Offer?.hospital?.hospital_location?.location}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-6 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
            <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
              {t("reviews")}
            </span>
            <div className="flex gap-[8px] items-center">
              <RateIcon size={15} color="var(--secondary-300)" />
              <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--primary-800)] mt-[3px]">
                {Offer?.offer_rating_percentage}
                <span className="ps-1 text-[var(--neutral-800)]">
                  ({Offer?.count_order_rates} {t("rating")})
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {Offer?.offer_rates.map((rate, i) => (
                <div
                  key={rate?.id}
                  className="py-5 px-[30px] flex flex-col gap-3 bg-[var(--neutral-200)] rounded-[12px] mt-1"
                >
                  <div className="flex gap-[6px]">
                    {Array.from(
                      { length: rate?.order_average_rate },
                      (_, index) => (
                        <StarIcon2 key={index} />
                      )
                    )}

                    {/* <StarIcon2 />
                    <StarIcon2 />
                    <StarIcon2 />
                    <StarIcon2 />
                    <StarIcon2 /> */}
                  </div>
                  <span className="font-[Almarai] text-[var(--neutral-900)] font-bold text-sm leading-6 tracking-[0px]">
                    {rate?.comment}
                  </span>
                  <span className="text-[var(--primary-800)] font-normal text-xs leading-6 tracking-[0px]">
                    {rate?.created_at}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
        <div className="w-[40%] flex flex-col gap-2 max-md:w-full">
          <div className="border border-[#E7E7E7] rounded-[12px] bg-[var(--neutral-100)] relative flex flex-col h-fit pb-[30px]">
            <div
              className="absolute top-[-1px] start-[-1px] z-10 rounded-[12px] flex justify-center items-center h-[63px] font-bold text-base leading-[19.36px] tracking-[0px] text-[var(--primary-800)] bg-[var(--gray)]"
              style={{
                width: "calc(100% + 2px)",
              }}
            >
              {t("bookAppointment")}
            </div>
            <div className="mt-[96px] px-[17px] flex flex-col gap-8 ">
              <div className="flex gap-8 flex-wrap">
                <div className="flex gap-3">
                  <div className="w-[56px] h-[56px] flex justify-center items-center bg-[var(--neutral-200)] rounded-[50%] overflow-hidden">
                    <Image src={CoinImage} alt="Coin Image" />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <span className="text-[var(--primary-800)] font-semibold text-lg leading-[27px] tracking-[0px]">
                      {t("servicePrice")}
                    </span>
                    <span className="text-[var(--primary-800)] font-semibold text-base leading-6 tracking-[0px]">
                      {Offer?.price_after}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-[56px] h-[56px] flex justify-center items-center bg-[var(--neutral-200)] rounded-[50%] overflow-hidden">
                    <Image src={WaitingRoomImage} alt="Coin Image" />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <span className="text-[var(--primary-800)] font-semibold text-lg leading-[27px] tracking-[0px]">
                      {t("noVisits")}
                    </span>
                    <span className="text-[var(--primary-800)] font-semibold text-base leading-6 tracking-[0px]">
                      {Offer?.number_of_sessions} {t("visits")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
              <BookNowSection Offer={Offer} />
              <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
              <Button
                style={{
                  backgroundColor: "#6441EF",
                  borderColor: "var(--primary-300)",
                }}
                className="hover:!text-[#6441EF] hover:!bg-[var(--neutral-100)]"
                // onClick={() => setBookNow(true)}
              >
                {t("bookNow")}
              </Button>
            </div>
          </div>
          <div className="border border-[#E7E7E7] rounded-[12px] bg-[var(--neutral-100)] relative flex flex-col h-fit p-6 pb-[38px] gap-6">
            <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
              {t("exploreMoreOffer")}
            </span>
            <div className="flex gap-[10px] flex-wrap">
              {firstTwo.map((offer) => (
                <Link
                  href={`/${locale}/Services/ServiceDetails/${offer.id}`}
                  key={offer.id}
                >
                  <div className="flex flex-col rounded-[12px] max-w-[204px] w-[204px] h-[234px] overflow-hidden border border-[#E7E7E7]">
                    <Image
                      src={offer?.photo}
                      // alt="Available Service"
                      // className="flex-1 object-cover"

                      alt={offer?.title}
                      className="w-full h-full object-cover max-h-[168px]"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <div className="flex justify-center items-center bg-[var(--neutral-200)] h-[66px]">
                      <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                        {offer?.title}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              {/* <div className="flex flex-col rounded-[12px] max-w-[204px] w-[204px] h-[234px] overflow-hidden bg-gradient-to-r from-[#F4A7B1] to-[#DB7E89]">
                <Image
                  src={OnlineConsolations}
                  alt="Available Service"
                  className="flex-1"
                />
                <div className="flex justify-center items-center bg-[var(--neutral-200)] h-[66px]">
                  <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--primary-800)]">
                    Online Consultation
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {rest?.length > 0 && (
        <div className="container flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="font-bold text-2xl leading-6 tracking-[0px] text-[var(--purple-900)]">
              {t("suggestedOffer")}
            </span>
            {rest?.length > 4 && (
              <Link href={`/${locale}/Services`}>
                <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
                  {t("seeMore")}
                </span>
              </Link>
            )}
          </div>
          <Row gutter={[16, 16]} className="w-full">
            {rest.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}

            {/* <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard /> */}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Page;
