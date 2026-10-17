'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Evitar que el acceso flotante cubra un formulario visible.
      const inquiryVisible = [...document.querySelectorAll('.quick-inquiry')].some(card => {
        const rect = card.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      setIsVisible(window.scrollY > 450 && !inquiryVisible);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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
