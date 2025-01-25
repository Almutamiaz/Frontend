"use client";

import React from "react";
import AntdFormItem from "@/components/AntdFormItem";
import { Button, Form } from "antd";
import { useTranslations } from "next-intl";

const ForgotPasswordForm = ({ setFormToShow, formToShow }) => {
  const [form] = Form.useForm();
  const t = useTranslations();
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
              <div className="flex gap-2">
                <div className="w-[69px] h-[56px] rounded-[100px] flex justify-center items-center border border-[#E8ECF4] bg-[#F3F3F3]"></div>
                <AntdFormItem
                  name="phoneNumber"
                  placeholder={t("phoneNumber")}
                  classNameProp="flex-1"
                />
              </div>
            ) : formToShow == 1 ? (
              <AntdFormItem name="otpInput" otpInput />
            ) : (
              <>
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
              </>
            )}
          </div>
        </Form>
      </div>
      <div>
        <Button
          className="w-full"
          onClick={() => {
            setFormToShow(formToShow >= 3 ? 0 : formToShow + 1);
          }}
        >
          {t("verify")}
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
