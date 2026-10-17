import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Contacto y ubicación', 'Consultá tu estadía en Hostería La Lucila para verano 2027. WhatsApp, teléfono, correo y mapa de San Juan 4818, La Lucila del Mar.', '/contacto');

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
