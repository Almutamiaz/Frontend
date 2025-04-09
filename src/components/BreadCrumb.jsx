"use client";
import { Breadcrumb } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const LOCALES = ["en", "ar"]; // Define your supported locales

const BreadCrumb = () => {
  const pathname = usePathname();
  const BlockedPathes = ["MyReservations", "MyProfile" , "AboutUs"];
  let pathSegments = pathname.split("/").filter((seg) => seg);
  const { locale } = useParams();
  const t = useTranslations();
  // Remove locale if it exists in the first segment
  if (LOCALES.includes(pathSegments[0])) {
    pathSegments.shift();
  }

  const breadcrumbItems = [
    { title: <Link href={`/${locale}`}>{t("home")}</Link> },
    ...pathSegments.map((segment, index) => {
      const isLast = index === pathSegments.length - 1; // Check if it's the last item
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        title: isLast ? (
          t(decodeURIComponent(segment).toLocaleLowerCase())
        ) : (
          <Link href={href}>
            {t(decodeURIComponent(segment).toLocaleLowerCase())}
          </Link>
        ),
      };
    }),
  ];

  return pathSegments.length > 0 &&
    BlockedPathes.every((path) => !pathname.includes(path)) ? (
    <div className="absolute top-[132px] container self-center">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  ) : null;
};

export default BreadCrumb;
