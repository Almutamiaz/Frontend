'use client';

import { useEffect } from 'react';

export default function WhatsAppMetaTagsScript() {
  useEffect(() => {
    // Check if the user agent contains WhatsApp
    const isWhatsApp = /WhatsApp/.test(navigator.userAgent);
    
    if (isWhatsApp) {
      // Get existing Open Graph tags
      const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || 'Hakeem';
      const description = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || 'Your health companion';
      const image = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '/logo.png';
      
      // Create specialized WhatsApp meta tags
      const metaTags = [
        { property: 'whatsapp:title', content: title },
        { property: 'whatsapp:description', content: description },
        { property: 'whatsapp:image', content: image },
        // Ensure og:image has additional properties
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: title },
        { property: 'og:image:type', content: 'image/png' },
      ];
      
      // Add these meta tags to the document head
      metaTags.forEach(({ property, content }) => {
        // Check if tag already exists
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        
        if (!metaTag) {
          // If it doesn't exist, create it
          metaTag = document.createElement('meta');
          metaTag.setAttribute('property', property);
          document.head.appendChild(metaTag);
        }
        
        // Set or update the content
        metaTag.setAttribute('content', content);
      });
    }
  }, []);
  
  return null;
}
