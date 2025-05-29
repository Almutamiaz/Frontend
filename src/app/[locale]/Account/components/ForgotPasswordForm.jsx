"use client";

import React, { useEffect, useState } from "react";
import AntdFormItem from "@/components/AntdFormItem";
import { Button, Form, Select } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import axiosInstance from "../../../../../utils/axios";
import axios from "axios";
import { useAppNotification } from "@/Context/NotificationProvider";
import { useRouter, useParams } from "next/navigation";
const { Option } = Select;

const ForgotPasswordForm = ({ setFormToShow, formToShow }) => {
  const [form] = Form.useForm();
  const t = useTranslations();
  const [countryFetchLoading, setCountryFetchLoading] = useState(true);
  const [loading, setLoading] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const notificationApi = useAppNotification();
  const router = useRouter();
  const { locale } = useParams();

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

  const handleVerify = async (values) => {
    await fetchCSRF();
    const body = {
      phone: values.phone,
      intro: +countries.find((country) => country.id === selectedCountry)
        ?.phone_code,
    };

    try {
      const response = await axiosInstance.post("/auth/resend-code", body);
      if (response.data.code === 200) {
        showNotification(response.data.message);
        setFormToShow(1);
        setPhoneNum({
          phone: values.phone,
          intro: +countries.find((country) => country.id === selectedCountry)
            ?.phone_code,
        });
        // form.resetFields();
        // localStorage.setItem("token", response?.data?.data?.token);
        // setUser(response?.data?.data);
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
      // if (error.response?.data?.code == 410) {
      //   setPhoneNum({
      //     phone: values.phone,
      //     intro: +countries.find((country) => country.id === selectedCountry)
      //       ?.phone_code,
      //   });
      //   setShowVerificationCode(true);
      // }
    } finally {
      setLoading(false);
    }
  };

  const checkCode = async (values) => {
    await fetchCSRF();
    const body = {
      phone: phoneNum.phone,
      code: +values.otpInput,
      intro: phoneNum.intro,
    };

    try {
      const response = await axiosInstance.post("/auth/check-code", body);
      if (response.data.code === 200) {
        setFormToShow(2);
        // notificationApi.success({
        //   message: response?.data?.message,
        //   showProgress: true,
        //   pauseOnHover: true,
        //   style: {
        //     fontFamily: "var(--fontFamily)",
        //   },
        // });
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
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (values) => {
    await fetchCSRF();
    const body = {
      phone: phoneNum.phone,
      intro: phoneNum.intro,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    try {
      const response = await axiosInstance.post("/auth/forget-password", body);
      if (response.data.code === 200) {
        showNotification(response.data.message);
        // setFormToShow(2);
        // localStorage.setItem("token", response?.data?.data?.token);
        // setUser(response?.data?.data);
        router.push(`/${locale}/Account/SignIn`);
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
      // if (error.response?.data?.code == 410) {
      //   setPhoneNum({
      //     phone: values.phone,
      //     intro: +countries.find((country) => country.id === selectedCountry)
      //       ?.phone_code,
      //   });
      //   setShowVerificationCode(true);
      // }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[466] w-full max-[900px]:w-[90%]">
      <div className="flex flex-col gap-4">
        <Form form={form}>
          <div
            className={`flex flex-col gap-3 ${
              formToShow == 1 ? "items-center" : ""
            }`}
          >
            {formToShow == 0 ? (
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
            ) : formToShow == 1 ? (
              <AntdFormItem name="otpInput" otpInput required />
            ) : (
              <>
                <AntdFormItem
                  name="password"
                  placeholder={t("password")}
                  passwordInput
                  required
                  rules={[
                    {
                      required: true,
                      message: t("pleaseEnterPassword"),
                    },
                    { validator: passwordValidator },
                  ]}
                />
                <AntdFormItem
                  name="password_confirmation"
                  placeholder={t("confirmPassword")}
                  passwordInput
                  classNameProp="borderColorWhenFoucs"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: t("pleaseConfirmPassword"),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(t("newPasswordDoNotMatch"))
                        );
                      },
                    }),
                  ]}
                />
              </>
            )}
          </div>
        </Form>
      </div>
      <div>
        <Button
          className="w-full"
          // onClick={() => {
          //   setFormToShow(formToShow >= 3 ? 0 : formToShow + 1);
          // }}
          disabled={loading || countryFetchLoading}
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                setLoading(true);
                formToShow == 0
                  ? handleVerify(values)
                  : formToShow == 1
                  ? checkCode(values)
                  : handleReset(values);
              })
              .catch((error) => {
                console.log("Validation failed:", error);
              });
          }}
        >
          {t("verify")}
          {loading && <LoadingSpinner />}
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
