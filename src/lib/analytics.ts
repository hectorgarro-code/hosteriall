declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | 'click_whatsapp'
  | 'click_phone'
  | 'submit_contact'
  | 'room_view'
  | 'room_whatsapp'
  | 'quick_inquiry'
  | 'gallery_view'
  | 'map_click';

export function trackEvent(eventName: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event] ${eventName}:`, params);
  }
}
