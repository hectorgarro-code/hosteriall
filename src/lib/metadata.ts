import type { Metadata } from 'next';
import { siteConfig } from '@/data/config';

export function pageMetadata(title: string, description: string, pathname: string, image = '/images/real/resized_dsc_0013-scaled.webp'): Metadata {
  const url = new URL(pathname === "/" ? "/" : pathname.replace(/\/?$/, "/"), siteConfig.url).toString();
  const socialTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { type: 'website', locale: 'es_AR', siteName: siteConfig.name, url, title: socialTitle, description, images: [{ url: image, alt: siteConfig.name }] },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: [image] },
  };
}
