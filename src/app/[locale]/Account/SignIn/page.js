import loginBackground from "@/assets/images/loginBackground.png";
import Image from "next/image";
import Logo from "@/components/Logo";
import LoginForm from "../components/LoginForm";
import LoginWithSection from "../components/LoginWithSection";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations();

  return (
    <div className="flex h-full max-sm:flex-wrap">
      <div className="w-[55.5%] max-sm:w-full">
        <div className="h-screen flex justify-center items-center	gap-10 flex-col min-h-[700px]">
          <div className="flex justify-start max-w-[466] w-full max-[900px]:justify-center">
            <Logo />
          </div>
          <div className="flex flex-col gap-6 max-w-[466] w-full">
            <div className="flex flex-col gap-8 max-[900px]:items-center">
              <div className="flex flex-col gap-4 max-[900px]:items-center">
                <h6 className="color1 text-2xl font-bold leading-6">
                  {t("welcomeBack")}
                </h6>
                <p className="DescriptionColor text-base font-medium leading-5 max-[900px]:text-center max-[900px]:px-2">
                  {t("accessMedicalServices")}
                </p>
              </div>
              <LoginForm />
            </div>
            <LoginWithSection />
          </div>
        </div>
      </div>
      <div className="w-[49.5%] max-sm:hidden flex h-screen">
        <Image
          src={loginBackground}
          alt="Login Background"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Page;
