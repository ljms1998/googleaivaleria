import React, { useState } from 'react';
import { Bot, CheckCircle2, XCircle, Clock, Calendar, ShieldCheck, ArrowRight, Phone, MessageSquare, Sparkles } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  leadName: string;
  property: string;
  budget: string;
  statusText: string;
  score: number;
  outcome: 'agendado' | 'descartado';
  outcomeLabel: string;
  timeSaved: string;
  steps: {
    title: string;
    description: string;
    badge: string;
  }[];
}

export const HeroAgentInteractive: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('vip');

  const scenarios: Scenario[] = [
    {
      id: 'vip',
      title: 'High-Net-Worth Cash Buyer',
      leadName: 'Charles Montgomery (+1 415 892 0142)',
      property: 'Penthouse Duplex, Tribeca ($3,450,000)',
      budget: '$3,800,000 Verified Liquid Funds',
      statusText: 'Tour Scheduled on Google Calendar & CRM synced',
      score: 98,
      outcome: 'agendado',
      outcomeLabel: 'Tour Scheduled',
      timeSaved: '2.5 broker hours reclaimed',
      steps: [
        {
          title: '00:06 - Instant Multi-Channel Capture',
          description: 'Buyer submits inquiry via Zillow Premier. Propia engages in 6 seconds, introducing broker representation.',
          badge: 'Response time: 6s',
        },
        {
          title: '00:45 - Financial Solvency & Liquidity Audit',
          description: 'Identifies all-cash closing ability (no appraisal contingency needed) with a 14-day purchase timeline.',
          badge: 'Solvency Score: 98/100',
        },
        {
          title: '01:20 - Real-Time Broker Calendar Booking',
          description: 'Identifies calendar availability for Senior Partner and locks in showing for tomorrow at 5:30 PM.',
          badge: 'Google Calendar Synced',
        },
      ],
    },
    {
      id: 'hipoteca',
      title: 'Family with Bank Pre-Approval',
      leadName: 'David & Beatrice Sterling',
      property: 'Townhouse, Brooklyn Heights ($2,150,000)',
      budget: '$2,300,000 (Jumbo Pre-Approved)',
      statusText: 'Showing Confirmed for Friday 12:00 PM',
      score: 91,
      outcome: 'agendado',
      outcomeLabel: 'Showing Confirmed',
      timeSaved: '1.8 hours reclaimed',
      steps: [
        {
          title: '00:08 - Inquiry Acknowledgment & Property Check',
          description: 'Propia confirms unit availability and reviews specific family requirements and preferred dates.',
          badge: 'Inbound: StreetEasy API',
        },
        {
          title: '00:52 - Mortgage Pre-Approval Verification',
          description: 'Validates bank pre-approval letter for $1.7M + $600k verified equity. Conforms to DTI standards.',
          badge: 'Pre-Approval Verified',
        },
        {
          title: '01:35 - Calendar Booking & Calendar Invite Delivery',
          description: 'Assigns listing specialist, creates CRM dossier, and delivers automated calendar invites via SMS & WhatsApp.',
          badge: 'Assigned to Senior Agent',
        },
      ],
    },
    {
      id: 'curioso',
      title: 'Unqualified Buyer / Looky-Loo',
      leadName: 'Richard Vance',
      property: 'Penthouse Duplex, Tribeca ($3,450,000)',
      budget: '$850,000 (Non-viable for listing)',
      statusText: 'Filtered courteously without disturbing broker',
      score: 22,
      outcome: 'descartado',
      outcomeLabel: 'Filtered Out',
      timeSaved: '1 wasted physical showing avoided',
      steps: [
        {
          title: '00:05 - Intake & Criteria Questionnaire',
          description: 'Inquiry requests an unviable 70% price discount or low-budget lease-to-own terms.',
          badge: 'Filter Triggered',
        },
        {
          title: '00:38 - Solvency Gap Detected',
          description: 'Detects a $2.6M purchasing power deficit and lack of qualified jumbo mortgage eligibility.',
          badge: 'Score: 22/100 (Unqualified)',
        },
        {
          title: '01:05 - Polite Route & CRM Archival',
          description: 'Delivers courteous decline, archives contact info for lower-priced inventory, and saves broker schedule.',
          badge: 'Zero broker time wasted',
        },
      ],
    },
  ];

  const current = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  return (
    <div className="w-full rounded-2xl bg-[#0C0F15] border border-[#1E2533] p-5 md:p-7 shadow-2xl">
      {/* Top Header of the Execution Monitor */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#1A212E]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#141A25] border border-[#273245] flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Propia Autonomous Engine v3.8
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-[#064E3B] text-[#6EE7B7] font-semibold border border-[#065F46]">
                LIVE EXECUTION
              </span>
            </div>
            <p className="text-xs text-[#8F96A3]">
              Real-time audit simulation of lead ingestion, solvency check, and tour booking
            </p>
          </div>
        </div>

        {/* Scenario Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111620] border border-[#1E2738] w-full sm:w-auto overflow-x-auto">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeScenarioId === sc.id
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-[#8F96A3] hover:text-white hover:bg-[#18202F]'
              }`}
              id={`scenario-btn-${sc.id}`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Execution Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        
        {/* Left Column: Lead & Property Profile */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-[#10141D] border border-[#1F2636] p-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8F96A3]">
                DETECTED PROSPECT
              </span>
              <span
                className={`text-xs px-2.5 py-1 rounded font-bold ${
                  current.outcome === 'agendado'
                    ? 'bg-[#064E3B] text-[#A7F3D0] border border-[#065F46]'
                    : 'bg-[#7F1D1D] text-[#FECDD3] border border-[#991B1B]'
                }`}
              >
                {current.outcomeLabel}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white">{current.leadName}</h4>
              <p className="text-xs text-[#8F96A3] mt-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#3B82F6]" />
                Target Property: {current.property}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#141A24] border border-[#222B3A]">
                <span className="text-xs text-[#8F96A3] block">Declared Budget</span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {current.budget}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#141A24] border border-[#222B3A]">
                <span className="text-xs text-[#8F96A3] block">Propia Score</span>
                <span
                  className={`text-sm font-extrabold mt-0.5 block ${
                    current.score >= 80 ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}
                >
                  {current.score} / 100
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#151B27] border border-[#242E40]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3B82F6] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
                <span>Autonomous Agent Verdict</span>
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {current.statusText}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1C2330] flex items-center justify-between text-xs text-[#8F96A3]">
            <span className="flex items-center gap-1.5 text-[#10B981] font-medium">
              <Clock className="w-3.5 h-3.5" />
              {current.timeSaved}
            </span>
            <span className="text-white font-semibold">24/7 Relentless</span>
          </div>
        </div>

        {/* Right Column: Steps & Autonomous Logs */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold text-[#8F96A3] tracking-wide mb-2 flex items-center justify-between">
            <span>AUTONOMOUS EXECUTION HISTORY</span>
            <span className="text-[#10B981] font-semibold">Zero human friction</span>
          </div>

          {current.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#10141D] border border-[#1E2535] hover:border-[#283348] transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#1A2230] border border-[#2B364A] flex items-center justify-center text-xs font-bold text-white">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide">
                    {step.title}
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded font-medium bg-[#141A25] text-[#93C5FD] border border-[#232F42]">
                  {step.badge}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed pl-7">
                {step.description}
              </p>
            </div>
          ))}

          {/* Bottom Confirmation Bar */}
          <div className="p-3.5 rounded-xl bg-[#121722] border border-[#222C3D] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
              <span className="text-xs text-[#CBD5E1]">
                {current.outcome === 'agendado'
                  ? 'Showing synced to broker calendar and CRM enriched.'
                  : 'Filter complete. Broker calendar 100% protected.'}
              </span>
            </div>
            <div className="text-xs font-bold text-[#3B82F6] flex items-center gap-1">
              Verified by Propia
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
