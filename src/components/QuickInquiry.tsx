'use client';

import { useEffect, useId, useState, type FormEvent } from 'react';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { roomsData } from '@/data/rooms';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

function todayInArgentina() {
  const parts = new Intl.DateTimeFormat('en', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)?.value).join('-');
}
function nextDay(value: string) {
  if (!value) return '';
  const date = new Date(value + 'T12:00:00Z');
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function QuickInquiry({ initialRoom, variant = 'hero', showRoom = true }: { initialRoom?: string; variant?: 'hero' | 'standalone'; showRoom?: boolean }) {
  const id = useId();
  const [today, setToday] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [childrenAges, setChildrenAges] = useState('');
  const [room, setRoom] = useState(initialRoom || '');
  const [error, setError] = useState('');
  useEffect(() => setToday(todayInArgentina()), []);
  const selectedRoom = roomsData.find(item => item.name === room);
  const largerGroup = selectedRoom && Number(adults) + Number(children) > selectedRoom.capacity;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentToday = todayInArgentina();
    if (!checkIn || !checkOut || checkIn < currentToday || checkOut <= checkIn) {
      setError('Elegí un ingreso desde hoy y una salida posterior al ingreso.');
      return;
    }
    setError('');
    trackEvent('quick_inquiry', { room, adults: Number(adults), children: Number(children) });
    window.open(getWhatsAppUrl({ checkIn, checkOut, adults, children, childrenAges, roomName: room, notes: largerGroup ? 'Somos más personas que la capacidad de esta categoría; quisiera consultar opciones para varias habitaciones.' : undefined }), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className={'inquiry-card quick-inquiry quick-inquiry-' + variant}>
      <span className="eyebrow"><Calendar size={16} /> Verano 2027</span>
      <h2>Consultá tu estadía</h2>
      <p>Contanos cuándo y con quién viajarías.</p>
      <form onSubmit={submit}>
        <div className="form-pair">
          <div className="form-group">
            <label className="form-label" htmlFor={id + '-in'}>Ingreso</label>
            <input id={id + '-in'} className="form-input" type="date" required min={today} value={checkIn} onInput={event => { const value = event.currentTarget.value; setCheckIn(value); if (checkOut && checkOut <= value) setCheckOut(''); setError(''); }} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor={id + '-out'}>Salida</label>
            <input id={id + '-out'} className="form-input" type="date" required min={nextDay(checkIn) || today} value={checkOut} onInput={event => { setCheckOut(event.currentTarget.value); setError(''); }} />
          </div>
        </div>
        <div className="form-pair">
          <div className="form-group">
            <label className="form-label" htmlFor={id + '-adults'}>Adultos</label>
            <select id={id + '-adults'} className="form-select" value={adults} onChange={event => setAdults(event.target.value)}>{[1, 2, 3, 4, 5, 6].map(value => <option key={value} value={value}>{value}</option>)}</select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor={id + '-children'}>Chicos</label>
            <select id={id + '-children'} className="form-select" value={children} onChange={event => setChildren(event.target.value)}>{[0, 1, 2, 3, 4].map(value => <option key={value} value={value}>{value}</option>)}</select>
          </div>
        </div>
        {Number(children) > 0 && <div className="form-group">
          <label className="form-label" htmlFor={id + '-ages'}>Edades de los chicos (opcional)</label>
          <input id={id + '-ages'} className="form-input" value={childrenAges} maxLength={80} placeholder="Por ejemplo: 4 y 8 años" onChange={event => setChildrenAges(event.target.value)} />
        </div>}
        {showRoom && <div className="form-group">
          <label className="form-label" htmlFor={id + '-room'}>Habitación (opcional)</label>
          <select id={id + '-room'} className="form-select" value={room} onChange={event => setRoom(event.target.value)}>
            <option value="">Ayudame a elegir</option>
            {roomsData.map(item => <option key={item.id} value={item.name}>{item.name} · {item.capacityLabel}</option>)}
          </select>
        </div>}
        {largerGroup && <p className="form-note">Esta categoría es para {selectedRoom.capacityLabel}. Podés consultar opciones para varias habitaciones.</p>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="btn btn-whatsapp inquiry-submit" type="submit"><MessageCircle size={19} /> Consultar por WhatsApp <ArrowRight size={17} /></button>
        <p className="form-disclaimer">Se abre WhatsApp con tu mensaje. La consulta no confirma una reserva.</p>
      </form>
      {variant === 'standalone' && !showRoom && <a className="text-link inquiry-direct-link" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">Prefiero consultar sin completar fechas <ArrowRight size={17} /></a>}
    </div>
  );
}
