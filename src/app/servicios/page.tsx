import React from 'react';
import { pageMetadata } from '@/lib/metadata';
import Image from 'next/image';
import {
  Waves,
  Coffee,
  Trees,
  Flame,
  Car,
  Wifi,
  Tv,
  Utensils,
  Sun,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { servicesData } from '@/data/services';
import { siteConfig } from '@/data/config';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata = pageMetadata("Servicios y espacios para descansar", "Pileta climatizada todo el verano, parque, quincho, desayuno incluido, salón comedor, Wi-Fi y cochera sujeta a disponibilidad en Hostería La Lucila.", "/servicios");

export default function ServicesPage() {
  return (
    <>
      {/* Cabecera */}
      <section
        style={{
          backgroundColor: 'var(--color-petrol-primary)',
          color: 'var(--color-white)',
          padding: '4.5rem 0 3.5rem',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-ocean-400)',
              fontWeight: 700,
              display: 'inline-block',
              marginBottom: '0.5rem',
            }}
          >
            Comodidades
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              color: 'var(--color-white)',
              marginBottom: '0.85rem',
            }}
          >
            Servicios e Instalaciones
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#CBD5E1',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Pensados para que disfrutes tus vacaciones con la tranquilidad de sentirte como en casa y la comodidad que te merecés.
          </p>
        </div>
      </section>

      {/* Listado Editorial de Servicios con Beneficios Detallados */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {servicesData.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                    gap: '3rem',
                    alignItems: 'center',
                    backgroundColor: 'var(--color-white)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-border)',
                    padding: '1.5rem',
                  }}
                >
                  {/* Imagen */}
                  <div
                    style={{
                      order: isEven ? 1 : 2,
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/10',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.imageAlt || service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {service.badge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: 'rgba(15, 55, 78, 0.85)',
                          color: 'var(--color-white)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '0.35rem 0.85rem',
                          borderRadius: 'var(--radius-pill)',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Texto y Beneficio */}
                  <div style={{ order: isEven ? 2 : 1, padding: '1rem' }}>
                    <span className="eyebrow">{service.title}</span>
                    <h2
                      style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.2rem)',
                        marginBottom: '0.85rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {service.benefit}
                    </h2>
                    <p
                      style={{
                        fontSize: '1rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        marginBottom: '1.5rem',
                      }}
                    >
                      {service.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-sage-600)', fontSize: '0.9rem', fontWeight: 600 }}>
                      <ShieldCheck size={18} />
                      <span>Consultá las condiciones para tus fechas</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner de Consulta */}
          <div
            style={{
              marginTop: '5rem',
              backgroundColor: 'var(--color-ocean-50)',
              borderRadius: 'var(--radius-lg)',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              border: '1px solid var(--color-ocean-100)',
            }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--color-petrol-primary)' }}>
              ¿Querés disfrutar de estas instalaciones?
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Escribinos por WhatsApp con tus fechas de viaje y te informamos las habitaciones disponibles.
            </p>
            <a
              href={getWhatsAppUrl({ notes: 'Consulta desde página de servicios' })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ padding: '0.95rem 2rem', fontSize: '1.05rem' }}
            >
              <MessageCircle size={20} />
              <span>Consultar disponibilidad por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
