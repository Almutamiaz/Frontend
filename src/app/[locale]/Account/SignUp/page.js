"use client";
import signUpBackground from "@/assets/images/signUpBackground.png";
import Logo from "@/components/Logo";
import LoginWithSection from "../components/LoginWithSection";
import { useTranslations } from "next-intl";
import SignUpForm from "../components/SignUpForm";
import SignUpVerificationCode from "../components/SignUpVerificationCode";
import { useState } from "react";

const Page = () => {
  const t = useTranslations();
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [phoneNum, setPhoneNum] = useState();
  return !showVerificationCode ? (
    <div className="flex max-sm:flex-wrap z-[1]">
      <div className="w-[55.5%] max-sm:w-full bg-[var(--neutral-100)] pt-10">
        <div className=" flex justify-center items-center	gap-10 flex-col min-h-[800px]">
          <div className="flex justify-start max-w-[466px] w-full max-[900px]:justify-center">
            <Logo />
          </div>
          <div className="flex flex-col gap-6 max-w-[466px] w-full">
            <div className="flex flex-col gap-8 max-[900px]:items-center">
              <div className="flex flex-col gap-4 max-[900px]:items-center">
                <h6 className="color1 text-2xl font-bold leading-6">
                  {t("createAccount")}
                </h6>
                <p className="DescriptionColor text-base font-medium leading-5 max-[900px]:text-center max-[900px]:px-2">
                  {t("signUpDescription")}
                </p>
              </div>
              <SignUpForm
                setShowVerificationCode={setShowVerificationCode}
                setPhoneNum={setPhoneNum}
              />
            </div>
            <LoginWithSection signUp />
          </div>
        </div>
      </div>
      <div
        className="w-[49.5%] max-sm:hidden flex bg-cover bg-center min-h-screen bg-[var(--neutral-100)]"
        style={{ backgroundImage: `url(${signUpBackground.src})` }}
      >
        {/* <Image
          src={signUpBackground}
          alt="Login Background"
          className="w-full object-cover"
        /> */}
      </div>
    </div>
  ) : (
    <SignUpVerificationCode phoneNum={phoneNum}/>
  );
};

export default Page;
