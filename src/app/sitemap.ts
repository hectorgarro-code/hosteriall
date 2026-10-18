import { MetadataRoute } from 'next';
import { roomsData } from '@/data/rooms';
import { siteConfig } from '@/data/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split('T')[0];

  const getPriority = (path: string): number => {
    if (path === '') return 1.0;
    if (path === '/verano-2027' || path === '/habitaciones') return 0.9;
    if (path === '/contacto') return 0.85;
    if (path.startsWith('/habitaciones/')) return 0.8;
    if (path === '/servicios' || path === '/la-lucila-del-mar') return 0.8;
    return 0.7;
  };

  const getChangeFrequency = (path: string): 'daily' | 'weekly' | 'monthly' => {
    if (path === '' || path === '/verano-2027') return 'weekly';
    if (path === '/habitaciones' || path === '/contacto') return 'weekly';
    return 'monthly';
  };

  const paths = [
    '',
    '/verano-2027',
    '/habitaciones',
    '/servicios',
    '/la-lucila-del-mar',
    '/galeria',
    '/contacto',
    ...roomsData.map((room) => '/habitaciones/' + room.slug),
  ];

  return paths.map((path) => ({
    url: siteConfig.url + (path ? path + '/' : '/'),
    lastModified: currentDate,
    changeFrequency: getChangeFrequency(path),
    priority: getPriority(path),
  }));
}
