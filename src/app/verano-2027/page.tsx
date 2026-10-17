import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MessageCircle, Users } from 'lucide-react';
import { QuickInquiry } from '@/components/QuickInquiry';
import { StayConditions } from '@/components/StayConditions';
import { RoomCard } from '@/components/RoomCard';
import { roomsData } from '@/data/rooms';
import { siteConfig } from '@/data/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Verano 2027 · Planeá tu estadía', 'Tu verano 2027 en La Lucila del Mar: conocé las habitaciones y fotos de Hostería La Lucila. Contanos fechas y personas para una consulta personalizada.', '/verano-2027');

export default function SummerPage() {
  return (
    <>
      <section className="campaign-header">
        <div className="container editorial-grid">
          <div><span className="eyebrow">Verano 2027 · Hostería La Lucila</span><h1>Tu verano empieza acá.</h1><p className="section-subtitle">Descansar en La Lucila, con la calidez de sentirse en casa. Empezá por conocer el lugar y contarnos cómo imaginás tus vacaciones.</p><a href="#consulta-verano" className="btn btn-whatsapp"><MessageCircle size={19} /> Consultar mi estadía</a></div>
          <div className="editorial-photo"><Image src="/images/real/resized_dsc_0013-scaled.webp" alt="Pileta y parque de Hostería La Lucila" fill preload sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: 'cover' }} /></div>
        </div>
      </section>
      <div className="container"><StayConditions /></div>
      <section className="section"><div className="container">
        <div className="section-header text-center"><span className="eyebrow">A tu ritmo</span><h2 className="section-title">Tres pasos para empezar a planear.</h2></div>
        <div className="service-grid planning-steps">
          <article><Calendar size={28} /><h3>Elegí las fechas</h3><p>Contanos cuándo querés ingresar y salir. Si tenés flexibilidad, avisános.</p></article>
          <article><Users size={28} /><h3>Contanos quiénes viajan</h3><p>Cantidad de adultos y chicos, con sus edades, para orientarte con las opciones.</p></article>
          <article><MessageCircle size={28} /><h3>Recibí una propuesta</h3><p>Te informamos disponibilidad, tarifa y condiciones. La reserva se confirma según lo acordado con administración.</p></article>
        </div>
      </div></section>
      <section className="section section-bg-alt"><div className="container">
        <div className="section-heading-row"><div><span className="eyebrow">Conocé antes de elegir</span><h2 className="section-title">Una habitación para tu viaje.</h2></div><Link href="/galeria" className="btn btn-outline">Ver todas las fotos <ArrowRight size={17} /></Link></div>
        <div className="room-grid">{roomsData.map(room => <RoomCard key={room.id} room={room} />)}</div>
      </div></section>
      <section id="consulta-verano" className="section"><div className="container editorial-grid">
        <div className="editorial-copy"><span className="eyebrow">Hablemos de tus vacaciones</span><h2 className="section-title">Un mensaje puede ser el comienzo.</h2><p>Consultá por enero, febrero o marzo. Te contamos las opciones para tus fechas y los servicios que corresponden a tu estadía.</p><p>El desayuno está incluido. Ingreso a las 14:00 y salida a las 10:00. Aceptamos mascotas; podés reservar con seña y pagar en efectivo o por transferencia. Consultanos las condiciones de cancelación. Si viajás en auto, preguntanos por disponibilidad de cochera.</p><p>Encontranos en <a className="text-link" href={siteConfig.contact.instagramUrl} target="_blank" rel="noopener noreferrer">@hosterialalucila</a> para seguir conociendo nuestro lugar.</p></div>
        <QuickInquiry variant="standalone" />
      </div></section>
    </>
  );
}
