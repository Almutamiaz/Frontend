"use client";

import React from "react";
import AntdFormItem from "@/components/AntdFormItem";
import { Button, Form } from "antd";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [form] = Form.useForm();
  const t = useTranslations();
  const { locale } = useParams();
  return (
    <div className="flex flex-col gap-6 max-w-[466] w-full max-[900px]:w-[90%]">
      <div className="flex flex-col gap-4">
        <Form form={form}>
          <div className="flex flex-col gap-3">
            <AntdFormItem name="email" placeholder={t("enterYourEmail")} />
            <AntdFormItem
              name="password"
              placeholder={t("enterYourPassword")}
              passwordInput
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
        <Button className="w-full">{t("login")}</Button>
      </div>
    </div>
  );
};

export default LoginForm;
