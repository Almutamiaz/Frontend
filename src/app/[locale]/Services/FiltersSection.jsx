"use client";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import SearchButton from "@/components/SearchButton";
import SelectBox from "@/components/SelectBox";
import Tag from "@/components/Tag";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@/Context/UserContext";

const FiltersSection = ({ searchParams, categories, cities, offers }) => {
  const t = useTranslations();
  const { locale } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTag, setActiveTag] = useState(searchParams?.category || "all");
  const debounceTimer = useRef(null);
  const { servicesChangePageLoading, setServicesChangePageLoading } = useUser();
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
      setLoading(true);
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("search", e.target.value);
      router.push(`/${locale}/Services?${currentParams.toString()}`);
    }, 500);
  };

  useEffect(() => {
    setLoading(false);
    setServicesChangePageLoading(false);
  }, [offers]);

  useEffect(() => {
    if (servicesChangePageLoading) {
      setLoading(true);
    }
  }, [servicesChangePageLoading]);

  const handleTagClick = (tag) => {
    if (tag == "all") {
      setActiveTag(tag);
      setLoading(true);
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.delete("category");
      router.push(`/${locale}/Services?${currentParams.toString()}`);
      return;
    }
    setActiveTag(tag);
    setLoading(true);
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("category", tag);
    router.push(`/${locale}/Services?${currentParams.toString()}`);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex inputStyles gap-4 flex-wrap">
        <HeroSectionInput
          height="56px"
          onChange={onChangeFunction}
          setLoading={setLoading}
          width="369px"
          placeholder={t("searchOnOffer")}
          value={searchParams?.search}
          fullWidthInSm
        />
        <SelectBox
          width={"273px"}
          fullWidthInSm
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

            setLoading(true);
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set("city", e);
            router.push(`/${locale}/Services?${currentParams.toString()}`);
          }}
        />
        <div className="flex gap-2 ms-auto">
          <div className="w-[56px] h-[56px] bg-[var(--neutral-200)] rounded-[1000px] flex justify-center items-center">
            <SettingsIcon />
          </div>
          <SearchButton
            destination={`Services`}
            offers={offers}
            loading={loading}
          />
        </div>
      </div>
      <div className="flex gap-1 gap-y-2 overflow-x-auto scrollbar-hide">
        <Tag
          active={activeTag == "all"}
          key="all"
          text={t("allOffers")}
          // href={`/${locale}/Services`}
          classNameProp={
            activeTag == "all" ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
          }
          withoutBorder
          bgColorProp="#F4F4F4"
          textColorProp="#2F2B3DE5"
          categoryId="all"
          onClick={() => handleTagClick("all")}
        />
        {categories.map((category) => (
          <Tag
            active={activeTag == category?.id}
            key={category.id}
            text={category.title}
            // href={`/${locale}/Services`}
            classNameProp={
              activeTag == category?.id ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
            categoryId={category.id.toString()}
            onClick={() => handleTagClick(category?.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FiltersSection;
