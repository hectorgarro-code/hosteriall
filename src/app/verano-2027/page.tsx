import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { QuickInquiry } from '@/components/QuickInquiry';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Verano 2027 · Consultá tu estadía', 'Consultá fechas y disponibilidad para verano 2027 en Hostería La Lucila. Desayuno incluido y pileta climatizada al aire libre en verano.', '/verano-2027');

export default function SummerPage() {
  return (
    <section className="campaign-header campaign-direct">
      <div className="container editorial-grid">
        <div className="campaign-summary">
          <span className="eyebrow">Hostería La Lucila · La Lucila del Mar</span>
          <h1>Consultá por tu verano 2027.</h1>
          <p>Decinos las fechas y cuántas personas viajan.</p>
          <div className="campaign-photo"><Image src="/images/real/resized_dsc_0013-scaled.webp" alt="Pileta al aire libre y parque de Hostería La Lucila" fill preload sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <p className="campaign-benefits">Desayuno incluido · Pileta climatizada en verano</p>
          <div className="campaign-links"><Link href="/habitaciones" className="text-link">Ver habitaciones <ArrowRight size={17} /></Link><Link href="/contacto" className="text-link">Ubicación y condiciones <ArrowRight size={17} /></Link></div>
        </div>
        <div id="consulta-verano"><QuickInquiry variant="standalone" showRoom={false} /></div>
      </div>
    </section>
  );
}
