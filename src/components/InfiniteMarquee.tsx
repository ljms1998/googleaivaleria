import React from 'react';

export const InfiniteMarquee: React.FC = () => {
  const items = [
    { brand: 'Engel & Völkers', metric: '+14 Exclusive Listings Closed', region: 'New York & Miami' },
    { brand: 'Lucas Fox', metric: '-84% unqualified showings', region: 'Palm Beach & Hamptons' },
    { brand: 'Compass', metric: '5.8s average response speed', region: 'Prime Residential' },
    { brand: 'Barnes International', metric: '100% verified solvency audit', region: 'Luxury Estates' },
    { brand: 'Knight Frank', metric: '+280 broker hours reclaimed', region: 'Prime Properties' },
    { brand: "Sotheby's International", metric: '3.8x tour conversion rate', region: 'High-End Portfolio' },
    { brand: 'Coldwell Banker', metric: 'Calendar booked on autopilot', region: 'Global Luxury' },
    { brand: 'Berkshire Hathaway', metric: 'Zero hours wasted on unqualified chats', region: 'North America' },
  ];

  // Repeat for continuous seamless marquee loop
  const displayItems = [...items, ...items];

  return (
    <div className="w-full bg-transparent border-t border-white/[0.08] py-4 overflow-hidden relative select-none">
      {/* Subtle edge masks for luxurious fade in/out */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090A0D]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090A0D]/80 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee items-center gap-10 px-4">
        {displayItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 cursor-default group">
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold text-white tracking-tight group-hover:text-[#F3F4F6] transition-colors">
                {item.brand}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#161B26] text-[#93C5FD] border border-[#232B3E] tracking-wider uppercase">
                CASE STUDY
              </span>
            </div>
            <span className="text-xs text-[#6B7280] font-medium hidden sm:inline">
              {item.metric}
            </span>
            <span className="text-[#1E2330] font-light">|</span>
          </div>
        ))}
      </div>
    </div>
  );
};
