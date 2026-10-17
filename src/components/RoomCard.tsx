'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Bed, Sparkles, ArrowRight } from 'lucide-react';
import { Room } from '@/types';
import { trackEvent } from '@/lib/analytics';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const handleClick = () => {
    trackEvent('room_view', { room_slug: room.slug, room_name: room.name });
  };

  return (
    <article
      style={{
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
      }}
      className="room-card"
    >
      {/* Imagen */}
      <Link
        href={`/habitaciones/${room.slug}`}
        onClick={handleClick}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/10',
          display: 'block',
          overflow: 'hidden',
        }}
      >
        <Image
          src={room.mainImage}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{
            objectFit: 'cover',
            transition: 'transform var(--transition-smooth)',
          }}
          className="room-card-img"
        />
      </Link>

      {/* Contenido */}
      <div
        style={{
          padding: '1.35rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            marginBottom: '0.75rem',
          }}
        >
          <Link
            href={`/habitaciones/${room.slug}`}
            onClick={handleClick}
            style={{ color: 'var(--color-petrol-primary)' }}
          >
            {room.name}
          </Link>
        </h3>

        {/* Especificaciones visuales */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            fontSize: '0.88rem',
            color: 'var(--color-text-muted)',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} style={{ color: 'var(--color-ocean-600)', flexShrink: 0 }} />
            <span>{room.capacityLabel}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bed size={16} style={{ color: 'var(--color-ocean-600)', flexShrink: 0 }} />
            <span>{room.bedConfig}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} style={{ color: '#D97706', flexShrink: 0 }} />
            <span style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>{room.featuredHighlight}</span>
          </div>
        </div>

        {/* Botón Ver Habitación */}
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-sand-100)' }}>
          <Link
            href={`/habitaciones/${room.slug}`}
            onClick={handleClick}
            className="btn btn-outline"
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              fontSize: '0.88rem',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <span>Ver habitación</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .room-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .room-card:hover :global(.room-card-img) {
          transform: scale(1.04);
        }
      `}</style>
    </article>
  );
}
