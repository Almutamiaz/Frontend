import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
 
export const runtime = 'edge';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Get the dynamic parameters from the URL
  const title = searchParams.get('title') || 'Hakeem';
  const description = searchParams.get('description') || 'Your health companion in Saudi Arabia';
  const imageUrl = searchParams.get('image') || '/logo.png';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hakeem.com.sa';
  
  // Ensure imageUrl is absolute
  const absoluteImageUrl = imageUrl.startsWith('http') 
    ? imageUrl 
    : `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  
  // Get translations (will default to Arabic if on the root path)
  const t = await getTranslations();
  
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#593BB4',
            fontFamily: 'Almarai, Arial',
            color: 'white',
            padding: '40px',
            position: 'relative',
          }}
        >
          {/* Circles background */}
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <img
              src={`${baseUrl}/logo.png`}
              alt="Hakeem Logo"
              width={120}
              height={120}
              style={{ marginRight: '16px' }}
            />
            <h1 style={{ fontSize: '48px', margin: 0 }}>
              {t('hakeem')}
            </h1>
          </div>
          
          {/* Title and description */}
          <h2 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '16px' }}>
            {title}
          </h2>
          <p style={{ fontSize: '24px', textAlign: 'center', maxWidth: '80%' }}>
            {description}
          </p>
          
          {/* Optional image */}
          {imageUrl && imageUrl !== '/logo.png' && (
            <img
              src={absoluteImageUrl}
              alt={title}
              width={200}
              height={200}
              style={{
                objectFit: 'cover',
                borderRadius: '12px',
                margin: '24px 0',
              }}
            />
          )}
          
          {/* Website URL */}
          <div style={{ position: 'absolute', bottom: '24px', fontSize: '18px' }}>
            hakeem.com.sa
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.error('Error generating OpenGraph image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
