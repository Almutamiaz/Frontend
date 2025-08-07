"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { Pagination, Spin } from "antd";
import axiosInstance from "../../../../../utils/axios";
import Image from "next/image";

const Page = () => {
  const t = useTranslations();
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchNotifications = async () => {
      setNotificationsLoading(true);
      setNotificationsError(null);
      try {
        const response = await axiosInstance.get(
          `/notifications?page=${currentPage}`
        );
        setNotifications(response.data.data.data);
        setTotal(response.data.data.total);
        setLastPage(response.data.data.last_page);
        setPageSize(response.data.data.per_page);
      } catch (error) {
        setNotificationsError(error.response?.data || error.message);
      } finally {
        setNotificationsLoading(false);
      }
    };
    fetchNotifications();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (notificationsError) {
    return (
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">{t("notifications")}</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">
            {t("errorLoadingNotifications")}
          </div>
          <div className="text-red-600 text-sm mt-1">
            {JSON.stringify(notificationsError)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-3">
      <h1 className="text-2xl font-bold text-gray-800">{t("notifications")}</h1>

      <Spin spinning={notificationsLoading} size="large">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              {t("allNotifications")}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {t("yourRecentNotifications")}
            </p>
          </div>

          <div className="p-6">
            {notifications && notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id || index}
                    className={`flex items-start justify-between p-4 rounded-lg border ${
                      notification.is_read
                        ? "bg-gray-50 border-gray-200"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-start space-x-3 flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${
                          notification.is_read ? "bg-gray-100" : "bg-blue-100"
                        }`}
                      >
                        {notification.image ? (
                          <Image
                            src={notification.image}
                            alt="Notification"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <svg
                          className={`w-5 h-5 ${
                            notification.is_read
                              ? "text-gray-600"
                              : "text-blue-600"
                          }`}
                          style={{
                            display: notification.image ? "none" : "block",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 016 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 01.19-1.81z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-medium ${
                            notification.is_read
                              ? "text-gray-800"
                              : "text-blue-800"
                          }`}
                        >
                          {notification.title || t("notification")}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {notification.body || t("noMessage")}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {notification.date ||
                            formatDate(notification.created_at)}
                        </div>
                      </div>
                    </div>
                    {!notification.is_read && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full ml-2"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 016 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 01.19-1.81z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  {t("noNotifications")}
                </h4>
                <p className="text-gray-500">{t("noNotificationsMessage")}</p>
              </div>
            )}
          </div>
        </div>
      </Spin>

      {lastPage > 1 && (
        <Pagination
          current={currentPage}
          total={total}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          disabled={notificationsLoading}
          responsive
        />
      )}
    </div>
  );
};

export default Page;
