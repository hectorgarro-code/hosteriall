import React from 'react';
import { pageMetadata } from '@/lib/metadata';
import { GalleryGrid } from '@/components/GalleryGrid';

export const metadata = pageMetadata("Fotos de la hostería", "Recorré Hostería La Lucila con fotos de habitaciones, pileta, parque, desayunos y espacios comunes tomadas de nuestra web.", "/galeria");

export default function GalleryPage() {
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
            Fotografías Reales
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              color: 'var(--color-white)',
              marginBottom: '0.85rem',
            }}
          >
            Galería de Hostería La Lucila
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
            Conocé nuestros rincones: la pileta soleada, el verde del parque, nuestras habitaciones y los espacios pensados para tu bienestar.
          </p>
        </div>
      </section>

      {/* Contenedor de la Galería con filtros interactivos */}
      <section className="section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
