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

const Page = async ({ params, searchParams }) => {
  const t = await getTranslations();
  const { hospitalId, locale } = await params;
  const activeTab = searchParams?.tab || 1;

  // Fetch hospital profile data
  const hospitalRes = await fetch(
    `${BASE_URL}/view/hospital/profile?hospital_id=${hospitalId}`,
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
              <div className="flex justify-between">
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
              <div className="flex gap-[20px] items-center">
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
        <div className="flex gap-1">
          <Tag
            active={activeTab == 1}
            key={1}
            text={t("doctor")}
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
            text={t("insurance")}
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
              <div className="flex-1">
                <SelectBox placeholder={t("selectSpecialist")} />
              </div>
              <div className="flex-1">
                <SelectBox placeholder={t("branches")} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-xl leading-[24.2px] text-[#181C32] py-4">
                {t("doctors")} ({hospitalData?.doctors_count})
              </span>
              <div className="flex gap-[18px] flex-wrap">
                {hospitalData.doctors.map((doc) => (
                  <DoctorCardResults
                    key={doc.id}
                    name={doc.first_name}
                    specialization={`${doc.speciality} | ${doc.hospital.first_name}`}
                    city={doc?.city?.title}
                    rate={doc.rating}
                    img={doc.photo}
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
              {hospitalData?.branches?.map((branch, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <LocationIcon color="var(--color1)" w={12} h={17} />
                  <span className="font-[Inter] font-medium text-base leading-6 tracking-[0px] text-[var(--DescriptionColor)]">
                    {branch.address}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 py-6">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
                {t("specialists")}
              </span>
              <div className="flex gap-4 pt-4">
                {hospitalData?.specialties?.map((specialty, i) => (
                  <div
                    className="flex flex-col w-[272px] h-[180px] rounded-xl items-center justify-center gap-7 bg-[#F4F4F4]"
                    key={i}
                  >
                    <div className="w-full h-[89px] overflow-hidden">
                      <Image
                        src={specialty.image || DummyChildImage}
                        alt="specialist Image"
                        width={272}
                        height={89}
                      />
                    </div>
                    <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--darkColor)]">
                      {specialty.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab == 3 && (
          <div className="p-[20px] bg-[var(--neutral-100)] rounded-xl flex flex-col gap-3 shadow-[0_3px_8px_0_#D2D2D240]">
            <div className="flex justify-between">
              <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--darkColor)]">
                {t("reviews")}
              </span>
              <span className="font-normal text-sm leading-6 tracking-[0px] text-[var(--DescriptionsColor)]">
                {t("seeMore")}
              </span>
            </div>
            <div className="flex gap-[8px] items-center">
              <RateIcon color="var(--secondary-300)" />
              <span className="font-medium text-sm leading-[21px] tracking-[0px] text-[var(--primary-800)] mt-[3px]">
                {hospitalData?.rating || 4.7}
                <span className="ps-1 text-[var(--neutral-800)]">
                  ({hospitalData?.total_reviews || 200} {t("rating")})
                </span>
              </span>
            </div>
            <div className="mt-1 flex gap-4">
              {hospitalData?.reviews?.map((review, i) => (
                <div
                  key={i}
                  className="p-5 flex flex-col gap-3 bg-[#F4F4F4] rounded-[12px] mt-1"
                >
                  <div className="flex gap-[6px]">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon2 key={i} color="var(--secondary-200)" />
                    ))}
                  </div>
                  <span className="font-[Almarai] text-[var(--neutral-900)] font-bold text-sm leading-6 tracking-[0px]">
                    {review.comment}
                  </span>
                  <span className="text-[var(--primary-800)] font-normal text-xs leading-6 tracking-[0px]">
                    {review.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insurance Tab */}
        {activeTab == 4 && (
          <div className="py-7 flex flex-col gap-3">
            <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
              {t("insurance")}
            </span>
            {hospitalData?.insurance_companies?.map((insurance, i) => (
              <div
                key={i}
                className="flex gap-3 items-center border-b border-b-[#E7E7E7] pb-3"
              >
                <div className="w-[52px] h-[52px] rounded-[8px] shadow-[0_3px_8px_0_#D2D2D240] overflow-hidden">
                  <Image
                    className="w-full h-full rounded-[8px] object-cover shadow-[0_3px_8px_0_#D2D2D240]"
                    src={insurance.logo || DummyDoctorImage}
                    alt="Insurance Logo"
                    width={52}
                    height={52}
                  />
                </div>
                <div className="font-semibold text-base leading-6 tracking-[0px] text-[#101010]">
                  {insurance.name}
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
