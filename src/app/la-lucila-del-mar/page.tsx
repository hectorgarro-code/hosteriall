import React from 'react';
import { pageMetadata } from '@/lib/metadata';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Compass,
  Sun,
  Fish,
  Utensils,
  TreePine,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { siteConfig } from '@/data/config';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata = pageMetadata("Descubrí La Lucila del Mar", "Conocé el entorno de Hostería La Lucila: playa, muelle y paseos para disfrutar de tus vacaciones a tu ritmo.", "/la-lucila-del-mar");

export default function LaLucilaPage() {
  const attractions = [
    {
      title: 'Playas Amplias y Médanos Suaves',
      description:
        'La costa de La Lucila se caracteriza por sus extensas playas de arena fina, ideales para caminatas matutinas, relax junto al mar y momentos para compartir en familia.',
      icon: <Sun size={24} />,
    },
    {
      title: 'Muelle Histórico de Pesca',
      description:
        'Uno de los emblemas costeros más fotografiados. Es un paseo para disfrutar del mar y de los cambios de luz sobre la costa.',
      icon: <Fish size={24} />,
    },
    {
      title: 'Pinares y Entorno Residencial',
      description:
        'A diferencia de otros centros más masivos, La Lucila preserva una forestación frondosa de pinos, eucaliptos y acacias que brindan sombra, aire puro y silencio reparador.',
      icon: <TreePine size={24} />,
    },
    {
      title: 'Gastronomía y Paseo Comercial',
      description:
        'Podés combinar un paseo por la localidad con una pausa para comer o tomar algo. Consultanos por opciones cercanas durante tu visita.',
      icon: <Utensils size={24} />,
    },
  ];

  return (
    <>
      {/* Hero de La Lucila */}
      <section
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--color-white)',
          padding: '5rem 0',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/real/tam_inst-34.webp"
          alt="Playas y muelle de La Lucila del Mar"
          fill
          preload
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(8, 30, 43, 0.90) 0%, rgba(8, 30, 43, 0.70) 60%, rgba(8, 30, 43, 0.35) 100%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#7DD3FC',
                fontWeight: 700,
                display: 'inline-block',
                marginBottom: '0.5rem',
              }}
            >
              Destino Turístico
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
                color: 'var(--color-white)',
                marginBottom: '1rem',
                lineHeight: 1.15,
              }}
            >
              Descubrí La Lucila del Mar
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#E2E8F0',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              Un rincón privilegiado del Partido de La Costa reconocido por su ritmo pausado, calles arboladas y espíritu familiar junto al océano Atlántico.
            </p>
            <a
              href={getWhatsAppUrl({ notes: 'Consulta desde página La Lucila del Mar' })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={19} />
              <span>Consultar estadía por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Todo cerca para disfrutar más (Distancias confirmadas) */}
      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="eyebrow">Ubicación Estratégica</span>
            <h2 className="section-title">Todo cerca para disfrutar más</h2>
            <div className="wave-divider" />
            <p className="section-subtitle">
              Estamos en San Juan 4818. Mirá el mapa y organizá tus paseos por la localidad a tu ritmo.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem',
            }}
          >
            <div
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-ocean-50)',
                border: '1px solid var(--color-ocean-100)',
                textAlign: 'center',
              }}
            >
              <div style={{ color: 'var(--color-ocean-600)', marginBottom: '0.75rem' }}>
                <Compass size={28} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem', color: 'var(--color-petrol-primary)' }}>
                {siteConfig.address.beachDistance}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                La playa es uno de los paseos cercanos para disfrutar durante tu visita.
              </p>
            </div>

            <div
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-ocean-50)',
                border: '1px solid var(--color-ocean-100)',
                textAlign: 'center',
              }}
            >
              <div style={{ color: 'var(--color-ocean-600)', marginBottom: '0.75rem' }}>
                <Utensils size={28} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem', color: 'var(--color-petrol-primary)' }}>
                {siteConfig.address.centerDistance}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Consultanos por opciones para comer, comprar o pasear cerca de la hostería.
              </p>
            </div>

            <div
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-ocean-50)',
                border: '1px solid var(--color-ocean-100)',
                textAlign: 'center',
              }}
            >
              <div style={{ color: 'var(--color-ocean-600)', marginBottom: '0.75rem' }}>
                <Fish size={28} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem', color: 'var(--color-petrol-primary)' }}>
                {siteConfig.address.pierDistance}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Paseo pintoresco ideal para una caminata junto a la orilla del mar.
              </p>
            </div>
          </div>

          {/* Atractivos Principales */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2rem',
              marginBottom: '4rem',
            }}
          >
            {attractions.map((attraction, i) => (
              <div
                key={i}
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-sand-50)',
                }}
              >
                <div style={{ color: 'var(--color-ocean-600)', marginBottom: '0.85rem' }}>
                  {attraction.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-petrol-primary)' }}>
                  {attraction.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {attraction.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mapa Interactivo */}
          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-sand-100)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--color-petrol-primary)' }}>
                  {siteConfig.name} — {siteConfig.address.street}
                </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {siteConfig.address.city}, {siteConfig.address.party}, Provincia de Buenos Aires
                </span>
              </div>
              <a
                href={siteConfig.address.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: '0.85rem', padding: '0.55rem 1.15rem' }}
              >
                <span>Abrir en Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
            <iframe
              title="Ubicación de Hostería La Lucila en Google Maps"
              src={siteConfig.address.googleMapsEmbedUrl}
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
