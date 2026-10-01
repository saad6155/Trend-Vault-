import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearchClick: () => void;
  onNavigate: (sectionId: string) => void;
  currentSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearchClick,
  onNavigate,
  currentSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'collection', label: 'Latest Drops' },
    { id: 'customizer', label: 'Vault Studio' },
    { id: 'lookbook', label: 'Lookbook' },
    { id: 'craft', label: 'The Standard' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-[#222226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#a1a1aa] hover:text-white p-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => handleNavClick('hero')}
            className="text-left font-display font-extrabold text-2xl tracking-tighter text-white hover:opacity-90 transition-opacity"
          >
            TREND VAULT
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`transition-colors py-1 ${
                currentSection === link.id
                  ? 'text-white border-b-2 border-white'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onSearchClick}
            aria-label="Search collection"
            className="p-2 text-[#a1a1aa] hover:text-white hover:bg-[#18181b] rounded-md transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenWishlist}
            aria-label="View saved items"
            className="relative p-2 text-[#a1a1aa] hover:text-white hover:bg-[#18181b] rounded-md transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-[#0c0c0e] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Open shopping bag"
            className="flex items-center gap-2 bg-white text-[#0c0c0e] hover:bg-[#e4e4e7] px-3.5 py-2 rounded-lg font-semibold text-xs tracking-tight transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#0c0c0e] text-white px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#222226] bg-[#121215] px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left text-base font-medium py-1.5 transition-colors ${
                  currentSection === link.id ? 'text-white font-semibold' : 'text-[#a1a1aa]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-[#222226] flex items-center justify-between text-xs text-[#71717a]">
            <span>Archival Cotton Blanks · 280 GSM</span>
            <span className="font-mono">EST. 2026</span>
          </div>
        </div>
      )}
    </header>
  );
};
