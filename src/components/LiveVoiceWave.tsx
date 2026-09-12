import React from 'react';

interface LiveVoiceWaveProps {
  isActive?: boolean;
  color?: string;
}

export const LiveVoiceWave: React.FC<LiveVoiceWaveProps> = ({ 
  isActive = true,
  color = 'bg-[#10B981]' 
}) => {
  return (
    <div className="flex items-center gap-[3px] h-4">
      <span className={`w-[2.5px] h-2.5 rounded-full ${color} ${isActive ? 'animate-[pulse_1.1s_ease-in-out_infinite]' : ''}`} />
      <span className={`w-[2.5px] h-4 rounded-full ${color} ${isActive ? 'animate-[pulse_0.85s_ease-in-out_infinite_0.15s]' : ''}`} />
      <span className={`w-[2.5px] h-2 rounded-full ${color} ${isActive ? 'animate-[pulse_1.2s_ease-in-out_infinite_0.3s]' : ''}`} />
      <span className={`w-[2.5px] h-3.5 rounded-full ${color} ${isActive ? 'animate-[pulse_0.95s_ease-in-out_infinite_0.2s]' : ''}`} />
      <span className={`w-[2.5px] h-2 rounded-full ${color} ${isActive ? 'animate-[pulse_1.05s_ease-in-out_infinite_0.4s]' : ''}`} />
    </div>
  );
};
