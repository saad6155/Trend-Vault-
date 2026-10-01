import React, { useState } from 'react';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';
import { LOOKBOOK_ITEMS, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface LookbookSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onSelectProduct }) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const activeLook = LOOKBOOK_ITEMS[activeLookIndex];
  const featuredProduct = PRODUCTS.find((p) => p.id === activeLook.featuredProductId);

  return (
    <section id="lookbook" className="py-16 md:py-24 bg-[#0c0c0e] border-b border-[#222226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1f1f24] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1">
              <span>Editorial Series</span>
              <span aria-hidden="true">·</span>
              <span>Lookbook 09</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              On-Street Archival Silhouettes
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {LOOKBOOK_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveLookIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeLookIndex === idx
                    ? 'bg-white text-black font-semibold'
                    : 'bg-[#18181b] text-[#a1a1aa] hover:text-white'
                }`}
              >
                Look 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visual Display */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-[#18181b] border border-[#27272a] aspect-[3/4] sm:aspect-[4/3] lg:aspect-[4/3] group">
            <img
              src={activeLook.image}
              alt={activeLook.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
            />
            
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom details */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <div>
                <span className="text-xs text-[#a1a1aa] uppercase font-mono tracking-wider">
                  {activeLook.location}
                </span>
                <h3 className="font-display text-2xl font-bold mt-1">
                  {activeLook.title}
                </h3>
                <p className="text-xs text-[#d4d4d8] mt-1 font-mono">
                  Model: {activeLook.model}
                </p>
              </div>

              {featuredProduct && (
                <button
                  onClick={() => onSelectProduct(featuredProduct)}
                  className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#e4e4e7] transition-colors"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Shop This Tee</span>
                </button>
              )}
            </div>
          </div>

          {/* Breakdown & Outfit Elements */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121215] border border-[#222226] rounded-2xl p-6 sm:p-7 space-y-5">
              <div>
                <span className="text-xs text-[#71717a] font-mono uppercase">Full Ensemble Breakdown</span>
                <h4 className="font-display text-xl font-bold text-white mt-1">
                  Garment Layering Notes
                </h4>
              </div>

              <div className="space-y-3">
                {activeLook.outfit.map((piece, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#18181b] border border-[#222226] text-xs"
                  >
                    <div>
                      <span className="text-white font-medium block">{piece.piece}</span>
                      <span className="text-[#71717a] text-[11px]">{piece.role}</span>
                    </div>
                    {piece.role === 'Top' && (
                      <span className="bg-[#27272a] text-[#f4f4f5] px-2 py-0.5 rounded text-[10px] font-mono">
                        IN STORE
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {featuredProduct && (
                <div className="pt-4 border-t border-[#1f1f24] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#71717a]">Featured Top</div>
                    <div className="text-sm font-semibold text-white">{featuredProduct.name}</div>
                    <div className="text-xs text-[#a1a1aa] font-mono">${featuredProduct.price} · {featuredProduct.gsm} GSM</div>
                  </div>
                  <button
                    onClick={() => onSelectProduct(featuredProduct)}
                    className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
                  >
                    <span>View Garment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Streetwear styling tip */}
            <div className="p-4 rounded-xl border border-[#222226] bg-[#0f0f12] text-xs text-[#a1a1aa] leading-relaxed">
              <strong className="text-white font-medium">Styling Rule:</strong> Our drop-shoulder boxy silhouette is specifically calibrated with a straight hemline to create a modern architectural drape without bunching around the waistline.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
