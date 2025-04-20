"use client";
import { useEffect, useState } from "react";
import { Col, Pagination, Row, Spin, Rate } from "antd";
import axiosInstance from "../../utils/axios";
import StarIcon2 from "@/assets/icons/StarIcon2";

const HospitalReviews = ({ hospitalId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/hospital/rate?hospital_id=${hospitalId}&page=${page}`
      );
      // console.log(response.data.data);
      setReviews(response.data.data.data);
      setTotalItems(response.data.data.total);
      setItemsPerPage(response.data.data.per_page);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-3">
      <Spin spinning={loading} size="large">
        <Row gutter={[16, 16]} className="mt-1">
          {reviews?.map((review, i) => (
            <Col key={review.id} xs={24} sm={12} md={8} xl={6}>
              <div className="p-5 flex flex-col gap-3 bg-[#F4F4F4] rounded-[12px] mt-1">
                <div className="flex gap-[6px]">
                  {[...Array(Math.round(review.order_average_rate))].map(
                    (_, i) => (
                      <StarIcon2 key={i} color="var(--secondary-200)" />
                    )
                  )}
                </div>
                <span className="font-[Almarai] text-[var(--neutral-900)] font-bold text-sm leading-6 tracking-[0px]">
                  {review.comment}
                </span>
                <span className="text-[var(--primary-800)] font-normal text-xs leading-6 tracking-[0px]">
                  {review.created_at}
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </Spin>

      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false}
        disabled={loading}
      />
    </div>
  );
};

export default HospitalReviews;
