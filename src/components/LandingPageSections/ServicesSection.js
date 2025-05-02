import { BASE_URL } from "@/constants";
import React from "react";
import ServiceCard from "../LandingPageComponents/ServiceCard";
import { getLocale } from "next-intl/server";
import { Col } from "antd";

const ServicesSection = async () => {
  const locale = await getLocale();
  const res = await fetch(`${BASE_URL}/main/services`, {
    cache: "no-store",
    headers: {
      "X-localization": locale,
    },
  });
  if (!res.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/main/services`);
  }
  const { data: services } = await res.json();
  console.log(services);
  return (
    <>
      {services.map((service) => (
        <Col
          key={service?.id}
          xs={12}
          sm={12}
          md={8} // 24 / 8 = 3 cards per row on md
          xl={6} // 24 / 6 = 4 cards per row on lg
        >
          <ServiceCard
            title={service?.title}
            description={service?.description}
            icon={service?.photo || ""}
            id={service?.id}
          />
        </Col>
      ))}
    </>
  );
};

export default ServicesSection;
