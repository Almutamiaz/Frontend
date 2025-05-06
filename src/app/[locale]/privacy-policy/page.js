import Footer from "@/components/Footer";
import { BASE_URL } from "@/constants";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: `${t("hakeem")} - ${t("privacy-policy")}`,
    description: `${t("hakeem")} - ${t("privacy-policy")}`,
  };
}

const Page = async () => {
  const locale = await getLocale();
  const t = await getTranslations();
  const res = await fetch(`${BASE_URL}/app-information`, {
    headers: {
      "X-localization": locale,
    },
  });
  if (!res.ok) {
    console.error(`Front Alert - ERROR || ${BASE_URL}/app-information`);
  }
  const { data: appInformation } = await res.json();
  return (
    <>
      <div className="container h-[calc(100%-156px)] mt-[156px] flex flex-col gap-6  pt-4 pb-10">
        <p>
          <strong>{t("hakeem")}</strong>
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html:
              appInformation?.patient_home_note +
              appInformation?.terms +
              appInformation?.policy +
              appInformation?.payment_and_refund_policy,
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Page;
