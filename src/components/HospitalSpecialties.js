"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Col, Pagination, Row, Spin } from "antd";
import axiosInstance from "../../utils/axios";
import { useTranslations } from "next-intl";

const HospitalSpecialties = ({ hospitalId }) => {
  const [specialties, setSpecialties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();

  const fetchSpecialties = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/hospital/specializations/main-service?main_service_id=13&page=${page}&search=&hospital_id=${hospitalId}`
      );
      // console.log(response.data.data.specializations.data);
      setSpecialties(response.data.data.specializations.data);
      setTotalItems(response.data.data.specializations.total);
      setItemsPerPage(response.data.data.specializations.per_page);
    } catch (error) {
      console.error("Error fetching specialties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties(currentPage);
  }, [currentPage, hospitalId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-3 py-6">
      <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
        {t("specialties")}
      </span>
      <Spin spinning={loading} size="large">
        <div className="flex gap-4 pt-4 flex-wrap">
          <Row gutter={[16, 16]} className="w-full">
            {specialties.map((specialty, i) => (
              <Col key={specialty.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
                <div className="flex flex-col w-full h-[180px] rounded-xl items-center justify-center gap-7 bg-[#F4F4F4]">
                  <div className="w-full h-[89px] overflow-hidden">
                    <Image
                      src={specialty?.photo}
                      alt="specialist Image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full"
                    />
                  </div>
                  <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--darkColor)]">
                    {specialty.title}
                  </span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Spin>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default HospitalSpecialties;
