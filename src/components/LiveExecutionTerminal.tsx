import React, { useState } from 'react';
import { Bot, Check, Clock, Calendar, ArrowRight, ShieldCheck, Play, Pause, Sparkles, MessageSquare } from 'lucide-react';
import { LiveVoiceWave } from './LiveVoiceWave';

interface ScenarioData {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  badgeTextColor: string;
  property: string;
  price: string;
  responseTime: string;
  solvencyScore: number;
  solvencyStatus: string;
  solvencyColor: string;
  userMessage: string;
  valeriaAudioText: string;
  scheduledText: string;
  calendarTime: string;
  assignedAdvisor: string;
}

const SCENARIOS: ScenarioData[] = [
  {
    id: 'ático',
    name: 'Comprador VIP Directo',
    badge: 'FONDOS PROPIOS (100%)',
    badgeColor: 'bg-[#10B981]',
    badgeTextColor: 'text-black',
    property: 'Ático Dúplex en Salamanca (Madrid)',
    price: '620.000 €',
    responseTime: '1.4 segundos',
    solvencyScore: 98,
    solvencyStatus: 'Solvencia Máxima Verificada',
    solvencyColor: 'text-[#10B981]',
    userMessage: 'Hola, vi este ático en Idealista. ¿Es posible visitarlo esta semana? Tengo disponibilidad inmediata y no dependo de vender ninguna otra vivienda.',
    valeriaAudioText: 'Buenas tardes Carlos, un placer. El ático dúplex en Salamanca está disponible. Para coordinar con la broker senior Elena Ruiz, ¿la compra sería con fondos propios o necesitas tramitar hipoteca bancaria?',
    scheduledText: 'Visita presencial concertada y confirmada en Google Calendar',
    calendarTime: 'Mañana, 17:30h (Calle Serrano, Madrid)',
    assignedAdvisor: 'Elena Ruiz (Directora Comercial)',
  },
  {
    id: 'chalet',
    name: 'Familia con FEIN Hipoteca',
    badge: 'HIPOTECA PREAPROBADA BBVA',
    badgeColor: 'bg-[#3B82F6]',
    badgeTextColor: 'text-white',
    property: 'Chalet en Pozuelo de Alarcón',
    price: '1.250.000 €',
    responseTime: '1.8 segundos',
    solvencyScore: 92,
    solvencyStatus: 'Estudio Financiero Favorable',
    solvencyColor: 'text-[#3B82F6]',
    userMessage: 'Buenas noches, nos interesa mucho el chalet de Pozuelo para nuestra familia. Ya tenemos estudio de hipoteca aprobado en BBVA por 850k€ y aportamos el resto de ahorros.',
    valeriaAudioText: 'Perfecto Beatriz, excelente. El chalet cuenta con 450m² y jardín consolidado. Al tener el FEIN preaprobado por BBVA, os reservo un pase preferente con Marcos Varela.',
    scheduledText: 'Cita en agenda comercial y ficha enviada a CRM',
    calendarTime: 'Viernes, 12:00h (Avenida de Europa, Pozuelo)',
    assignedAdvisor: 'Marcos Varela (Especialista Unifamiliares)',
  },
  {
    id: 'curioso',
    name: 'Curioso sin Viabilidad',
    badge: 'FILTRADO AUTOMÁTICAMENTE',
    badgeColor: 'bg-[#EF4444]',
    badgeTextColor: 'text-white',
    property: 'Piso Reformado en Chamberí',
    price: '510.000 €',
    responseTime: '2.1 segundos',
    solvencyScore: 18,
    solvencyStatus: 'Incompatible con Criterios Financieros',
    solvencyColor: 'text-[#EF4444]',
    userMessage: 'Hola, ¿lo dejáis en 250.000€ al contado o hacéis alquiler con opción a compra por 800€/mes? Es lo máximo a lo que llego.',
    valeriaAudioText: 'Hola Javier, gracias por tu interés. Los propietarios han fijado un precio firme acorde a la tasación oficial de mercado y no aceptan alquiler con opción a compra. Registro tu contacto por si entran activos con ese perfil.',
    scheduledText: 'Lead descartado cordialmente — Cero horas perdidas del equipo',
    calendarTime: 'No se consume agenda comercial',
    assignedAdvisor: 'Filtro Autónomo Valeria (Sin molestar al agente)',
  },
];

export const LiveExecutionTerminal: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('ático');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(true);

  const current = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];

  return (
    <div className="w-full rounded-3xl bg-[#0B0D12] border border-[#1E2330] p-6 sm:p-8 shadow-2xl relative overflow-hidden" id="live-execution-terminal">
      
      {/* Top Header of the Terminal */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#171C26]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#141822] border border-[#232B3B] flex items-center justify-center text-white">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">
                Valeria · Terminal de Cualificación en Directo
              </span>
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Simulación de interacción real por WhatsApp Cloud API y voz sintética
            </p>
          </div>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#10131A] border border-[#1B212D] w-full sm:w-auto overflow-x-auto">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedId(sc.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedId === sc.id
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-[#8A93A6] hover:text-white hover:bg-[#181D28]'
              }`}
              id={`terminal-tab-${sc.id}`}
            >
              {sc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Execution Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        
        {/* Left: Chat & Voice Interaction */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Inquiry Details Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#11151F] border border-[#1C2230] text-xs">
            <span className="text-[#9CA3AF] font-medium truncate max-w-[280px]">
              Inmueble: <strong className="text-white">{current.property}</strong> ({current.price})
            </span>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${current.badgeColor} ${current.badgeTextColor}`}>
              {current.badge}
            </span>
          </div>

          {/* User Message Bubble */}
          <div className="p-4 rounded-2xl bg-[#131722] border border-[#1F2636] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#6B7280]">
              <span className="font-bold text-[#9CA3AF]">Comprador Interesado</span>
              <span>Vía WhatsApp · 18:24</span>
            </div>
            <p className="text-sm text-[#E2E8F0] leading-relaxed">
              "{current.userMessage}"
            </p>
          </div>

          {/* Valeria Autonomous Response Bubble with Voice Wave */}
          <div className="p-5 rounded-2xl bg-[#141A26] border border-[#242E42] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  Valeria (IA)
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1C2433] text-[#93C5FD] text-[10px] font-bold">
                  Respuesta en {current.responseTime}
                </span>
              </div>
              
              {/* Audio Wave Visualizer */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1D2536] hover:bg-[#28334A] text-white text-[10px] font-semibold cursor-pointer transition-all"
                  title="Pausar / Reproducir sintetizador"
                >
                  {isPlayingAudio ? <Pause className="w-3 h-3 text-[#10B981]" /> : <Play className="w-3 h-3" />}
                  <span>Voz Sintética</span>
                </button>
                <LiveVoiceWave isActive={isPlayingAudio} color="bg-[#10B981]" />
              </div>
            </div>

            <p className="text-sm text-white leading-relaxed font-normal">
              "{current.valeriaAudioText}"
            </p>
          </div>

        </div>

        {/* Right: Instant Financial Score & Automated Action */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Solvency Audit Card */}
          <div className="p-5 rounded-2xl bg-[#11151E] border border-[#1D2433] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                Score Financiero Propia
              </span>
              <span className={`text-2xl font-extrabold ${current.solvencyColor}`}>
                {current.solvencyScore}<span className="text-xs text-[#6B7280] font-normal">/100</span>
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-2 rounded-full bg-[#1A202D] overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  current.solvencyScore >= 90
                    ? 'bg-[#10B981]'
                    : current.solvencyScore >= 50
                    ? 'bg-[#3B82F6]'
                    : 'bg-[#EF4444]'
                }`}
                style={{ width: `${current.solvencyScore}%` }}
              />
            </div>

            <div className="text-xs font-semibold text-white">
              {current.solvencyStatus}
            </div>
          </div>

          {/* Outcome & Calendar Action Box */}
          <div className="p-5 rounded-2xl bg-[#0E121A] border border-[#1A202D] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>Acción en Agenda / CRM</span>
            </div>

            <p className="text-xs font-semibold text-white">
              {current.scheduledText}
            </p>

            <div className="p-3 rounded-xl bg-[#141822] border border-[#212838] space-y-1 text-xs">
              <div className="text-[#6B7280]">Cita / Estado:</div>
              <div className="text-white font-bold">{current.calendarTime}</div>
              <div className="text-[#9CA3AF] pt-1 border-t border-[#1C2230] mt-1">
                Asignado a: <strong className="text-white">{current.assignedAdvisor}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
