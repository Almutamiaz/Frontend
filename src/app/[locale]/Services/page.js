import SettingsIcon from "@/assets/icons/SettingsIcon";
import Footer from "@/components/Footer";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import OfferCard from "@/components/OfferCard";
import SelectBox from "@/components/SelectBox";
import Tag from "@/components/Tag";
import SearchButton from "@/components/SearchButton";
import { BASE_URL, BASE_URL_WithOutSite, PRODUCTION_URL } from "@/constants";
import { Row } from "antd";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

async function getSeoData() {
  const locale = await getLocale();
  try {
    const response = await fetch(`${BASE_URL}/pages/seo?slug=Services`, {
      headers: {
        "X-localization": locale,
      },
      // Implement stale-while-revalidate caching strategy
      next: {
        revalidate: 3600, // Revalidate every hour
        tags: ["seo-data"],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !data.data?.[0]) {
      throw new Error("Invalid SEO data structure");
    }

    return data.data[0];
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return null;
  }
}

export async function generateMetadata() {
  const t = await getTranslations();
  const locale = await getLocale();
  const seoData = await getSeoData();

  // Default metadata
  const defaultMetadata = {
    title: t("hakeem"),
    description: t("hakeemDescription"),
    metadataBase: new URL(PRODUCTION_URL),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "temp",
    },
  };

  if (!seoData) {
    return defaultMetadata;
  }

  // Enhanced metadata with SEO data
  return {
    ...defaultMetadata,
    title: `${t("hakeem")} | ${seoData.title_website}`,
    description: seoData.meta_description,
    keywords: seoData.meta_keywords,
    authors: [{ name: t("hakeem") }],
    creator: t("hakeem"),
    publisher: t("hakeem"),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: `${PRODUCTION_URL}/${locale}/Services`,
      title: seoData.meta_title,
      description: seoData.meta_description,
      siteName: t("hakeem"),
      images: [
        {
          url: seoData.image,
          width: 1200,
          height: 630,
          alt: seoData.meta_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.meta_title,
      description: seoData.meta_description,
      creator: `@${t("hakeem")}`,
      images: [seoData.image],
    },
    other: {
      "og:locale:alternate": locale === "en" ? "ar" : "en",
    },
  };
}

// Add JSON-LD structured data
async function generateStructuredData(seoData, locale) {
  const t = await getTranslations();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoData?.title_website || t("hakeem"),
    description: seoData?.meta_description || t("hakeemDescription"),
    url: `${PRODUCTION_URL}/${locale}/Services`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${PRODUCTION_URL}/${locale}/Explore?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: t("hakeem"),
      logo: {
        "@type": "ImageObject",
        url: `${PRODUCTION_URL}/logo.png`,
      },
    },
  };
}

const Page = async ({ searchParams }) => {
  const t = await getTranslations();
  const locale = await getLocale();
  const seoData = await getSeoData();
  // Generate structured data
  const structuredData = generateStructuredData(seoData, locale);

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
            <div className="flex gap-1 gap-y-2 overflow-x-auto scrollbar-hide">
              <Tag
                active={!searchParams?.category}
                key="all"
                text={t("allOffers")}
                href={`/${locale}/Services`}
                classNameProp={
                  !searchParams?.category
                    ? "shadow-[0_2px_6px_0_#7367F04D]"
                    : ""
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
    </>
  );
};

export default Page;
