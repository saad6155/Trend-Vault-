import React, { useState } from 'react';
import { X, Check, Ruler, Truck, RotateCcw, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', color: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('L');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'measurements' | 'sizeFinder'>('details');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Size advisor state
  const [heightInches, setHeightInches] = useState(70); // 5'10"
  const [weightLbs, setWeightLbs] = useState(165);
  const [fitPreference, setFitPreference] = useState<'fitted' | 'boxy' | 'ultra'>('boxy');

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  // Calculate recommended size
  const getRecommendedSize = (): 'S' | 'M' | 'L' | 'XL' | 'XXL' => {
    let score = (heightInches - 64) * 1.5 + (weightLbs - 130) * 0.5;
    if (fitPreference === 'ultra') score += 10;
    if (fitPreference === 'fitted') score -= 8;

    if (score < 15) return 'S';
    if (score < 30) return 'M';
    if (score < 48) return 'L';
    if (score < 65) return 'XL';
    return 'XXL';
  };

  const recommendedSize = getRecommendedSize();

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, currentColor.name, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#121215] border border-[#27272c] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1c1c20]/80 hover:bg-[#27272c] text-[#a1a1aa] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: Image Stage & Gallery */}
          <div className="md:col-span-6 bg-[#0c0c0e] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#222226]">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#18181b] border border-[#222226] relative">
              <img
                src={currentColor.image}
                alt={`${product.name} in ${currentColor.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-[#0c0c0e]/80 text-[#d4d4d8] text-xs px-2.5 py-1 rounded backdrop-blur font-mono">
                {currentColor.name}
              </div>
            </div>

            {/* Thumbnail color selector */}
            <div className="pt-4 flex items-center gap-3">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                    selectedColorIndex === idx
                      ? 'border-white bg-[#1c1c20] text-white font-medium'
                      : 'border-[#27272a] text-[#71717a] hover:text-white'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/40"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>

            {/* Trust badges */}
            <div className="pt-6 grid grid-cols-2 gap-3 text-xs text-[#a1a1aa] border-t border-[#1f1f24] mt-4">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-white shrink-0" />
                <span>Express dispatch in 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-white shrink-0" />
                <span>30-day effortless returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#121215] space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#71717a] mb-1.5 font-medium">
                <div className="flex items-center gap-2">
                  <span>{product.subtitle}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-numbers">{product.gsm} GSM</span>
                </div>
                <div className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>In Stock</span>
                </div>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-extrabold text-white font-mono-numbers">
                  ${product.price}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-[#71717a] line-through font-mono-numbers">
                    ${product.compareAtPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-semibold">
                  Save ${product.compareAtPrice ? product.compareAtPrice - product.price : 0}
                </span>
              </div>
            </div>

            {/* Size Selector + Interactive Fit Guide */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-medium">
                  Select Size: <span className="font-mono text-[#a1a1aa]">{selectedSize}</span>
                </span>
                
                {/* Fit Advisor Tab Button */}
                <button
                  onClick={() => setActiveTab(activeTab === 'sizeFinder' ? 'details' : 'sizeFinder')}
                  className="flex items-center gap-1 text-xs text-[#d4d4d8] hover:text-white underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{activeTab === 'sizeFinder' ? 'Hide Fit Advisor' : 'Find My Size'}</span>
                </button>
              </div>

              {/* Size Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-xs font-mono font-semibold rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-white text-black border-white shadow-sm'
                        : 'bg-[#18181b] text-[#d4d4d8] border-[#2b2b32] hover:border-[#444450]'
                    } ${recommendedSize === size ? 'ring-1 ring-emerald-400/60' : ''}`}
                  >
                    {size}
                    {recommendedSize === size && (
                      <span className="block text-[9px] text-emerald-600 font-bold uppercase">Best</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Interactive Fit Advisor Box */}
              {activeTab === 'sizeFinder' && (
                <div className="bg-[#18181d] border border-[#2f2f38] p-4 rounded-xl text-xs space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Vault Smart Fit Advisor</span>
                    </span>
                    <span className="text-emerald-400 font-mono">Recommended: Size {recommendedSize}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-[#a1a1aa] mb-1">
                        <span>Height:</span>
                        <span className="font-mono text-white">
                          {Math.floor(heightInches / 12)}'{heightInches % 12}"
                        </span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="78"
                        value={heightInches}
                        onChange={(e) => setHeightInches(Number(e.target.value))}
                        className="w-full accent-white h-1.5 bg-[#27272a] rounded cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[#a1a1aa] mb-1">
                        <span>Weight:</span>
                        <span className="font-mono text-white">{weightLbs} lbs</span>
                      </div>
                      <input
                        type="range"
                        min="120"
                        max="240"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(Number(e.target.value))}
                        className="w-full accent-white h-1.5 bg-[#27272a] rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[#a1a1aa]">Fit Preference:</span>
                    <div className="flex gap-1.5">
                      {(['fitted', 'boxy', 'ultra'] as const).map((pref) => (
                        <button
                          key={pref}
                          onClick={() => setFitPreference(pref)}
                          className={`px-2.5 py-1 rounded capitalize text-[11px] font-medium transition-colors ${
                            fitPreference === pref
                              ? 'bg-white text-black'
                              : 'bg-[#27272f] text-[#a1a1aa] hover:text-white'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSize(recommendedSize)}
                    className="w-full py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg font-medium text-center hover:bg-emerald-500/30 transition-colors"
                  >
                    Apply Size {recommendedSize} to Selection
                  </button>
                </div>
              )}
            </div>

            {/* Tabbed Specs (Details / Measurement Chart) */}
            <div className="space-y-2 border-t border-[#1f1f24] pt-4">
              <div className="flex items-center gap-4 text-xs font-medium border-b border-[#1f1f24] pb-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`transition-colors ${
                    activeTab === 'details' ? 'text-white border-b-2 border-white pb-2' : 'text-[#71717a] hover:text-white'
                  }`}
                >
                  Garment Construction
                </button>
                <button
                  onClick={() => setActiveTab('measurements')}
                  className={`transition-colors ${
                    activeTab === 'measurements' ? 'text-white border-b-2 border-white pb-2' : 'text-[#71717a] hover:text-white'
                  }`}
                >
                  Measurements (Inches)
                </button>
              </div>

              {activeTab === 'details' ? (
                <ul className="text-xs text-[#a1a1aa] space-y-1.5 pt-1">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white">·</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="pt-1 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-[#71717a] border-b border-[#27272f]">
                        <th className="py-1">Size</th>
                        <th className="py-1 font-mono-numbers">Chest (Width)</th>
                        <th className="py-1 font-mono-numbers">Length</th>
                        <th className="py-1 font-mono-numbers">Shoulder</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1f26]">
                      {product.measurements.map((m) => (
                        <tr
                          key={m.size}
                          className={m.size === selectedSize ? 'text-white font-bold bg-[#1a1a20]' : 'text-[#a1a1aa]'}
                        >
                          <td className="py-1.5 font-mono">{m.size}</td>
                          <td className="py-1.5 font-mono-numbers">{m.chest}"</td>
                          <td className="py-1.5 font-mono-numbers">{m.length}"</td>
                          <td className="py-1.5 font-mono-numbers">{m.shoulder}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Primary Buy CTA & Quantity */}
            <div className="pt-4 border-t border-[#1f1f24] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity stepper */}
                <div className="flex items-center border border-[#2e2e36] bg-[#18181b] rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#a1a1aa] hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-[#a1a1aa] hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Primary Buy CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-[#e4e4e7] py-3 rounded-lg font-bold text-sm transition-all duration-150 shadow-sm"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <span>Add to Bag · ${(product.price * quantity)}</span>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      : 'bg-[#18181b] text-[#a1a1aa] hover:text-white border-[#2e2e36]'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
