import Image from "next/image";
import React from "react";
import AboutUsImage from "@/assets/images/AboutUsImage.png";
import AboutUsImage2 from "@/assets/images/AboutUsImage2.png";
import { Row } from "antd";
import ValueCard from "@/components/ValueCard";
import CompassionateCareIcon from "@/assets/icons/CompassionateCareIcon";
import ExcellenceInServiceIcon from "@/assets/icons/ExcellenceInServiceIcon";
import TrustAndIntegrityIcon from "@/assets/icons/TrustAndIntegrityIcon";
import Footer from "@/components/Footer";
import { getLocale, getTranslations } from "next-intl/server";
import { BASE_URL, PRODUCTION_URL } from "@/constants";

async function getSeoData() {
  const locale = await getLocale();
  try {
    const response = await fetch(`${BASE_URL}/pages/seo?slug=about`, {
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
    title: seoData.title_website,
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
      url: `${PRODUCTION_URL}/${locale}/AboutUs`,
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
    url: `${PRODUCTION_URL}/${locale}/AboutUs`,
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

const Page = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  const seoData = await getSeoData();

  // Generate structured data
  const structuredData = generateStructuredData(seoData, locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-[#FAFAFA] min-h-[988px] flex flex-col gap-[60px]">
        <div className="container overflow-visible mt-[150px] flex flex-col gap-[60px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText titlePage">
                {t("smartPlatformDescription")}
              </h1>
              <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] whitespace-pre-line descriptionPage">
                {t("connectAndOfferServices")}
                {`\n`}
                {t("safeHands")}
              </p>
            </div>
            <div className="h-[492px] w-full max-[430px]:h-[234px]">
              <Image
                src={AboutUsImage}
                alt="About Us"
                className="object-cover rounded-[16px] w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[60px]">
            {/* <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText text-center">
              {t("mission")}
            </h1>
            <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] text-center">
              {t("hakeemMission")}
            </p>
          </div> */}
            {/* <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText text-center">
              {t("ourValues")}
            </h1>
            <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] text-center">
              {t("hakeemValues")}
            </p>
          </div> */}
            {/* <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText text-center">
              {t("vision")}
            </h1>
            <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] text-center">
              {t("hakeemVision")}
            </p>
          </div> */}
            <Row gutter={[16, 16]} className="w-full">
              <ValueCard
                icon={<CompassionateCareIcon />}
                title={t("ourValues")}
                des={t("hakeemValues")}
              />
              <ValueCard
                icon={<ExcellenceInServiceIcon />}
                title={t("vision")}
                des={t("hakeemVision")}
              />
              <ValueCard
                icon={<TrustAndIntegrityIcon />}
                title={t("mission")}
                des={t("hakeemMission")}
              />
            </Row>
            <div className="flex gap-9 max-md:flex-col-reverse">
              <div className="flex-1 flex flex-col gap-4 bg-[#F2F2F2] rounded-[16px] p-6">
                <h2 className="font-bold text-3xl leading-[44px] tracking-[0px] text-[var(--Black-900)] AboutLastTitle">
                  {t("healthPriority")}
                </h2>
                <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--Black-400)] AboutLastDescription">
                  {t("accessHealthcare")}
                </p>
              </div>
              <div className="h-[344px] flex-1">
                <Image
                  src={AboutUsImage2}
                  alt="About Us"
                  className="object-cover rounded-[16px] w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
