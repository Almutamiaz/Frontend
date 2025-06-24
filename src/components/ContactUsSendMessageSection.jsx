"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Upload } from "antd";
import { useAppNotification } from "@/Context/NotificationProvider";
import { notification } from "antd";
import axiosInstance from "../../utils/axios";
import CloudIcon from "@/assets/icons/CloudIcon";

const ContactUsSendMessageSection = () => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const notificationApi = useAppNotification();
  const [fileList, setFileList] = useState([]);

  const openNotification = (type, message) => {
    if (notification) {
      notification[type]({
        message,
        placement: "topRight",
      });
    } else {
      alert(message);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.subject);
      formData.append("email", values.email);
      formData.append("details", values.message);
      formData.append("by_user", "patient");

      values.attachments?.[0]?.originFileObj &&
        formData.append("attachment_file", values.attachments[0].originFileObj);

      await axiosInstance.post("/contact-us", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      notificationApi.success({
        message: t("messageSentSuccessfully"),
        showProgress: true,
        pauseOnHover: true,
        style: { fontFamily: "var(--fontFamily)" },
      });
      form.resetFields();
      setFileList([]);
    } catch (error) {
      notificationApi.error({
        message: error.response?.data?.message,
        showProgress: true,
        pauseOnHover: true,
        style: { fontFamily: "var(--fontFamily)" },
      });
    } finally {
      setLoading(false);
    }
  };

  // Callback when form submission fails
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList,
    accept: ".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
    beforeUpload: (file) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];
      if (!allowedTypes.includes(file.type)) {
        notificationApi.error({
          message: t("onlyImagesAndDocsAllowed"),
          showProgress: true,
          pauseOnHover: true,
          style: { fontFamily: "var(--fontFamily)" },
        });
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => setFileList(newFileList.slice(-1)),
  };

  return (
    <div className="flex flex-col gap-6">
      {/* <div className="flex flex-col gap-3"></div> */}
      <Form form={form}>
        <Row gutter={[12, 14]}>
          <Col xs={24} sm={12}>
            {/* Full Name */}
            <Form.Item
              name="subject"
              rules={[{ required: true, message: t("pleaseEnterYourSubject") }]}
            >
              <Input
                placeholder={t("subject")}
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

          <Col xs={24}>
            <div className="flex flex-col gap-4 items-center bg-[var(--neutral-100)] p-4 rounded-lg">
              <CloudIcon />
              <span>{t("uploadAdditionalFiles")}</span>
              <Form.Item
                name="attachments"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  const fl = Array.isArray(e) ? e : e && e.fileList;
                  return fl ? fl.slice(-1) : [];
                }}
              >
                <Upload {...uploadProps}>
                  <Button className="w-[300px] bg-[var(--neutral-100)] text-[var(--primary-color)] hover:!text-[var(--neutral-100)] hover:!bg-[var(--primary-color)]">
                    {t("upload")}
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
      <Button
        className="font-normal text-base leading-[40px] tracking-[0px]"
        loading={loading}
        disabled={loading}
        onClick={() => {
          form
            .validateFields()
            .then((values) => onFinish(values))
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
