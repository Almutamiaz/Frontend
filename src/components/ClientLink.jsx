"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const ClientLink = ({ href, children }) => {
  const { locale } = useParams();
  return (
    <Link href={href == "/" ? `/${locale}` : `/${locale}/${href}`}>
      {children}
    </Link>
  );
};

export default ClientLink;
