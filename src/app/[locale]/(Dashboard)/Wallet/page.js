"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../utils/axios";

const Page = () => {
  const t = useTranslations();
  const [walletDetails, setWalletDetails] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState(null);

  useEffect(() => {
    const fetchWalletDetails = async () => {
      setWalletLoading(true);
      setWalletError(null);
      try {
        const response = await axiosInstance.get("/wallet/details");
        setWalletDetails(response.data.data);
      } catch (error) {
        setWalletError(error.response?.data || error.message);
      } finally {
        setWalletLoading(false);
      }
    };
    fetchWalletDetails();
  }, []);

  const formatCurrency = (amount, currency) => {
    // Map Arabic currency symbols to ISO currency codes
    let isoCurrency = currency;
    if (currency === "ر.س" || currency === "SAR") {
      isoCurrency = "SAR";
    }
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: isoCurrency || "SAR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (walletLoading) {
    return (
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">{t("wallet")}</h1>
        <div className="flex items-center justify-center p-8 gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">{t("loadingWalletDetails")}</span>
        </div>
      </div>
    );
  }

  if (walletError) {
    return (
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">{t("wallet")}</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">
            {t("errorLoadingWalletDetails")}
          </div>
          <div className="text-red-600 text-sm mt-1">
            {JSON.stringify(walletError)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">{t("wallet")}</h1>

      {walletDetails && (
        <>
          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
                              <div>
                  <h2 className="text-lg font-medium opacity-90">
                    {t("walletBalance")}
                  </h2>
                  <div className="text-3xl font-bold mt-2">
                    {formatCurrency(
                      walletDetails.total_price,
                      walletDetails.currency
                    )}
                  </div>
                  <p className="text-sm opacity-80 mt-1">
                    {t("availableForTransactions")}
                  </p>
                </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Transaction History
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Your recent wallet transactions
              </p>
            </div>

            <div className="p-6">
              {walletDetails.transactions &&
              walletDetails.transactions.length > 0 ? (
                <div className="space-y-4">
                  {walletDetails.transactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {transaction.type || "Transaction"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.date || "Recent"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold ${
                            transaction.amount > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {formatCurrency(
                            transaction.amount,
                            walletDetails.currency
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {transaction.status || "Completed"}
                        </div>
                      </div>
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    No transactions yet
                  </h4>
                  <p className="text-gray-500">
                    Your transaction history will appear here once you make your
                    first transaction.
                  </p>
                </div>
              )}
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Page;
