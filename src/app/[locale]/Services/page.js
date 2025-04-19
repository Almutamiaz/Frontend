import SettingsIcon from "@/assets/icons/SettingsIcon";
import Footer from "@/components/Footer";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import OfferCard from "@/components/OfferCard";
import SelectBox from "@/components/SelectBox";
import Tag from "@/components/Tag";
import SearchButton from "@/components/SearchButton";
import { BASE_URL, BASE_URL_WithOutSite } from "@/constants";
import { Row } from "antd";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

const Page = async ({ searchParams }) => {
  const t = await getTranslations();
  const locale = await getLocale();
  // console.log(await searchParams);

  // Fetch cities
  const citiesRes = await fetch(`${BASE_URL_WithOutSite}/cities/194`, {
    headers: {
      "X-localization": locale,
    },
  });
  const { data: cities } = await citiesRes.json();
  // console.log(cities);

  // Fetch categories
  const categoriesRes = await fetch(`${BASE_URL}/offer/categories`, {
    headers: {
      "X-localization": locale,
    },
  });
  const { data: categories } = await categoriesRes.json();

  // Fetch offers with search parameters
  const queryParams = new URLSearchParams({
    search_category_id: searchParams?.category || "",
    search_city_id: searchParams?.city || "",
    insurance_id: searchParams?.insurance || "",
    search_offer_name: searchParams?.search || "",
    page: searchParams?.page || 1,
  });

  const offersRes = await fetch(`${BASE_URL}/offer?${queryParams.toString()}`, {
    headers: {
      "X-localization": locale,
    },
  });
  const { data: offersData } = await offersRes.json();
  const offers = offersData.data;
  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col gap-[60px]">
      <div className="container overflow-visible mt-[170px] flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-4">
          <div className="flex inputStyles gap-4 flex-wrap">
            <HeroSectionInput
              height="56px"
              // onChange={onChange}
              width="369px"
              placeholder={t("searchOnOffer")}
              value={searchParams?.search}
            />
            <SelectBox
              width={"273px"}
              placeholder={t("city")}
              options={cities.map((city) => ({
                value: city.id,
                label: city.title,
              }))}
              isServices
              value={searchParams?.city}
            />
            <div className="flex gap-2 ms-auto">
              <div className="w-[56px] h-[56px] bg-[var(--neutral-200)] rounded-[1000px] flex justify-center items-center">
                <SettingsIcon />
              </div>
              <SearchButton destination={`Services`} />
            </div>
          </div>
          <div className="flex gap-1">
            <Tag
              active={!searchParams?.category}
              key="all"
              text={t("allOffers")}
              href={`/${locale}/Services`}
              classNameProp={
                !searchParams?.category ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
              }
              withoutBorder
              bgColorProp="#F4F4F4"
              textColorProp="#2F2B3DE5"
              categoryId="all"
            />
            {categories.map((category) => (
              <Tag
                active={searchParams?.category === category.id.toString()}
                key={category.id}
                text={category.title}
                href={`/${locale}/Services`}
                classNameProp={
                  searchParams?.category === category.id.toString()
                    ? "shadow-[0_2px_6px_0_#7367F04D]"
                    : ""
                }
                withoutBorder
                bgColorProp="#F4F4F4"
                textColorProp="#2F2B3DE5"
                categoryId={category.id.toString()}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-xl leading-[24.2px] text-[var(--primary-700)]">
            {t("results")} ({offers?.length || 0})
          </span>
          <Row gutter={[16, 16]} className="w-full">
            {offers?.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
