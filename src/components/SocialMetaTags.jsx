'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

export default function SocialMetaTags({ 
  title,
  description,
  image,
  url,
  siteName = 'Hakeem',
  locale,
  baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hakeem.com.sa'
}) {
  const pathname = usePathname();
  
  // Default values
  const pageTitle = title || 'Hakeem - Your Health Companion';
  const pageDescription = description || 'Find top doctors and book appointments with Hakeem';
  
  // Ensure image URL is absolute
  const imageUrl = image?.startsWith('http') 
    ? image 
    : `${baseUrl}${image?.startsWith('/') ? '' : '/'}${image || 'logo.png'}`;
  
  // Full URL for the current page
  const pageUrl = url || `${baseUrl}${pathname}`;
  
  return (
    <Head>
      {/* Standard Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale || 'ar_SA'} />
      
      {/* WhatsApp Specific Tags */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Extra Meta Tags for Facebook */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      
      {/* Dynamic OpenGraph Image */}
      <meta property="og:image" content={`${baseUrl}/api/og?title=${encodeURIComponent(pageTitle)}&description=${encodeURIComponent(pageDescription)}&image=${encodeURIComponent(image || '')}`} />
    </Head>
  );
}
