import React from 'react';
import { Layers, ShieldCheck, Feather, RefreshCw } from 'lucide-react';

export const CraftSection: React.FC = () => {
  const standards = [
    {
      num: '01',
      title: 'The Anti-Bacon Ribbed Collar',
      desc: '1.25" thick 1x1 dense ribbing reinforced with inner neck twill tape. Designed never to stretch, ripple, or sag after dozens of machine wash cycles.',
      icon: ShieldCheck,
      spec: '1.25" Width · Twin-Needle Bounding',
    },
    {
      num: '02',
      title: '280–300 GSM Heavyweight Jersey',
      desc: 'Double the weight of standard mass-market tees. Spun from 100% long-staple combed cotton for a substantial, structured drape that holds its shape all day.',
      icon: Layers,
      spec: '32 Singles Compact Ring-Spun Cotton',
    },
    {
      num: '03',
      title: 'Zero-Twist Enzyme Pre-Shrunk',
      desc: 'Bio-polished with organic natural enzymes and garment-dyed prior to cutting. Guarantees less than 1.5% shrinkage and eliminates side seam twisting forever.',
      icon: RefreshCw,
      spec: '< 1.5% Shrinkage Rate',
    },
    {
      num: '04',
      title: 'Soft-Hand Discharge Screen Printing',
      desc: 'We utilize water-based discharge inks that bleach and re-dye cotton fibers instead of sitting thick on top. Breathable, crack-resistant, and vintage-soft.',
      icon: Feather,
      spec: 'Oeko-Tex Standard 100 Certified',
    },
  ];

  return (
    <section id="craft" className="py-16 md:py-24 bg-[#0a0a0c] border-b border-[#222226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1">
            <span>Garment Engineering</span>
            <span aria-hidden="true">·</span>
            <span>The Vault Standard</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Why Our Heavyweight Tees Feel &amp; Fit Different
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa] mt-3 leading-relaxed">
            Most t-shirts are treated as disposable commodities. Every TREND VAULT silhouette is architected as an heirloom garment cut for daily rotation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="bg-[#121215] border border-[#222226] p-6 rounded-2xl flex flex-col justify-between hover:border-[#383842] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#71717a]">
                      {s.num}.
                    </span>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#1c1c20] text-[11px] font-mono text-[#d4d4d8]">
                  {s.spec}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
