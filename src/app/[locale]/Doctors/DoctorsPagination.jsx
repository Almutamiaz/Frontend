'use client';

import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const DoctorsPagination = ({ total, currentPage, pageSize }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={pageSize}
      onChange={handlePageChange}
      showSizeChanger={false}
    />
  );
};

export default DoctorsPagination;