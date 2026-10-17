'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Solo mostrar después de hacer scroll pasando el Hero inicial
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    trackEvent('click_whatsapp', { location: 'floating_button' });
  };

  if (!isVisible) return null;

  return (
    <a
      href={getWhatsAppUrl({ notes: 'Consulta desde botón flotante' })}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="floating-whatsapp"
      aria-label="Consultar disponibilidad por WhatsApp"
      title="Consultar por WhatsApp"
      style={{
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      <MessageCircle size={24} />
      <span className="floating-whatsapp-text">Consultar por WhatsApp</span>
    </a>
  );
}
