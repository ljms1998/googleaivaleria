import React, { useState } from 'react';
import { 
  Bot, 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  SlidersHorizontal, 
  Phone, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  Building,
  Activity,
  Layers
} from 'lucide-react';
import { Lead, ChatSession, ScheduledVisit, AgencyStats } from '../types';
import { LeadDetailModal } from './LeadDetailModal';
import { ChatHistoryView } from './ChatHistoryView';
import { VisitsCalendarView } from './VisitsCalendarView';

interface AgencyDashboardProps {
  stats: AgencyStats;
  leads: Lead[];
  chats: ChatSession[];
  visits: ScheduledVisit[];
  onOpenSimulator: () => void;
  onGoLanding: () => void;
}

export const AgencyDashboard: React.FC<AgencyDashboardProps> = ({
  stats,
  leads,
  chats,
  visits,
  onOpenSimulator,
  onGoLanding,
}) => {
  const [activeTab, setActiveTab] = useState<'resumen' | 'leads' | 'chats' | 'agenda' | 'config'>('resumen');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'cita_agendada' | 'calificado' | 'en_conversacion' | 'descartado'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeChatLeadId, setActiveChatLeadId] = useState<string | undefined>(undefined);

  // Settings State
  const [minScoreThreshold, setMinScoreThreshold] = useState<number>(75);
  const [requirePreapprovedMortgage, setRequirePreapprovedMortgage] = useState<boolean>(true);
  const [autoDiscardCuriosos, setAutoDiscardCuriosos] = useState<boolean>(true);
  const [agentTone, setAgentTone] = useState<string>('cercano');

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full bg-[#090A0D] text-[#E2E8F0] min-h-screen">
      
      {/* Top Bar / Agency Context */}
      <div className="border-b border-[#1A212E] bg-[#0C1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#121824] border border-[#222F42] flex items-center justify-center">
              <Building className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Panel de Control de Agencia</h2>
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-[#064E3B] text-[#6EE7B7] border border-[#065F46]">
                  PROPIA V3.8 ACTIVA
                </span>
              </div>
              <p className="text-xs text-[#8F96A3]">
                Supervisión en tiempo real de leads, cualificación y citas agendadas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={onOpenSimulator}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#141A25] hover:bg-[#1E2638] text-[#CBD5E1] border border-[#232F42] flex items-center gap-2 cursor-pointer transition-colors"
              id="dash-sim-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Probar Simulador</span>
            </button>

            <button
              onClick={onGoLanding}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors cursor-pointer"
              id="dash-landing-btn"
            >
              Ver Landing Comercial
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-[#161D29] pt-2">
          {[
            { id: 'resumen', label: 'Resumen Ejecutivo', icon: TrendingUp },
            { id: 'leads', label: 'Pipeline de Leads', icon: Users, count: leads.length },
            { id: 'chats', label: 'Historial de Chats IA', icon: MessageSquare, count: chats.length },
            { id: 'agenda', label: 'Agenda de Visitas', icon: Calendar, count: visits.length },
            { id: 'config', label: 'Reglas de Cualificación', icon: SlidersHorizontal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#2563EB] text-white bg-[#101520]'
                    : 'border-transparent text-[#8F96A3] hover:text-white hover:bg-[#0E121A]'
                }`}
                id={`tab-btn-${tab.id}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#3B82F6]' : 'text-[#64748B]'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.2 rounded text-xs bg-[#171F2C] text-[#94A3B8] border border-[#232F42]">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: RESUMEN EJECUTIVO */}
        {activeTab === 'resumen' && (
          <div className="space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#0C1017] border border-[#1E2536]">
                <div className="flex items-center justify-between text-xs text-[#8F96A3] font-semibold">
                  <span>LEADS HOY (24/7)</span>
                  <Activity className="w-4 h-4 text-[#10B981]" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-2">
                  {stats.leadsToday}
                </div>
                <div className="flex items-center gap-1 text-xs text-[#10B981] font-semibold mt-2">
                  <span>100% atendidos en &lt; 5 seg</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0C1017] border border-[#1E2536]">
                <div className="flex items-center justify-between text-xs text-[#8F96A3] font-semibold">
                  <span>TASA CUALIFICACIÓN</span>
                  <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-2">
                  {stats.qualifiedRate}%
                </div>
                <div className="text-xs text-[#8F96A3] mt-2">
                  Compradores con solvencia demostrada
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0C1017] border border-[#1E2536]">
                <div className="flex items-center justify-between text-xs text-[#8F96A3] font-semibold">
                  <span>CITAS AGENDADAS ESTE MES</span>
                  <Calendar className="w-4 h-4 text-[#10B981]" />
                </div>
                <div className="text-3xl font-extrabold text-[#10B981] mt-2">
                  {stats.visitsScheduledThisMonth}
                </div>
                <div className="text-xs text-[#8F96A3] mt-2">
                  Sincronizadas con Google Calendar
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0C1017] border border-[#1E2536]">
                <div className="flex items-center justify-between text-xs text-[#8F96A3] font-semibold">
                  <span>HORAS COMERCIALES AHORRADAS</span>
                  <Clock className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-2">
                  {stats.hoursSavedMonthly}h
                </div>
                <div className="text-xs text-[#10B981] font-semibold mt-2">
                  58% curiosos descartados
                </div>
              </div>

            </div>

            {/* Middle Section: Autonomous Live Feed & Urgent Next Visits */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Feed de Actividad Autónoma */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0C1017] border border-[#1E2536] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                    <h3 className="text-sm font-bold text-white">
                      Registro de Ejecución del Agente en Tiempo Real
                    </h3>
                  </div>
                  <span className="text-xs text-[#8F96A3]">Actualizado hace 1 min</span>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      time: 'Hace 6 min',
                      event: 'Visita agendada para Ático en Salamanca',
                      lead: 'Carlos Mendoza',
                      detail: 'Comprador directo al contado (650.000 €). Sincronizado en agenda de Elena Ruiz para mañana 17:30.',
                      badge: 'Visita Agendada',
                      badgeColor: 'bg-[#064E3B] text-[#A7F3D0] border-[#065F46]',
                    },
                    {
                      time: 'Hace 18 min',
                      event: 'Cualificación en proceso (Loft Poblenou)',
                      lead: 'Lucía Morales',
                      detail: 'Detectada hipoteca en trámite. Urgencia alta (<15 días). Solicitando franja horaria preferida.',
                      badge: 'En Conversación',
                      badgeColor: 'bg-[#1C2433] text-[#93C5FD] border-[#2D3A50]',
                    },
                    {
                      time: 'Hace 42 min',
                      event: 'Filtro automático ejecutado con éxito',
                      lead: 'Rodrigo Peña',
                      detail: 'Curioso sin presupuesto (290k para piso de 620k). Descarte educado sin comprometer agenda del broker.',
                      badge: 'Curioso Descartado',
                      badgeColor: 'bg-[#7F1D1D] text-[#FECDD3] border-[#991B1B]',
                    },
                  ].map((act, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#10141E] border border-[#1E2738] flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{act.event}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${act.badgeColor}`}>
                          {act.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#8F96A3] leading-relaxed">
                        {act.detail}
                      </p>
                      <div className="text-xs text-[#64748B] flex items-center justify-between pt-1">
                        <span>Lead: <span className="text-[#CBD5E1]">{act.lead}</span></span>
                        <span>{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Próximas Visitas Confirmadas */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0C1017] border border-[#1E2536] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">
                      Próximas Visitas Inmobiliarias
                    </h3>
                    <button
                      onClick={() => setActiveTab('agenda')}
                      className="text-xs text-[#3B82F6] hover:underline font-semibold cursor-pointer"
                    >
                      Ver agenda completa
                    </button>
                  </div>

                  <div className="space-y-3">
                    {visits.slice(0, 3).map((v) => (
                      <div
                        key={v.id}
                        className="p-3.5 rounded-xl bg-[#10141E] border border-[#1E2738] space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#10B981]">
                            {v.dateTime}
                          </span>
                          <span className="text-xs text-[#8F96A3] font-medium">
                            {v.assignedAgent}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white truncate">
                          {v.propertyTitle}
                        </div>
                        <div className="text-xs text-[#8F96A3] flex items-center justify-between">
                          <span>{v.leadName}</span>
                          <span className="text-[#60A5FA] font-semibold">{v.budget}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121824] border border-[#232F42] text-xs text-[#94A3B8]">
                  <span className="font-bold text-white block mb-1">
                    Garantía de Asistencia 24h:
                  </span>
                  Propia enviará automáticamente a cada comprador una confirmación por WhatsApp 2 horas antes de la cita.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PIPELINE DE LEADS */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0D111A] border border-[#1E2637]">
              
              {/* Status pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {[
                  { id: 'all', label: 'Todos los Leads' },
                  { id: 'cita_agendada', label: 'Citas Agendadas' },
                  { id: 'calificado', label: 'Cualificados VIP' },
                  { id: 'en_conversacion', label: 'En Conversación' },
                  { id: 'descartado', label: 'Curiosos Descartados' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setLeadStatusFilter(st.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      leadStatusFilter === st.id
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#141A25] text-[#8F96A3] hover:text-white border border-[#232F42]'
                    }`}
                    id={`lead-filter-${st.id}`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar comprador, inmueble o tel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#121622] text-xs text-white border border-[#1E2738] focus:outline-none focus:border-[#3B82F6] placeholder-[#64748B]"
                  id="lead-table-search"
                />
              </div>

            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto rounded-xl border border-[#1E2637] bg-[#0A0D14]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#1E2637] bg-[#0E121B] text-[#8F96A3]">
                    <th className="p-4 font-bold uppercase">Comprador</th>
                    <th className="p-4 font-bold uppercase">Inmueble Consultado</th>
                    <th className="p-4 font-bold uppercase">Presupuesto</th>
                    <th className="p-4 font-bold uppercase">Hipoteca</th>
                    <th className="p-4 font-bold uppercase">Score Propia</th>
                    <th className="p-4 font-bold uppercase">Estado</th>
                    <th className="p-4 font-bold uppercase text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18202D]">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#101520] transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="p-4">
                        <div className="font-bold text-white">{lead.name}</div>
                        <div className="text-xs text-[#8F96A3]">{lead.phone} • {lead.channel}</div>
                      </td>

                      <td className="p-4">
                        <div className="text-white font-medium truncate max-w-[200px]">
                          {lead.propertyTitle}
                        </div>
                        <div className="text-xs text-[#8F96A3]">Ref: {lead.propertyRef}</div>
                      </td>

                      <td className="p-4 font-bold text-white">
                        {lead.budget}
                      </td>

                      <td className="p-4 font-semibold text-[#60A5FA]">
                        {lead.mortgageStatus}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded font-bold ${
                            lead.score >= 80
                              ? 'bg-[#064E3B] text-[#A7F3D0] border border-[#065F46]'
                              : lead.score <= 35
                              ? 'bg-[#7F1D1D] text-[#FECDD3] border border-[#991B1B]'
                              : 'bg-[#1C2433] text-[#FCD34D] border border-[#2D3A50]'
                          }`}
                        >
                          {lead.score} / 100
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded font-semibold ${
                            lead.status === 'cita_agendada'
                              ? 'bg-[#064E3B] text-[#6EE7B7] border border-[#065F46]'
                              : lead.status === 'calificado'
                              ? 'bg-[#172554] text-[#93C5FD] border border-[#1E40AF]'
                              : lead.status === 'en_conversacion'
                              ? 'bg-[#1C2433] text-[#E2E8F0] border border-[#2D3A50]'
                              : 'bg-[#7F1D1D] text-[#FECDD3] border border-[#991B1B]'
                          }`}
                        >
                          {lead.status === 'cita_agendada'
                            ? 'Cita Agendada'
                            : lead.status === 'calificado'
                            ? 'Cualificado VIP'
                            : lead.status === 'en_conversacion'
                            ? 'En Conversación'
                            : 'Curioso Descartado'}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#141A25] hover:bg-[#1E2638] text-[#93C5FD] font-bold border border-[#232F42] transition-colors cursor-pointer inline-flex items-center gap-1"
                          id={`view-lead-btn-${lead.id}`}
                        >
                          <span>Ficha</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="p-10 text-center text-xs text-[#8F96A3]">
                  No se encontraron prospectos con este filtro.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: HISTORIAL DE CHATS IA */}
        {activeTab === 'chats' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Auditoría e Historial de Conversaciones del Agente IA
                </h3>
                <p className="text-xs text-[#8F96A3]">
                  Revisa cómo Propia atiende, maneja objeciones y agenda citas de forma 100% autónoma
                </p>
              </div>
            </div>

            <ChatHistoryView chats={chats} initialSelectedId={activeChatLeadId} />
          </div>
        )}

        {/* TAB 4: AGENDA DE VISITAS */}
        {activeTab === 'agenda' && (
          <VisitsCalendarView visits={visits} />
        )}

        {/* TAB 5: REGLAS DE CUALIFICACIÓN DEL AGENTE */}
        {activeTab === 'config' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-[#0C1017] border border-[#1E2536] space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">
                  Parámetros y Reglas de Cualificación del Agente Autónomo
                </h3>
                <p className="text-xs text-[#8F96A3] mt-1">
                  Define qué tan estricto debe ser Propia antes de permitir que un comprador bloquee la agenda de tus asesores
                </p>
              </div>

              {/* Slider: Umbral de Score */}
              <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2738] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white">
                    Puntuación Mínima de Corte para Agendar Visita
                  </label>
                  <span className="px-3 py-1 rounded bg-[#161C28] text-white font-extrabold text-xs border border-[#283348]">
                    Score {minScoreThreshold} / 100
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={minScoreThreshold}
                  onChange={(e) => setMinScoreThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-[#1C2433] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  id="config-score-slider"
                />
                <p className="text-xs text-[#8F96A3]">
                  Los leads con puntuación inferior recibirán una respuesta cordial y quedarán archivados sin consumir hueco de calendario.
                </p>
              </div>

              {/* Toggle 1: Exigir Hipoteca Preaprobada */}
              <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2738] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">
                    Exigir Hipoteca Preaprobada o Fondos Propios Demostrables
                  </h4>
                  <p className="text-xs text-[#8F96A3] mt-0.5">
                    Si el comprador responde que no tiene ahorros ni ha consultado al banco, se le redirige al servicio de broker hipotecario antes de dar visita.
                  </p>
                </div>
                <button
                  onClick={() => setRequirePreapprovedMortgage(!requirePreapprovedMortgage)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                    requirePreapprovedMortgage ? 'bg-[#2563EB] justify-end' : 'bg-[#1F2738] justify-start'
                  }`}
                  id="toggle-mortgage"
                >
                  <span className="w-4 h-4 rounded-full bg-white block"></span>
                </button>
              </div>

              {/* Toggle 2: Descarte de curiosos */}
              <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2738] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">
                    Filtro Inmediato a Ofertas Desproporcionadas (&gt;25% rebaja)
                  </h4>
                  <p className="text-xs text-[#8F96A3] mt-0.5">
                    Descarta automáticamente a prospectos que exigen rebajas inviables para la propiedad sin molestar al comercial.
                  </p>
                </div>
                <button
                  onClick={() => setAutoDiscardCuriosos(!autoDiscardCuriosos)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                    autoDiscardCuriosos ? 'bg-[#2563EB] justify-end' : 'bg-[#1F2738] justify-start'
                  }`}
                  id="toggle-discard"
                >
                  <span className="w-4 h-4 rounded-full bg-white block"></span>
                </button>
              </div>

              {/* Tone Selection */}
              <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2738] space-y-3">
                <label className="text-xs font-bold text-white block">
                  Tono de Comunicación de la IA
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'cercano', title: 'Cercano & Profesional', desc: 'Ideal para agencias residenciales modernas y familias.' },
                    { id: 'lujo', title: 'Ultra Premium / Formal', desc: 'Adecuado para propiedades exclusivas y clientes patrimoniales.' },
                    { id: 'agil', title: 'Directo & Dinámico', desc: 'Enfocado en inversores y compradores rápidos.' },
                  ].map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setAgentTone(tone.id)}
                      className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                        agentTone === tone.id
                          ? 'bg-[#172030] border-[#3B82F6]'
                          : 'bg-[#0E131E] border-[#1E2638] hover:border-[#2B374D]'
                      }`}
                      id={`tone-btn-${tone.id}`}
                    >
                      <div className="text-xs font-bold text-white">{tone.title}</div>
                      <div className="text-xs text-[#8F96A3] mt-1">{tone.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <span className="text-xs px-3 py-1.5 rounded-lg bg-[#064E3B] text-[#A7F3D0] border border-[#065F46] font-bold">
                  Cambios aplicados automáticamente en el motor de IA
                </span>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onOpenChatSession={(leadId) => {
            setActiveChatLeadId(leadId);
            setActiveTab('chats');
          }}
        />
      )}

    </div>
  );
};
