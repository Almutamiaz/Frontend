import React from "react";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import SelectBox from "@/components/SelectBox";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import DoctorCardResults from "@/components/DoctorCardResults";
import { getTranslations } from "next-intl/server";
import { BASE_URL, BASE_URL_WithOutSite } from "@/constants";
import DoctorsPagination from "./DoctorsPagination";
import SearchButton from "@/components/SearchButton";
import FiltersSection from "./FiltersSection";
import { Col, Row } from "antd";

export async function generateMetadata({ params, searchParams }) {
  const { locale } = await params;
  const t = await getTranslations();
  const queryParams = new URLSearchParams({
    filterDoctorName: searchParams?.search || "",
    hospital: searchParams?.hospital || "",
    city: searchParams?.city || "",
    main_service_id: searchParams?.service || "",
    specialization_id: searchParams?.clinic || "",
    page: searchParams?.page || 1,
  });
  const doctorsRes = await fetch(
    `${BASE_URL}/doctor/list?${queryParams.toString()}`,
    {
      headers: {
        "X-localization": locale,
      },
    }
  );
  if (!doctorsRes.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/doctor/list`);
  }
  const { data: doctors } = await doctorsRes.json();

  const title = ` ${t("best")} ${doctors?.total} ${t(
    doctors?.total < 11 ? "Doctors" : "Doctor"
  )} ${t("in")} ${t("saudiArabia")}`;
  const description = `${t("best")} ${doctors?.total} ${t(
    doctors?.total < 11 ? "Doctors" : "Doctor"
  )} ${t("in")} ${t("saudiArabia")}`;

  return {
    title: title,
    description: description,
  };
}

const Page = async ({ params, searchParams }) => {
  const { locale } = await params;
  const t = await getTranslations();
  const page = searchParams?.page || 1;
  const queryParams = new URLSearchParams({
    filterDoctorName: searchParams?.search || "",
    hospital: searchParams?.hospital || "",
    city: searchParams?.city || "",
    main_service_id: searchParams?.service || "",
    specialization_id: searchParams?.clinic || "",
    page: searchParams?.page || 1,
  });
  const doctorsRes = await fetch(
    `${BASE_URL}/doctor/list?${queryParams.toString()}`,
    {
      headers: {
        "X-localization": locale,
      },
    }
  );
  if (!doctorsRes.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/doctor/list`);
  }
  const { data: doctors } = await doctorsRes.json();
  // console.log(doctors);

  // Fetch cities
  const citiesRes = await fetch(`${BASE_URL_WithOutSite}/cities/194`, {
    headers: {
      "X-localization": locale,
    },
  });
  if (!citiesRes.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/cities/194`);
  }
  const { data: cities } = await citiesRes.json();
  // console.log(cities);

  // // Fetch SPECIALIZATIONS
  // const specializationsRes = await fetch(
  //   `${BASE_URL_WithOutSite}/specializations/main-service?mainServicesId=13&page=1&search=&hospitalId=2`,
  //   {
  //     headers: {
  //       "X-localization": locale,
  //     },
  //   }
  // );
  // const { data: specializations } = await specializationsRes.json();
  // console.log(specializations);

  // FETCH HOSPITALS
  const hospitalsRes = await fetch(`${BASE_URL}/hospitals`, {
    cache: "no-store",
    headers: {
      "X-localization": locale,
    },
  });
  if (!hospitalsRes.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/hospitals`);
  }
  const { data: hospitals } = await hospitalsRes.json();
  // console.log(hospitals);

  // FETCH MAIN SERVICES
  const mainServicesRes = await fetch(`${BASE_URL}/main/services`, {
    cache: "no-store",
    headers: {
      "X-localization": locale,
    },
  });
  if (!mainServicesRes.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/main/services`);
  }
  const { data: services } = await mainServicesRes.json();
  console.log(services);
  return (
    <div className="container h-[calc(100%-156px)] mt-[156px] flex flex-col gap-6  pt-4 pb-10">
      <div className="flex inputStyles gap-4 flex-wrap">
        <Row gutter={[12, 12]} className="w-full">
          <Col xs={24} xxl={4} lg={12} md={8}>
            <HeroSectionInput
              height="56px"
              // onChange={onChange}
              // width="369px"
              placeholder={t("searchOnOffer")}
              value={searchParams?.search}
            />
          </Col>

          <FiltersSection
            searchParams={await searchParams}
            services={services}
            hospitals={hospitals}
            cities={cities}
          />
          <Col xs={12} xxl={4} lg={6} md={8}>
            <div className="flex gap-2">
              <div className="w-[56px] h-[56px] bg-[var(--neutral-200)] rounded-[1000px] flex justify-center items-center shrink-0">
                <SettingsIcon />
              </div>
              <SearchButton destination={`Doctors`} />
            </div>
          </Col>
        </Row>
      </div>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl leading-[24.2px] text-[var(--primary-700)]">
          {t("results")} ({doctors?.total})
        </span>
        <div className="flex gap-[18px] justify-center">
          <Row gutter={[12, 12]} className="w-full">
            {doctors?.data?.map((doc) => (
              <Col key={doc?.id} xs={12} sm={12} md={12} lg={8} xl={6} xxl={4}>
                <DoctorCardResults
                  id={doc?.id}
                  name={`${doc?.first_name}`}
                  specialization={`${doc?.speciality} | ${doc?.hospital?.first_name}`}
                  city={doc?.city?.title}
                  img={doc?.photo}
                  rate={doc?.rating}
                  price={doc.setting.in_hospital_price}
                  fullWidth
                />
              </Col>
            ))}
          </Row>
        </div>
        {doctors?.last_page > 1 && (
          <DoctorsPagination
            total={doctors?.total}
            currentPage={Number(page)}
            pageSize={doctors?.per_page}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
