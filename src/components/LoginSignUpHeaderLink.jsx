"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
const LoginSignUpHeaderLink = () => {
  const { locale } = useParams();
  const t = useTranslations();
  return <Link href={`/${locale}/Account/SignIn`}>{t("loginSignup")}</Link>;
};

export default LoginSignUpHeaderLink;
