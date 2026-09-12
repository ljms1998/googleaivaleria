import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, User, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';
import { ScheduledVisit } from '../types';

interface VisitsCalendarViewProps {
  visits: ScheduledVisit[];
}

export const VisitsCalendarView: React.FC<VisitsCalendarViewProps> = ({ visits }) => {
  const [selectedAgent, setSelectedAgent] = useState<string>('all');

  const agents = ['all', 'Elena Ruiz (Senior Broker)', 'Marcos Varela', 'Laura Montero'];

  const filteredVisits = visits.filter(
    (v) => selectedAgent === 'all' || v.assignedAgent.includes(selectedAgent.replace(' (Senior Broker)', ''))
  );

  return (
    <div className="space-y-6">
      
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0D111A] border border-[#1E2637]">
        <div>
          <h3 className="text-base font-bold text-white">Agenda de Visitas Inmobiliarias</h3>
          <p className="text-xs text-[#8F96A3]">
            Visitas agendadas por Propia directamente en el calendario de cada comercial
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#8F96A3]" />
          <span className="text-xs text-[#8F96A3]">Filtrar por agente:</span>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#141A25] text-xs text-white border border-[#232F42] focus:outline-none focus:border-[#3B82F6] cursor-pointer"
            id="visits-agent-select"
          >
            <option value="all">Todos los asesores</option>
            <option value="Elena Ruiz">Elena Ruiz</option>
            <option value="Marcos Varela">Marcos Varela</option>
            <option value="Laura Montero">Laura Montero</option>
          </select>
        </div>
      </div>

      {/* Visits Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVisits.map((visit) => (
          <div
            key={visit.id}
            className="p-5 rounded-xl bg-[#0D121C] border border-[#1F283A] hover:border-[#2A374D] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs px-2.5 py-1 rounded font-bold bg-[#064E3B] text-[#A7F3D0] border border-[#065F46] flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {visit.dateTime}
                </span>

                <span className="text-xs px-2 py-0.5 rounded font-semibold bg-[#131924] text-[#93C5FD] border border-[#232F42]">
                  Google Calendar Sincronizado
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-snug">
                {visit.propertyTitle}
              </h4>

              <div className="flex items-center gap-1.5 text-xs text-[#8F96A3] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span className="truncate">{visit.propertyAddress}</span>
              </div>
            </div>

            {/* Buyer & Broker details */}
            <div className="p-3.5 rounded-lg bg-[#111622] border border-[#1E2636] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8F96A3]">Comprador:</span>
                <span className="text-white font-bold">{visit.leadName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#8F96A3]">Teléfono:</span>
                <span className="text-white">{visit.leadPhone}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#8F96A3]">Perfil financiero:</span>
                <span className="text-[#10B981] font-semibold">{visit.buyerProfile}</span>
              </div>

              <div className="pt-2 border-t border-[#1C2434] flex items-center justify-between text-xs">
                <span className="text-[#8F96A3]">Comercial a cargo:</span>
                <span className="text-[#60A5FA] font-bold">{visit.assignedAgent}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-[#8F96A3]">
              <span className="flex items-center gap-1 text-[#10B981]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Recordatorio de WhatsApp programado 2h antes
              </span>
            </div>
          </div>
        ))}

        {filteredVisits.length === 0 && (
          <div className="col-span-2 p-10 text-center text-xs text-[#8F96A3] rounded-xl bg-[#0D121C] border border-[#1F283A]">
            No hay visitas agendadas para el asesor seleccionado.
          </div>
        )}
      </div>

    </div>
  );
};
