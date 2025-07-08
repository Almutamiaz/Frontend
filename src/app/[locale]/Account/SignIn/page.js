"use client";

import loginBackground from "@/assets/images/loginBackground.png";
import Logo from "@/components/Logo";
import LoginForm from "../components/LoginForm";
import LoginWithSection from "../components/LoginWithSection";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SignUpVerificationCode from "../components/SignUpVerificationCode";
import AuthWrapper from "@/components/AuthWrapper";
import Link from "next/link";
import { useParams } from "next/navigation";

const Page = () => {
  const t = useTranslations();
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [phoneNum, setPhoneNum] = useState();
  const { locale } = useParams();
  return (
    <>
      {!showVerificationCode ? (
        <div className="flex h-full max-sm:flex-wrap z-[1]">
          <div className="w-[55.5%] max-sm:w-full bg-[var(--neutral-100)]">
            <div className="h-screen flex justify-center items-center	gap-10 flex-col min-h-[700px]">
              <div className="flex justify-start max-w-[466px] w-full max-[900px]:justify-center">
                <Link href={`/${locale}`}>
                  <Logo />
                </Link>
              </div>
              <div className="flex flex-col gap-6 max-w-[466px] w-full">
                <div className="flex flex-col gap-8 max-[900px]:items-center">
                  <div className="flex flex-col gap-4 max-[900px]:items-center">
                    <h6 className="color1 text-2xl font-bold leading-6">
                      {t("welcomeBack")}
                    </h6>
                    <p className="DescriptionColor text-base font-medium leading-5 max-[900px]:text-center max-[900px]:px-2">
                      {t("accessMedicalServices")}
                    </p>
                  </div>
                  <LoginForm
                    setShowVerificationCode={setShowVerificationCode}
                    setPhoneNum={setPhoneNum}
                  />
                </div>
                <LoginWithSection />
              </div>
            </div>
          </div>
          <div
            className="w-[49.5%] max-sm:hidden flex bg-cover bg-center min-h-screen bg-[var(--neutral-100)]"
            style={{ backgroundImage: `url(${loginBackground.src})` }}
          >
            {/* <Image
          src={loginBackground}
          alt="Login Background"
          className="w-full object-cover"
        /> */}
          </div>
        </div>
      ) : (
        <SignUpVerificationCode phoneNum={phoneNum} />
      )}
    </>
  );
};

export default Page;
