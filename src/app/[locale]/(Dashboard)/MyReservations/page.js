"use client";
import DoctorCardMyReservations from "@/components/DoctorCardMyReservations";
import Tag from "@/components/Tag";
import { Col, Pagination, Row, Spin } from "antd";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "../../../../../utils/axios";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  
  // Initialize from URL params
  const [activeTab, setActiveTab] = useState(() => {
    const statusParam = searchParams.get('status');
    if (!statusParam) return "";
    // Convert string numbers to numbers for status IDs
    const numStatus = parseInt(statusParam);
    return isNaN(numStatus) ? statusParam : numStatus;
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page')) || 1
  );
  const [reservations, setReservations] = useState([]);
  const [reservationsFetchLoading, setReservationsFetchLoading] =
    useState(true);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [lastPage, setLastPage] = useState(1);

  // Status mapping array
  const statusTabs = [
    { id: "", key: "all", translationKey: "all" },
    { id: 1, key: "awaitingAccept", translationKey: "awaitingAccept" },
    { id: 2, key: "awaitingPayment", translationKey: "awaitingPayment" },
    {
      id: 3,
      key: "awaitingImplementation",
      translationKey: "awaitingImplementation",
    },
    { id: 4, key: "inProgress", translationKey: "inProgress" },
    { id: 5, key: "completed", translationKey: "completed" },
    { id: 6, key: "rejected", translationKey: "rejected" },
    { id: 7, key: "cancel", translationKey: "canceled" },
  ];

  // Function to update URL search params
  const updateURLParams = useCallback((page, status) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (status !== '') params.set('status', status.toString());
    
    const newURL = params.toString() ? `?${params.toString()}` : '';
    router.replace(newURL, { scroll: false });
  }, [router]);

  const fetchReservations = useCallback(async () => {
    setReservationsFetchLoading(true);
    try {
      const statusParam = activeTab === "" ? "" : activeTab;
      const response = await axiosInstance.get(
        `/my-reservations?page=${currentPage}&status=${statusParam}`
      );
      setReservations(response.data.data.data);
      setTotal(response.data.data.total);
      setLastPage(response.data.data.last_page);
      setPageSize(response.data.data.per_page);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setReservationsFetchLoading(false);
    }
  }, [activeTab, currentPage]);

  useEffect(() => {
    fetchReservations();
    updateURLParams(currentPage, activeTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, activeTab, fetchReservations, updateURLParams]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-5 pb-3">
      {/* tags section */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-2 px-1">
        {statusTabs.map((tab) => (
          <Tag
            active={activeTab === tab.id}
            key={tab.id}
            text={t(tab.translationKey)}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentPage(1); // Reset to first page when status changes
            }}
            classNameProp={
              activeTab === tab.id ? "shadow-[0_2px_6px_0_#7367F04D]" : ""
            }
            withoutBorder
            bgColorProp="#F4F4F4"
            textColorProp="#2F2B3DE5"
            activBgColorProp="#7E53FD33"
            activeTextColorProp="var(--primary-color)"
          />
        ))}
      </div>
      {/* <div className="flex gap-6 flex-wrap"> */}
      <Spin spinning={reservationsFetchLoading} size="large">
        <Row gutter={[12, 12]} className="w-full">
          {reservations.map((reservation, index) => (
            <Col
              key={index}
              // xs={24} sm={24} md={24}
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={12}
              xxl={8}
            >
              <DoctorCardMyReservations reservation={reservation} />
            </Col>
          ))}
        </Row>
      </Spin>
      {lastPage > 1 && (
        <Pagination
          current={currentPage}
          total={total}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          disabled={reservationsFetchLoading}
          responsive
        />
      )}
    </div>
  );
};

export default Page;
