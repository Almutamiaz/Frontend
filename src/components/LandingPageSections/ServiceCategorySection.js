import { BASE_URL } from "@/constants";
import { getLocale } from "next-intl/server";
import React from "react";
import ServiceCategoryCard from "../LandingPageComponents/ServiceCategoryCard";

const ServiceCategorySection = async () => {
  const locale = await getLocale();
  const res = await fetch(`${BASE_URL}/offer/categories`, {
    cache: "no-store",
    headers: {
      "X-localization": locale,
    },
  });

  const { data: services } = await res.json();
  // console.log(services);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 flex-wrap">
        {services[0] && (
          <ServiceCategoryCard
            flex={1}
            title={services[0]?.title}
            img={services[0]?.photo}
          />
        )}
        <div className="flex gap-4 min-w-[624px] flex-1 flex-wrap max-[800px]:min-w-full">
          {services[1] && (
            <ServiceCategoryCard
              flex={1}
              minWidthMobile
              title={services[1]?.title}
              img={services[1]?.photo}
            />
          )}
          {services[2] && (
            <ServiceCategoryCard
              flex={1}
              minWidthMobile
              title={services[2]?.title}
              img={services[2]?.photo}
            />
          )}
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {services[3] && (
          <ServiceCategoryCard
            flex={1}
            title={services[3]?.title}
            img={services[3]?.photo}
          />
        )}
        {services[4] && (
          <ServiceCategoryCard
            flex={2}
            title={services[4]?.title}
            img={services[4]?.photo}
          />
        )}
      </div>
      <div className="flex gap-4 flex-wrap flex-row-reverse">
        {services[5] && (
          <ServiceCategoryCard
            flex={1}
            title={services[5]?.title}
            img={services[5]?.photo}
          />
        )}
        {services[6] && (
          <div className="flex gap-4 min-w-[624px] flex-1 flex-wrap max-[800px]:min-w-full">
            {services[6] && (
              <ServiceCategoryCard
                flex={1}
                minWidthMobile
                title={services[6]?.title}
                img={services[6]?.photo}
              />
            )}
            {services[7] && (
              <ServiceCategoryCard
                flex={1}
                minWidthMobile
                title={services[7]?.title}
                img={services[7]?.photo}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCategorySection;
