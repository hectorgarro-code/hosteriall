export interface Room {
  id: string;
  slug: string;
  name: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  capacity: number;
  capacityLabel: string;
  bedConfig: string;
  featuredHighlight: string;
  mainImage: string;
  gallery: string[];
  amenities: {
    icon: string;
    label: string;
    description?: string;
  }[];
  specifications: {
    title: string;
    value: string;
  }[];
  seoTitle: string;
  seoDescription: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  benefit: string;
  description: string;
  icon: string;
  image: string;
  imageAlt?: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'servicios' | 'habitaciones' | 'ubicacion';
}

export interface ReviewItem {
  id: string;
  author: string;
  source: 'Google';
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: 'all' | 'habitaciones' | 'pileta' | 'parque' | 'desayuno' | 'espacios' | 'destino';
  title: string;
}

export interface SiteConfig {
  url: string;
  logo: string;
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  seasonNotice: string;
  address: {
    street: string;
    city: string;
    party: string;
    province: string;
    country: string;
    postalCode: string;
    googleMapsEmbedUrl: string;
    googleMapsLink: string;
    beachDistance: string;
    centerDistance: string;
    pierDistance: string;
  };
  contact: {
    whatsappNumber: string; // formato internacional sin signos para links ej: 5491150042443
    whatsappDisplay: string; // ej: +54 11 5004-2443
    landline: string; // ej: 02257 462794
    landlineDisplay: string; // ej: (02257) 46-2794
    email: string;
    instagramUrl: string;
    facebookUrl: string;
    googleReviewsUrl: string;
  };
  inquiryDefaultMessage: string;
}
