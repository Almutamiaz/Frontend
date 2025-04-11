import { BASE_URL } from "@/constants";
import { getLocale } from "next-intl/server";

const FetchOfferCategories = async () => {
  // console.log("FetchOfferCategories");

  const locale = await getLocale();
  const res = await fetch(`${BASE_URL}/offer/categories`, {
    cache: "no-store",
    headers: {
      "X-localization": locale,
    },
  });

  const { data: offerCategories } = await res.json();
  console.log(offerCategories)
  return null;
};

export default FetchOfferCategories;
