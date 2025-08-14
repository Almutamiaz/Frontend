import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from '@/i18n/routing';
import "../style/general.css";
import "../style/componentsStyle.css";
import { ConfigProvider } from "antd";
import { UserProvider } from "@/Context/UserContext";
import NotificationProvider from "@/Context/NotificationProvider";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";

// Add base metadata for the entire site
export const metadata = {
  applicationName: 'Hakeem',
  referrer: 'origin-when-cross-origin',
  keywords: ['healthcare', 'doctors', 'medical', 'appointments', 'Saudi Arabia', 'health', 'hospitals', 'clinics'],
  authors: [{ name: 'Hakeem' }],
  creator: 'Hakeem',
  publisher: 'Hakeem',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hakeem.com.sa'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ar': '/'
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  verification: {
    // Add your site verification tokens here
    google: 'google-site-verification=your-verification-code',
  },
  // Default Open Graph metadata that can be overridden by page-specific metadata
  openGraph: {
    type: 'website',
    siteName: 'Hakeem',
    images: [{
      url: '/logo.png',
      width: 800,
      height: 600,
      alt: 'Hakeem Logo'
    }],
  },
  // Default Twitter metadata
  twitter: {
    card: 'summary_large_image',
    creator: '@hakeem',
    images: ['/logo.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

// This is a server component - it receives the locale from middleware
export default async function RootLayout({ children }) {
  // Get the locale (which should be 'ar' for the root path)
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={`${locale}-SA`} dir={locale === "en" ? "ltr" : "rtl"}>
      <head>
        {/* Add additional SEO meta tags */}
        <meta name="theme-color" content="#593BB4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Additional WhatsApp meta tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Hakeem - Your Health Companion" />
        <meta property="og:image:type" content="image/png" />
      </head>
      <body
        dir={locale === "en" ? "ltr" : "rtl"}
        style={{
          "--fontFamily": locale === "en" ? "'Inter'" : "'Almarai'",
        }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ConfigProvider>
              <UserProvider>
                <NotificationProvider>
                  {/* Root layout won't include Header, BreadCrumb or Footer */}
                  {/* They will be included in the page component or [locale]/layout */}
                  {children}
                  <WhatsAppFloatButton />
                </NotificationProvider>
              </UserProvider>
            </ConfigProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
