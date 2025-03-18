import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import ar from "react-phone-input-2/lang/ar.json";
// import en from "react-phone-input-2/lang/en.json";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
const PhoneInputComponent = ({onChange}) => {
  const t = useTranslations();
  const { locale } = useParams();
  // console.log(locale)
  useEffect(() => {
    // Select the input field when the component mounts
    const phoneInput = document.querySelector(".PhoneInputStyle input");

    if (phoneInput) {
      // Remove the value to show the placeholder
      phoneInput.value = "";

      // You can also add an event listener if needed
      phoneInput.addEventListener("focus", () => {
        phoneInput.value = "";
      });
    }
    if (locale === "ar") {
      phoneInput.style.textAlign = "right";
    }
  }, []);
  return (
    <PhoneInput
      country={"sa"}
      onChange={onChange}
      excludeCountries={["il"]}
      containerClass="PhoneInputStyle"
      localization={locale == "ar" ? ar : ""}
      placeholder={t("enterYourPhoneNumber")}
    />
  );
};

export default PhoneInputComponent;
