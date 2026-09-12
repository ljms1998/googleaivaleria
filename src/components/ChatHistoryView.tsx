import React, { useState } from 'react';
import { Bot, User, Search, MessageSquare, Phone, Calendar, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { ChatSession } from '../types';

interface ChatHistoryViewProps {
  chats: ChatSession[];
  initialSelectedId?: string;
}

export const ChatHistoryView: React.FC<ChatHistoryViewProps> = ({
  chats,
  initialSelectedId,
}) => {
  const [selectedChatId, setSelectedChatId] = useState<string>(
    initialSelectedId || (chats.length > 0 ? chats[0].id : '')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState<'all' | 'WhatsApp' | 'Idealista' | 'Fotocasa'>('all');

  const filteredChats = chats.filter((c) => {
    const matchesSearch =
      c.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);
    const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
    return matchesSearch && matchesChannel;
  });

  const activeChat = chats.find((c) => c.id === selectedChatId) || chats[0];

  return (
    <div className="w-full rounded-2xl bg-[#0A0D14] border border-[#1E2536] overflow-hidden flex flex-col md:flex-row h-[700px] shadow-2xl">
      
      {/* Left Column: Chat Sessions List */}
      <div className="w-full md:w-80 lg:w-96 bg-[#0D111A] border-r border-[#1E2637] flex flex-col shrink-0">
        
        {/* Search & Filters */}
        <div className="p-4 border-b border-[#1C2434] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por comprador o inmueble..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#121622] text-xs text-white border border-[#1E2738] focus:outline-none focus:border-[#3B82F6] placeholder-[#64748B]"
              id="chat-search-input"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['all', 'WhatsApp', 'Idealista', 'Fotocasa'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  channelFilter === ch
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-[#141A25] text-[#8F96A3] hover:text-white border border-[#232F42]'
                }`}
                id={`filter-chan-${ch}`}
              >
                {ch === 'all' ? 'Todos' : ch}
              </button>
            ))}
          </div>
        </div>

        {/* List of sessions */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#18202D]">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`w-full p-3.5 text-left transition-colors flex flex-col gap-1.5 cursor-pointer ${
                activeChat?.id === chat.id
                  ? 'bg-[#151C28] border-l-4 border-l-[#2563EB]'
                  : 'hover:bg-[#111722]'
              }`}
              id={`chat-item-${chat.id}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate max-w-[170px]">
                  {chat.leadName}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-bold ${
                    chat.score >= 80
                      ? 'bg-[#064E3B] text-[#A7F3D0] border border-[#065F46]'
                      : chat.score <= 35
                      ? 'bg-[#7F1D1D] text-[#FECDD3] border border-[#991B1B]'
                      : 'bg-[#1C2433] text-[#FCD34D] border border-[#2D3A50]'
                  }`}
                >
                  {chat.score}/100
                </span>
              </div>

              <div className="text-xs text-[#8F96A3] truncate">
                {chat.propertyTitle}
              </div>

              <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                {chat.lastMessage}
              </p>

              <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
                <span className="px-1.5 py-0.5 rounded bg-[#131924] border border-[#222C3D] font-medium text-[#93C5FD]">
                  {chat.channel}
                </span>
                <span>{chat.lastActivity}</span>
              </div>
            </button>
          ))}

          {filteredChats.length === 0 && (
            <div className="p-8 text-center text-xs text-[#64748B]">
              No se encontraron conversaciones con este criterio.
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Chat Transcript & Lead Metadata */}
      {activeChat ? (
        <div className="flex-1 flex flex-col bg-[#0A0E16]">
          
          {/* Active Chat Header */}
          <div className="p-4 bg-[#0E131E] border-b border-[#1D2536] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#141B26] border border-[#26334A] flex items-center justify-center text-white font-bold">
                <Bot className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{activeChat.leadName}</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#141B26] text-[#93C5FD] border border-[#232F42] font-semibold">
                    {activeChat.channel}
                  </span>
                </div>
                <p className="text-xs text-[#8F96A3]">
                  {activeChat.phone} • Ref: {activeChat.propertyRef}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2.5 py-1 rounded font-bold ${
                  activeChat.score >= 80
                    ? 'bg-[#064E3B] text-[#A7F3D0] border border-[#065F46]'
                    : activeChat.score <= 35
                    ? 'bg-[#7F1D1D] text-[#FECDD3] border border-[#991B1B]'
                    : 'bg-[#1C2433] text-[#FCD34D] border border-[#2D3A50]'
                }`}
              >
                Score {activeChat.score}/100
              </span>
            </div>
          </div>

          {/* Qualification Highlights Bar */}
          <div className="px-5 py-2 bg-[#111622] border-b border-[#1E2738] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#8F96A3]">Presupuesto:</span>
              <span className="text-white font-bold">{activeChat.qualificationSummary.budget}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8F96A3]">Financiación:</span>
              <span className="text-[#60A5FA] font-semibold">{activeChat.qualificationSummary.financing}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8F96A3]">Plazo:</span>
              <span className="text-white font-semibold">{activeChat.qualificationSummary.urgency}</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#090C12]">
            {activeChat.messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${
                  m.sender === 'lead' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'agent' && (
                  <div className="w-8 h-8 rounded-lg bg-[#141B26] border border-[#273449] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-xl p-3.5 text-xs leading-relaxed ${
                    m.sender === 'lead'
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#121622] text-[#E2E8F0] border border-[#1E2738]'
                  }`}
                >
                  <p>{m.text}</p>
                  <div className="flex items-center justify-between gap-3 mt-2 pt-1.5 border-t border-[#1E283A] text-xs text-[#8F96A3]">
                    <span>{m.timestamp}</span>
                    {m.badge && (
                      <span className="px-2 py-0.5 rounded font-bold bg-[#17202E] text-[#93C5FD] border border-[#29384E]">
                        {m.badge}
                      </span>
                    )}
                  </div>
                </div>

                {m.sender === 'lead' && (
                  <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0 mt-0.5 text-white">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Audit Notice */}
          <div className="p-3 bg-[#0E131E] border-t border-[#1C2535] flex items-center justify-between text-xs text-[#8F96A3]">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Conversación atendida 100% de forma autónoma por Propia
            </span>
            <span>Registrado en CRM Inmobiliario</span>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-[#8F96A3]">
          Selecciona una conversación para ver su historial.
        </div>
      )}

    </div>
  );
};
