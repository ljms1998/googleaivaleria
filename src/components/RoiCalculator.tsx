import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [monthlyLeads, setMonthlyLeads] = useState<number>(120);
  const [avgPropertyPrice, setAvgPropertyPrice] = useState<number>(850000);
  const agencyCommissionRate = 0.03; // 3.0%

  // Calculations
  const curiososFilteredOut = Math.round(monthlyLeads * 0.62); // 62% looky-loos
  const hoursSavedMonthly = Math.round(curiososFilteredOut * 1.5); // 1.5 hours saved per unqualified inquiry
  const extraDealsClosedPerMonth = (monthlyLeads / 80).toFixed(1);
  const extraRevenueMonthly = Math.round(
    Number(extraDealsClosedPerMonth) * avgPropertyPrice * agencyCommissionRate
  );

  return (
    <div className="w-full rounded-2xl bg-[#0B0E14] border border-[#1E2535] p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1A212E]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded font-bold bg-[#141A25] text-[#3B82F6] border border-[#232F42]">
              BROKERAGE ROI CALCULATOR
            </span>
            <span className="text-xs text-[#8F96A3]">Agencies with 3 to 50 active agents</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Calculate the bottom-line return of autonomous qualification
          </h3>
        </div>
        <div className="text-xs text-[#8F96A3] max-w-xs">
          Calculated using empirical benchmarks on instant response speed and unqualified lead filtering.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Sliders Input */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Slider 1: Monthly Leads */}
          <div className="p-4 rounded-xl bg-[#11151F] border border-[#1E2636]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-[#CBD5E1]">
                Monthly Inbound Leads (Portals + Web + MLS)
              </label>
              <span className="text-base font-extrabold text-white px-3 py-1 rounded bg-[#161C28] border border-[#283348]">
                {monthlyLeads} leads/mo
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="600"
              step="10"
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(Number(e.target.value))}
              className="w-full h-2 bg-[#1C2433] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              id="slider-monthly-leads"
            />
            <div className="flex justify-between text-xs text-[#64748B] mt-2">
              <span>30 leads</span>
              <span>300 leads</span>
              <span>600 leads</span>
            </div>
          </div>

          {/* Slider 2: Average Property Price */}
          <div className="p-4 rounded-xl bg-[#11151F] border border-[#1E2636]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-[#CBD5E1]">
                Average Portfolio Listing Value
              </label>
              <span className="text-base font-extrabold text-white px-3 py-1 rounded bg-[#161C28] border border-[#283348]">
                ${avgPropertyPrice.toLocaleString('en-US')}
              </span>
            </div>
            <input
              type="range"
              min="250000"
              max="3500000"
              step="50000"
              value={avgPropertyPrice}
              onChange={(e) => setAvgPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-[#1C2433] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              id="slider-property-price"
            />
            <div className="flex justify-between text-xs text-[#64748B] mt-2">
              <span>$250,000</span>
              <span>$1,750,000</span>
              <span>$3,500,000</span>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="p-3.5 rounded-xl bg-[#131924] border border-[#232E42] text-xs text-[#94A3B8] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
            <span>
              Estimated average 3.0% buy/sell side commission. Zero cold follow-up phone calls to unverified numbers.
            </span>
          </div>

        </div>

        {/* Output Metrics */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Curiosos filtrados */}
          <div className="p-5 rounded-xl bg-[#111622] border border-[#1F2739] flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#8F96A3]">
                LOOKY-LOOS FILTERED
              </span>
              <div className="text-3xl font-extrabold text-white mt-1">
                {curiososFilteredOut}
              </div>
              <p className="text-xs text-[#94A3B8] mt-2">
                Unqualified buyers lacking down payments or mortgage approval filtered out politely.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1D2535] text-xs font-semibold text-[#10B981]">
              62% unqualified noise removed
            </div>
          </div>

          {/* Card 2: Horas ahorradas */}
          <div className="p-5 rounded-xl bg-[#111622] border border-[#1F2739] flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#8F96A3]">
                BROKER HOURS RECLAIMED
              </span>
              <div className="text-3xl font-extrabold text-white mt-1">
                {hoursSavedMonthly}h
              </div>
              <p className="text-xs text-[#94A3B8] mt-2">
                Reclaimed selling hours for your brokers to negotiate exclusive mandates and close deals.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1D2535] text-xs font-semibold text-[#3B82F6]">
              Equivalent to 1 full-time broker
            </div>
          </div>

          {/* Card 3: Ventas extra rescatadas (Full Width) */}
          <div className="sm:col-span-2 p-6 rounded-xl bg-[#121A28] border border-[#23334E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#60A5FA] tracking-wide block">
                RECLAIMED COMMISSIONS VIA 24/7 SUB-10S RESPONSE
              </span>
              <div className="text-4xl font-extrabold text-white mt-1">
                +${extraRevenueMonthly.toLocaleString('en-US')}
                <span className="text-sm font-medium text-[#94A3B8] ml-2">/ month</span>
              </div>
              <p className="text-xs text-[#CBD5E1] mt-2 max-w-md">
                Conservative projection based on capturing high-intent prospects reaching out on evenings and weekends while competitor brokerages are closed.
              </p>
            </div>
            <div className="shrink-0">
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#064E3B] text-[#A7F3D0] border border-[#065F46] inline-block">
                +{extraDealsClosedPerMonth} extra deals / mo
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
