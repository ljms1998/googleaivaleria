import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Play, 
  Check, 
  Calendar, 
  ShieldCheck, 
  Building2, 
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Layers,
  Clock,
  TrendingUp,
  X
} from 'lucide-react';
import { CursorGlow } from './CursorGlow';
import { TiltCard } from './TiltCard';
import { LiveVoiceWave } from './LiveVoiceWave';

interface LandingPageProps {
  onOpenSimulator: () => void;
  onGoDashboard?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenSimulator,
  onGoDashboard,
}) => {
  const [showFloatingAssistant, setShowFloatingAssistant] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Reveal the floating button only once the user scrolls past 70% of the Hero viewport
      const heroThreshold = window.innerHeight * 0.7;
      setShowFloatingAssistant(window.scrollY > heroThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-[#090A0D] text-[#E2E8F0] font-sans overflow-x-hidden relative">
      {/* Ambient Cursor Spotlight Glow for Immense Spatial Depth */}
      <CursorGlow />
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (HIGH-END EDITORIAL ARCHITECTURE & AIR) */}
      {/* ========================================================================= */}
      <section className="relative h-[100dvh] min-h-[580px] w-full flex flex-col justify-between overflow-hidden">
        
        {/* Type 2: Luxury Modern Glass Mansion Exterior at Dusk with Warm Architectural Illumination */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2600&q=85"
            alt="Luxury Contemporary Glass Villa Exterior at Twilight with Warm Architectural Illumination"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[75%_center] sm:object-[68%_center] lg:object-center filter brightness-[0.72] contrast-[1.10]"
          />

          {/* Clean Subtle Tone Filter - Pure natural lighting without heavy black blotches */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(9,10,13,0.88) 0%, rgba(9,10,13,0.52) 45%, rgba(9,10,13,0.15) 80%, transparent 100%)'
            }}
          />

          {/* Top Optical Scrim - Natural photographic vignette to guarantee crystalline contrast on top nav elements without altering the villa ambiance */}
          <div 
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(9,10,13,0.70) 0%, rgba(9,10,13,0.30) 60%, transparent 100%)'
            }}
          />
        </div>

        {/* Central Hero Content (Proportional vertical breathing: tight & elegant on tablet/mobile, monumental in desktop) */}
        <div className="relative z-10 max-w-[1536px] mx-auto px-5 sm:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-4 sm:pb-6 w-full my-auto">
          <div className="w-full space-y-4 sm:space-y-6">

            {/* Monumental Fluid Display Headline: Bold, massive editorial presence with perfectly contained lines */}
            <h1 className="flex flex-col items-start font-bold text-[#F8FAFC] tracking-[-0.03em] leading-[0.95] sm:leading-[0.98] lg:leading-[1.0] text-[46px] sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[116px]">
              {/* In mobile (<sm): clean, powerful 2-line break that NEVER overflows */}
              <span className="block sm:hidden whitespace-nowrap">Digital Agents,</span>
              <span className="block sm:hidden text-[#F8FAFC]">Real Deals.</span>

              {/* In tablet & desktop (sm+): iconic anchor break with monumental Deals. */}
              <span className="hidden sm:block whitespace-normal">Digital Agents, Real</span>
              <span className="hidden sm:block text-[#F8FAFC]">Deals.</span>
            </h1>

            {/* Subheading - Distinct, solid slate color (#CBD5E1) with clean contrast against the photo without being pure white */}
            <p className="text-sm sm:text-base md:text-[19px] text-[#CBD5E1] font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Autonomous AI chat that books buyer tours on autopilot.
            </p>

            {/* Modern Refined Pill CTA Actions: Natural proportional widths (never full width) */}
            <div className="flex items-center gap-3.5 pt-1">
              <button
                onClick={onOpenSimulator}
                className="group relative h-10 sm:h-12 px-5 sm:px-7 rounded-full bg-[#F8FAFC] hover:bg-[#090A0D] text-[#090A0D] hover:text-white border border-transparent hover:border-white/20 text-[14px] sm:text-base font-semibold tracking-normal transition-all duration-200 cursor-pointer shadow-lg inline-flex items-center justify-center gap-2 active:scale-[0.98]"
                id="hero-live-demo-btn"
              >
                <span className="transition-colors duration-200">Book a Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-current transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Valeria Live Chat Button (Visible in Hero exclusively for Tablet and Desktop) */}
              <button
                onClick={onOpenSimulator}
                className="hidden sm:inline-flex group relative h-11 sm:h-12 px-5 sm:px-6 rounded-full overflow-hidden text-[#CBD5E1] hover:text-white text-sm sm:text-base font-medium tracking-normal transition-all duration-300 cursor-pointer items-center justify-center gap-3 active:scale-[0.98]"
                id="hero-try-valeria-btn"
              >
                {/* 1. Base Static Border & Ultra-Light Smoked Backdrop */}
                <div className="absolute inset-0 rounded-full border border-white/15 bg-black/40 backdrop-blur-md transition-colors duration-300 group-hover:bg-black/60" />

                {/* 2. Traveling AI Border Beam (Visible exclusively on hover) */}
                <div className="absolute inset-[-100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="w-full h-full animate-spin-beam"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0 310deg, rgba(255,255,255,0.95) 345deg, transparent 360deg)'
                    }}
                  />
                </div>

                {/* 3. Inner Mask (1px inward) to create razor-sharp optical traveling beam */}
                <div className="absolute inset-[1px] rounded-full bg-[#090A0D]/90 backdrop-blur-md transition-colors duration-300 group-hover:bg-[#090A0D]/95" />

                {/* 4. Button Foreground Content (Airy, Minimal, Modern) */}
                <div className="relative z-10 flex items-center justify-center gap-2.5">
                  <div className="relative flex items-center justify-center shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                      alt="Valeria"
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover ring-1 ring-white/20"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#090A0D]" />
                  </div>

                  <span className="font-medium whitespace-nowrap transition-colors duration-200">
                    Chat with Valeria Live
                  </span>
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* Modern Full-Width Ambient Acoustic Bar: Slim, subtle luminous gradient edge-to-edge, perfectly tiered across screens */}
        <div className="relative z-10 w-full mt-auto">
          <div 
            onClick={onOpenSimulator}
            className="w-full bg-gradient-to-t from-white/[0.08] via-white/[0.03] to-transparent border-t border-white/20 py-3 sm:py-3.5 px-5 sm:px-10 lg:px-16 backdrop-blur-md cursor-pointer group active:bg-white/[0.06] transition-colors"
            title="Click to chat with Valeria"
          >
            <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-4">
              
              {/* Left: Refined Kinetic Voice Waveform + Valeria Avatar on Mobile */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                {/* Mobile Valeria Avatar Integrated Directly into Acoustic Bar */}
                <div className="relative sm:hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                    alt="Valeria"
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-white/30"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-[#090A0D] animate-pulse" />
                </div>

                <div className="flex items-center gap-1 h-3.5 sm:h-4 shrink-0">
                  <span className="w-[2px] sm:w-[2.5px] h-2 bg-white/80 rounded-full animate-pulse" />
                  <span className="w-[2px] sm:w-[2.5px] h-3.5 sm:h-4 bg-white rounded-full animate-pulse [animation-delay:150ms]" />
                  <span className="w-[2px] sm:w-[2.5px] h-1.5 bg-white/60 rounded-full animate-pulse [animation-delay:300ms]" />
                  <span className="w-[2px] sm:w-[2.5px] h-3 bg-white rounded-full animate-pulse [animation-delay:75ms]" />
                  <span className="w-[2px] sm:w-[2.5px] h-2.5 bg-white/75 rounded-full animate-pulse [animation-delay:225ms]" />
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs sm:text-sm font-medium tracking-normal text-white truncate group-hover:text-slate-200 transition-colors">
                    <span className="sm:hidden">Valeria active 24/7</span>
                    <span className="hidden sm:inline xl:hidden">Valeria active across all channels</span>
                    <span className="hidden xl:inline">Valeria active across Web, Instagram & WhatsApp</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                </div>
              </div>

              {/* Right: Elegant Modern Status Indicators (Adaptive Tiering without crowding) */}
              <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-200 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-medium whitespace-nowrap">
                    <span className="sm:hidden">Instant booking ↗</span>
                    <span className="hidden sm:inline">Instant qualification</span>
                  </span>
                </div>
                <span className="hidden md:inline text-white/30">•</span>
                <div className="hidden md:flex items-center gap-1.5">
                  <span className="text-white font-medium whitespace-nowrap">Calendar booking</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Fixed 11x-style Floating Assistant Pill (Revealed only when scrolling past the hero) */}
      <div 
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${
          showFloatingAssistant 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={onOpenSimulator}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#111319] hover:bg-[#181B24] text-white text-xs font-medium border border-[#262C3A] shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          id="floating-valeria-pill-btn"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
              alt="Valeria"
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover border border-[#3E485D]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] border border-[#111319]"></span>
          </div>
          <span className="text-[#E2E8F0]">Chat with Valeria</span>
        </button>
      </div>

    </div>
  );
};

