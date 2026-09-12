import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AgencyDashboard } from './components/AgencyDashboard';
import { LiveSimulatorModal } from './components/LiveSimulatorModal';
import { INITIAL_LEADS, INITIAL_STATS, INITIAL_CHATS, INITIAL_VISITS } from './mockData';
import { Lead, ChatSession, ScheduledVisit, AgencyStats } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);

  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [stats, setStats] = useState<AgencyStats>(INITIAL_STATS);
  const [chats, setChats] = useState<ChatSession[]>(INITIAL_CHATS);
  const [visits, setVisits] = useState<ScheduledVisit[]>(INITIAL_VISITS);

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#E2E8F0] selection:bg-[#2563EB] selection:text-white flex flex-col font-sans">
      
      {/* Persistent Ultra-Modern Navigation Header */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onGoDashboard={() => setCurrentView('dashboard')}
          />
        ) : (
          <AgencyDashboard
            stats={stats}
            leads={leads}
            chats={chats}
            visits={visits}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onGoLanding={() => setCurrentView('landing')}
          />
        )}
      </main>

      {/* Live Autonomous Qualification Simulator Modal */}
      <LiveSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />

    </div>
  );
}
