export const TIMEZONE = 'America/Buenos_Aires';
export const PLATFORMS = ['Instagram', 'Facebook'];
export const STATUSES = ['DRAFT', 'GENERATED', 'READY_FOR_APPROVAL', 'APPROVED', 'SCHEDULED', 'PUBLISHED', 'FAILED', 'MANUAL_REQUIRED'];
export const TEMPLATES = {
  StoryHero: { theme: 'photo', label: 'Nuestro lugar' },
  StoryDestination: { theme: 'photo', label: 'La Lucila del Mar' },
  StoryPhoto: { theme: 'photo', label: 'Conocé la hostería' },
  StoryFeature: { theme: 'cream', label: 'Para tu estadía' },
  StoryQuestion: { theme: 'green', label: 'Un verano a tu ritmo' },
  StoryPoll: { theme: 'cream', label: 'Para imaginar el verano' },
  StoryChecklist: { theme: 'cream', label: 'Antes de venir' },
  StoryMap: { theme: 'cream', label: 'Cómo llegar' },
  StoryCalendar: { theme: 'cream', label: 'Elegí tus fechas' },
  StoryHumor: { theme: 'green', label: 'Modo vacaciones' },
  StoryHoliday: { theme: 'cream', label: 'Tiempo para compartir' },
  StoryCTA: { theme: 'green', label: 'Verano 2027' },
};
export const CAPABILITIES = {
  adapter: 'browser-meta-session', apiConfigured: false,
  operator: 'Codex con navegador autorizado',
  stories: { Instagram: true, Facebook: true, scheduling: true, maxAdvanceDays: 29, minimumLeadMinutes: 20, observedOn: '2026-10-18' },
  nativeInteractionsVerified: false,
  warning: 'La cola local no es una confirmación de Meta. Se requiere Codex activo y sesión autorizada.',
};
export function sanitize(text) {
  return String(text || '').replace(/(?:Bearer\s+\S+|(?:access_token|token|secret|password|cookie)\s*[:=]\s*\S+)/gi, '[dato protegido]')
    .replace(/https?:\/\/\S+/g, '[enlace protegido]').replace(/\b\d{8,}\b/g, '[identificador protegido]').slice(0, 350);
}
export function scheduledInstant(row) { return new Date(`${row.date}T${row.time}:00-03:00`); }
export function deliveryInstant(row, slideId) { return new Date(+scheduledInstant(row) + row.slides.findIndex(s=>s.id===slideId)*60000); }
export function scheduleWindow(row, now = new Date()) {
  const minutes = (scheduledInstant(row) - now) / 60000;
  if (minutes < 20) return 'PAST_OR_TOO_SOON';
  return minutes > 29 * 24 * 60 ? 'WAITING_WINDOW' : 'IN_WINDOW';
}
