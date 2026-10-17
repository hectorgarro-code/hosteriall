import { MetadataRoute } from 'next';
import { roomsData } from '@/data/rooms';
import { siteConfig } from '@/data/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/verano-2027', '/habitaciones', '/servicios', '/la-lucila-del-mar', '/galeria', '/contacto', ...roomsData.map(room => '/habitaciones/' + room.slug)];
  return paths.map(path => ({
    url: siteConfig.url + (path ? path + "/" : "/"),
    lastModified: '2026-10-17',
    changeFrequency: 'monthly',
    priority: path === '' || path === '/verano-2027' ? 1 : 0.8,
  }));
}
