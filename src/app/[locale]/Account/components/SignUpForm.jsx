"use client";

import React, { useEffect, useState } from "react";
import AntdFormItem from "@/components/AntdFormItem";
import { Button, Form, InputNumber, Radio, Select } from "antd";
import { useTranslations } from "next-intl";
import PhoneInput from "./PhoneInputComponent";
import LoadingSpinner from "@/components/LoadingSpinner";
import axiosInstance from "../../../../../utils/axios";
import dayjs from "dayjs";
import SelectBox from "@/components/SelectBox";
import Image from "next/image";
import axios from "axios";
const { Option } = Select;

const SignUpForm = () => {
  const [form] = Form.useForm();
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(null);
  const [countryFetchLoading, setCountryFetchLoading] = useState(true);
  const [phoneNumCountry, setPhoneNumCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [csrfToken, setCsrfToken] = useState(null);
  const t = useTranslations();
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

  const fetchCSRF = async () => {
    try {
      // const response = await axiosInstance.get("/generate-csrf-token");
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
  const handleRegister = async (values) => {
    fetchCSRF();
    const body = {
      ...values,
      confirm_condition: 1,
      birth_date: values?.birth_date?.format("DD MMM YYYY"),
      intro: +countries.find((country) => country.id === selectedCountry)
        ?.phone_code,
      country_id: selectedCountry,
      gender: gender,
    };

    try {
      const response = await axiosInstance.post("/auth/register", body);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
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

  return (
    <div className="flex flex-col gap-6 max-w-[466] w-full max-[900px]:w-[90%]">
      <div className="flex flex-col gap-4">
        <Form form={form} initialValues={{ tted: "" }}>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <AntdFormItem
                name="first_name"
                placeholder={t("firstName")}
                classNameProp="flex-1"
                required
                requiredMessage={t("pleaseEnterFirstName")}
              />
              <AntdFormItem
                name="last_name"
                placeholder={t("lastName")}
                classNameProp="flex-1"
                required
                requiredMessage={t("pleaseEnterLastName")}
              />
            </div>
            <AntdFormItem
              name="email"
              placeholder={t("email")}
              rules={[
                { required: true, message: t("pleaseEnterEmailAddress") },
                {
                  type: "email",
                  message: t("pleaseEnterEmailAddress"),
                },
              ]}
            />
            {!countryFetchLoading && (
              <AntdFormItem
                name="phone"
                placeholder={t("enterYourPhoneNumber")}
                NumberInput
                classNameProp="numberInputStyle borderColorWhenFoucs phoneNumberWithCountryFlag"
                NumberInputPrefix={
                  <div className="flex gap-3 items-center w-[90px]">
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
            )}

            <AntdFormItem
              name="passport_id"
              placeholder={t("passportId")}
              classNameProp="numberInputStyle borderColorWhenFoucs"
              rules={[
                { required: true, message: t("pleaseEnterPassportId") },
                {
                  pattern: /^[A-Z0-9]{6,9}$/,
                  message: t("passportIdValidation"),
                },
              ]}
            />

            <AntdFormItem
              name="birth_date"
              placeholder={t("dateOfBirth")}
              datePickerInput
              classNameProp="flex-1 borderColorWhenFoucs"
              required
              requiredMessage={t("pleaseEnterDateOfBirth")}
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
            <Form.Item
              name="gender"
              rules={[{ required: true, message: t("pleaseSelectGender") }]}
            >
              <div className="flex gap-4 parentOfGenderInputSignUp">
                <div
                  className="ps-6 gap-3 py-4 rounded-[100px] flex-1"
                  style={{
                    border: `1px solid ${
                      gender == "male" ? "#BFA9FE" : "#E8ECF4"
                    }`,
                    backgroundColor: gender == "male" ? "#BFA9FE33" : "#F3F3F3",
                  }}
                >
                  <Radio
                    checked={gender == "male"}
                    onClick={() => setGender("male")}
                    className="radioInputStyle"
                  />
                  <span
                    className="font-normal text-sm leading-[125%] tracking-[0px] text-[#8391A1]"
                    style={{
                      fontFamily: "var(--fontFamily)",
                    }}
                  >
                    {t("male")}
                  </span>
                </div>
                <div
                  className="ps-6 gap-3 py-4 rounded-[100px] flex-1"
                  style={{
                    border: `1px solid ${
                      gender == "female" ? "#BFA9FE" : "#E8ECF4"
                    }`,
                    backgroundColor:
                      gender == "female" ? "#BFA9FE33" : "#F3F3F3",
                  }}
                >
                  <Radio
                    checked={gender == "female"}
                    onClick={() => setGender("female")}
                    className="radioInputStyle"
                  />
                  <span
                    className="font-normal text-sm leading-[125%] tracking-[0px] text-[#8391A1]"
                    style={{
                      fontFamily: "var(--fontFamily)",
                    }}
                  >
                    {t("female")}
                  </span>
                </div>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div>
        <Button
          className="w-full"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                setLoading(true);
                handleRegister(values);
              })
              .catch((error) => {
                console.log("Validation failed:", error);
              });
          }}
          disabled={loading || countryFetchLoading}
        >
          {t("createAccount")}
          {loading && <LoadingSpinner />}
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm;
