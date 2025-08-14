import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import "../../style/general.css";
import "../../style/componentsStyle.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ConfigProvider } from "antd";
import Header from "@/components/Header";
import BreadCrumb from "@/components/BreadCrumb";
import { UserProvider } from "@/Context/UserContext";
import NotificationProvider from "@/Context/NotificationProvider";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
export default async function LocaleLayout({ children }) {
  const locale = await getLocale();

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={`${locale}-SA`}>
      <body
        dir={locale == "en" ? "ltr" : "rtl"}
        style={{
          "--fontFamily": locale === "en" ? "'Inter'" : "'Almarai'",
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <NotificationProvider>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "var(--fontFamily)",
                },
                components: {
                  Button: {
                    defaultBg: "var(--primary-color)",
                    defaultColor: "var(--neutral-100)",
                    borderRadius: 100,
                    controlHeight: 56,
                    defaultBorderColor: "var(--primary-color)",
                    defaultHoverBg: "var(--neutral-100)",
                    defaultHoverBorderColor: "var(--primary-color)",
                    defaultHoverColor: "var(--primary-color)",
                    defaultActiveColor: "var(--primary-400)",
                    defaultActiveBorderColor: "var(--primary-400)",
                    contentFontSize: 16,
                    fontWeight: 600,
                    contentLineHeight: "19.36px",
                    fontFamily: "var(--fontFamily)",
                  },
                },
              }}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <UserProvider>
                  <div className="flex flex-col relative">
                    <Header />
                    <BreadCrumb />
                    {children}
                    <WhatsAppFloatButton />
                  </div>
                </UserProvider>
              </ThemeProvider>
            </ConfigProvider>
          </NotificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
