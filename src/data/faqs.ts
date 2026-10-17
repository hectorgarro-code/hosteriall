import { FAQItem } from '@/types';
import { stayPolicies } from '@/data/policies';

export const faqsData: FAQItem[] = [
  { id: 'faq-consulta', question: '¿Cómo consulto por el verano 2027?', answer: 'Envianos por WhatsApp tus fechas de ingreso y salida, la cantidad de adultos y, si viajás con chicos, sus edades. Si ya elegiste una categoría, contanos cuál. Te respondemos con las opciones y condiciones para tu estadía.', category: 'general' },
  { id: 'faq-habitaciones', question: '¿Qué tipos de habitaciones tienen?', answer: 'Podés conocer la Doble Estándar, Triple Estándar, Triple Parque y Triple con Balcón. En cada ficha encontrás fotografías de esa categoría. Consultanos cuál se adapta mejor a tu viaje.', category: 'habitaciones' },
  { id: 'faq-desayuno', question: '¿El desayuno está incluido?', answer: 'Sí, el desayuno casero está incluido en tu estadía y se sirve en nuestro salón comedor.', category: 'servicios' },
  { id: 'faq-estacionamiento', question: '¿Tienen cochera?', answer: 'Contamos con cochera semicubierta, sujeta a disponibilidad. Si viajás en auto, consultá por un lugar al pedir tu cotización.', category: 'servicios' },
  { id: 'faq-pileta', question: '¿Cuándo funciona la pileta?', answer: 'La pileta climatizada al aire libre funciona durante todo el verano. Un espacio para disfrutar del agua y del parque durante tus vacaciones.', category: 'servicios' },
  { id: 'faq-ubicacion', question: '¿Dónde está la hostería?', answer: 'Estamos en San Juan 4818, La Lucila del Mar, Partido de La Costa, a dos cuadras de la playa. En Contacto encontrás el mapa y el enlace para organizar tu llegada.', category: 'ubicacion' },
  { id: 'faq-horarios', question: '¿Cuáles son los horarios de ingreso y salida?', answer: 'El ingreso es a partir de las ' + stayPolicies.checkIn + ' y la salida hasta las ' + stayPolicies.checkOut + '. Si necesitás llegar en otro horario, consultanos antes de viajar.', category: 'general' },
  { id: 'faq-mascotas', question: '¿Puedo viajar con mascota?', answer: 'Sí, las mascotas están permitidas. Avisános que viajás con la tuya para organizar tu llegada.', category: 'general' },
  { id: 'faq-pagos', question: '¿Cómo se confirma una reserva?', answer: 'Podés reservar con una seña. Los medios de pago son efectivo o transferencia bancaria. Al cotizar te indicamos el importe y el procedimiento de confirmación. ' + stayPolicies.cancellation + ' El envío de una consulta no confirma una reserva.', category: 'general' },
];
