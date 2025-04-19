"use client";
import { useEffect, useState } from "react";
import { Col, Pagination, Row, Spin, Rate } from "antd";
import axiosInstance from "../../utils/axios";

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
        `/hospital/rate?page=${page}&hospitalId=${2}`
      );
      console.log(response.data.data);
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
  }, [currentPage, hospitalId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-3 py-6">
      <span className="font-bold text-base leading-6 tracking-[0px] text-[var(--color1)]">
        Reviews
      </span>
      <Spin spinning={loading} size="large">
        <div className="flex gap-4 pt-4 flex-wrap">
          <Row gutter={[16, 16]} className="w-full">
            {reviews?.map((review) => (
              <Col key={review.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
                <div className="flex flex-col w-full p-4 rounded-xl gap-3 bg-[#F4F4F4]">
                  <div className="flex items-center gap-2">
                    <Rate disabled defaultValue={review.order_average_rate} />
                    <span className="text-sm text-gray-500">
                      {review.order_average_rate}
                    </span>
                  </div>
                  <p className="text-base text-[var(--darkColor)]">
                    {review.comment}
                  </p>
                  <span className="text-sm text-gray-500">
                    {review.created_at}
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

export default HospitalReviews;
