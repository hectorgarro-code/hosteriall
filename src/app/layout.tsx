import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/data/config';
import { pageMetadata } from '@/lib/metadata';

export const viewport: Viewport = { themeColor: '#155B38', width: 'device-width', initialScale: 1 };

export const metadata: Metadata = {
  ...pageMetadata('Hostería familiar en La Lucila del Mar', siteConfig.heroSubtitle, '/'),
  metadataBase: new URL(siteConfig.url),
  title: { default: 'Hostería La Lucila · Verano 2027', template: '%s | Hostería La Lucila' },
  keywords: [
    'Hostería La Lucila',
    'La Lucila del Mar',
    'hotel La Lucila del Mar',
    'alojamiento La Lucila del Mar',
    'hostería con pileta climatizada',
    'hospedaje familiar La Costa',
    'verano 2027 La Lucila',
    'hotel a dos cuadras de la playa',
    'vacaciones en La Lucila',
    'hotel pet friendly La Costa',
    'desayuno incluido La Lucila',
    'San Juan 4818',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: 'travel',
  formatDetection: { email: false, address: false, telephone: false },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/images/real/cropped-logo-hosteria-1.webp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'AR-B',
    'geo.placename': 'La Lucila del Mar',
    'geo.position': '-36.6575;-56.6853',
    'ICBM': '-36.6575, -56.6853',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <head><JsonLd /></head>
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
