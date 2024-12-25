import "./globals.css";
import "../../style/general.css";
import { ThemeProvider } from "@/components/theme-provider";
import { redirect } from "next/navigation";
export const metadata = {
  title: "حكيم للرعاية الطبية  | حكيم للرعاية الطبية",
  description: "Hakeem healthcare",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  return (
    <html lang={["ar", "en"].includes(locale) ? locale : "ar"}>
      <body dir={locale == "en" ? "ltr" : "rtl"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
