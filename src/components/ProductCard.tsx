import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const displayImage = currentColor?.image || product.primaryImage;

  const handleSizeClick = (e: React.MouseEvent, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => {
    e.stopPropagation();
    onQuickAdd(product, size, currentColor.name);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      setShowQuickSizes(false);
    }, 1200);
  };

  return (
    <div 
      className="group relative flex flex-col bg-[#121215] border border-[#222226] rounded-xl overflow-hidden hover:border-[#38383f] transition-all duration-200"
    >
      {/* Product Image Stage (65-75% visual dominance) */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[4/3] bg-[#18181b] overflow-hidden cursor-pointer"
      >
        <img
          src={displayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300 ease-out"
        />

        {/* Subtle Badge (Quiet text metadata, max 1) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#0c0c0e]/90 text-white text-[11px] font-medium px-2 py-0.5 rounded tracking-wide border border-[#27272a]">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isWishlisted
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'bg-[#0c0c0e]/70 text-[#a1a1aa] hover:text-white border border-[#27272a]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="flex items-center gap-1.5 bg-[#0c0c0e]/90 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg border border-[#3f3f46] shadow-lg transition-colors w-full justify-center"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View &amp; Fit Guide</span>
          </button>
        </div>
      </div>

      {/* Card Info & Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        
        {/* Unboxed Metadata */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#71717a] mb-1 font-medium">
            <span>{product.fit}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-numbers">{product.gsm} GSM</span>
            <span aria-hidden="true">·</span>
            <span>100% Cotton</span>
          </div>

          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-semibold text-white text-base hover:text-[#d4d4d8] cursor-pointer transition-colors leading-snug line-clamp-1"
          >
            {product.name}
          </h3>
        </div>

        {/* Colorway Swatches & Price */}
        <div className="flex items-center justify-between pt-1 border-t border-[#1c1c20]">
          
          {/* Swatches */}
          <div className="flex items-center gap-1.5" title={`Selected: ${currentColor.name}`}>
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                aria-label={`Select color ${color.name}`}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'ring-1 ring-white ring-offset-1 ring-offset-[#121215] border-white scale-110'
                    : 'border-[#3f3f46] hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2">
            {product.compareAtPrice && (
              <span className="text-xs text-[#71717a] line-through font-mono-numbers">
                ${product.compareAtPrice}
              </span>
            )}
            <span className="text-base font-bold text-white font-mono-numbers">
              ${product.price}
            </span>
          </div>
        </div>

        {/* Quick Add To Bag Action */}
        <div className="pt-2">
          {!showQuickSizes ? (
            <button
              onClick={() => setShowQuickSizes(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#1c1c21] hover:bg-[#27272d] text-white text-xs font-semibold py-2.5 rounded-lg border border-[#2b2b32] transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#a1a1aa]" />
              <span>Select Size &amp; Add</span>
            </button>
          ) : (
            <div className="space-y-1.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-[11px] text-[#a1a1aa]">
                <span>Choose size:</span>
                <button
                  onClick={() => setShowQuickSizes(false)}
                  className="hover:text-white text-[10px]"
                >
                  Cancel
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleSizeClick(e, size)}
                    className="py-1.5 text-xs font-mono font-medium rounded bg-[#27272f] hover:bg-white hover:text-black text-white border border-[#383842] transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
              {addedFeedback && (
                <div className="text-center text-xs font-medium text-emerald-400 flex items-center justify-center gap-1 pt-1">
                  <Check className="w-3 h-3" />
                  <span>Added to Bag!</span>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
