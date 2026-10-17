'use client';

import React from 'react';
import Image from 'next/image';
import { Waves, Coffee, Trees, Flame, Car, Wifi } from 'lucide-react';
import { ServiceItem } from '@/types';

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'waves':
        return <Waves size={20} />;
      case 'coffee':
        return <Coffee size={20} />;
      case 'trees':
        return <Trees size={20} />;
      case 'flame':
        return <Flame size={20} />;
      case 'car':
        return <Car size={20} />;
      case 'wifi':
        return <Wifi size={20} />;
      default:
        return <Waves size={20} />;
    }
  };

  return (
    <div
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
      className="service-card"
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/10',
          overflow: 'hidden',
        }}
      >
        <Image
          src={service.image}
          alt={service.imageAlt || service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transition: 'transform var(--transition-smooth)',
          }}
          className="service-card-img"
        />
        {service.badge && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(15, 55, 78, 0.85)',
              color: 'var(--color-white)',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {service.badge}
          </span>
        )}
      </div>

      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.5rem', color: 'var(--color-ocean-600)' }}>
          {renderIcon(service.icon)}
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--color-petrol-primary)',
            }}
          >
            {service.title}
          </h3>
        </div>
        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
        >
          {service.benefit}
        </p>
      </div>

      <style jsx>{`
        .service-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .service-card:hover :global(.service-card-img) {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
