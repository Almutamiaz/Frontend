"use client";
import Logo from "@/components/Logo";
import { useTranslations } from "next-intl";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Form } from "antd";
import AntdFormItem from "@/components/AntdFormItem";
import axiosInstance from "../../../../../utils/axios";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAppNotification } from "@/Context/NotificationProvider";

const SignUpVerificationCode = ({ phoneNum }) => {
  const [form] = Form.useForm();
  const t = useTranslations();
  const [verifiedSuccessfully, setVerifiedSuccessfully] = useState(null);
  const [loading, setLoading] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const notificationApi = useAppNotification();
  const router = useRouter();
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
        notificationApi.success({
          message: response?.data?.message,
          showProgress: true,
          pauseOnHover: true,
          style: {
            fontFamily: "var(--fontFamily)",
          },
        });
        setUser(response?.data?.data);
        router.push(`/${locale}`);
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
      error.response?.data?.code == 400 && setVerifiedSuccessfully(false);
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setResendLoading(true);
    // await fetchCSRF();
    const body = {
      phone: phoneNum.phone,
      intro: phoneNum.intro,
    };

    try {
      const response = await axiosInstance.post("/auth/resend-code", body);
      notificationApi.success({
        message: response?.data?.message,
        showProgress: true,
        pauseOnHover: true,
        style: {
          fontFamily: "var(--fontFamily)",
        },
      });
    } catch (error) {
      notificationApi.error({
        message: error.response?.data?.message,
        showProgress: true,
        pauseOnHover: true,
        style: {
          fontFamily: "var(--fontFamily)",
        },
      });
      error.response?.data?.code == 400 && setVerifiedSuccessfully(false);
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center gap-6 bg-[var(--neutral-100)] z-[1]">
      <div className="flex justify-center items-center	gap-10 flex-col">
        <div className="flex max-w-[466px] w-full justify-center">
          <Logo />
        </div>
        <div className="flex flex-col gap-6 max-w-[466px] w-full">
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4 items-center">
              <h6 className="color1 text-2xl font-bold leading-6">
                {t("verifyYourIdentity")}
              </h6>
              <p className="DescriptionColor text-base font-medium leading-5 max-[900px]:text-center max-[900px]:px-2">
                {t("codeSentToPhone")}
              </p>
            </div>
            {/* <ForgotPasswordForm
              setFormToShow={setFormToShow}
              formToShow={formToShow}
            /> */}

            {/* ////////////////////////////////// */}
            <div className="flex flex-col gap-6 max-w-[466] w-full max-[900px]:w-[90%]">
              <div className="flex flex-col gap-4">
                <Form form={form}>
                  <div className={`flex flex-col gap-3 items-center`}>
                    <AntdFormItem
                      name="otpInput"
                      otpInput
                      required
                      requiredMessage={t("pleaseEnterOtpCode")}
                      classNameProp={
                        typeof verifiedSuccessfully === "boolean"
                          ? verifiedSuccessfully
                            ? "verifiedSuccessfully"
                            : "verifiedFailed"
                          : ""
                      }
                      onOtpInput={(value) => {
                        typeof verifiedSuccessfully === "boolean" &&
                          setVerifiedSuccessfully(null);
                        form.getFieldValue("otpInput") &&
                          value.length < 4 &&
                          form.setFieldsValue({ otpInput: undefined });
                      }}
                    />
                  </div>
                </Form>
              </div>
              <div>
                <Button
                  className="w-full"
                  disabled={loading}
                  onClick={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        setLoading(true);
                        checkCode(values);
                        // setVerifiedSuccessfully(true);
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
            {/* ////////////////////////////////// */}
          </div>
        </div>
      </div>
      <div className={`flex justify-center`}>
        <p className="text-[16px] font-medium leading-[22.4px] tracking-[0.01em] text-[#1E232C] text-center max-[900px]:px-2 flex gap-2">
          {t("didntGetCode")}
          <span
            className="font-bold pr cursor-pointer"
            onClick={() => {
              !resendLoading && resendCode();
            }}
          >
            {t("resend")}
          </span>
          {resendLoading && <LoadingSpinner />}
        </p>
      </div>
    </div>
  );
};

export default SignUpVerificationCode;
