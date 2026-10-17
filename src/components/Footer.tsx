'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/SocialIcons';
import { siteConfig } from '@/data/config';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-petrol-900)',
        color: '#E0E8ED',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        borderTop: '3px solid var(--color-ocean-600)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Identidad */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '4px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={siteConfig.logo}
                  alt="Logo Hostería La Lucila"
                  width={42}
                  height={42}
                  style={{
                    objectFit: 'contain',
                    height: '36px',
                    width: 'auto',
                  }}
                />
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9AB4C4', display: 'block' }}>
                  Hostería
                </span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-white)', letterSpacing: '0.04em' }}>
                  LA LUCILA
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#B2C6D4', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {siteConfig.heroSubtitle}
            </p>
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  transition: 'background-color var(--transition-fast)',
                }}
                aria-label="Instagram de Hostería La Lucila"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={siteConfig.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  transition: 'background-color var(--transition-fast)',
                }}
                aria-label="Facebook de Hostería La Lucila"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Navegación rápida */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-white)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              <li>
                <Link href="/" style={{ color: '#B2C6D4' }}>Inicio</Link>
              </li>
              <li>
                <Link href="/verano-2027" style={{ color: '#B2C6D4' }}>Verano 2027</Link>
              </li>
              <li><Link href="/habitaciones" style={{ color: '#B2C6D4' }}>Habitaciones</Link></li>
              <li>
                <Link href="/servicios" style={{ color: '#B2C6D4' }}>Servicios e Instalaciones</Link>
              </li>
              <li>
                <Link href="/la-lucila-del-mar" style={{ color: '#B2C6D4' }}>La Lucila del Mar</Link>
              </li>
              <li>
                <Link href="/galeria" style={{ color: '#B2C6D4' }}>Galería de Fotos</Link>
              </li>
              <li>
                <Link href="/contacto" style={{ color: '#B2C6D4' }}>Contacto y Ubicación</Link>
              </li>
            </ul>
          </div>

          {/* Contacto y Ubicación */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-white)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              Contacto Directo
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--color-ocean-400)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ display: 'block', color: 'var(--color-white)', fontWeight: 500 }}>
                    {siteConfig.address.street}
                  </span>
                  <span style={{ color: '#9AB4C4', fontSize: '0.85rem' }}>
                    {siteConfig.address.city}, {siteConfig.address.party} (B7113)
                  </span>
                </div>
              </div>

              <a
                href={getWhatsAppUrl({ notes: 'Consulta desde footer' })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_whatsapp', { location: 'footer' })}
                style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#4ADE80' }}
              >
                <MessageCircle size={18} style={{ flexShrink: 0 }} />
                <span>WhatsApp: {siteConfig.contact.whatsappDisplay}</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.landline}`}
                onClick={() => trackEvent('click_phone', { location: 'footer' })}
                style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#B2C6D4' }}
              >
                <Phone size={18} style={{ color: 'var(--color-ocean-400)', flexShrink: 0 }} />
                <span>Tel: {siteConfig.contact.landlineDisplay}</span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#B2C6D4' }}
              >
                <Mail size={18} style={{ color: 'var(--color-ocean-400)', flexShrink: 0 }} />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Horarios & Ubicación */}
          <div id="ubicacion">
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-white)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              Ubicación Privilegiada
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#B2C6D4', marginBottom: '1rem', lineHeight: 1.6 }}>
              A dos cuadras de la playa, en La Lucila del Mar. Un entorno para disfrutar de tus vacaciones a tu ritmo.
            </p>
            <a
              href={siteConfig.address.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('map_click', { location: 'footer' })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--color-ocean-400)',
                fontSize: '0.88rem',
                fontWeight: 600,
              }}
            >
              <span>Ver en Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Barra inferior */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#7D95A5',
          }}
        >
          <div>
            © {currentYear} {siteConfig.name}. Todos los derechos reservados. La Lucila del Mar — Partido de La Costa.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Atención personalizada sin intermediarios</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
