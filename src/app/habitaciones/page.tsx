import React from 'react';
import { pageMetadata } from '@/lib/metadata';
import { roomsData } from '@/data/rooms';
import { RoomCard } from '@/components/RoomCard';
import { QuickInquiry } from '@/components/QuickInquiry';

export const metadata = pageMetadata("Habitaciones para dos y tres personas", "Conocé las cuatro categorías de Hostería La Lucila con fotos reales. Consultá opciones para tu viaje de a dos o en familia en verano 2027.", "/habitaciones");

export default function RoomsPage() {
  return (
    <>
      {/* Cabecera de Página */}
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
            Alojamiento
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              color: 'var(--color-white)',
              marginBottom: '0.85rem',
            }}
          >
            Nuestras Habitaciones
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
            Conocé nuestras cuatro categorías con fotografías de cada una. Todas las estadías incluyen desayuno. Contanos tus fechas y quiénes viajan para orientarte con las opciones.
          </p>
        </div>
      </section>

      {/* Catálogo de Habitaciones */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2rem',
              marginBottom: '4.5rem',
            }}
          >
            {roomsData.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <h2 style={{ fontSize: '1.7rem' }}>Compará de un vistazo</h2>
          <div className="comparison-wrap"><table className="comparison-table"><thead><tr><th scope="col">Habitación</th><th scope="col">Personas</th><th scope="col">Camas</th><th scope="col">Conocer</th></tr></thead><tbody>{roomsData.map(room => <tr key={room.id}><th scope="row">{room.name}</th><td>{room.capacityLabel}</td><td>{room.bedConfig}</td><td><a className="text-link" href={'/habitaciones/' + room.slug}>Ver fotos de {room.name}</a></td></tr>)}</tbody></table></div>
          {/* Tarjeta de Consulta integrada */}
          <div
            style={{
              backgroundColor: 'var(--color-sand-100)',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2rem',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>
                ¿Buscás disponibilidad para tu familia?
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>
                Consultanos por WhatsApp con tus fechas y la cantidad de personas. Te respondemos con disponibilidad, tarifas y condiciones para tu viaje.
              </p>
            </div>
            <QuickInquiry variant="standalone" />
          </div>
        </div>
      </section>
    </>
  );
}
