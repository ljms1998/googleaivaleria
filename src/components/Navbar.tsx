import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard';
  onViewChange: (view: 'landing' | 'dashboard') => void;
  onOpenSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onOpenSimulator,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger white state when scrolled past top 40px
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case page reloads scrolled down
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`w-full z-50 flex flex-col font-sans fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white border-b border-[#F1F5F9]' 
          : 'bg-transparent'
      }`}
    >
      {/* Main Navigation Bar */}
      <header className="w-full">
        <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between relative">
          
          {/* 1. LEFT: Brand Identity */}
          <div className="flex items-center">
            <button 
              onClick={() => onViewChange('landing')} 
              className="flex items-center gap-3 cursor-pointer text-left focus:outline-none group py-1"
              id="nav-brand-btn"
            >
              {/* High-End Architectural Prism Glyph */}
              <div className={`w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105 ${
                isScrolled ? 'text-[#090A0D]' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}>
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 7L12 12L3 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 4.5L16.5 9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </div>
              <span className={`text-[21px] font-semibold tracking-[-0.03em] transition-colors ${
                isScrolled 
                  ? 'text-[#090A0D] group-hover:text-black' 
                  : 'text-white group-hover:text-[#F8FAFC] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}>
                Propia
              </span>
            </button>
          </div>

          {/* 2. CENTER: Perfectly Centered Clean Text Links */}
          {currentView === 'landing' && (
            <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-medium absolute left-1/2 -translate-x-1/2">
              <a 
                href="#trabajadores" 
                className={`transition-colors duration-150 ${
                  isScrolled 
                    ? 'text-[#0F172A] hover:text-black' 
                    : 'text-[#CBD5E1] hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                }`}
              >
                Agents
              </a>
              <button
                onClick={() => onViewChange('dashboard')}
                className={`transition-colors duration-150 cursor-pointer ${
                  isScrolled 
                    ? 'text-[#0F172A] hover:text-black' 
                    : 'text-[#CBD5E1] hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                }`}
              >
                Dashboard
              </button>
            </nav>
          )}

          {/* 3. RIGHT: Single Clean CTA Action */}
          <div className="flex items-center gap-4">
            {currentView === 'dashboard' && (
              <button
                onClick={() => onViewChange('landing')}
                className={`inline-flex text-[14px] font-medium transition-colors cursor-pointer ${
                  isScrolled 
                    ? 'text-[#475569] hover:text-[#090A0D]' 
                    : 'text-[#CBD5E1] hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                }`}
                id="nav-go-landing-link"
              >
                Back to Website
              </button>
            )}

            <button
              onClick={onOpenSimulator}
              className={`group h-10 sm:h-10 px-4 sm:px-5 rounded-full text-[13px] sm:text-[14px] font-medium tracking-normal transition-all duration-200 cursor-pointer active:scale-[0.98] inline-flex items-center justify-center gap-1.5 shadow-sm sm:shadow-md ${
                isScrolled
                  ? 'bg-[#090A0D] hover:bg-[#1E293B] text-white'
                  : 'bg-[#090A0D]/70 hover:bg-[#090A0D] text-white border border-white/20 hover:border-white/35 backdrop-blur-xl sm:bg-[#F8FAFC] sm:hover:bg-[#090A0D] sm:text-[#090A0D] sm:hover:text-white sm:border-transparent sm:hover:border-white/20'
              }`}
              id="nav-live-demo-btn"
            >
              <span className="transition-colors duration-200">Book a Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-current transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>
      </header>
    </div>
  );
};

