"use client";

import React, { useEffect, useState } from "react";
import AntdFormItem from "@/components/AntdFormItem";
import {
  Button,
  Card,
  Form,
  InputNumber,
  Radio,
  Select,
  Typography,
  Upload,
  message,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SelectBox from "@/components/SelectBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useUser } from "@/Context/UserContext";
import { useAppNotification } from "@/Context/NotificationProvider";
import dayjs from "dayjs";
import axios from "axios";
import axiosInstance from "../../../../../utils/axios";
const { Option } = Select;
const { Title } = Typography;

const Page = () => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [countryFetchLoading, setCountryFetchLoading] = useState(true);
  const [insuranceCompanies, setInsuranceCompanies] = useState([]);
  const [insuranceCompanyFetchLoading, setInsuranceCompanyFetchLoading] =
    useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [gender, setGender] = useState(null);
  const { user, setUser } = useUser();
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const notificationApi = useAppNotification();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      notificationApi.error({
        message: "You can only upload JPG/PNG files!",
        showProgress: true,
        pauseOnHover: true,
        style: { fontFamily: "var(--fontFamily)" },
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notificationApi.error({
        message: "Image must be smaller than 2MB!",
        showProgress: true,
        pauseOnHover: true,
        style: { fontFamily: "var(--fontFamily)" },
      });
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const base64 = await getBase64(info.file.originFileObj);
      setImageUrl(base64);
      setUploadLoading(false);
    }
  };

  const normalizeFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Function to convert date string to dayjs object
  const convertDateStringToDayjs = (dateString) => {
    if (!dateString) return null;

    // Parse date in format "17 Mar 2025"
    const date = dayjs(dateString, "DD MMM YYYY");

    // Check if the date is valid
    if (date.isValid()) {
      return date;
    }

    // If parsing fails, return null
    console.warn(
      `Could not parse date "${dateString}" with format "DD MMM YYYY"`
    );
    return null;
  };

  // Function to convert dayjs object back to the expected format
  const convertDayjsToDateString = (dayjsObj) => {
    if (!dayjsObj || !dayjsObj.isValid()) return null;

    // Convert to "17 Mar 2025" format
    return dayjsObj.format("DD MMM YYYY");
  };

  const fetchCSRF = async () => {
    try {
      await axios.get("/backend/sanctum/csrf-cookie", {
        withCredentials: true,
        headers: { Accept: "application/json" },
      });
    } catch (error) {
      console.error("CSRF error:", error?.response?.data || error?.message);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (values) => {
    setSubmitting(true);
    try {
      await fetchCSRF();
      // Convert dayjs object back to date string for API
      const formData = new FormData();

      const appendIfExists = (key, value) =>
        value && formData.append(key, value);

      appendIfExists("first_name", values.first_name);
      appendIfExists("last_name", values.last_name);
      appendIfExists("email", values.email);
      appendIfExists("gender", gender);
      appendIfExists("birth_date", convertDayjsToDateString(values.birth_date));
      appendIfExists("country_id", values.nationality || user?.country?.id);
      appendIfExists("passport_id", values.idOrResidenceNumber);
      appendIfExists("medical_history", values.medicalRecord);
      appendIfExists("insurance_comp_id", values.insuranceCompany);
      appendIfExists("intro", user?.intro);
      appendIfExists("photo", values.avatar[0]?.originFileObj);

      // Override headers for FormData to ensure proper file upload
      const response = await axiosInstance.post("/update-profile", formData);

      if (response?.data?.code === 200) {
        notificationApi.success({
          message: t("profileUpdatedSuccessfully"),
          showProgress: true,
          pauseOnHover: true,
          style: { fontFamily: "var(--fontFamily)" },
        });
        // If API returns updated user data, sync it to context
        if (response?.data?.data) {
          setUser(response.data.data);
        } else {
          // fallback: optimistically merge
          setUser({
            ...user,
            ...formData,
            country: user?.country
              ? { ...user.country, id: formData.country_id }
              : user?.country,
            passport_id: formData.passport_id,
            medical_history: formData.medical_history,
          });
        }
      } else {
        notificationApi.error({
          message: response?.data?.message || t("errorUpdatingProfile"),
          showProgress: true,
          pauseOnHover: true,
          style: { fontFamily: "var(--fontFamily)" },
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error?.response?.data || error);
      notificationApi.error({
        message: error?.response?.data?.message || t("errorUpdatingProfile"),
        showProgress: true,
        pauseOnHover: true,
        style: { fontFamily: "var(--fontFamily)" },
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: user.photo,
        },
      ]);
      form.setFieldsValue({
        avatar: [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: user.photo,
          },
        ],
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        idOrResidenceNumber: user.passport_id,
        birth_date: convertDateStringToDayjs(user.birth_date),
        nationality: user.country.id,
        medicalRecord: user.medical_history,
        insuranceCompany: user.insurance_comp?.id,
      });
      setGender(user.gender);
    }
  }, [user, form]);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleModalSliderImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // setSliderImage(newFileList[0]?.originFileObj);
  };

  const fetchInsuranceCompanies = async () => {
    try {
      const response = await axiosInstance.get("/insurance-company");
      setInsuranceCompanies(response.data.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setInsuranceCompanyFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchInsuranceCompanies();
  }, []);

  return (
    <div>
      <Card
        title={
          <Title level={4} style={{ margin: 0 }}>
            {t("accountData")}
          </Title>
        }
        className="rounded-2xl shadow-sm"
      >
        <Form form={form}>
          <div className="flex flex-col gap-3">
            <Form.Item
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={normalizeFile}
              className="flex justify-center mb-3 overflow-hidden"
            >
              {/* <div className="flex justify-center mb-3 overflow-hidden"> */}
              <Upload
                name="avatar"
                action=""
                listType="picture-circle"
                className="avatar-uploader"
                beforeUpload={beforeUpload}
                onChange={handleModalSliderImageChange}
                maxCount={1}
                multiple={false}
                customRequest={dummyRequest}
                fileList={fileList}
                onPreview={handlePreview}
                onRemove={() => {
                  setFileList([]);
                }}
                accept="image/png, image/jpeg , image/svg , image/jpg , image/gif"
              >
                {fileList.length == 0 && (
                  <div className="flex flex-col items-center justify-center">
                    <PlusOutlined />
                    <span className="text-sm text-gray-500">{t("upload")}</span>
                  </div>
                )}
              </Upload>
              {/* </div> */}
            </Form.Item>
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
            <div className="flex gap-3">
              <AntdFormItem
                name="idOrResidenceNumber"
                placeholder={t("idOrResidenceNumber")}
                classNameProp="numberInputStyle borderColorWhenFoucs flex-1"
                required
                requiredMessage={t("pleaseEnterIdOrResidenceNumber")}
                // NumberInput
                // rules={[
                //   { required: true, message: t("pleaseEnterPassportId") },
                //   {
                //     pattern: /^[A-Z0-9]{6,9}$/,
                //     message: t("passportIdValidation"),
                //   },
                // ]}
              />

              <AntdFormItem
                name="birth_date"
                placeholder={t("dateOfBirth")}
                datePickerInput
                classNameProp="flex-1 borderColorWhenFoucs"
                required
                requiredMessage={t("pleaseEnterDateOfBirth")}
              />
            </div>

            <div className="flex gap-3">
              <AntdFormItem
                name="email"
                placeholder={t("email")}
                classNameProp="flex-1"
                rules={[
                  { required: true, message: t("pleaseEnterEmailAddress") },
                  {
                    type: "email",
                    message: t("pleaseEnterEmailAddress"),
                  },
                ]}
              />
              <Form.Item
                name="nationality"
                className="flex-1"
                required
                requiredMessage={t("selectYourNationality")}
              >
                <SelectBox
                  // width={"273px"}
                  placeholder={t("nationality")}
                  options={[
                    {
                      value: user.country.id,
                      label: user.country.title,
                      flag: "https://api-dev.hakeem.com.sa/storage/flags/67d3736ecc904.png",
                    },
                  ]}
                  classNameProp="selectBoxStyle selectBoxStyle2"
                  showImageInDropdown
                  disabled
                  // value={user.country.id}

                  // value={+searchParams?.hospital || undefined}
                  // onChange={(e) => {
                  //   const url = new URL(window.location.href);
                  //   url.searchParams.set("hospital", e);
                  //   window.history.pushState({}, "", url.toString());

                  //   setSearchLoading(true);
                  //   const currentParams = new URLSearchParams(
                  //     window.location.search
                  //   );
                  //   currentParams.set("hospital", e);
                  //   router.push(
                  //     `/${locale}/Doctors?${currentParams.toString()}`
                  //   );
                  // }}
                />
              </Form.Item>
            </div>

            <div className="flex gap-3">
              <AntdFormItem
                name="medicalRecord"
                placeholder={t("medicalRecordOptional")}
                classNameProp="flex-1"
              />

              <Form.Item
                name="insuranceCompany"
                className="flex-1 overflow-hidden"
              >
                <SelectBox
                  // width={"273px"}
                  placeholder={t("insuranceCompanyOptional")}
                  // options={insuranceCompanies}
                  options={insuranceCompanies?.map((insuranceCompany) => ({
                    value: insuranceCompany.id,
                    label: insuranceCompany.title,
                    flag: insuranceCompany.photo,
                  }))}
                  showImageInDropdown
                  classNameProp="selectBoxStyle selectBoxStyle2"
                  // value={+searchParams?.hospital || undefined}
                  // onChange={(e) => {
                  //   const url = new URL(window.location.href);
                  //   url.searchParams.set("hospital", e);
                  //   window.history.pushState({}, "", url.toString());

                  //   setSearchLoading(true);
                  //   const currentParams = new URLSearchParams(
                  //     window.location.search
                  //   );
                  //   currentParams.set("hospital", e);
                  //   router.push(
                  //     `/${locale}/Doctors?${currentParams.toString()}`
                  //   );
                  // }}
                />
              </Form.Item>
            </div>

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
                    onClick={() => {
                      setGender("male");
                      form.setFieldsValue({ gender: "male" });
                    }}
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
                    onClick={() => {
                      setGender("female");
                      form.setFieldsValue({ gender: "female" });
                    }}
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
            <br />
            <Button
              className="w-full max-w-[600px] mx-auto"
              disabled={submitting}
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    // console.log(values);
                    handleFormSubmit(values);
                  })
                  .catch((error) => {
                    console.log("Validation failed:", error);
                  });
              }}
            >
              {t("update")}
              {submitting && <LoadingSpinner />}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Page;
