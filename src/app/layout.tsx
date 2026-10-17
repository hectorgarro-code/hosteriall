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
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  robots: { index: true, follow: true },
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
