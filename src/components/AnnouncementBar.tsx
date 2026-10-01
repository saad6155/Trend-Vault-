import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="bg-[#18181b] border-b border-[#27272a] text-[#d4d4d8] text-xs py-2 px-4 flex items-center justify-between z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center flex-1 font-medium">
        <span className="hidden sm:inline-block text-[#a1a1aa]">DROP 09 AVAILABLE NOW</span>
        <span className="hidden sm:inline-block text-[#52525b]">·</span>
        <span>FREE SHIPPING ON ORDERS OVER $80</span>
        <span className="text-[#52525b]">·</span>
        <span className="text-white font-semibold">CODE: <span className="bg-[#27272a] px-1.5 py-0.5 rounded text-[#f4f4f5] tracking-wider font-mono">VAULT15</span> FOR 15% OFF</span>
      </div>
      <button 
        onClick={() => setIsOpen(false)}
        aria-label="Dismiss banner"
        className="text-[#71717a] hover:text-white transition-colors p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
