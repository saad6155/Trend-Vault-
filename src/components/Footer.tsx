import React, { useState } from 'react';
import { ArrowUpRight, Check, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#08080a] border-t border-[#1f1f24] text-[#a1a1aa] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display font-black text-2xl tracking-tighter text-white block">
              TREND VAULT
            </span>
            <p className="text-xs text-[#71717a] leading-relaxed max-w-sm">
              Archival heavyweight streetwear and boxy t-shirts engineered from 280–300 GSM combed cotton. Built with structural anti-bacon collars for daily rotation.
            </p>
            <div className="text-[11px] text-[#52525b] font-mono">
              BATCH ARCHIVE 2026 · ALL RIGHTS RESERVED
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Explore Vault
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors"
                >
                  Latest Drops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('customizer')}
                  className="hover:text-white transition-colors"
                >
                  Vault Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lookbook')}
                  className="hover:text-white transition-colors"
                >
                  Lookbook Series
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('craft')}
                  className="hover:text-white transition-colors"
                >
                  The Vault Standard
                </button>
              </li>
            </ul>
          </div>

          {/* Garment Specifications */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Specifications
            </span>
            <ul className="space-y-2 text-[#71717a]">
              <li>280 GSM Compact Cotton</li>
              <li>1.25" Bound Ribbed Collar</li>
              <li>Twin-Needle Topstitch</li>
              <li>Enzyme Bio-Polished</li>
              <li>Zero-Twist Guarantee</li>
            </ul>
          </div>

          {/* VIP Drop Notifications */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Private Drop Access
            </span>
            <p className="text-xs text-[#71717a] leading-relaxed">
              Get notified 15 minutes before limited archival batches launch. No spam, ever.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#121215] border border-[#27272f] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-lg hover:bg-[#e4e4e7] transition-colors"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>You're registered for the next archival drop.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#18181d] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#52525b]">
          <div>
            &copy; 2026 TREND VAULT Co. Crafted with zero synthetic blends.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#a1a1aa] cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-[#a1a1aa] cursor-pointer">Shipping &amp; Customs</span>
            <span>·</span>
            <span className="hover:text-[#a1a1aa] cursor-pointer">Fabric Care Guide</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
