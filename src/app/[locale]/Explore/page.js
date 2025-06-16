import { BASE_URL, PRODUCTION_URL } from "@/constants";
import CsrPage from "./csrPage";
import { getLocale, getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";

async function getSeoData() {
  const locale = await getLocale();
  try {
    const response = await fetch(`${BASE_URL}/pages/seo?slug=exploration`, {
      headers: {
        "X-localization": locale,
      },
      // Implement stale-while-revalidate caching strategy
      next: {
        // revalidate: 3600, // Revalidate every hour
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
    metadataBase: new URL(`https://dev.hakeem.com.sa`),
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
      },
      facebookexternalhit: {
        index: true,
        follow: true,
      },
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
      url: `${PRODUCTION_URL}/${locale}`,
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
    url: `${PRODUCTION_URL}/${locale}`,
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
      <CsrPage />
      <Footer />
    </>
  );
};

export default Page;
