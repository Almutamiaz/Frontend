'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import { NextIntlClientProvider } from 'next-intl';
import arMessages from '@/locales/ar.json';
import enMessages from '@/locales/en.json';
import { routing } from '@/i18n/routing';

export default function RootHeader() {
  const locale = routing.defaultLocale;
  const messages = locale === 'en' ? enMessages : arMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
    </NextIntlClientProvider>
  );
}
