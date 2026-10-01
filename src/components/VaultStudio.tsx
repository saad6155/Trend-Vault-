import React, { useState } from 'react';
import { Sparkles, ShoppingBag, RotateCw, Type, Image as ImageIcon, Sliders, Check } from 'lucide-react';
import { CartItem } from '../types';

interface VaultStudioProps {
  onAddCustomToCart: (item: CartItem) => void;
}

export const VaultStudio: React.FC<VaultStudioProps> = ({ onAddCustomToCart }) => {
  const [teeColor, setTeeColor] = useState<'black' | 'bone' | 'charcoal' | 'sage'>('black');
  const [placement, setPlacement] = useState<'center' | 'pocket' | 'back'>('center');
  const [designType, setDesignType] = useState<'archive' | 'customText'>('archive');
  const [selectedArchiveArt, setSelectedArchiveArt] = useState<string>('cyber');
  
  // Custom text states
  const [customText, setCustomText] = useState('VAULT SPECIMEN 09');
  const [fontFamily, setFontFamily] = useState<'syne' | 'sans' | 'mono'>('syne');
  const [inkColor, setInkColor] = useState<'white' | 'black' | 'neon' | 'red'>('white');
  const [graphicScale, setGraphicScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('L');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const blankColors = [
    { id: 'black', name: 'Vintage Washed Black', hex: '#1c1b1f', textLight: true },
    { id: 'bone', name: 'Bone Ecru White', hex: '#e8e4db', textLight: false },
    { id: 'charcoal', name: 'Acid Mineral Charcoal', hex: '#2b2b30', textLight: true },
    { id: 'sage', name: 'Earth Moss Sage', hex: '#373c35', textLight: true },
  ];

  const archiveArts = [
    {
      id: 'cyber',
      name: 'Cyber Brutalist Grid',
      subtitle: 'Technical isometric framework',
      previewText: 'STRUCTURE / 09',
    },
    {
      id: 'kanji',
      name: 'Tokyo Underground Kana',
      subtitle: 'Distressed nocturnal motif',
      previewText: 'トレンド // ヴォールト',
    },
    {
      id: 'monolith',
      name: 'Monolith Architectural Type',
      subtitle: 'Monumental Bauhaus letterforms',
      previewText: 'TREND VAULT ARCHIVE',
    },
    {
      id: 'botanical',
      name: 'Acid Botanical X-Ray',
      subtitle: 'Anatomical organic illustration',
      previewText: 'FLORA MORTEM 2026',
    },
  ];

  const inkColors = [
    { id: 'white', name: 'Chalk White', hex: '#f4f4f5' },
    { id: 'black', name: 'Matte Charcoal Black', hex: '#18181b' },
    { id: 'neon', name: 'Acid Volt Yellow', hex: '#eab308' },
    { id: 'red', name: 'Infrared Crimson', hex: '#ef4444' },
  ];

  const activeColor = blankColors.find((c) => c.id === teeColor)!;
  const activeInk = inkColors.find((c) => c.id === inkColor)!;

  const handleAddToCart = () => {
    const customItem: CartItem = {
      id: `custom-${Date.now()}`,
      productId: 'custom-tee',
      name: `Custom Studio Heavy Tee (${placement.toUpperCase()})`,
      price: 65,
      color: activeColor.name,
      size: selectedSize,
      quantity: 1,
      image: 'custom-mockup',
      isCustom: true,
      customDetails: {
        text: designType === 'customText' ? customText : undefined,
        placement: placement,
        graphicName: designType === 'archive' 
          ? archiveArts.find(a => a.id === selectedArchiveArt)?.name 
          : 'Custom Typography',
      },
    };

    onAddCustomToCart(customItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <section id="customizer" className="py-16 md:py-24 bg-[#0c0c0e] border-b border-[#222226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1f1f24] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1">
              <span>Vault Studio</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Mockup Engine</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Design Your Heavyweight Archival Blank
            </h2>
          </div>
          <p className="text-sm text-[#a1a1aa] max-w-md">
            Experiment with print placements, archival screen-print stamps, or custom typography rendered live on our 280 GSM boxy pattern.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live T-Shirt Visualizer & Mockup Stage */}
          <div className="lg:col-span-7 bg-[#121215] border border-[#222226] rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* View Mode Indicator */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs text-[#71717a] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>LIVE MOCKUP · 280 GSM PATTERN</span>
            </div>

            <div className="absolute top-4 right-4 z-10 text-xs font-mono text-[#a1a1aa]">
              {placement === 'pocket' && 'LEFT CHEST POCKET'}
              {placement === 'center' && 'CENTER CHEST PRINT'}
              {placement === 'back' && 'ARCHIVAL BACK PRINT'}
            </div>

            {/* SVG Interactive T-Shirt Mockup */}
            <div className="w-full max-w-[420px] aspect-[1/1] relative flex items-center justify-center my-6">
              
              {/* T-Shirt Vector Base */}
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full drop-shadow-2xl transition-colors duration-300"
              >
                <defs>
                  {/* Subtle fabric noise & gradient */}
                  <linearGradient id="teeShading" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                  </linearGradient>
                </defs>

                {/* T-Shirt Silhouette: Oversized Boxy Drop Shoulder */}
                <path
                  d="M165,70 
                     C195,95 305,95 335,70 
                     L435,145 
                     L385,225 
                     L345,190 
                     L345,440 
                     C345,445 340,450 335,450 
                     L165,450 
                     C160,450 155,445 155,440 
                     L155,190 
                     L115,225 
                     L65,145 
                     Z"
                  fill={activeColor.hex}
                  stroke="#383842"
                  strokeWidth="2"
                />

                {/* Collar Ribbing Detail */}
                <path
                  d="M165,70 C195,98 305,98 335,70 C310,84 190,84 165,70 Z"
                  fill="#000000"
                  fillOpacity="0.2"
                  stroke="#3f3f4a"
                  strokeWidth="1.5"
                />

                {/* Drop shoulder stitch seams */}
                <line x1="165" y1="70" x2="155" y2="190" stroke="#000" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="335" y1="70" x2="345" y2="190" stroke="#000" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="3,3" />
                
                {/* Hem blind stitch */}
                <line x1="155" y1="435" x2="345" y2="435" stroke="#000" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4,2" />

                {/* Shading overlay */}
                <path
                  d="M165,70 C195,95 305,95 335,70 L435,145 L385,225 L345,190 L345,440 C345,445 340,450 335,450 L165,450 C160,450 155,445 155,440 L155,190 L115,225 L65,145 Z"
                  fill="url(#teeShading)"
                />
              </svg>

              {/* Graphic Print Placement Overlay */}
              <div 
                className={`absolute transition-all duration-300 pointer-events-none flex flex-col items-center justify-center text-center ${
                  placement === 'pocket'
                    ? 'top-[28%] left-[45%] w-[80px]'
                    : placement === 'center'
                    ? 'top-[30%] left-[28%] right-[28%] w-[44%]'
                    : 'top-[22%] left-[24%] right-[24%] w-[52%] h-[58%]'
                }`}
                style={{
                  transform: `scale(${graphicScale}) rotate(${rotation}deg)`,
                }}
              >
                {designType === 'archive' ? (
                  <div
                    className="border border-dashed border-current/40 p-2.5 rounded transition-all w-full flex flex-col items-center justify-center"
                    style={{ color: activeInk.hex }}
                  >
                    {selectedArchiveArt === 'cyber' && (
                      <div className="space-y-1">
                        <div className="w-10 h-10 border-2 border-current mx-auto rotate-45 flex items-center justify-center">
                          <div className="w-4 h-4 bg-current" />
                        </div>
                        <div className="text-[10px] font-mono tracking-widest uppercase font-bold pt-2">
                          TREND VAULT // SPEC
                        </div>
                        <div className="text-[8px] font-mono opacity-80">LAT 35.6762° N</div>
                      </div>
                    )}

                    {selectedArchiveArt === 'kanji' && (
                      <div className="space-y-1">
                        <div className="text-xl font-bold tracking-widest font-mono">
                          トレンド
                        </div>
                        <div className="text-[8px] tracking-widest font-mono border-t border-current pt-1">
                          TOKYO ARCHIVE DROP
                        </div>
                      </div>
                    )}

                    {selectedArchiveArt === 'monolith' && (
                      <div className="space-y-1">
                        <div className="text-xs font-display font-black tracking-tighter uppercase leading-tight">
                          TREND VAULT<br/>HEAVYWEIGHT
                        </div>
                        <div className="text-[7px] font-mono opacity-75">280 GSM COMPACT COTTON</div>
                      </div>
                    )}

                    {selectedArchiveArt === 'botanical' && (
                      <div className="space-y-1">
                        <div className="text-lg">✤ ✿ ✤</div>
                        <div className="text-[9px] font-serif tracking-widest uppercase">
                          FLORA ARCHIVE
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div 
                    className="w-full flex items-center justify-center p-2"
                    style={{ color: activeInk.hex }}
                  >
                    <span 
                      className={`break-words tracking-tight uppercase font-extrabold ${
                        fontFamily === 'syne' ? 'font-display text-base leading-tight' :
                        fontFamily === 'mono' ? 'font-mono text-xs tracking-widest' :
                        'font-sans text-sm font-black'
                      }`}
                    >
                      {customText || 'TREND VAULT'}
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom specs bar of the mockup */}
            <div className="w-full pt-4 border-t border-[#1f1f24] flex items-center justify-between text-xs text-[#71717a]">
              <span>Base: {activeColor.name}</span>
              <span className="font-mono">$65.00 · Made to Order</span>
            </div>

          </div>

          {/* Right Column: Interactive Studio Controls */}
          <div className="lg:col-span-5 bg-[#121215] border border-[#222226] rounded-2xl p-6 sm:p-7 space-y-6">
            
            {/* Control 1: T-Shirt Color */}
            <div>
              <label className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                1. Select Blank Colorway
              </label>
              <div className="grid grid-cols-2 gap-2">
                {blankColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setTeeColor(color.id as any)}
                    className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs text-left transition-all ${
                      teeColor === color.id
                        ? 'border-white bg-[#1c1c21] text-white font-medium shadow-sm'
                        : 'border-[#27272f] text-[#a1a1aa] hover:border-[#383842]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/40 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="truncate">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Print Placement */}
            <div>
              <label className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                2. Print Location
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'pocket', label: 'Left Chest' },
                  { id: 'center', label: 'Center Front' },
                  { id: 'back', label: 'Oversized Back' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlacement(p.id as any)}
                    className={`py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                      placement === p.id
                        ? 'bg-white text-black border-white font-semibold'
                        : 'bg-[#18181b] text-[#a1a1aa] border-[#27272f] hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Artwork Mode (Archive vs Custom Text) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-white uppercase tracking-wider">
                  3. Artwork &amp; Graphic
                </label>
                <div className="flex bg-[#18181b] p-0.5 rounded-md border border-[#27272f]">
                  <button
                    onClick={() => setDesignType('archive')}
                    className={`px-2.5 py-1 text-xs rounded transition-colors ${
                      designType === 'archive' ? 'bg-white text-black font-semibold' : 'text-[#a1a1aa]'
                    }`}
                  >
                    Vault Stamps
                  </button>
                  <button
                    onClick={() => setDesignType('customText')}
                    className={`px-2.5 py-1 text-xs rounded transition-colors ${
                      designType === 'customText' ? 'bg-white text-black font-semibold' : 'text-[#a1a1aa]'
                    }`}
                  >
                    Custom Text
                  </button>
                </div>
              </div>

              {designType === 'archive' ? (
                <div className="grid grid-cols-2 gap-2">
                  {archiveArts.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => setSelectedArchiveArt(art.id)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        selectedArchiveArt === art.id
                          ? 'border-white bg-[#1c1c21] text-white'
                          : 'border-[#27272f] text-[#71717a] hover:text-white'
                      }`}
                    >
                      <div className="font-semibold text-white truncate">{art.name}</div>
                      <div className="text-[10px] text-[#71717a] truncate mt-0.5">{art.subtitle}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 bg-[#18181b] p-3 rounded-xl border border-[#27272f]">
                  <div>
                    <label className="block text-[11px] text-[#a1a1aa] mb-1">Your Custom Text:</label>
                    <input
                      type="text"
                      value={customText}
                      maxLength={28}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="e.g. TOKYO OVERDRIVE"
                      className="w-full bg-[#121215] border border-[#2e2e36] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-white font-mono uppercase"
                    />
                  </div>

                  {/* Font picker */}
                  <div>
                    <label className="block text-[11px] text-[#a1a1aa] mb-1">Typeface Style:</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'syne', label: 'Syne Bold' },
                        { id: 'sans', label: 'Heavy Sans' },
                        { id: 'mono', label: 'Spec Mono' },
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setFontFamily(f.id as any)}
                          className={`py-1 text-[11px] rounded border transition-colors ${
                            fontFamily === f.id
                              ? 'bg-white text-black font-semibold'
                              : 'bg-[#222228] text-[#a1a1aa] border-transparent hover:text-white'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Control 4: Ink Color & Scale */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                  4. Silkscreen Ink
                </label>
                <div className="flex items-center gap-2">
                  {inkColors.map((ink) => (
                    <button
                      key={ink.id}
                      onClick={() => setInkColor(ink.id as any)}
                      title={ink.name}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        inkColor === ink.id
                          ? 'ring-2 ring-white scale-110 border-white'
                          : 'border-[#3f3f46]'
                      }`}
                      style={{ backgroundColor: ink.hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#a1a1aa] mb-1">
                  <span>Scale:</span>
                  <span className="font-mono text-white">{graphicScale}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.1"
                  value={graphicScale}
                  onChange={(e) => setGraphicScale(Number(e.target.value))}
                  className="w-full accent-white h-1.5 bg-[#27272a] rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Control 5: Size & Add To Bag */}
            <div className="pt-2 border-t border-[#1f1f24] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-medium">Garment Size:</span>
                <div className="flex gap-1.5">
                  {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-7 h-7 text-xs font-mono font-medium rounded border transition-colors ${
                        selectedSize === size
                          ? 'bg-white text-black font-bold border-white'
                          : 'bg-[#18181b] text-[#a1a1aa] border-[#27272f]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-[#e4e4e7] py-3.5 rounded-lg font-bold text-sm transition-all shadow-sm"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added Custom Tee to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Custom Piece to Bag · $65</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
