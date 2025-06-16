import PulseIcon from "@/assets/icons/PulseIcon";
import RobotImage from "@/assets/images/RobotImage.png";
import PercentageImage from "@/assets/images/PercentageImage.png";
import GooglePlayDark from "@/assets/images/GooglePlayDark.png";
import AppStoreDark from "@/assets/images/AppStoreDark.png";
import AppGalleryDark from "@/assets/images/AppGalleryDark.png";
import HakeemApp from "@/assets/images/HakeemApp.png";
import Arrow from "@/assets/images/Arrow.png";
import HakeemAppQR4 from "@/assets/images/HakeemAppQR4.png";
import HeaderOfSection from "@/components/HeaderOfSection";
import { Button } from "antd";
import HakeemCard from "@/components/LandingPageComponents/HakeemCard";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Image from "next/image";
import FiltersDrawer from "@/components/FiltersDrawer";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import ServicesSection from "@/components/LandingPageSections/ServicesSection";
import { Row } from "antd";
import TopRatedDoctors from "@/components/LandingPageSections/TopRatedDoctorsSection";
import ServiceCategorySection from "@/components/LandingPageSections/ServiceCategorySection";
import TopMedicalCentresSection from "@/components/LandingPageSections/TopMedicalCentresSection";
import EmpoweringHealthcareSimplifyingAccessSection from "@/components/LandingPageSections/EmpoweringHealthcareSimplifyingAccessSection";
import ArticlesSection from "@/components/LandingPageSections/ArticlesSection";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { BASE_URL, PRODUCTION_URL } from "@/constants";

async function getSeoData() {
  const locale = await getLocale();
  try {
    const response = await fetch(`${BASE_URL}/pages/seo?slug=home`, {
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

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const seoData = await getSeoData();

  // Generate structured data
  const structuredData = generateStructuredData(seoData, locale);

  const specializationsRes = await fetch(`${BASE_URL}/home/specializations`, {
    headers: {
      "X-localization": locale,
    },
  });
  if (!specializationsRes.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/home/specializations`);
  }
  const { data: specializations } = await specializationsRes.json();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex flex-col gap-[60px]">
        {/* <PostsPage /> */}
        {/* HERO SECTION */}
        <div className="HeroSectionParent h-[660px] bg-[#593BB4] rounded-b-[20px] flex flex-col justify-end">
          <div className="h-[calc(100%-108px)] w-[100%] mx-auto overflow-hidden relative flex items-center justify-center">
            <div className="circles firstCircle absolute w-full max-w-[63.24vw] rounded-[50%] border border-[#FFFFFF1A] h-[63.24vw] top-12 left-0 right-0 mx-auto max-sm:top-[65%] max-sm:max-w-[83.24vw] max-sm:h-[83.24vw]      max-md:top-[55%] max-md:max-w-[73.24vw] max-md:h-[73.24vw]   max-lg:top-[140px] max-lg:max-w-[84.24vw] max-lg:h-[84.24vw]   max-xl:top-[92px] max-xl:max-w-[77.24vw] max-xl:h-[77.24vw]   max-2xl:top-[70px] max-2xl:max-w-[70.24vw] max-2xl:h-[70.24vw]"></div>
            <div className="circles absolute w-full max-w-[49vw] rounded-[50%] border border-[#FFFFFF1A] h-[49vw] top-[180.45px] left-0 right-0 mx-auto border-dashed max-sm:top-[75%] max-sm:max-w-[69vw] max-sm:h-[69vw]      max-md:top-[65%] max-md:max-w-[59vw] max-md:h-[59vw]   max-lg:top-[246.45px] max-lg:max-w-[70vw] max-lg:h-[70vw]   max-xl:top-[224.45px] max-xl:max-w-[63vw] max-xl:h-[63vw]   max-2xl:top-[202.45px] max-2xl:max-w-[56vw] max-2xl:h-[56vw]"></div>
            <div className="circles blurCircle absolute w-full max-w-[34.64vw] rounded-[50%] border border-[#FFFFFF1A] h-[34.64vw] top-[250px] left-0 right-0 mx-auto"></div>
            <div className="circles thirdCircle absolute w-full max-w-[34.64vw] rounded-[50%] border border-[#FFFFFF1A] h-[34.64vw] top-[314.14px] left-0 right-0 mx-auto max-sm:top-[85%] max-sm:max-w-[54.64vw] max-sm:h-[54.64vw]      max-md:top-[75%] max-md:max-w-[44.64vw] max-md:h-[44.64vw]   max-lg:top-[380.14px] max-lg:max-w-[55.64vw] max-lg:h-[55.64vw]   max-xl:top-[358.14px] max-xl:max-w-[48.64vw] max-xl:h-[48.64vw]   max-2xl:top-[336.14px] max-2xl:max-w-[41.64vw] max-2xl:h-[41.64vw]"></div>
            <div className="circles testclass absolute w-full max-w-[586.93px] rounded-[50%] border border-[#FFFFFF1A] h-[586.93px] top-[397px] left-0 right-0 mx-auto"></div>
            <div className="container HeroSecionHomePage flex flex-col gap-6 z-[1] max-[850px]:px-5 items-center">
              <h1 className="herotext text-[52px] font-bold leading-[60px] tracking-[-0.0506em] max-w-[946px] text-[var(--neutral-100)] text-center whitespace-pre-line">
                {t("easilyFindTopDoctors")}
                {`\n`}
                {t("allInOneHealth")}
              </h1>
              <HeroSectionInput width="660px" margin="auto" />
              {/* <Input
                style={{
                  height: "54px",
                  borderRadius: "100px",
                  // fontFamily: "var(--fontFamily)",
                }}
                placeholder={t("searchPlaceholder")}
                prefix={<SearchIcon />}
                // onClick={() => console.log("clicked")}
              /> */}
              <div className="flex flex-col gap-4 items-center">
                <div className="flex gap-1 items-center">
                  <PulseIcon />
                  <span className="text-sm font-bold leading-[16.94px] text-[var(--gray)]">
                    {t("lookingFor")}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {specializations.map((item) => (
                    <div
                      className="px-4 py-[10px] bg-[#C7C7C738] text-[var(--neutral-100)] text-xs font-normal leading-[14.52px] rounded-[87px] cursor-pointer"
                      key={item.id}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* HAKEEM SERVICES SECTION */}
        <div className="container flex flex-col gap-8 items-center overflow-visible">
          <HeaderOfSection
            title={t("hakeemServices")}
            description={t("hakeemAppDescription")}
            titleCenter
            responsiveFontSizes
            DesCenter
          />
          <Row gutter={[12, 12]} className="w-full">
            <ServicesSection />
          </Row>
        </div>
        {/* TOP RATED DOCTORS SECTION */}
        <div className="container py-6 ps-6 bg-[#F2F2F2] rounded-[20px] flex flex-col gap-3 items-center overflow-hidden max-[430px]:ps-0 max-[430px]:!max-w-full max-[430px]:rounded-[0px]">
          <HeaderOfSection
            title={t("topRatedDoctors")}
            description={t("topRatedDoctorsDes")}
            titleColor="var(--Black)"
            titleSize={24}
            titleLH={36}
            DesColor="var(--Black)"
            DesSize={16}
            DesLH={24}
            titleWeight={700}
            DesWeight={400}
            titleCenter
            responsiveFontSizes
            DesCenter
          />
          {/* <div className="py-3 flex gap-2 flex-nowrap overflow-x-auto w-full">
            {[...dummyData, ...dummyData].map((item) => (
              <DoctorCard
                key={item.id}
                img={DummyDoctorImage}
                name={"DR. Sami yasser"}
                rate={"4.9"}
              />
            ))}
          </div> */}
          <TopRatedDoctors />
          <Link href={`/${locale}/Doctors`}>
            <div className="flex gap-2 items-center rtl:[&>svg]:!rotate-[-135deg] hakeemCardDiv text-[var(--color1)] text-[14px] font-medium leading-6 tracking-[-0.03em]">
              {t("viewAllDoctors")}
              <ArrowIcon size={8} deg={45} color={"var(--color1)"} mt={1} />
            </div>
          </Link>
          {/* <DoctorsListSwiper key={2} slideWidth={"162px"} /> */}
        </div>
        {/* SERVICES CATEGORY SECTION */}
        <div className="container flex flex-col gap-8 items-center">
          <HeaderOfSection
            title={t("serviceCategories")}
            description={t("hakeemAppServiceCategories")}
            titleCenter
            responsiveFontSizes
            DesCenter
          />
          <ServiceCategorySection />
          {/* <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 flex-wrap">
              <ServiceCategoryCard flex={1} />
              <div className="flex gap-4 min-w-[624px] flex-1 flex-wrap max-[800px]:min-w-full">
                <ServiceCategoryCard flex={1} minWidthMobile />
                <ServiceCategoryCard flex={1} minWidthMobile />
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <ServiceCategoryCard flex={1} />
              <ServiceCategoryCard flex={2} />
            </div>
          </div> */}
        </div>
        {/* TOP MEDICAL CENTRES SECTION */}
        <div className="container py-6 ps-6 bg-[#F2F2F2] rounded-[20px] flex flex-col gap-3 items-center overflow-hidden max-[430px]:ps-0 max-[430px]:!max-w-full max-[430px]:rounded-[0px]">
          <HeaderOfSection
            title={t("mostRequestedCenters")}
            description={t("showcaseCenters")}
            titleColor="var(--titleColor)"
            titleSize={36}
            titleLH={54}
            DesColor="var(--DescriptionsColor)"
            DesSize={16}
            DesLH={24}
            titleWeight={800}
            DesWeight={500}
            titleCenter
            DesCenter
            responsiveFontSizes
          />
          {/* <MedicalCentresSwiper key={5} /> */}
          <TopMedicalCentresSection />
        </div>
        {/* HAKEEM CARDS SECTION */}
        <div className="container flex gap-5 flex-wrap">
          <HakeemCard
            title={t("hakeemSmart")}
            subTitle={t("intelligentAssistant")}
            actionText={t("comingSoon")}
            bgColor={"#D6F2FF"}
            imgSrc={RobotImage}
            bgCircleColor={"#518EF84D"}
            textColor={"#031C70"}
            flexSize={1}
            tailwindStyles="translate-x-[-80px] rtl:[transform:rotateY(-180deg)_translateX(-80px)]"
          />
          <HakeemCard
            title={t("hakeemPremium")}
            subTitle={t("exclusiveService")}
            actionText={t("comingSoon")}
            bgColor={"#F4F2FF"}
            imgSrc={PercentageImage}
            bgCircleColor={"#7E53FD26"}
            textColor={"var(--color1)"}
            flexSize={1}
            tailwindStyles="translate-x-[-100px] rtl:translate-x-0"
          />
        </div>
        {/* EMPOWERING HEALTHCARE SECTION */}
        <div className="bg-[var(--Gray-100)] flex pt-[58px] pb-[67px]">
          <div className="container flex flex-col items-center gap-12">
            <div>
              <p className="text-[56px] font-extrabold leading-[67.2px] text-[var(--darkColor)] max-w-[650px] rtl:max-w-[600px] text-center max-[450px]:text-[32px] max-[450px]:leading-[40px]">
                {t("betterHealthEasy")}{" "}
                {/* <span className="text-[#6441EF]">{t("healthcare")}</span>{" "}
                {t("simplifyingAccess")} */}
              </p>
            </div>
            {/* <div className="flex gap-8 items-center flex-wrap justify-center"> */}
            <Row
              gutter={[16, 16]}
              className="w-full justify-center max-w-[1000px]"
            >
              <EmpoweringHealthcareSimplifyingAccessSection />
            </Row>
            {/* </div> */}
          </div>
        </div>
        {/* ARTICLES FROM HEALTH EXPERTS SECTION */}
        <div className="container flex flex-col gap-8 items-center">
          <HeaderOfSection
            title={t("articlesFromHealthExperts")}
            description={t("healthArticlesDescription")}
            titleCenter
            DesCenter
            titleSize={32}
            titleLH={38}
            DesMaxWidth={432}
            responsiveFontSizes
          />
          <div className="flex gap-2 w-full flex-wrap">
            <ArticlesSection />

            {/* <ArticleCard
              title={t("milkTypeQuestion")}
              drName={"Dr Maher Mohamed"}
            />
            <ArticleCard
              title={t("milkTypeQuestion")}
              drName={"Dr Maher Mohamed"}
            />
            <ArticleCard
              title={t("milkTypeQuestion")}
              drName={"Dr Maher Mohamed"}
            /> */}
          </div>
          <Button
            className="antdButtonHover rtl:[&>svg]:!rotate-[-135deg]"
            style={{
              color: "var(--primary-color)",
              background: "var(--neutral-100)",
              width: "220px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              height: "40px",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
            }}
          >
            {t("seeMore")}
            <ArrowIcon deg={45} size={11} color="var(--primary-color)" mt={2} />
          </Button>
        </div>
        {/* DOWNLOAD HAKEEM APP SECTION */}
        <div className="container rounded-[24px] bg-[#F3F1FD] flex py-[70px] px-[60px] max-sm:px-5 gap-5 flex-wrap">
          <div className="flex justify-center items-center flex-1 h-full min-w-[300px] max-sm:min-w-full">
            <Image src={HakeemApp} alt="Hakeem App" />
          </div>
          <div className="flex flex-col gap-[50px] flex-1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 align-center">
                <span className="text-[32px] font-extrabold leading-[38.4px] text-[var(--color1)] max-[750px]:text-center">
                  {t("downloadHakeemAppNow")}
                </span>
                <span className="text-base font-medium leading-[19.84px] text-[var(--DescriptionColor2)] max-[750px]:text-center">
                  {t("downloadHakeemAppDetails")}
                </span>
              </div>
              <div className="flex gap-6 flex-wrap justify-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.hakeem.patient.hakeem_patient&hl=en_US"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={GooglePlayDark} alt="Google Play Download App" />
                </a>
                <a
                  href="https://apps.apple.com/sa/app/hakeem-%D8%AD%D9%83%D9%8A%D9%85/id1669070452"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={AppStoreDark} alt="App Store Download App" />
                </a>
                {/* <a
                  href="https://play.google.com/store/apps/details?id=com.hakeem.patient.hakeem_patient&hl=en_US"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={AppGalleryDark} alt="App Gallery Download App" />
                </a> */}
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="h-[1px] bg-[#ccc] flex-1"></div>
                <span className="text-[20px] font-semibold leading-6 text-[var(--color1)] mx-6">
                  {t("or").toUpperCase()}
                </span>
                <div className="h-[1px] bg-[#ccc] flex-1"></div>
              </div>
            </div>
            <div className="flex gap-5 justify-between max-sm:justify-center max-sm:flex-wrap">
              <div className="flex flex-col items-center gap-[6px] ms-[auto] max-sm:ms-0">
                <div className="text-2xl font-bold leading-[28.8px] text-[var(--color1)] flex flex-col items-center self-start">
                  <span className="block">{t("scanQr")}</span>
                  <span className="block text-center">
                    {t("forDownloadApp")}
                  </span>
                </div>
                <Image
                  src={Arrow}
                  alt="Arrow"
                  className="rtl:[transform:rotateY(180deg)]"
                />
              </div>
              <div className="h-[200px] max-w-[200px] rounded-xl overflow-hidden">
                <Image
                  src={HakeemAppQR4}
                  alt="Hakeem App QR Code"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/* FOOTER SECTION */}
        <Footer />
        <FiltersDrawer />
      </div>
    </>
  );
}

const dummyData = [
  {
    id: 1,
    category: "Eye Specialist",
  },
  {
    id: 2,
    category: "Dentist",
  },
  {
    id: 3,
    category: "Dermatology",
  },
  {
    id: 4,
    category: "Pulmonologist",
  },
  {
    id: 5,
    category: "Audiology",
  },
];
