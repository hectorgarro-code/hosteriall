import { ExternalLink, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function ReviewsSection() {
  return (
    <section className="section section-bg-alt">
      <div className="container trust-section">
        <div>
          <span className="eyebrow">Elegí con tranquilidad</span>
          <h2 className="section-title">Conocé el lugar antes de venir.</h2>
          <p className="section-subtitle">Mirá nuestras fotos, buscá las opiniones de otros viajeros y preguntanos lo que necesites. Te ayudamos a encontrar la opción para tu estadía.</p>
        </div>
        <div className="button-row">
          <a href={siteConfig.contact.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Buscar opiniones en Google Maps <ExternalLink size={17} /></a>
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><MessageCircle size={18} /> Hablemos de tu viaje</a>
        </div>
      </div>
    </section>
  );
}
