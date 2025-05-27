import ContactUsSendMessageSection from "@/components/ContactUsSendMessageSection";
import Footer from "@/components/Footer";
import { BASE_URL, PRODUCTION_URL } from "@/constants";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

async function getSeoData() {
  const locale = await getLocale();
  try {
    const response = await fetch(`${BASE_URL}/pages/seo?slug=contactUs`, {
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
      url: `${PRODUCTION_URL}/${locale}/ContactUs`,
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
    url: `${PRODUCTION_URL}/${locale}/ContactUs`,
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
        <div className="container overflow-visible mt-[150px] flex flex-col gap-8">
          {/* <div className="flex flex-col gap-2">
          <h1 className="font-bold text-[40px] leading-[60px] tracking-[0px] text-[var(--neutral-1000)]">
            {t("contactUs")}
          </h1>
          <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] max-w-[800px]">
            {t("supportMessage")}
          </p>
        </div> */}

          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[54px] leading-[60px] tracking-[-6%] AboutUsText ContactUsTitlePage">
              {t("contactUs")}
            </h1>
            <p className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] whitespace-pre-line ContactUsDescriptionPage">
              {t("supportMessage")}
            </p>
          </div>
          <div className="flex gap-4 max-md:flex-col">
            <div className="flex flex-[2] flex-col gap-4 max-md:flex-row">
              <div className="flex flex-col rounded-[16px] bg-[#f2f2f2] p-6 justify-between flex-1 max-[430px]:pt-0 max-[430px]:pb-4">
                <div className="flex flex-col">
                  <span className="font-medium text-[32px] leading-[60px] tracking-[0px] text-[var(--neutral-1000)] ContactUsCardTitle">
                    {t("phoneNumber")}
                  </span>
                  <span
                    className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] rtl:text-end ContactUsCardDescription"
                    style={{ direction: "ltr" }}
                  >
                    +966533373079
                  </span>
                </div>
                <p className="font-normal text-lg leading-[26px] tracking-[0px] text-[var(--neutral-900)] ContactUsCardDescription mt-2 max-[430px]:hidden">
                  {t("callOurTeam")}
                </p>
              </div>
              <div className="flex flex-col rounded-[16px] bg-[#f2f2f2] p-6 justify-between flex-1 max-[430px]:pt-0 max-[430px]:pb-4">
                <div className="flex flex-col">
                  <span className="font-medium text-[32px] leading-[60px] tracking-[0px] text-[var(--neutral-1000)] ContactUsCardTitle">
                    {t("emailLabel")}
                  </span>
                  <span className="font-normal text-xl leading-[32px] tracking-[0px] text-[var(--neutral-900)] ContactUsCardDescription">
                    info@hakeem.com.sa
                  </span>
                </div>
                <p className="font-normal text-lg leading-[26px] tracking-[0px] text-[var(--neutral-900)] ContactUsCardDescription mt-2 max-[430px]:hidden">
                  {t("supportTeamAvailable")}
                </p>
              </div>
            </div>
            <div className="flex flex-col flex-[3] rounded-[16px] bg-[#f2f2f2] p-6 gap-[30px]">
              <div className="flex flex-col">
                <span className="font-medium text-[32px] leading-[60px] tracking-[0px] text-[var(--neutral-1000)] ContactUsDropMessage">
                  {t("dropUsMessage")}
                </span>
                <span className="font-normal text-xl leading-[29px] tracking-[0px] text-[var(--neutral-900)] ContactUsDropMessageDes">
                  {t("weAreHereToAssist")}
                </span>
                <span className="font-normal text-xl leading-[29px] tracking-[0px] text-[var(--neutral-900)] ContactUsDropMessageDes">
                  {t("supportTeamMessage")}
                </span>
              </div>
              <ContactUsSendMessageSection />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
