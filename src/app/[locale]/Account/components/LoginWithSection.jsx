"use client";
import AppleIcon from "@/assets/icons/AppleIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const LoginWithSection = ({ signUp }) => {
  const t = useTranslations();
  const { locale } = useParams();

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="flex flex-col gap-5 items-center w-full max-[900px]:w-[90%]">
        <div className="flex items-center justify-between w-full">
          <div className="h-[1px] w-[32%] bg-[#E8ECF4]"></div>
          <p className="text-[14px] font-semibold leading-[16.94px] text-[#6A707C]">
            {t(signUp ? "orSignUpWith" : "orLoginWith")}
          </p>
          <div className="h-[1px] w-[32%] bg-[#E8ECF4]"></div>
        </div>
        <div className="flex gap-2 w-full max-[400px]:flex-col">
          <Button className="flex-1 min-h-14 bg-[#F4F4F4] border border-[#E8ECF4]">
            <GoogleIcon />
          </Button>
          <Button className="flex-1 min-h-14 bg-[#F4F4F4] border border-[#E8ECF4]">
            <AppleIcon />
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-[16px] font-medium leading-[22.4px] tracking-[0.01em] text-[#1E232C] text-center max-[900px]:px-2">
          {t(signUp ? "alreadyHaveAccount" : "noAccount")}
          <Link
            href={
              signUp ? `/${locale}/Account/SignIn` : `/${locale}/Account/SignUp`
            }
          >
            <span className="font-bold pr cursor-pointer ms-1">
              {t(signUp ? "signIn" : "registerNow")}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginWithSection;
