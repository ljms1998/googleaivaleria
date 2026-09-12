export type LeadStatus = 'cita_agendada' | 'calificado' | 'en_conversacion' | 'descartado';

export type MortgageStatus = 'Preaprobada' | 'En trámite' | 'Al contado (Sin hipoteca)' | 'Sin estudiar / Sin ahorros';

export type UrgencyLevel = 'Inmediata (< 15 días)' | '1 a 3 meses' | 'Más de 6 meses' | 'Solo curioseando';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  channel: 'WhatsApp' | 'Idealista' | 'Fotocasa' | 'Web Chat';
  propertyTitle: string;
  propertyRef: string;
  propertyPrice: string;
  propertyImage?: string;
  budget: string;
  mortgageStatus: MortgageStatus;
  urgency: UrgencyLevel;
  score: number; // 0 to 100
  status: LeadStatus;
  reasonIfDiscarded?: string;
  createdAt: string;
  visitScheduledAt?: string;
  assignedAgent: string;
  aiSummary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'lead' | 'agent' | 'system';
  text: string;
  timestamp: string;
  badge?: string;
}

export interface ChatSession {
  id: string;
  leadId: string;
  leadName: string;
  phone: string;
  propertyTitle: string;
  propertyRef: string;
  channel: 'WhatsApp' | 'Idealista' | 'Fotocasa' | 'Web Chat';
  status: LeadStatus;
  score: number;
  lastMessage: string;
  lastActivity: string;
  messages: ChatMessage[];
  qualificationSummary: {
    budget: string;
    financing: string;
    urgency: string;
    intent: string;
    score: number;
  };
}

export interface ScheduledVisit {
  id: string;
  leadName: string;
  leadPhone: string;
  propertyTitle: string;
  propertyRef: string;
  propertyAddress: string;
  dateTime: string;
  assignedAgent: string;
  status: 'Confirmada' | 'Recordatorio enviado' | 'Pendiente reconfirmación';
  buyerProfile: string;
  budget: string;
}

export interface AgencyStats {
  leadsToday: number;
  leadsThisMonth: number;
  qualifiedRate: number; // e.g. 78%
  discardedCuriososRate: number; // e.g. 62%
  visitsScheduledThisMonth: number;
  avgResponseTimeSeconds: number; // e.g. 5.8
  hoursSavedMonthly: number;
}
