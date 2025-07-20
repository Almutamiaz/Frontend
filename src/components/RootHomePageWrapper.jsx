'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { routing } from '@/i18n/routing';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RootHomePageWrapper() {
  const router = useRouter();
  const defaultLocale = routing.defaultLocale;
  
  // Use useEffect to redirect on the client side
  useEffect(() => {
    // Small delay to ensure server has time to render
    const timer = setTimeout(() => {
      router.replace(`/${defaultLocale}`);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [router, defaultLocale]);

  // Show a loading spinner while redirecting
  return <LoadingSpinner />;
}
