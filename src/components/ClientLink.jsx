"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const ClientLink = ({ href, children }) => {
  const { locale } = useParams();
  console.log(href)
  return <Link href={`/${locale}/${href}`}>{children}</Link>;
};

export default ClientLink;
