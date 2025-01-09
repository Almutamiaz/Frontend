"use client";

import React from "react";
import AntdFormItem from "@/components/AntdFormItem";
import { Button, Form } from "antd";
import { useTranslations } from "next-intl";

const SignUpForm = () => {
  const [form] = Form.useForm();
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-6 max-w-[466] w-full max-[900px]:w-[90%]">
      <div className="flex flex-col gap-4">
        <Form form={form}>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <AntdFormItem
                name="firstName"
                placeholder={t("firstName")}
                classNameProp="flex-1"
              />
              <AntdFormItem
                name="lastName"
                placeholder={t("lastName")}
                classNameProp="flex-1"
              />
            </div>
            <AntdFormItem name="email" placeholder={t("email")} />
            <div className="flex gap-2">
              <div className="w-[69px] h-[56px] rounded-[100px] flex justify-center items-center border border-[#E8ECF4] bg-[#F3F3F3]"></div>
              <AntdFormItem
                name="phoneNumber"
                placeholder={t("phoneNumber")}
                classNameProp="flex-1"
              />
            </div>
            <AntdFormItem
              name="password"
              placeholder={t("password")}
              passwordInput
            />
            <AntdFormItem
              name="confirmPassword"
              placeholder={t("confirmPassword")}
              passwordInput
            />
          </div>
        </Form>
      </div>
      <div>
        <Button className="w-full">{t("createAccount")}</Button>
      </div>
    </div>
  );
};

export default SignUpForm;
