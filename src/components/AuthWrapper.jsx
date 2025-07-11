"use client";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import axiosInstance from "../../utils/axios";
import { useUser } from "@/Context/UserContext";
import { useParams, useRouter, usePathname } from "next/navigation";

const AuthWrapper = ({ children }) => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { locale } = useParams();
  const pathname = usePathname();
  useEffect(() => {
    const isAuthPage =
      pathname.includes("/Account/SignIn") ||
      pathname.includes("/Account/SignUp") ||
      pathname.includes("/Account/ForgotPassword");

    if (user) {
      isAuthPage ? router.push(`/${locale}`) : setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const { data } = await axiosInstance.get("/my-profile");
        setUser(data?.data);
        isAuthPage ? router.push(`/${locale}`) : setLoading(false);
      } catch (error) {
        !isAuthPage && router.push(`/${locale}/Account/SignIn`);
        setUser(null);
        console.error("Error:", error.response?.data || error.message);
        isAuthPage && setLoading(false);
      } finally {
        // setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[var(--neutral-100)] z-[1]">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
