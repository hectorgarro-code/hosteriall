import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Bed,
  Bath,
  Tv,
  Wifi,
  Coffee,
  Refrigerator,
  Flame,
  DoorOpen,
  Trees,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { roomsData } from '@/data/rooms';
import { siteConfig } from '@/data/config';
import { RoomGallery } from '@/components/RoomGallery';
import { FaqAccordion } from '@/components/FaqAccordion';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { pageMetadata } from '@/lib/metadata';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return roomsData.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = roomsData.find((r) => r.slug === slug);
  if (!room) return {};

  return pageMetadata(room.seoTitle, room.seoDescription, '/habitaciones/' + room.slug, room.mainImage);
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = roomsData.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  const renderAmenityIcon = (icon: string) => {
    switch (icon) {
      case 'bed':
        return <Bed size={22} />;
      case 'bath':
        return <Bath size={22} />;
      case 'tv':
        return <Tv size={22} />;
      case 'wifi':
        return <Wifi size={22} />;
      case 'refrigerator':
        return <Refrigerator size={22} />;
      case 'coffee':
      case 'kettle':
        return <Coffee size={22} />;
      case 'door-open':
        return <DoorOpen size={22} />;
      case 'trees':
        return <Trees size={22} />;
      default:
        return <Check size={22} />;
    }
  };

  return (
    <>
      {/* Navegación de migas de pan y volver */}
      <div style={{ backgroundColor: 'var(--color-white)', borderBottom: '1px solid var(--color-border)', padding: '0.9rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            href="/habitaciones"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: 'var(--color-ocean-700)',
            }}
          >
            <ArrowLeft size={16} />
            <span>Volver a Habitaciones</span>
          </Link>
          <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
            Hostería La Lucila &gt; {room.name}
          </span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '3.5rem',
              alignItems: 'start',
            }}
          >
            {/* Columna Izquierda: Galería */}
            <div>
              <RoomGallery images={room.gallery} roomName={room.name} />
            </div>

            {/* Columna Derecha: Información y CTA */}
            <div>
              <span className="eyebrow">{room.categoryName}</span>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.15,
                }}
              >
                {room.name}
              </h1>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '1.75rem',
                }}
              >
                {room.shortDescription}
              </p>

              {/* Lista de Servicios e Instalaciones de la Habitación */}
              <div
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-xs)',
                  marginBottom: '2rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    marginBottom: '1.25rem',
                    color: 'var(--color-petrol-primary)',
                  }}
                >
                  Tu habitación
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.15rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ color: 'var(--color-ocean-600)', flexShrink: 0 }}>
                      <Users size={22} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-petrol-primary)' }}>
                        Capacidad
                      </strong>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        {room.capacityLabel}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ color: 'var(--color-ocean-600)', flexShrink: 0 }}>
                      <Bed size={22} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-petrol-primary)' }}>
                        Camas
                      </strong>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        {room.bedConfig}
                      </span>
                    </div>
                  </div>

                  {room.amenities.map((amenity, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div style={{ color: 'var(--color-ocean-600)', flexShrink: 0 }}>
                        {renderAmenityIcon(amenity.icon)}
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-petrol-primary)' }}>
                          {amenity.label}
                        </strong>
                        {amenity.description && (
                          <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                            {amenity.description}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón Principal WhatsApp de la Habitación */}
              <div style={{ marginBottom: '1.5rem' }}>
                <a
                  href={getWhatsAppUrl({ roomName: room.name })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{
                    width: '100%',
                    padding: '1.05rem 1.5rem',
                    fontSize: '1.05rem',
                  }}
                >
                  <MessageCircle size={22} />
                  <span>Consultar esta habitación por WhatsApp</span>
                </a>
              </div>

              {/* Enlace para ver otras opciones */}
              <div style={{ textAlign: 'center' }}>
                <Link
                  href="/habitaciones"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'var(--color-petrol-primary)',
                  }}
                >
                  <span>¿Te interesa otra habitación? Ver todas las opciones</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* Descripción Amplia de la Habitación */}
          <div
            style={{
              marginTop: '4rem',
              paddingTop: '3rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div style={{ maxWidth: '800px' }}>
              <h2 style={{ fontSize: '1.85rem', marginBottom: '1rem' }}>
                Detalles y comodidades de {room.name}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-main)', lineHeight: 1.7, marginBottom: '2rem' }}>
                {room.fullDescription}
              </p>

              {/* Especificaciones */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem',
                  backgroundColor: 'var(--color-sand-100)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {room.specifications.map((spec, i) => (
                  <div key={i}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', display: 'block' }}>
                      {spec.title}
                    </span>
                    <strong style={{ fontSize: '0.94rem', color: 'var(--color-petrol-primary)' }}>
                      {spec.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preguntas frecuentes sobre alojamiento */}
          <div style={{ marginTop: '5rem' }}>
            <div className="section-header text-center">
              <span className="eyebrow">Dudas Frecuentes</span>
              <h2 className="section-title">Preguntas sobre la estadía</h2>
              <div className="wave-divider" />
            </div>
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
