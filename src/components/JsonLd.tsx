import { siteConfig } from '@/data/config';
import { roomsData } from '@/data/rooms';
import { stayPolicies } from '@/data/policies';

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'LodgingBusiness',
    '@id': siteConfig.url + '/#hosteria',
    name: siteConfig.name, description: siteConfig.heroSubtitle, url: siteConfig.url,
    telephone: siteConfig.contact.whatsappDisplay, email: siteConfig.contact.email,
    image: siteConfig.url + '/images/real/resized_dsc_0013-scaled.webp',
    logo: siteConfig.url + siteConfig.logo,
    checkinTime: stayPolicies.checkIn, checkoutTime: stayPolicies.checkOut,
    petsAllowed: stayPolicies.petsAllowed,
    paymentAccepted: stayPolicies.paymentMethods.join(', '),
    sameAs: [siteConfig.contact.instagramUrl, siteConfig.contact.facebookUrl],
    address: { '@type': 'PostalAddress', streetAddress: siteConfig.address.street, addressLocality: siteConfig.address.city, addressRegion: siteConfig.address.province, postalCode: siteConfig.address.postalCode, addressCountry: 'AR' },
    amenityFeature: ['Desayuno incluido', 'Pileta climatizada al aire libre en verano', 'Wi-Fi sin cargo', 'Parque y quincho', 'Parrilla techada'].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    containsPlace: roomsData.map(room => ({ '@type': 'HotelRoom', name: room.name, url: siteConfig.url + '/habitaciones/' + room.slug + '/', description: room.shortDescription, image: siteConfig.url + room.mainImage, occupancy: { '@type': 'QuantitativeValue', maxValue: room.capacity } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}
