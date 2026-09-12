import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  CalendarCheck, 
  Search, 
  Check
} from 'lucide-react';

interface PlatformFeaturesProps {
  onOpenSimulator?: () => void;
}

export const PlatformFeatures: React.FC<PlatformFeaturesProps> = () => {
  const capabilities = [
    {
      icon: Zap,
      badge: 'SPEED',
      title: '6.2-second response time',
      description: 'Instant buyer engagement on Zillow and portal inquiries before the user navigates away.',
      stats: '6.2s',
      statLabel: 'Average Speed',
      highlights: ['Official WhatsApp & SMS', '24/7/365 coverage']
    },
    {
      icon: ShieldCheck,
      badge: 'QUALIFICATION',
      title: 'Solvency & mortgage audit',
      description: 'Verification of liquid equity and verified bank pre-approval prior to scheduling any physical tour.',
      stats: '84%',
      statLabel: 'Curious filtered',
      highlights: ['Proof of funds verified', 'Protects senior broker hours']
    },
    {
      icon: CalendarCheck,
      badge: 'SYNCHRONIZATION',
      title: 'Automated CRM & calendar booking',
      description: 'Follow Up Boss and Google Calendar automatically populated with enriched buyer dossiers.',
      stats: '100%',
      statLabel: 'Autonomous',
      highlights: ['Google & Outlook sync', 'Enriched CRM profile']
    },
    {
      icon: Search,
      badge: 'OUTREACH',
      title: 'Active FSBO listing acquisition',
      description: 'Algorithmic scouting of off-market and unrepresented listings to schedule listing appointments.',
      stats: '+8',
      statLabel: 'Exclusives / mo',
      highlights: ['Multi-portal monitoring', 'Automated comp valuations']
    }
  ];

  return (
    <section id="funciones" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#141720]">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
          AUTONOMOUS ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Enterprise capabilities executed without friction.
        </h2>
        <p className="text-base sm:text-lg text-[#9CA3AF] mt-3 leading-relaxed">
          High-performance infrastructure engineered specifically for high-volume residential brokerages.
        </p>
      </div>

      {/* Clean 4-Column / 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {capabilities.map((cap, idx) => {
          const IconComponent = cap.icon;
          return (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-[#0B0D12] border border-[#181C26] hover:border-[#252C3D] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Big Stat */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#131620] border border-[#202636] flex items-center justify-center text-white">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-white tracking-tight">
                      {cap.stats}
                    </div>
                    <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
                      {cap.statLabel}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#141822] text-[#93C5FD] border border-[#202738] tracking-wider uppercase inline-block mb-2.5">
                  {cap.badge}
                </span>
                
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                  {cap.title}
                </h3>
                
                <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                  {cap.description}
                </p>
              </div>

              {/* Clean Highlight Chips */}
              <div className="pt-4 border-t border-[#151924] flex flex-wrap gap-2">
                {cap.highlights.map((h, hIdx) => (
                  <span 
                    key={hIdx} 
                    className="inline-flex items-center gap-1.5 text-xs text-[#CBD5E1] bg-[#11141D] border border-[#1E2330] px-3 py-1 rounded-md"
                  >
                    <Check className="w-3 h-3 text-[#10B981]" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
