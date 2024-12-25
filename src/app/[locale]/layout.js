import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import "../../style/general.css";
import "../../style/componentsStyle.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConfigProvider } from "antd";
export const metadata = {
  title: "حكيم للرعاية الطبية  | حكيم للرعاية الطبية",
  description: "Hakeem healthcare",
};
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
    // <h1>test</h1>
  }

  // Providing all messages to the client
  // side is the easiest way to get started
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
          <ConfigProvider
            theme={{
              fontFamily: "var(--fontFamily)",
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
              {children}
            </ThemeProvider>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
