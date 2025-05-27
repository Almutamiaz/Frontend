import RateIcon from "@/assets/icons/RateIcon";
import Image from "next/image";
import DummyDoctorImage from "@/assets/images/DummyDoctorImage.jpg";
import DummyChildImage from "@/assets/images/DummyChildImage.png";
import { getTranslations } from "next-intl/server";
import Tag from "@/components/Tag";
import HeroSectionInput from "@/components/LandingPageComponents/HeroSectionInput";
import SelectBox from "@/components/SelectBox";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import DoctorCardResults from "@/components/DoctorCardResults";
import LocationIcon from "@/assets/icons/LocationIcon";
import StarIcon2 from "@/assets/icons/StarIcon2";
import { BASE_URL } from "@/constants";
import HospitalSpecialties from "@/components/HospitalSpecialties";
import HospitalReviews from "@/components/HospitalReviews";

export async function generateMetadata({ params }) {
  const { hospitalId, locale } = await params;
  const t = await getTranslations();
  const hospitalRes = await fetch(
    `${BASE_URL}/hospital/profile?hospital_id=${hospitalId}`,
    {
      headers: {
        "X-localization": locale,
      },
    }
  );
  const { data: hospitalData } = await hospitalRes.json();

  const title = `${hospitalData?.first_name} | ${t("hakeem")}`;
  const description = `${hospitalData?.about_us}`;

  return {
    title: title,
    description: description,
  };
}

const Page = async ({ params, searchParams }) => {
  const t = await getTranslations();
  const { hospitalId, locale } = await params;
  const activeTab = searchParams?.tab || 1;

  // Fetch hospital profile data
  const hospitalRes = await fetch(
    `${BASE_URL}/hospital/profile?hospital_id=${hospitalId}`,
    {
      headers: {
        "X-localization": locale,
      },
    }
  );
  const { data: hospitalData } = await hospitalRes.json();
  console.log(hospitalData);
  // Fetch doctors for the hospital
  // const doctorsRes = await fetch(`${BASE_URL}/doctors?hospital_id=${hospitalId}`, {
  //   headers: {
  //     "X-localization": params.locale,
  //   },
  // });
  // const { data: doctorsData } = await doctorsRes.json();
  // const doctors = doctorsData.data || [];

  // FETCH HOSPITAL INSURANCE
  const hospitalInsurancesRes = await fetch(
    `${BASE_URL}/hospital/insurance/company?hospital_id=${hospitalId}`,
    {
      headers: {
        "X-localization": locale,
      },
    }
  );
  const { data: hospitalInsurances } = await hospitalInsurancesRes.json();
  console.log(hospitalInsurances);

  // FETCH HOSPITAL REVIEWS
  // const hospitalReviewsRes = await fetch(
  //   `${BASE_URL}/hospital/rate?hospital_id=${hospitalId}`,
  //   {
  //     headers: {
  //       "X-localization": locale,
  //     },
  //   }
  // );
  // const { data: hospitalReviews } = await hospitalReviewsRes.json();
  // console.log(hospitalReviews);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="container overflow-visible mt-[170px] flex flex-col gap-4">
        <div className="p-6 flex gap-4 border border-[#E7E7E7] rounded-[16px] bg-[var(--neutral-100)]">
          <div className="w-[100px] h-[100px] rounded-[50%] flex-shrink-0">
            <Image
              className="w-full h-full rounded-[50%] object-cover"
              src={hospitalData?.photo}
              alt="Hospital Image"
              width={100}
              height={100}
              sizes="100vw"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between flex-wrap">
                <span className="font-semibold text-2xl leading-9 tracking-[0px] text-[var(--Black)]">
                  {hospitalData?.first_name}
                </span>
                <div className="flex gap-[8px] items-center">
                  <RateIcon color="var(--secondary-300)" />
                  <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--primary-800)] mt-[3px]">
                    {hospitalData?.rating}
                    <span className="ps-1 text-[var(--neutral-800)]">
                      ({hospitalData?.rating_count} {t("rating")})
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex gap-[20px] items-center flex-wrap">
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--DescriptionsColor)]">
                    {t("noViews")}
                  </span>
                  <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--titleColor)]">
                    {hospitalData?.viewers_count}
                  </span>
                </div>
                <div className="h-[43px] w-[1px] bg-[#71717199]"></div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--DescriptionsColor)]">
                    {t("speciality")}
                  </span>
                  <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--titleColor)]">
                    {hospitalData?.specializations_count}
                  </span>
                </div>
                <div className="h-[43px] w-[1px] bg-[#71717199]"></div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--DescriptionsColor)]">
                    {t("noDoctors")}
                  </span>
                  <span className="font-semibold text-base leading-6 tracking-[0px] text-[var(--titleColor)]">
                    {hospitalData?.doctors_count || 20}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tags section */}
        <div className="flex gap-2 flex-wrap">
          <Tag
            active={activeTab == 1}
            key={1}
            text={t("doctors")}
            href={`?tab=1`}
            classNameProp={
              activeTab == 1 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
            tabId={1}
          />
          <Tag
            active={activeTab == 2}
            key={2}
            text={t("aboutHospital")}
            href={`?tab=2`}
            classNameProp={
              activeTab == 2 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
            tabId={2}
          />
          <Tag
            active={activeTab == 3}
            key={3}
            text={t("reviews")}
            href={`?tab=3`}
            classNameProp={
              activeTab == 3 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
            tabId={3}
          />
          <Tag
            active={activeTab == 4}
            key={4}
            text={t("insurances")}
            href={`?tab=4`}
            classNameProp={
              activeTab == 4 ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
            tabId={4}
          />
        </div>

        {/* Doctor Tab */}
        {activeTab == 1 && (
          <div className="flex flex-col gap-1">
            <div className="flex inputStyles gap-4 flex-wrap">
              <div className="flex-[2]">
                <HeroSectionInput
                  height="56px"
                  placeholder={t("searchOnDoctorsName")}
                />
              </div>
              {/* <div className="flex-1">
              <SelectBox placeholder={t("selectSpecialist")} />
            </div> */}
              <div className="flex-1">
                <SelectBox placeholder={t("branches")} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-xl leading-[24.2px] text-[#181C32] py-4">
                {t("doctors")} ({hospitalData?.doctors_count})
              </span>
              <div className="flex gap-[18px] flex-wrap">
                {hospitalData?.doctors.map((doc) => (
                  <DoctorCardResults
                    key={doc?.id}
                    id={doc?.id}
                    name={doc?.first_name}
                    specialization={`${doc?.speciality} | ${doc?.hospital.first_name}`}
                    city={doc?.city?.title}
                    rate={doc?.rating}
                    img={doc?.photo}
                    price={doc?.setting.in_hospital_price}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* About Hospital Tab */}
        {activeTab == 2 && (
          <div className="flex flex-col">
            <div className="flex flex-col gap-3 py-6">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                {t("aboutHospital")}
              </span>
              <span className="font-[Inter] font-medium text-base leading-6 tracking-[0px] text-[var(--DescriptionColor)]">
                {hospitalData?.about_us}
              </span>
            </div>
            <div className="flex flex-col gap-3 py-4">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                {t("branches")}
              </span>
              <div className="flex gap-3 items-center">
                <LocationIcon color="var(--color1)" w={12} h={17} />
                <span className="font-[Inter] font-medium text-base leading-6 tracking-[0px] text-[var(--DescriptionColor)]">
                  {hospitalData?.hospital_location?.location}
                </span>
              </div>
            </div>
            <HospitalSpecialties hospitalId={hospitalId} />
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab == 3 && (
          <div className="p-[20px] bg-[var(--neutral-100)] rounded-xl flex flex-col gap-3 shadow-[0_3px_8px_0_#D2D2D240]">
            <div className="flex justify-between">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--darkColor)]">
                {t("reviews")}
              </span>
              {/* <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
              {t("seeMore")}
            </span> */}
            </div>
            <div className="flex gap-[8px] items-center">
              <RateIcon color="var(--secondary-300)" />
              <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--primary-800)] mt-[3px]">
                {hospitalData?.rating}
                <span className="ps-1 text-[var(--neutral-800)]">
                  ({hospitalData?.rating_count} {t("rating")})
                </span>
              </span>
            </div>
            <HospitalReviews hospitalId={hospitalId} />
          </div>
        )}

        {/* Insurance Tab */}
        {activeTab == 4 && (
          <div className="py-7 flex flex-col gap-3">
            <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
              {t("insurance")}
            </span>
            {hospitalInsurances?.map((insurance, i) => (
              <div
                key={insurance?.id}
                className={`flex gap-3 items-center pb-3 ${
                  i !== hospitalInsurances.length - 1
                    ? "border-b border-b-[#E7E7E7]"
                    : ""
                }`}
              >
                <div className="w-[52px] h-[52px] rounded-[8px] shadow-[0_3px_8px_0_#D2D2D240] overflow-hidden">
                  <Image
                    className="w-full h-full rounded-[8px] object-cover shadow-[0_3px_8px_0_#D2D2D240]"
                    src={insurance?.photo}
                    alt={insurance?.title}
                    width={52}
                    height={52}
                  />
                </div>
                <div className="font-semibold text-base leading-6 tracking-[0px] text-[#101010]">
                  {insurance?.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
