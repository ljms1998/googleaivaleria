import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, CheckCircle2, ShieldAlert, Calendar, RotateCcw } from 'lucide-react';

interface SimulatorMessage {
  id: string;
  sender: 'lead' | 'agent' | 'system';
  text: string;
  time: string;
  badge?: string;
}

interface LiveSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated?: (newLead: any) => void;
}

export const LiveSimulatorModal: React.FC<LiveSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<SimulatorMessage[]>([
    {
      id: 'sim-init-1',
      sender: 'agent',
      text: 'Hello! I am Valeria, Propia autonomous AI agent for Premier Realty Partners. I noticed your interest in the Tribeca Penthouse Duplex ($3,450,000). Are you looking for a primary residence or an investment asset?',
      time: 'Just now',
      badge: 'Responded in 4s',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [detectedScore, setDetectedScore] = useState(45);
  const [detectedBudget, setDetectedBudget] = useState('Pending');
  const [mortgageStatus, setMortgageStatus] = useState('To be verified');
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    {
      label: 'VIP Cash Buyer (Verified Funds)',
      text: 'Primary residence. I have $3,800,000 liquid funds ready to close in 14 days without mortgage contingencies.',
    },
    {
      label: 'Pre-Approved Jumbo Mortgage',
      text: 'Family home. We have a pre-approved $2.5M jumbo mortgage letter plus $1,000,000 in liquid down payment.',
    },
    {
      label: 'Unqualified Looky-Loo',
      text: 'My budget is only $900,000. Will the seller take a 75% discount or lease-to-own for $2,000/month?',
    },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputText;
    if (!messageText.trim()) return;

    const userMsg: SimulatorMessage = {
      id: 'lead-' + Date.now(),
      sender: 'lead',
      text: messageText,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Response logic simulation
    setTimeout(() => {
      const lower = messageText.toLowerCase();
      let aiReply = '';
      let badge = '';
      let newScore = detectedScore;

      if (lower.includes('3,800,000') || lower.includes('liquid') || lower.includes('cash') || lower.includes('without mortgage') || lower.includes('vip')) {
        aiReply = 'Exceptional solvency, Charles! All-cash transactions eliminate financing contingencies and fast-track closing. Senior Partner Elena Ruiz is available tomorrow at 11:30 AM or 5:30 PM. Which window suits your schedule best for a private walkthrough?';
        badge = 'VIP Qualified - Score 98';
        newScore = 98;
        setDetectedBudget('$3,800,000');
        setMortgageStatus('All-Cash (Verified)');
      } else if (lower.includes('jumbo') || lower.includes('pre-approved') || lower.includes('2.5m') || lower.includes('down payment')) {
        aiReply = 'Excellent. Having verified pre-approval documentation in place matches the seller requirements for this penthouse. Would Friday at 12:00 PM or 4:30 PM work for a curated private showing with our listing specialist?';
        badge = 'Pre-Approved - Score 92';
        newScore = 92;
        setDetectedBudget('$3,500,000');
        setMortgageStatus('Jumbo Pre-Approved');
      } else if (lower.includes('900,000') || lower.includes('discount') || lower.includes('lease-to-own') || lower.includes('2,000')) {
        aiReply = 'Thank you for reaching out. This specific Tribeca residence is listed at $3,450,000 and the owners are not accepting sub-market offers or lease options. I have recorded your preferences to notify you if suitable inventory opens in your target price tier. Have a wonderful day!';
        badge = 'Filtered Out - Score 25';
        newScore = 25;
        setDetectedBudget('$900,000 (Non-viable)');
        setMortgageStatus('Unqualified');
      } else if (lower.includes('5:30') || lower.includes('11:30') || lower.includes('12:00') || lower.includes('friday') || lower.includes('tomorrow') || lower.includes('pm')) {
        aiReply = 'Confirmed! I have locked in your private walkthrough on our senior broker calendar and delivered Google Calendar invitations. The property dossier and access instructions have been sent via SMS. We look forward to meeting you!';
        badge = 'Tour Confirmed';
        newScore = 99;
        setAppointmentBooked(true);
      } else {
        aiReply = 'Understood. To ensure the showing is mutually productive: the residence is offered at $3,450,000. Do you hold a verified mortgage pre-approval letter or plan to purchase through liquid equity funds?';
        badge = 'Qualification Prompt';
        newScore = 60;
      }

      setDetectedScore(newScore);

      const agentMsg: SimulatorMessage = {
        id: 'agent-' + Date.now(),
        sender: 'agent',
        text: aiReply,
        time: 'Just now',
        badge: badge,
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'sim-init-1',
        sender: 'agent',
        text: 'Hello! I am Valeria, Propia autonomous AI agent for Premier Realty Partners. I noticed your interest in the Tribeca Penthouse Duplex ($3,450,000). Are you looking for a primary residence or an investment asset?',
        time: 'Just now',
        badge: 'Responded in 4s',
      },
    ]);
    setDetectedScore(45);
    setDetectedBudget('Pending');
    setMortgageStatus('To be verified');
    setAppointmentBooked(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] bg-opacity-80 flex items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-3xl h-[90vh] max-h-[750px] rounded-2xl bg-[#090C12] border border-[#212A3B] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0D111A] border-b border-[#1E2738] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#141B26] border border-[#26334A] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  Live Qualification & Conversation Simulator
                </h3>
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-[#064E3B] text-[#6EE7B7] border border-[#065F46]">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-[#8F96A3]">
                Roleplay as an inbound prospect and watch the solvency model evaluate criteria in real time
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-[#141A25] hover:bg-[#1E2638] text-[#8F96A3] hover:text-white border border-[#232F42] transition-colors cursor-pointer"
              title="Reset simulation"
              id="sim-reset-btn"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#141A25] hover:bg-[#1E2638] text-[#8F96A3] hover:text-white border border-[#232F42] transition-colors cursor-pointer"
              id="sim-close-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real-time Qualification Status Bar */}
        <div className="px-4 py-2.5 bg-[#101520] border-b border-[#1B2230] grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#8F96A3]">Lead Score:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded ${
                detectedScore >= 80
                  ? 'bg-[#064E3B] text-[#A7F3D0] border border-[#065F46]'
                  : detectedScore <= 35
                  ? 'bg-[#7F1D1D] text-[#FECDD3] border border-[#991B1B]'
                  : 'bg-[#1C2433] text-[#FCD34D] border border-[#2D3A50]'
              }`}
            >
              {detectedScore} / 100
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#8F96A3]">Budget:</span>
            <span className="font-semibold text-white truncate">
              {detectedBudget}
            </span>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <span className="text-[#8F96A3]">Financing:</span>
            <span className="font-semibold text-[#60A5FA] truncate">
              {mortgageStatus}
            </span>
          </div>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#090C12]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === 'lead' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'agent' && (
                <div className="w-8 h-8 rounded-lg bg-[#141B26] border border-[#273449] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-[#3B82F6]" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'lead'
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-[#121622] text-[#E2E8F0] border border-[#1E2738]'
                }`}
              >
                <p>{msg.text}</p>
                
                <div className="flex items-center justify-between gap-3 mt-2 pt-1.5 border-t border-[#1F283A] text-xs text-[#8F96A3]">
                  <span>{msg.time}</span>
                  {msg.badge && (
                    <span className="px-2 py-0.5 rounded font-bold bg-[#17202E] text-[#93C5FD] border border-[#29384E]">
                      {msg.badge}
                    </span>
                  )}
                </div>
              </div>

              {msg.sender === 'lead' && (
                <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0 mt-0.5 text-white">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-[#8F96A3]">
              <div className="w-8 h-8 rounded-lg bg-[#141B26] border border-[#273449] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div className="px-3 py-2 rounded-xl bg-[#121622] border border-[#1E2738] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
                <span>Propia is evaluating solvency criteria and drafting response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="p-3 bg-[#0D121B] border-t border-[#1C2433] overflow-x-auto">
          <div className="text-xs text-[#8F96A3] mb-1.5 font-medium">
            Test pre-configured buyer profiles:
          </div>
          <div className="flex items-center gap-2">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.text)}
                className="px-2.5 py-1.5 rounded-lg text-xs bg-[#141A25] hover:bg-[#1E2638] text-[#CBD5E1] border border-[#232F42] whitespace-nowrap transition-colors cursor-pointer"
                id={`quick-prompt-${idx}`}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-3.5 sm:p-4 bg-[#0A0E16] border-t border-[#1C2332]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type as if you were an inquiring luxury buyer..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#111520] text-xs text-white border border-[#1F2739] focus:outline-none focus:border-[#3B82F6] placeholder-[#64748B]"
              id="sim-input-box"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#1A2230] disabled:text-[#64748B] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              id="sim-send-btn"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
