import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Car, MapPin, MessageCircle, Trees, Waves } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { roomsData } from '@/data/rooms';
import { servicesData } from '@/data/services';
import { QuickInquiry } from '@/components/QuickInquiry';
import { RoomCard } from '@/components/RoomCard';
import { ServiceCard } from '@/components/ServiceCard';
import { ReviewsSection } from '@/components/ReviewsSection';
import { FaqAccordion } from '@/components/FaqAccordion';
import { StayConditions } from '@/components/StayConditions';
import { InstagramIcon } from '@/components/SocialIcons';
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

      <div className="container"><StayConditions /></div>

      <section id="habitaciones" className="section">
        <div className="container">
          <div className="section-heading-row"><div><span className="eyebrow">Habitaciones</span><h2 className="section-title">Encontrá tu forma de descansar.</h2><p className="section-subtitle">Cuatro categorías, con fotos de cada una para ayudarte a elegir.</p></div><Link href="/habitaciones" className="btn btn-outline">Ver habitaciones <ArrowRight size={17} /></Link></div>
          <div className="room-grid">{roomsData.map(room => <RoomCard key={room.id} room={room} />)}</div>
        </div>
      </section>

      <section className="section section-bg-alt">
        <div className="container editorial-grid">
          <div className="editorial-photo"><Image src="/images/real/resized_pa232504.webp" alt="Parque de la hostería con quincho, mesas y reposeras" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: 'cover' }} /></div>
          <div className="editorial-copy"><span className="eyebrow">Vení en familia</span><h2 className="section-title">El parque también es descanso.</h2><p>Hay días para recorrer La Lucila y otros para quedarse un rato más. Nuestro parque y los espacios compartidos te invitan a disfrutar sin apuro.</p><p>Conocé el lugar antes de venir y contanos qué buscás para tus vacaciones. Te ayudamos a elegir la habitación para tu viaje.</p><Link href="/galeria" className="btn btn-outline">Recorré la hostería <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section id="servicios" className="section">
        <div className="container">
          <div className="section-heading-row"><div><span className="eyebrow">Espacios y servicios</span><h2 className="section-title">Comodidades para sentirte en casa.</h2><p className="section-subtitle">Conocé nuestros espacios y consultá las condiciones para tus fechas.</p></div><Link href="/servicios" className="btn btn-outline">Ver servicios <ArrowRight size={17} /></Link></div>
          <div className="service-grid">{servicesData.map(service => <ServiceCard key={service.id} service={service} />)}</div>
        </div>
      </section>

      <section id="info" className="season-section">
        <div className="container season-grid">
          <div><span className="eyebrow">Tu verano empieza acá</span><h2 className="section-title">Planeá tu próxima estadía.</h2><p>Contanos las fechas de ingreso y salida, cuántas personas viajan y las edades de los chicos. Te respondemos con las opciones y condiciones para tu viaje.</p><div className="button-row"><Link href="/verano-2027" className="btn btn-primary">Conocé la propuesta 2027 <ArrowRight size={17} /></Link><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><MessageCircle size={18} /> Consultar mi estadía</a></div></div>
          <div className="season-steps"><div><span>01</span><p>Elegí tus fechas.</p></div><div><span>02</span><p>Contanos con quién viajás.</p></div><div><span>03</span><p>Recibí una propuesta personalizada.</p></div></div>
        </div>
      </section>

      <section className="section">
        <div className="container editorial-grid">
          <div className="editorial-copy"><span className="eyebrow">La Lucila del Mar</span><h2 className="section-title">El mar cerca.<br />Tiempo para disfrutarlo.</h2><p>Una caminata por la playa, el muelle y las calles arboladas. Descubrí el entorno y elegí tus propios planes para esos días de descanso.</p><Link href="/la-lucila-del-mar" className="btn btn-outline">Descubrí La Lucila <ArrowRight size={17} /></Link></div>
          <div className="editorial-photo destination-photo"><Image src="/images/real/tam_inst-34.webp" alt="El muelle de La Lucila del Mar bajo un cielo de colores" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: 'cover' }} /></div>
        </div>
      </section>

      <ReviewsSection />

      <section className="section">
        <div className="container"><div className="section-header text-center"><span className="eyebrow">Antes de venir</span><h2 className="section-title">Las dudas también tienen su lugar.</h2><p className="section-subtitle">Información para empezar a planear tu estadía.</p></div><FaqAccordion /></div>
      </section>

      <section className="instagram-section">
        <div className="container welcome-grid">
          <div><span className="eyebrow"><InstagramIcon size={16} /> @hosterialalucila</span><h2>Seguí conociendo nuestro lugar.</h2></div>
          <p>Habitaciones, rincones del parque y momentos de La Lucila. Encontranos en Instagram y empezá a imaginar tu próximo verano.</p>
          <a href={siteConfig.contact.instagramUrl} className="btn btn-outline" target="_blank" rel="noopener noreferrer">Ver Instagram <ArrowRight size={17} /></a>
        </div>
      </section>
    </>
  );
}
