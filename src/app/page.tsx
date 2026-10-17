import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Car, Coffee, MapPin, MessageCircle, PawPrint, Trees, Waves } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { QuickInquiry } from '@/components/QuickInquiry';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Hostería La Lucila · Verano 2027', 'Descansá en Hostería La Lucila. Conocé nuestras habitaciones, pileta climatizada en verano, parque y espacios comunes con fotografías reales. Consultas para verano 2027.', '/');

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image src="/images/real/resized_dsc_0013-scaled.webp" alt="Pileta y parque de Hostería La Lucila, con mesas y quinchos al fondo" fill preload sizes="100vw" className="hero-photo" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="season-label">{siteConfig.seasonNotice}</span>
            <p className="hero-location"><MapPin size={17} /> La Lucila del Mar · Partido de La Costa</p>
            <h1>{siteConfig.heroHeadline}</h1>
            <p className="hero-description">Descansar en La Lucila, con la calidez de sentirse en casa. Habitaciones para viajar de a dos o en familia, un parque para bajar un cambio y el mar cerca.</p>
            <div className="hero-highlights"><span><Waves size={18} /> Pileta todo el verano</span><span><Trees size={18} /> Parque y quincho</span><span><Car size={18} /> Cochera sujeta a disponibilidad</span></div>
            <div className="button-row">
              <a href="#consulta" className="btn btn-outline-white">Consultar mi estadía <MessageCircle size={17} /></a>
              <Link href="/habitaciones" className="hero-text-link">Conocé las habitaciones</Link>
            </div>
          </div>
          <div id="consulta" className="hero-inquiry"><QuickInquiry /></div>
        </div>
      </section>

      <section className="welcome-strip">
        <div className="container welcome-grid">
          <div><span className="eyebrow">Nuestro lugar</span><h2>Un verano a tu ritmo.</h2></div>
          <p>Un rato en el parque. Una charla después de un paseo. Tiempo para compartir y descansar en el ambiente familiar de la hostería.</p>
          <Link href="/galeria" className="text-link">Mirá las fotos <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="home-essentials" aria-label="Servicios principales">
        <div className="container">
          <div className="essential-benefits">
            <span><Coffee size={25} /> Desayuno incluido</span>
            <span><Waves size={25} /> Pileta climatizada en verano</span>
            <span><PawPrint size={25} /> Mascotas permitidas</span>
          </div>
          <Link href="/servicios" className="text-link">Ver todos los servicios <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="section home-preview">
        <div className="container">
          <div className="section-heading-row"><h2 className="section-title">Conocé la hostería.</h2><Link href="/galeria" className="btn btn-outline">Ver todas las fotos <ArrowRight size={17} /></Link></div>
          <div className="home-photo-grid">
            <Link href="/galeria" className="home-photo-link"><Image src="/images/real/resized_pa232504.webp" alt="Parque de la hostería con mesas y quincho" fill sizes="(max-width: 650px) 100vw, 33vw" /><span>Parque y quincho <ArrowRight size={18} /></span></Link>
            <Link href="/habitaciones" className="home-photo-link"><Image src="/images/real/doble-estandar-768x576.webp" alt="Interior de una habitación Doble Estándar" fill sizes="(max-width: 650px) 100vw, 33vw" /><span>Ver habitaciones <ArrowRight size={18} /></span></Link>
            <Link href="/servicios" className="home-photo-link"><Image src="/images/real/tam_inst-30.webp" alt="Mesa servida para el desayuno" fill sizes="(max-width: 650px) 100vw, 33vw" /><span>Desayuno incluido <ArrowRight size={18} /></span></Link>
          </div>
        </div>
      </section>

      <section className="season-section">
        <div className="container direct-contact">
          <div><h2 className="section-title">¿Venís este verano?</h2><p>San Juan 4818 · La Lucila del Mar. A dos cuadras de la playa.</p><Link href="/contacto" className="text-link">Ubicación y preguntas frecuentes <ArrowRight size={17} /></Link></div>
          <div className="direct-contact-actions"><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><MessageCircle size={20} /> Consultar por WhatsApp</a><a href={siteConfig.contact.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="text-link">Ver opiniones en Google <ArrowRight size={17} /></a></div>
        </div>
      </section>
    </>
  );
}
