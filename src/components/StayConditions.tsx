import { Clock, Coffee, CreditCard, PawPrint, Waves } from 'lucide-react';
import { stayPolicies } from '@/data/policies';

export function StayConditions() {
  return (
    <div className="stay-conditions" aria-label="Información para tu estadía">
      <div><Coffee size={21} /><span>Desayuno incluido</span></div>
      <div><Clock size={21} /><span>Ingreso {stayPolicies.checkIn} · Salida {stayPolicies.checkOut}</span></div>
      <div><PawPrint size={21} /><span>Mascotas permitidas</span></div>
      <div><CreditCard size={21} /><span>Efectivo o transferencia · Reserva con seña</span></div>
      <div><Waves size={21} /><span>Pileta climatizada al aire libre todo el verano</span></div>
    </div>
  );
}
