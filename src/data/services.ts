import { ServiceItem } from '@/types';

export const servicesData: ServiceItem[] = [
  {
    id: 'pileta', title: 'Pileta climatizada', icon: 'waves',
    benefit: 'Una pausa en el agua, rodeada de verde.',
    description: 'Pileta climatizada al aire libre en el patio de la hostería, en funcionamiento durante todo el verano. Un espacio rodeado de verde para disfrutar del agua y descansar después de la playa.',
    image: '/images/real/resized_dsc_0013-scaled.webp', badge: 'Todo el verano',
  },
  {
    id: 'desayuno', title: 'Desayuno incluido', icon: 'coffee',
    benefit: 'Empezá la mañana sin apuro.',
    description: 'El desayuno casero está incluido en tu estadía y se sirve en nuestro salón comedor. Mirá las fotografías y empezá cada mañana con tiempo para disfrutar.',
    image: '/images/real/tam_inst-30.webp', badge: 'Incluido en tu estadía',
  },
  {
    id: 'parque', title: 'Parque y quincho', icon: 'trees',
    benefit: 'El parque también es descanso.',
    description: 'Espacios verdes, un quincho abierto y mesas con sombrilla para compartir una charla, leer o pasar un rato al aire libre. Un rincón para quedarte entre un paseo y otro.',
    image: '/images/real/resized_pa232504.webp',
  },
  {
    id: 'parrilla', title: 'Parrilla techada', icon: 'flame',
    benefit: 'Un lugar para compartir la mesa.',
    description: 'La hostería cuenta con parrilla techada y espacios para comer al aire libre. Consultanos cómo organizar su uso durante tu estadía.',
    image: '/images/real/tam_inst-19.webp', imageAlt: 'Mesas bajo un sector de sombra en el parque de la hostería',
  },
  {
    id: 'estacionamiento', title: 'Cochera semicubierta', icon: 'car',
    benefit: 'Una comodidad más para tu viaje.',
    description: 'Contamos con cochera semicubierta, sujeta a disponibilidad. Si venís en auto, avisános al consultar para conocer las opciones para tus fechas.',
    image: '/images/real/resized_pa232545.webp', imageAlt: 'Acceso a la hostería junto al parque', badge: 'Sujeta a disponibilidad',
  },
  {
    id: 'wifi-comedor', title: 'Wi-Fi y salón comedor', icon: 'wifi',
    benefit: 'Comodidades para sentirte como en casa.',
    description: 'Wi-Fi sin cargo y un salón común con mesas, sillas, TV, heladera de uso compartido, freezer y microondas. Espacios para organizar tu día a tu manera.',
    image: '/images/real/resized_pa232556.webp',
  },
];
