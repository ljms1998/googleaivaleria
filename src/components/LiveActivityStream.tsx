import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, XCircle, RefreshCw, Zap, MapPin, ChevronRight } from 'lucide-react';

interface ActivityEvent {
  id: string;
  agent: 'Valeria' | 'Marco';
  agentRole: string;
  action: 'agendado' | 'descartado' | 'reactivado' | 'analizado';
  tag: string;
  tagColor: string;
  textColor: string;
  location: string;
  property: string;
  detail: string;
  financialMetric: string;
  timeAgo: string;
}

const LIVE_EVENTS: ActivityEvent[] = [
  {
    id: 'evt-1',
    agent: 'Valeria',
    agentRole: 'SDR Autónomo Inmobiliario',
    action: 'agendado',
    tag: 'VISITA CONFIRMADA',
    tagColor: 'bg-[#10B981]',
    textColor: 'text-black',
    location: 'Pozuelo de Alarcón, Madrid',
    property: 'Villa Unifamiliar de 1.450.000 €',
    detail: 'Comprobada preaprobación hipotecaria BBVA por 900k€ + fondos propios. Asignada a broker senior Elena Ruiz.',
    financialMetric: 'Score Solvencia: 96/100',
    timeAgo: 'Hace 4 segundos',
  },
  {
    id: 'evt-2',
    agent: 'Valeria',
    agentRole: 'Filtro Autónomo 24/7',
    action: 'descartado',
    tag: 'CURIOSO DESCARTADO',
    tagColor: 'bg-[#EF4444]',
    textColor: 'text-white',
    location: 'Barrio Salamanca, Madrid',
    property: 'Ático Dúplex de 780.000 €',
    detail: 'Lead solicitaba alquiler con opción a compra a 900€/mes con brecha financiera insalvable. 0 horas perdidas.',
    financialMetric: 'Brecha: 480.000 €',
    timeAgo: 'Hace 28 segundos',
  },
  {
    id: 'evt-3',
    agent: 'Marco',
    agentRole: 'Concierge de Cartera',
    action: 'reactivado',
    tag: 'LEAD FRÍO REACTIVADO',
    tagColor: 'bg-[#3B82F6]',
    textColor: 'text-white',
    location: 'Sarrià-Sant Gervasi, Barcelona',
    property: 'Piso Señorial de 1.150.000 €',
    detail: 'Comprador inactivo desde hace 4 meses reactivado tras ajuste de precio de 40.000€. Segunda visita concertada.',
    financialMetric: 'Interés Reanudado en 14 min',
    timeAgo: 'Hace 52 segundos',
  },
  {
    id: 'evt-4',
    agent: 'Valeria',
    agentRole: 'SDR Autónomo Inmobiliario',
    action: 'agendado',
    tag: 'VISITA CONFIRMADA',
    tagColor: 'bg-[#10B981]',
    textColor: 'text-black',
    location: 'La Moraleja, Alcobendas',
    property: 'Mansión Contemporánea 2.800.000 €',
    detail: 'Fondos directos verificados mediante extracto bancario corporativo. Cita fijada para mañana 16:30.',
    financialMetric: 'Comprador al Contado (100%)',
    timeAgo: 'Hace 1 minuto',
  },
  {
    id: 'evt-5',
    agent: 'Valeria',
    agentRole: 'Cualificación Financiera',
    action: 'analizado',
    tag: 'SOLVENCIA VERIFICADA',
    tagColor: 'bg-[#F59E0B]',
    textColor: 'text-black',
    location: 'Chamberí, Madrid',
    property: 'Bajo con Jardín de 520.000 €',
    detail: 'Validada solvencia neta de 4.800€/mes y aval bancario. En cola para agendar hora con el propietario.',
    financialMetric: 'Ratio Endeudamiento: 28%',
    timeAgo: 'Hace 2 minutos',
  },
];

interface LiveActivityStreamProps {
  onOpenSimulator: () => void;
}

export const LiveActivityStream: React.FC<LiveActivityStreamProps> = ({ onOpenSimulator }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeEvent = LIVE_EVENTS[currentIndex];

  return (
    <div 
      className="w-full rounded-2xl bg-[#0B0D12] border border-[#1C212D] p-5 sm:p-6 shadow-2xl relative overflow-hidden transition-all hover:border-[#2C3446]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="live-activity-stream"
    >
      {/* Top Header with live status and active counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#161B26]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] relative" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wider uppercase">
                Red Autónoma Propia en Vivo
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#15202B] text-[#93C5FD] border border-[#233549]">
                48 AGENTES ACTIVOS
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] mt-0.5">
              Transmisión en directo de capturas, filtros y agendamientos en tiempo real
            </p>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={onOpenSimulator}
          className="flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded-full bg-[#151922] hover:bg-[#1E2330] border border-[#242C3D] transition-all cursor-pointer"
          id="btn-inspect-stream"
        >
          <span>Simular en directo</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
        </button>
      </div>

      {/* Main Dynamic Event Card */}
      <div className="pt-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${activeEvent.tagColor} ${activeEvent.textColor}`}>
                {activeEvent.tag}
              </span>
              <span className="text-xs font-bold text-white">
                {activeEvent.agent} ({activeEvent.agentRole})
              </span>
              <span className="text-[11px] text-[#4B5563]">·</span>
              <span className="text-[11px] text-[#9CA3AF] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#6B7280]" />
                {activeEvent.location}
              </span>
              <span className="text-[11px] text-[#6B7280]">({activeEvent.timeAgo})</span>
            </div>

            <h4 className="text-base font-bold text-white tracking-tight">
              {activeEvent.property}
            </h4>

            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              {activeEvent.detail}
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-start md:items-end justify-center pl-0 md:pl-6 border-l-0 md:border-l border-[#1A202C]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              Auditoría Financiera
            </span>
            <div className="text-xs font-bold text-white mt-1 px-3 py-1.5 rounded-lg bg-[#141822] border border-[#22293A]">
              {activeEvent.financialMetric}
            </div>
          </div>
        </div>

        {/* Carousel indicator pips */}
        <div className="flex items-center gap-1.5 pt-4 mt-2 border-t border-[#141822]">
          {LIVE_EVENTS.map((ev, i) => (
            <button
              key={ev.id}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === i ? 'w-8 bg-white' : 'w-2 bg-[#202636] hover:bg-[#343D52]'
              }`}
              title={`Evento: ${ev.property}`}
            />
          ))}
          <span className="text-[10px] text-[#4B5563] ml-auto">
            {isPaused ? 'Pausado (Interactuando)' : 'Actualizando cada 4s automáticamente'}
          </span>
        </div>
      </div>
    </div>
  );
};
