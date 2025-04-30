import React from "react";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import SelectBox from "@/components/SelectBox";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import DoctorCardResults from "@/components/DoctorCardResults";
import { getTranslations } from "next-intl/server";
import { BASE_URL, BASE_URL_WithOutSite } from "@/constants";
import DoctorsPagination from "./DoctorsPagination";
import SearchButton from "@/components/SearchButton";
const Page = async ({ params, searchParams }) => {
  const { locale } = await params;
  const t = await getTranslations();
  const page = searchParams?.page || 1;

  const queryParams = new URLSearchParams({
    filterDoctorName: searchParams?.search || "",
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
  const { data: doctors } = await doctorsRes.json();
  // try {
  //   console.log(await doctorsRes.json());
  // } catch (error) {
  //   console.log(error);
  // }
  // Fetch cities
  const citiesRes = await fetch(`${BASE_URL_WithOutSite}/cities/194`, {
    headers: {
      "X-localization": locale,
    },
  });
  const { data: cities } = await citiesRes.json();
  console.log(cities);

  return (
    <div className="container h-[calc(100%-156px)] mt-[156px] flex flex-col gap-6  pt-4 pb-10">
      <div className="flex inputStyles gap-4 flex-wrap">
        <HeroSectionInput
          height="56px"
          // onChange={onChange}
          width="369px"
          placeholder={t("searchOnOffer")}
          value={searchParams?.search}
        />

        <SelectBox width={"273px"} placeholder={t("Hospitals")} />
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
        <SelectBox width={"273px"} placeholder={t("Main Services")} />
        <SelectBox width={"273px"} placeholder={t("Clinic")} />

        <div className="flex gap-2 ms-auto">
          <div className="w-[56px] h-[56px] bg-[var(--neutral-200)] rounded-[1000px] flex justify-center items-center">
            <SettingsIcon />
          </div>
          <SearchButton destination={`Doctors`} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl leading-[24.2px] text-[var(--primary-700)]">
          {t("results")} ({doctors.total})
        </span>
        <div className="flex gap-[18px] flex-wrap">
          {doctors?.data?.map((doc) => (
            <DoctorCardResults
              key={doc?.id}
              id={doc?.id}
              name={`${doc?.first_name}`}
              specialization={`${doc?.speciality} | ${doc?.hospital?.first_name}`}
              city={doc?.city?.title}
              img={doc?.photo}
              rate={doc?.rating}
              price={doc.setting.in_hospital_price}
            />
          ))}
        </div>
        {doctors.last_page > 1 && (
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
