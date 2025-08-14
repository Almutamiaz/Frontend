import { BASE_URL } from '@/constants';
import { routing } from '@/i18n/routing';

export default async function sitemap() {
  // Get the base URL for your site
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hakeem.com.sa';
  
  // Defines all the static routes
  const staticRoutes = [
    '',
    '/AboutUs',
    '/ContactUs',
    '/Download',
    '/Explore',
    '/Services',
    '/privacy-policy',
  ];

  // Generate route entries for static routes in all locales
  const staticRoutesEntries = routing.locales.flatMap(locale => 
    staticRoutes.map(route => {
      const path = locale === routing.defaultLocale && route === ''
        ? '' // For root path with default locale, no prefix
        : locale === routing.defaultLocale
          ? route // For other routes with default locale, no locale prefix
          : `/${locale}${route}`; // For non-default locale, add prefix
      
      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      };
    })
  );

  // Try to fetch dynamic routes like doctors and hospitals
  let dynamicRoutes = [];
  try {
    // Fetch popular doctors for sitemap
    const doctorsRes = await fetch(`${BASE_URL}/home/doctors?limit=20`, {
      headers: { "X-localization": routing.defaultLocale },
      next: { revalidate: 86400 } // Revalidate daily
    });
    
    if (doctorsRes.ok) {
      const doctorsData = await doctorsRes.json();
      const doctors = doctorsData.data || [];
      
      // Generate doctor route entries
      const doctorRoutes = routing.locales.flatMap(locale => 
        doctors.map(doctor => ({
          url: `${baseUrl}${locale === routing.defaultLocale ? '' : `/${locale}`}/Doctors/${doctor.id}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        }))
      );
      
      dynamicRoutes = [...dynamicRoutes, ...doctorRoutes];
    }
    
    // Fetch popular hospitals for sitemap
    const hospitalsRes = await fetch(`${BASE_URL}/home/centres?limit=20`, {
      headers: { "X-localization": routing.defaultLocale },
      next: { revalidate: 86400 } // Revalidate daily
    });
    
    if (hospitalsRes.ok) {
      const hospitalsData = await hospitalsRes.json();
      const hospitals = hospitalsData.data || [];
      
      // Generate hospital route entries
      const hospitalRoutes = routing.locales.flatMap(locale => 
        hospitals.map(hospital => ({
          url: `${baseUrl}${locale === routing.defaultLocale ? '' : `/${locale}`}/Hospital/${hospital.id}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        }))
      );
      
      dynamicRoutes = [...dynamicRoutes, ...hospitalRoutes];
    }
  } catch (error) {
    console.error('Error generating dynamic routes for sitemap:', error);
  }

  // Combine static and dynamic routes
  return [...staticRoutesEntries, ...dynamicRoutes];
}
