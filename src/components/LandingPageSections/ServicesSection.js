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

  const { data: services } = await res.json();

  return (
    <>
      {services.map((service) => (
        <Col
          key={service?.id}
          xs={24}
          sm={12}
          md={8} // 24 / 8 = 3 cards per row on md
          xl={6} // 24 / 6 = 4 cards per row on lg
        >
          <ServiceCard
            title={service?.title}
            description={service?.description}
            icon={service?.photo || ""}
          />
        </Col>
      ))}
    </>
  );
};

export default ServicesSection;
