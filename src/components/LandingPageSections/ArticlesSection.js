import { BASE_URL } from "@/constants";
import { getLocale } from "next-intl/server";
import React from "react";
import ArticleCard from "../LandingPageComponents/ArticleCard";

const ArticlesSection = async () => {
  const locale = await getLocale();
  const res = await fetch(`${BASE_URL}/articles`, {
    cache: "no-store",
    headers: {
      "X-localization": locale,
    },
  });
  if (!res.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/articles`);
  }
  const { data: articles } = await res.json();
  // console.log(articles);
  return (
    <>
      {articles?.slice(0, 3).map((article) => (
        <ArticleCard
          key={article?.id}
          title={article?.title}
          hospitalName={article?.hospital?.name}
          hospitalImg={article?.hospital?.photo}
          articleImg={article?.photo}
        />
      ))}
    </>
  );
};

export default ArticlesSection;
