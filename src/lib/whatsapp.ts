import { siteConfig } from '@/data/config';

export interface InquiryParams {
  checkIn?: string;
  checkOut?: string;
  adults?: number | string;
  children?: number | string;
  childrenAges?: string;
  roomName?: string;
  notes?: string;
}

export function buildWhatsAppMessage(params: InquiryParams = {}): string {
  const parts = [siteConfig.inquiryDefaultMessage];
  const displayDate = (value: string) => value.split('-').reverse().join('/');
  if (params.checkIn && params.checkOut) parts.push('Del ' + displayDate(params.checkIn) + ' al ' + displayDate(params.checkOut) + '.');
  if (params.adults !== undefined || params.children !== undefined) {
    const adults = Math.max(1, Number(params.adults) || 1);
    const children = Math.max(0, Number(params.children) || 0);
    parts.push(adults + (adults === 1 ? ' adulto' : ' adultos') + (children ? ' y ' + children + (children === 1 ? ' niño.' : ' niños.') : '.'));
    if (children && params.childrenAges?.trim()) parts.push('Edades de los chicos: ' + params.childrenAges.trim() + '.');
  }
  if (params.roomName?.trim()) parts.push('Me interesa la habitación ' + params.roomName.trim() + '.');
  if (params.notes?.trim()) parts.push(params.notes.trim());
  return parts.join(' ');
}

export function getWhatsAppUrl(params: InquiryParams = {}): string {
  return 'https://wa.me/' + siteConfig.contact.whatsappNumber + '?text=' + encodeURIComponent(buildWhatsAppMessage(params));
}
