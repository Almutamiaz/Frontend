"use client";
import Logo from "@/components/Logo";
import { useTranslations } from "next-intl";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const Page = () => {
  const t = useTranslations();
  const [formToShow, setFormToShow] = useState(0);
  const { locale } = useParams();

  return (
    <div className="h-screen flex flex-col justify-center gap-6">
      <div className="flex justify-center items-center	gap-10 flex-col">
        <div className="flex max-w-[466] w-full justify-center">
          <Logo />
        </div>
        <div className="flex flex-col gap-6 max-w-[466] w-full">
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4 items-center">
              <h6 className="color1 text-2xl font-bold leading-6">
                {t(
                  formToShow == 0
                    ? "forgotYourPassword"
                    : formToShow == 1
                    ? "verifyYourIdentity"
                    : "resetYourPassword"
                )}
              </h6>
              <p className="DescriptionColor text-base font-medium leading-5 max-[900px]:text-center max-[900px]:px-2">
                {t(
                  formToShow == 0
                    ? "dontWorryReset"
                    : formToShow == 1
                    ? "codeSentToPhone"
                    : "createNewPassword"
                )}
              </p>
            </div>
            <ForgotPasswordForm
              setFormToShow={setFormToShow}
              formToShow={formToShow}
            />
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center ${
          formToShow == 0 || formToShow == 1 ? "visible" : "invisible"
        }`}
      >
        <p className="text-[16px] font-medium leading-[22.4px] tracking-[0.01em] text-[#1E232C] text-center max-[900px]:px-2">
          {t(formToShow == 0 ? "alreadyHaveAccount" : "didntGetCode")}
          <span className="font-bold pr cursor-pointer ms-1">
            {/* <Link href={formToShow == 0 ? `/${locale}/Account/SignIn` : ""}>
              {t(formToShow == 0 ? "signIn" : "resend")}
            </Link> */}

            {formToShow === 0 ? (
              <Link href={`/${locale}/Account/SignIn`}>{t("signIn")}</Link>
            ) : (
              t("resend")
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Page;
