import React from 'react';
import { X, Bot, Calendar, Phone, Mail, CheckCircle2, XCircle, ShieldAlert, Building2, User, Clock, FileText } from 'lucide-react';
import { Lead } from '../types';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onOpenChatSession?: (leadId: string) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  onClose,
  onOpenChatSession,
}) => {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] bg-opacity-80 flex items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-2xl max-h-[90vh] rounded-2xl bg-[#0B0E15] border border-[#212B3D] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#0E131E] border-b border-[#1E2637] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#141B26] border border-[#26334A] flex items-center justify-center text-white">
              <User className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{lead.name}</h3>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                    lead.score >= 80
                      ? 'bg-[#064E3B] text-[#A7F3D0] border border-[#065F46]'
                      : lead.score <= 35
                      ? 'bg-[#7F1D1D] text-[#FECDD3] border border-[#991B1B]'
                      : 'bg-[#1C2433] text-[#FCD34D] border border-[#2D3A50]'
                  }`}
                >
                  SCORE {lead.score}/100
                </span>
              </div>
              <p className="text-xs text-[#8F96A3]">
                Captado por {lead.channel} • {lead.createdAt}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#141A25] hover:bg-[#1E2638] text-[#8F96A3] hover:text-white border border-[#232F42] transition-colors cursor-pointer"
            id="lead-detail-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#CBD5E1]">
          
          {/* AI Assessment Box */}
          <div className="p-4 rounded-xl bg-[#101622] border border-[#222E42]">
            <div className="flex items-center gap-2 text-[#3B82F6] font-bold mb-1.5">
              <Bot className="w-4 h-4" />
              <span>Dictamen y Resumen Autónomo de Propia</span>
            </div>
            <p className="text-xs text-[#E2E8F0] leading-relaxed">
              {lead.aiSummary}
            </p>
            {lead.reasonIfDiscarded && (
              <div className="mt-2.5 pt-2 border-t border-[#1C2535] text-[#F87171]">
                <span className="font-bold">Motivo de descarte: </span>
                {lead.reasonIfDiscarded}
              </div>
            )}
          </div>

          {/* Contact & Property Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0F141E] border border-[#1E2738] space-y-2">
              <span className="text-xs font-bold text-[#8F96A3] block uppercase">
                Datos de Contacto
              </span>
              <div className="flex items-center gap-2 text-white font-medium">
                <Phone className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-white font-medium truncate">
                <Mail className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="pt-2 text-[#8F96A3]">
                Asesor asignado: <span className="text-white font-semibold">{lead.assignedAgent}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0F141E] border border-[#1E2738] space-y-2">
              <span className="text-xs font-bold text-[#8F96A3] block uppercase">
                Propiedad Consultada
              </span>
              <div className="font-bold text-white leading-snug">
                {lead.propertyTitle}
              </div>
              <div className="flex items-center justify-between text-[#8F96A3] pt-1">
                <span>Ref: <span className="text-white">{lead.propertyRef}</span></span>
                <span>Precio: <span className="text-[#10B981] font-bold">{lead.propertyPrice}</span></span>
              </div>
            </div>
          </div>

          {/* Qualification Matrix Grid */}
          <div className="p-4 rounded-xl bg-[#0F141E] border border-[#1E2738]">
            <span className="text-xs font-bold text-[#8F96A3] block uppercase mb-3">
              Matriz de Cualificación Quirúrgica
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-[#141A24] border border-[#222B3A]">
                <span className="text-xs text-[#8F96A3] block">Presupuesto Lead</span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {lead.budget}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#141A24] border border-[#222B3A]">
                <span className="text-xs text-[#8F96A3] block">Estado de Hipoteca</span>
                <span className="text-xs font-bold text-[#60A5FA] mt-1 block">
                  {lead.mortgageStatus}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#141A24] border border-[#222B3A]">
                <span className="text-xs text-[#8F96A3] block">Plazo / Urgencia</span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {lead.urgency}
                </span>
              </div>
            </div>
          </div>

          {/* Appointment Status */}
          {lead.visitScheduledAt && (
            <div className="p-4 rounded-xl bg-[#0D1815] border border-[#065F46] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#064E3B] flex items-center justify-center text-[#A7F3D0]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#A7F3D0] block">
                    Visita Programada Confirmada
                  </span>
                  <p className="text-xs text-white mt-0.5">
                    {lead.visitScheduledAt}
                  </p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded font-bold bg-[#064E3B] text-[#6EE7B7] border border-[#065F46]">
                Google Calendar Sync
              </span>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0E131E] border-t border-[#1E2637] flex items-center justify-end gap-3">
          {onOpenChatSession && (
            <button
              onClick={() => {
                onClose();
                onOpenChatSession(lead.id);
              }}
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              id="lead-detail-view-chat-btn"
            >
              <Bot className="w-4 h-4" />
              <span>Ver Conversación de IA Completa</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#141A26] hover:bg-[#1E2638] text-white text-xs font-bold border border-[#26334A] transition-all cursor-pointer"
            id="lead-detail-dismiss-btn"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
