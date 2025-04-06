import { BASE_URL } from "@/constants";
import { getLocale } from "next-intl/server";
import React from "react";
import StatisticCard from "../LandingPageComponents/StatisticCard";

const EmpoweringHealthcareSimplifyingAccessSection = async () => {
  const locale = await getLocale();
  const res = await fetch(`${BASE_URL}/statistics`, {
    cache: "no-store",
    headers: {
      "X-localization": locale,
    },
  });

  const { data: statistics } = await res.json();
  const formattedStatistics = Object.entries(statistics).map(
    ([title, value]) => ({
      title: title.replace(/_/g, " "), // optional: replace underscores with spaces
      value,
    })
  );
  // console.log(formattedStatistics);
  return (
    <>
      {formattedStatistics.map((statistic, i) => (
        <>
          <StatisticCard
            key={statistic?.value}
            num={statistic.value}
            title={statistic.title}
          />
          {i + 1 != formattedStatistics.length && (
            <div className="rounded-[4px] w-[2px] h-[84px] bg-[#023C5D] max-[660px]:hidden"></div>
          )}
        </>
      ))}
    </>
  );
};

export default EmpoweringHealthcareSimplifyingAccessSection;
