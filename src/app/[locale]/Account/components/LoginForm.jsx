"use client";

import React, { useEffect, useState } from "react";
import AntdFormItem from "@/components/AntdFormItem";
import { Button, Form, Select } from "antd";
import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axiosInstance from "../../../../../utils/axios";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAppNotification } from "@/Context/NotificationProvider";
import Image from "next/image";
import { useUser } from "@/Context/UserContext";
const { Option } = Select;

const LoginForm = ({ setShowVerificationCode, setPhoneNum }) => {
  const [form] = Form.useForm();
  const t = useTranslations();
  const { locale } = useParams();
  const [loading, setLoading] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countryFetchLoading, setCountryFetchLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { setUser } = useUser();
  const searchParams = useSearchParams();
  const redirectRoute = searchParams.get("redirect");
  const notificationApi = useAppNotification();
  const router = useRouter();
  const showNotification = (message) => {
    notificationApi.success({
      message: message,
      showProgress: true,
      pauseOnHover: true,
      style: {
        fontFamily: "var(--fontFamily)",
      },
    });
  };

  const fetchCountries = async () => {
    try {
      const response = await axiosInstance.get("/countries");
      setCountries(response.data.data);
      setSelectedCountry(response.data.data[0]?.id);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setCountryFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  const passwordValidator = (_, value) => {
    const lengthRegex = /^.{8,}$/;
    if (!value) {
      return Promise.resolve();
    }

    if (!lengthRegex.test(value)) {
      return Promise.reject(t("passwordMinLength"));
    }
    return Promise.resolve();
  };

  const validateNineDigits = (_, value) => {
    const valueStr = value ? String(value) : "";
    if (!value) {
      return Promise.resolve();
    }
    if (valueStr.length < 9) {
      return Promise.reject(new Error(t("pleaseEnterExactly9Digits")));
    }
    return Promise.resolve();
  };

  const fetchCSRF = async () => {
    try {
      const response = await axios.get("/backend/sanctum/csrf-cookie", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
    }
  };
  console.log("first")
  const handleLogin = async (values) => {
    // await fetchCSRF();
    const body = {
      emailOrPhone: values.phone,
      password: values.password,
      intro: +countries.find((country) => country.id === selectedCountry)
        ?.phone_code,
    };

    try {
      const response = await axiosInstance.post("/auth/login-patient", body);
      if (response.data.code === 200) {
        showNotification(response.data.message);
        localStorage.setItem("token", response?.data?.data?.token);
        setUser(response?.data?.data);
        if (redirectRoute) {
          router.push(redirectRoute);
        } else {
          router.push(`/${locale}`);
        }
      }
    } catch (error) {
      notificationApi.error({
        message: error.response?.data?.message,
        showProgress: true,
        pauseOnHover: true,
        style: {
          fontFamily: "var(--fontFamily)",
        },
      });
      console.error("Error:", error.response?.data || error.message);
      if (error.response?.data?.code == 410) {
        setPhoneNum({
          phone: values.phone,
          intro: +countries.find((country) => country.id === selectedCountry)
            ?.phone_code,
        });
        setShowVerificationCode(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[466px] w-full max-[900px]:w-[90%]">
      <div className="flex flex-col gap-4">
        <Form form={form}>
          <div className="flex flex-col gap-3">
            {/* <AntdFormItem
              name="email"
              placeholder={t("email")}
              rules={[
                { required: true, message: t("pleaseEnterEmailAddress") },
                {
                  type: "email",
                  message: t("pleaseEnterEmailAddress"),
                },
              ]}
            /> */}

            <AntdFormItem
              name="phone"
              placeholder={t("enterYourPhoneNumber")}
              NumberInput
              classNameProp="numberInputStyle borderColorWhenFoucs phoneNumberWithCountryFlag"
              NumberInputPrefix={
                <div className="flex gap-3 justify-center items-center w-[90px]">
                  {countryFetchLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <Select
                        defaultValue={selectedCountry}
                        suffixIcon={null}
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentNode
                        }
                        // disabled={countries.length <= 1}
                        onChange={(value) => console.log(value)}
                      >
                        {countries.map((country) => (
                          <Option key={country?.id} value={country?.id}>
                            <Image
                              src={country?.flag}
                              alt={country?.title}
                              width={24}
                              height={24}
                              className="object-cover w-6 h-6"
                            />
                            <span className="font-normal text-[14px] tracking-[0px] text-[var(--DescriptionColor2)]">
                              +{+country?.phone_code}
                            </span>
                          </Option>
                        ))}
                      </Select>
                      <span className="w-[1px] h-[32px] bg-[var(--DescriptionColor)]"></span>
                    </>
                  )}
                </div>
              }
              moreProps={{
                onKeyDown: (e) => {
                  const allowedKeys = [
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ];
                  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                  }
                  if (
                    /[0-9]/.test(e.key) &&
                    e.target.value &&
                    e.target.value.length >= 9
                  ) {
                    e.preventDefault();
                  }
                },
                // parser: (value) => (value ? value.replace(/\D/g, "") : ""),
              }}
              rules={[
                { required: true, message: t("enterYourPhoneNumber") },
                { validator: validateNineDigits },
              ]}
            />

            <AntdFormItem
              name="password"
              placeholder={t("password")}
              passwordInput
              classNameProp="borderColorWhenFoucs"
              rules={[
                {
                  required: true,
                  message: t("pleaseEnterPassword"),
                },
                { validator: passwordValidator },
              ]}
              hasFeedback
              moreProps={{
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    form
                      .validateFields()
                      .then((values) => {
                        setLoading(true);
                        handleLogin(values);
                      })
                      .catch((error) => {
                        console.log("Validation failed:", error);
                      });
                  }
                },
              }}
            />
          </div>
        </Form>
        <p
          className={`DescriptionColor text-[14px] font-semibold leading-[16.94px] ${
            locale == "en" ? "text-right" : "text-left"
          }`}
        >
          <Link href={`/${locale}/Account/ForgotPassword`}>
            {t("forgotPassword")}
          </Link>
        </p>
      </div>
      <div>
        <Button
          className="w-full"
          disabled={loading || countryFetchLoading}
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                setLoading(true);
                handleLogin(values);
              })
              .catch((error) => {
                console.log("Validation failed:", error);
              });
          }}
        >
          {t("login")}
          {loading && <LoadingSpinner />}
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
