'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MessageCircle, Menu, X, Phone } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Verano 2027', href: '/verano-2027' },
    { label: 'Habitaciones', href: '/habitaciones' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'La Lucila del Mar', href: '/la-lucila-del-mar' },
    { label: 'Galería', href: '/galeria' },
    { label: 'Contacto', href: '/contacto' },
  ];

  const handleWhatsAppClick = () => {
    trackEvent('click_whatsapp', { location: 'header_nav' });
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
        transition: 'all var(--transition-normal)',
        paddingTop: isScrolled ? '0.65rem' : '0.95rem',
        paddingBottom: isScrolled ? '0.65rem' : '0.95rem',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.95rem',
            textDecoration: 'none',
          }}
        >
          <Image
            src={siteConfig.logo}
            alt="Logo Hostería La Lucila"
            width={72}
            height={52}
            style={{
              objectFit: 'contain',
              height: '52px',
              width: 'auto',
            }}
            preload
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.8rem',
                letterSpacing: '0.24em',
                color: '#146231',
                fontWeight: 600,
                textTransform: 'uppercase',
                lineHeight: 1.1,
              }}
            >
              Hostería
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                letterSpacing: '0.04em',
                color: '#146231',
                fontWeight: 700,
                lineHeight: 1.05,
              }}
            >
              LA LUCILA
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'));
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-ocean-700)' : 'var(--color-text-main)',
                  position: 'relative',
                  padding: '0.35rem 0',
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--color-ocean-600)',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button Desktop */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.85rem' }} className="desktop-nav">
          <a
            href={getWhatsAppUrl({ notes: 'Consulta desde navegación principal' })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="btn btn-whatsapp"
            style={{ fontSize: '0.88rem', padding: '0.65rem 1.25rem' }}
          >
            <MessageCircle size={17} />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-trigger">
          <a
            href={getWhatsAppUrl({ notes: 'Consulta desde barra móvil' })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="btn btn-whatsapp"
            style={{
              padding: '0.5rem 0.85rem',
              fontSize: '0.82rem',
              display: 'inline-flex',
            }}
            aria-label="Consultar por WhatsApp"
          >
            <MessageCircle size={16} />
            <span className="mobile-cta-text">WhatsApp</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.45rem',
              cursor: 'pointer',
              color: 'var(--color-petrol-primary)',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-movil"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="menu-movil"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            padding: '1.25rem 1.5rem 1.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.05rem',
                fontWeight: pathname === link.href ? 700 : 500,
                color: pathname === link.href ? 'var(--color-ocean-700)' : 'var(--color-text-main)',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--color-sand-100)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href={getWhatsAppUrl({ notes: 'Consulta desde menú móvil' })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="btn btn-whatsapp"
              style={{ width: '100%' }}
            >
              <MessageCircle size={18} />
              <span>Consultar por WhatsApp</span>
            </a>
            <a
              href={`tel:${siteConfig.contact.landline}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                padding: '0.5rem',
              }}
            >
              <Phone size={15} />
              <span>Llamar: {siteConfig.contact.landlineDisplay}</span>
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 1280px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-trigger {
            display: none !important;
          }
        }
        @media (max-width: 450px) {
          .mobile-cta-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
