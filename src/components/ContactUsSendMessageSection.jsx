"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

const ContactUsSendMessageSection = () => {
  const t = useTranslations();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // Callback when form submission fails
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex flex-col gap-6">
      {/* <div className="flex flex-col gap-3"></div> */}
      <Form form={form}>
        <Row gutter={[12, 14]}>
          <Col xs={24} sm={12}>
            {/* Full Name */}
            <Form.Item
              name="fullName"
              rules={[
                { required: true, message: t("pleaseEnterYourFullName") },
              ]}
            >
              <Input
                placeholder={t("fullName")}
                style={{
                  backgroundColor: "var(--neutral-100)",
                  border: "0px",
                  borderRadius: "16px",
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            {/* Email */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: t("pleaseEnterEmailAddress") },
                {
                  type: "email",
                  message: t("pleaseEnterValidEmail"),
                },
              ]}
            >
              <Input
                placeholder={t("email")}
                style={{
                  backgroundColor: "var(--neutral-100)",
                  border: "0px",
                  borderRadius: "16px",
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            {/* Message */}
            <Form.Item
              name="message"
              rules={[{ required: true, message: t("pleaseEnterYourMessage") }]}
            >
              <Input.TextArea
                rows={4}
                placeholder={t("message1")}
                style={{
                  backgroundColor: "var(--neutral-100)",
                  border: "0px",
                  borderRadius: "16px",
                  minHeight: "337px",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Button
        className="font-normal text-base leading-[40px] tracking-[0px]"
        onClick={() => {
          form
            .validateFields()
            .then((values) => {})
            .catch((error) => {
              console.log("Validation failed:", error);
            });
        }}
      >
        {t("sendMessage")}
      </Button>
    </div>
  );
};

export default ContactUsSendMessageSection;
