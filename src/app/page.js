import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import RootHeader from "@/components/RootHeader";
import BreadCrumb from "@/components/BreadCrumb";
import RootFooter from "@/components/RootFooter";
import { NextIntlClientProvider } from 'next-intl';
import { BASE_URL, PRODUCTION_URL } from "@/constants";

// Import the getSeoData function to reuse it
async function getSeoData() {
  const locale = await getLocale();
  try {
    const response = await fetch(`${BASE_URL}/pages/seo?slug=home`, {
      headers: {
        "X-localization": locale,
      },
      // Implement stale-while-revalidate caching strategy
      next: {
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

// Add metadata generation to the root page
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
      url: `${PRODUCTION_URL}`,
      title: seoData.meta_title,
      description: seoData.meta_description,
      siteName: t("hakeem"),
      images: [
        {
          url: seoData.image || `${PRODUCTION_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: seoData.meta_title,
          type: 'image/png',
        },
        // Add a dynamically generated OG image as backup
        {
          url: `${PRODUCTION_URL}/api/og?title=${encodeURIComponent(seoData.meta_title)}&description=${encodeURIComponent(seoData.meta_description)}&image=${encodeURIComponent(seoData.image || '')}`,
          width: 1200,
          height: 630,
          alt: seoData.meta_title,
          type: 'image/png',
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.meta_title,
      description: seoData.meta_description,
      creator: `@${t("hakeem")}`,
      images: [
        seoData.image || `${PRODUCTION_URL}/logo.png`,
        `${PRODUCTION_URL}/api/og?title=${encodeURIComponent(seoData.meta_title)}&description=${encodeURIComponent(seoData.meta_description)}&image=${encodeURIComponent(seoData.image || '')}`
      ],
    },
    other: {
      "og:locale:alternate": "en",
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": seoData.meta_title,
      "whatsapp:title": seoData.meta_title,
      "whatsapp:description": seoData.meta_description,
    },
  };
}

// Generate structured data for the root page
async function generateStructuredData(seoData) {
  const t = await getTranslations();
  const locale = await getLocale();
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoData?.title_website || t("hakeem"),
    description: seoData?.meta_description || t("hakeemDescription"),
    url: `${PRODUCTION_URL}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${PRODUCTION_URL}/Explore?search={search_term_string}`,
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

// This is a server component - it receives the locale from middleware
export default async function HomePage() {
  // With the as-needed strategy, the root path is considered Arabic content
  // We just reuse the Arabic home page component
  const ArHomePage = (await import('./[locale]/page')).default;
  
  // Get the locale (which should be 'ar' for the root path)
  const locale = await getLocale();
  const messages = await getMessages();
  const seoData = await getSeoData();
  
  // Generate structured data
  const structuredData = await generateStructuredData(seoData);
  
  // Import the WhatsAppMetaTagsScript component dynamically
  const WhatsAppMetaTagsScript = (await import('@/components/WhatsAppMetaTagsScript')).default;
  
  // Render a complete page with Header, Footer, and the Arabic home page content
  return (
    <>
      {/* Add structured data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Add WhatsApp-specific meta tags */}
      <WhatsAppMetaTagsScript />
      <RootHeader />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <BreadCrumb />
      </NextIntlClientProvider>
      {/* Pass isRootPage as a separate prop */}
      <ArHomePage params={{ locale: "ar" }} isRootPage={true} />
      <RootFooter />
    </>
  );
}
