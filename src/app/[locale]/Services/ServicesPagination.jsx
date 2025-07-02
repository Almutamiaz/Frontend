"use client";
import { Pagination } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/Context/UserContext";

const ServicesPagination = ({ paginationData, searchParams }) => {
  const { total, pageSize } = paginationData;
  const [currentPage, setCurrentPage] = useState(searchParams?.page || 1);
  const router = useRouter();
  const { setServicesChangePageLoading, servicesChangePageLoading } = useUser();
  const handlePageChange = (page) => {
    setServicesChangePageLoading(true);
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={pageSize}
      onChange={handlePageChange}
      showSizeChanger={false}
      disabled={servicesChangePageLoading}
      responsive
    />
  );
};

export default ServicesPagination;
