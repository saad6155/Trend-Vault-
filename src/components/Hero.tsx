import React from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import { heroTeeImg } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
  onCustomizerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onCustomizerClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0e] border-b border-[#222226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#a1a1aa] uppercase">
              <span>Drop 09</span>
              <span aria-hidden="true">·</span>
              <span>Spring Archival Series</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">In Stock</span>
            </div>

            {/* Display Title with text-wrap: balance */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              Heavyweight Cotton. Architected for the Modern Street.
            </h1>

            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-xl">
              Engineered with 280 GSM compact ring-spun cotton, a 1.25" reinforced collar that never sags, and an authentic boxy drop-shoulder cut.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="flex items-center justify-center gap-2 bg-white text-[#0c0c0e] hover:bg-[#e4e4e7] px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-150 shadow-sm"
              >
                <span>Shop Featured Drop</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomizerClick}
                className="flex items-center justify-center gap-2 bg-[#18181b] text-white hover:bg-[#27272a] border border-[#2e2e34] px-5 py-3.5 rounded-lg font-medium text-sm transition-all duration-150"
              >
                <Sliders className="w-4 h-4 text-[#a1a1aa]" />
                <span>Vault Mockup Studio</span>
              </button>
            </div>

            {/* Specs proof row adjacent to claim */}
            <div className="pt-6 border-t border-[#1f1f24] grid grid-cols-3 gap-4">
              <div>
                <div className="font-mono-numbers text-xl font-bold text-white">280 GSM</div>
                <div className="text-xs text-[#71717a] mt-0.5">Heavy Combed Cotton</div>
              </div>
              <div>
                <div className="font-mono-numbers text-xl font-bold text-white">1.25"</div>
                <div className="text-xs text-[#71717a] mt-0.5">Anti-Bacon Collar</div>
              </div>
              <div>
                <div className="font-mono-numbers text-xl font-bold text-white">&lt; 1.5%</div>
                <div className="text-xs text-[#71717a] mt-0.5">Pre-Shrunk Guarantee</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-xl overflow-hidden bg-[#18181b] border border-[#27272a] group">
              <img
                src={heroTeeImg}
                alt="Model wearing TREND VAULT heavyweight boxy graphic t-shirt in architectural urban setting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
              />
              
              {/* Subtle Scrim gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#d4d4d8]">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">LOOK 01</span>
                  <span>·</span>
                  <span>Heavy Boxy Blank &amp; Distressed Wash</span>
                </div>
                <span className="font-mono text-[#a1a1aa]">SHOWN IN WASHED BLACK</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Marquee ticker bar */}
      <div className="border-t border-[#1f1f24] bg-[#121215] py-2.5 overflow-hidden">
        <div className="flex items-center gap-8 text-xs font-mono text-[#a1a1aa] whitespace-nowrap animate-marquee">
          <span>280 GSM RING-SPUN COTTON</span>
          <span className="text-[#3f3f46]">///</span>
          <span>REINFORCED 1.25" COLLAR BOUNDING</span>
          <span className="text-[#3f3f46]">///</span>
          <span>PRE-SHRUNK ENZYME STONE WASH</span>
          <span className="text-[#3f3f46]">///</span>
          <span>TWIN-NEEDLE PARALLEL STITCHING</span>
          <span className="text-[#3f3f46]">///</span>
          <span>OEKO-TEX NON-TOXIC DISCHARGE INKS</span>
          <span className="text-[#3f3f46]">///</span>
          <span>BOXED OVERSIZED FIT SPECS</span>
          <span className="text-[#3f3f46]">///</span>
          <span>WORLDWIDE EXPRESS DISPATCH</span>
        </div>
      </div>
    </section>
  );
};
