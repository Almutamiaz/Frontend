"use client";

import React, { useState } from "react";
import AntdFormItem from "@/components/AntdFormItem";
import { Button, Form } from "antd";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import axiosInstance from "../../../../../utils/axios";
import axios from "axios";

const LoginForm = () => {
  const [form] = Form.useForm();
  const t = useTranslations();
  const { locale } = useParams();
  const [loading, setLoading] = useState(null);

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
  const handleLogin = async (values) => {
    fetchCSRF();
    const body = {
      emailOrPhone: values.email,
      password: values.password,
    };

    try {
      const response = await axiosInstance.post("/auth/login-patient", body);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[466] w-full max-[900px]:w-[90%]">
      <div className="flex flex-col gap-4">
        <Form form={form}>
          <div className="flex flex-col gap-3">
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
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
