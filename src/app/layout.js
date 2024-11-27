import "./globals.css";
import "../style/general.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "حكيم للرعاية الطبية  | حكيم للرعاية الطبية",
  description: "Hakeem healthcare",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body dir="rtl">
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
