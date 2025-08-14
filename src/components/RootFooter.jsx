'use client';

import Footer from '@/components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import arMessages from '@/locales/ar.json';
import enMessages from '@/locales/en.json';
import { routing } from '@/i18n/routing';

export default function RootFooter() {
  const locale = routing.defaultLocale;
  const messages = locale === 'en' ? enMessages : arMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Footer />
    </NextIntlClientProvider>
  );
}
