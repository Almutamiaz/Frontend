import PulseIcon from "@/assets/icons/PulseIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import BookAppointmentImg from "@/assets/images/BookAppointmentIcon.png";
import DoctorHomeVisits from "@/assets/images/DoctorHomeVisits.png";
import OnlineConsolations from "@/assets/images/OnlineConsolations.png";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import RobotImage from "@/assets/images/RobotImage.png";
import PercentageImage from "@/assets/images/PercentageImage.png";
import HeaderOfSection from "@/components/HeaderOfSection";
import DoctorCard from "@/components/LandingPageComponents/DoctorCard";
import ServiceCard from "@/components/LandingPageComponents/ServiceCard";
import { Input } from "antd";
import { useTranslations } from "next-intl";
import DoctorsListSwiper from "@/components/LandingPageComponents/DoctorsListSwiper";
import ServiceCategoryCard from "@/components/LandingPageComponents/ServiceCategoryCard";
import MedicalCentresSwiper from "@/components/LandingPageComponents/MedicalCentresSwiper";
import HakeemCard from "@/components/LandingPageComponents/HakeemCard";
import StatisticCard from "@/components/LandingPageComponents/StatisticCard";

export default function HomePage() {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-[60px]">
      {/* HERO SECTION */}
      <div className="h-[660px] bg-[#593BB4] rounded-b-[20px] flex flex-col justify-end">
        <div className="h-[calc(100%-108px)] w-[100%] mx-auto overflow-hidden relative flex items-center justify-center">
          <div className="firstCircle absolute w-full max-w-[63.24vw] rounded-[50%] border border-[#FFFFFF1A] h-[63.24vw] top-12 left-0 right-0 mx-auto max-sm:top-[65%] max-sm:max-w-[83.24vw] max-sm:h-[83.24vw]      max-md:top-[55%] max-md:max-w-[73.24vw] max-md:h-[73.24vw]   max-lg:top-[140px] max-lg:max-w-[84.24vw] max-lg:h-[84.24vw]   max-xl:top-[92px] max-xl:max-w-[77.24vw] max-xl:h-[77.24vw]   max-2xl:top-[70px] max-2xl:max-w-[70.24vw] max-2xl:h-[70.24vw]"></div>
          <div className="absolute w-full max-w-[49vw] rounded-[50%] border border-[#FFFFFF1A] h-[49vw] top-[180.45px] left-0 right-0 mx-auto border-dashed max-sm:top-[75%] max-sm:max-w-[69vw] max-sm:h-[69vw]      max-md:top-[65%] max-md:max-w-[59vw] max-md:h-[59vw]   max-lg:top-[246.45px] max-lg:max-w-[70vw] max-lg:h-[70vw]   max-xl:top-[224.45px] max-xl:max-w-[63vw] max-xl:h-[63vw]   max-2xl:top-[202.45px] max-2xl:max-w-[56vw] max-2xl:h-[56vw]"></div>
          <div className="blurCircle absolute w-full max-w-[34.64vw] rounded-[50%] border border-[#FFFFFF1A] h-[34.64vw] top-[250px] left-0 right-0 mx-auto"></div>
          <div className="thirdCircle absolute w-full max-w-[34.64vw] rounded-[50%] border border-[#FFFFFF1A] h-[34.64vw] top-[314.14px] left-0 right-0 mx-auto max-sm:top-[85%] max-sm:max-w-[54.64vw] max-sm:h-[54.64vw]      max-md:top-[75%] max-md:max-w-[44.64vw] max-md:h-[44.64vw]   max-lg:top-[380.14px] max-lg:max-w-[55.64vw] max-lg:h-[55.64vw]   max-xl:top-[358.14px] max-xl:max-w-[48.64vw] max-xl:h-[48.64vw]   max-2xl:top-[336.14px] max-2xl:max-w-[41.64vw] max-2xl:h-[41.64vw]"></div>
          <div className="testclass absolute w-full max-w-[586.93px] rounded-[50%] border border-[#FFFFFF1A] h-[586.93px] top-[397px] left-0 right-0 mx-auto"></div>
          <div className="HeroSecionHomePage flex flex-col gap-6 z-[1]">
            <h1 className="herotext text-[52px] font-bold leading-[60px] tracking-[-0.0506em] max-w-[761px] text-[var(--neutral-100)] text-center bbbbbbb">
              {t("personalisedHealthcareSearch")}
            </h1>
            <Input
              style={{
                height: "54px",
                borderRadius: "100px",
                // fontFamily: "var(--fontFamily)",
              }}
              placeholder={t("searchPlaceholder")}
              prefix={<SearchIcon />}
            />
            <div className="flex flex-col gap-4 items-center">
              <div className="flex gap-1 items-center">
                <PulseIcon />
                <span className="text-sm font-bold leading-[16.94px] text-[var(--gray)]">
                  {t("lookingFor")}
                </span>
              </div>
              <div className="flex gap-2">
                {dummyData.map((item) => (
                  <div
                    className="px-4 py-[10px] bg-[#C7C7C738] text-[var(--neutral-100)] text-xs font-normal leading-[14.52px] rounded-[87px] cursor-pointer"
                    key={item.id}
                  >
                    {item.category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* HAKEEM SERVICES SECTION */}
      <div className="container flex flex-col gap-8 items-center">
        <HeaderOfSection
          title={t("hakeemServices")}
          description={t("bookServicesDescription")}
          titleCenter
        />
        <div className="flex gap-4">
          <ServiceCard
            title={t("bookAppointment")}
            description={t("bookAppointmentDescription")}
            bgColor={"#A4E1FE"}
            icon={BookAppointmentImg}
          />
          <ServiceCard
            title={t("doctorHomeVisits")}
            description={t("doctorHomeVisitsDescription")}
            bgColor={
              "linear-gradient(269.76deg, #FC9A69 51.84%, #F99267 99.73%, #FCA16C 99.73%)"
            }
            icon={DoctorHomeVisits}
          />
          <ServiceCard
            title={t("onlineConsultations")}
            description={t("onlineConsultationsDescription")}
            bgColor={
              "linear-gradient(270.21deg, #F4A7B1 0.26%, #DB7E89 99.61%)"
            }
            icon={OnlineConsolations}
          />
        </div>
      </div>
      {/* TOP RATED DOCTORS SECTION */}
      <div className="container py-6 ps-6 bg-[#F2F2F2] rounded-[20px] flex flex-col gap-3 items-center overflow-hidden">
        <HeaderOfSection
          title={t("topRatedDoctors")}
          description={t("topRatedDoctorsDescription")}
          titleColor="var(--Black)"
          titleSize={24}
          titleLH={36}
          DesColor="var(--Black)"
          DesSize={16}
          DesLH={24}
          titleWeight={700}
          DesWeight={400}
          titleCenter
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
        <DoctorsListSwiper key={2} slideWidth={"162px"} />
      </div>
      {/* SERVICES CATEGORY SECTION */}
      <div className="container flex flex-col gap-8 items-center">
        <HeaderOfSection
          title={t("servicesCategory")}
          description={t("servicesCategoryDescription")}
          titleCenter
        />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4 subb">
            <ServiceCategoryCard flex={2} />
            <ServiceCategoryCard flex={1} />
            <ServiceCategoryCard flex={1} />
          </div>
          <div className="flex gap-4 subb">
            <ServiceCategoryCard flex={1} />
            <ServiceCategoryCard flex={2} />
          </div>
        </div>
      </div>
      {/* TOP MEDICAL CENTRES SECTION */}
      <div className="container py-6 ps-6 bg-[#F2F2F2] rounded-[20px] flex flex-col gap-3 items-center overflow-hidden">
        <HeaderOfSection
          title={t("topMedicalCentres")}
          description={t("topMedicalCentresDescription")}
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
        />
        <MedicalCentresSwiper key={5} />
      </div>
      {/* HAKEEM CARDS SECTION */}
      <div className="container flex gap-5">
        <HakeemCard
          title={t("hakeemSmart")}
          subTitle={t("hakeemSmartDescription")}
          actionText={t("startNow")}
          bgColor={"#D6F2FF"}
          imgSrc={RobotImage}
          bgCircleColor={"#518EF84D"}
          textColor={"#031C70"}
          flexSize={1}
          tailwindStyles="translate-x-[-80px] rtl:[transform:rotateY(-180deg)_translateX(-80px)]"
        />
        <HakeemCard
          title={t("hakeemPremium")}
          subTitle={t("hakeemPremiumDescription")}
          actionText={t("exploreNow")}
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
            <p className="text-[56px] font-extrabold leading-[67.2px] text-[var(--darkColor)] max-w-[641px] rtl:max-w-[518px] text-center">
              {t("empowering")}{" "}
              <span className="text-[#6441EF]">{t("healthcare")}</span>{" "}
              {t("simplifyingAccess")}
            </p>
          </div>
          <div className="flex gap-8 items-center">
            {statsData.map((item, i) => (
              <>
                <StatisticCard num={item.value} title={item.title} />
                {i + 1 != statsData.length && (
                  <div className="rounded-[4px] w-[2px] h-[84px] bg-[#023C5D]"></div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      {/* ARTICLES FROM HEALTH EXPERTS SECTION */}
      <div className="container flex flex-col gap-8">
        <HeaderOfSection
          title={t("articlesFromHealthExperts")}
          description={t("healthArticlesDescription")}
          titleCenter
          DesCenter
          titleSize={32}
          titleLH={38}
          DesMaxWidth={432}
        />
      </div>
      <div></div>
    </div>
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

const statsData = [
  {
    title: "Total Reservations",
    value: 1200,
  },
  {
    title: "Users",
    value: 2300,
  },
  {
    title: "Total Doctors",
    value: 300,
  },
  {
    title: "Total Clinics",
    value: 220,
  },
];
