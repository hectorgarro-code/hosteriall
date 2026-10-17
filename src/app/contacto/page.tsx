'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Send,
  ExternalLink,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/SocialIcons';
import { FaqAccordion } from '@/components/FaqAccordion';
import { StayConditions } from '@/components/StayConditions';
import { siteConfig } from '@/data/config';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiry, setInquiry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('submit_contact', { location: 'contact_page' });

    const message = `Hola, quisiera consultar una estadía para verano 2027. Mi nombre es ${name.trim()}. Mi teléfono es ${phone.trim()}${
      email ? ` (${email})` : ''
    }. Consulta: ${inquiry.trim()}`;

    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
            Atención Personalizada
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              color: 'var(--color-white)',
              marginBottom: '0.85rem',
            }}
          >
            Contacto y Ubicación
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
            Estamos a tu disposición para responder cualquier consulta y brindarte asesoramiento directo para tus vacaciones.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '3.5rem',
              alignItems: 'start',
              marginBottom: '4.5rem',
            }}
          >
            {/* Formulario */}
            <div className="inquiry-card" style={{ maxWidth: '100%' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="eyebrow">Envianos un mensaje</span>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                  Formulario de Consulta
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Completá tus datos y se abrirá WhatsApp con el mensaje listo para enviar.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    className="form-input"
                    placeholder="Tu nombre y apellido"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    minLength={6}
                    maxLength={40}
                    className="form-input"
                    placeholder="Ej: +54 9 11 1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Correo electrónico (opcional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    maxLength={150}
                    className="form-input"
                    placeholder="tuemail@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="inquiry">
                    Tu consulta o mensaje *
                  </label>
                  <textarea
                    id="inquiry"
                    rows={4}
                    maxLength={2000}
                    className="form-textarea"
                    placeholder="Contanos qué fechas tenés pensadas, cuántas personas viajan o qué dudas tenés..."
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '1rem', fontSize: '1.02rem', marginTop: '0.5rem' }}
                >
                  <MessageCircle size={20} />
                  <span>Enviar consulta por WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Datos Directos */}
            <div>
              <span className="eyebrow">Canales Oficiales</span>
              <h2 style={{ fontSize: '1.85rem', marginBottom: '1.5rem' }}>
                Hostería La Lucila
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-ocean-100)',
                      color: 'var(--color-ocean-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={22} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--color-petrol-primary)' }}>
                      Dirección
                    </strong>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                      {siteConfig.address.street}, {siteConfig.address.city}
                      <br />
                      {siteConfig.address.party}, Provincia de Buenos Aires (B7113)
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-whatsapp-light)',
                      color: 'var(--color-whatsapp)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--color-petrol-primary)' }}>
                      WhatsApp
                    </strong>
                    <a
                      href={getWhatsAppUrl({ notes: 'Consulta desde página contacto' })}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-whatsapp)', fontWeight: 600, fontSize: '0.94rem' }}
                    >
                      {siteConfig.contact.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-sand-100)',
                      color: 'var(--color-petrol-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={22} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--color-petrol-primary)' }}>
                      Teléfono Fijo
                    </strong>
                    <a
                      href={`tel:${siteConfig.contact.landline}`}
                      style={{ color: 'var(--color-petrol-primary)', fontSize: '0.94rem' }}
                    >
                      {siteConfig.contact.landlineDisplay}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-ocean-100)',
                      color: 'var(--color-ocean-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={22} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--color-petrol-primary)' }}>
                      Correo Electrónico
                    </strong>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      style={{ color: 'var(--color-ocean-700)', fontSize: '0.94rem' }}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
                  Redes Sociales
                </h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a
                    href={siteConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
                  >
                    <InstagramIcon size={17} />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={siteConfig.contact.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
                  >
                    <FacebookIcon size={17} />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 1.5rem', backgroundColor: 'var(--color-sand-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-petrol-primary)' }}>
                Ubicación en San Juan 4818, La Lucila del Mar
              </span>
              <a
                href={siteConfig.address.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  color: 'var(--color-ocean-700)',
                  fontWeight: 600,
                }}
              >
                <span>Ver en Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
            <iframe
              title="Mapa de San Juan 4818, La Lucila del Mar"
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
      <section id="preguntas-frecuentes" className="section section-bg-alt"><div className="container"><h2 className="section-title">Información para tu estadía</h2><StayConditions /><FaqAccordion /></div></section>
    </>
  );
}
