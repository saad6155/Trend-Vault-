import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#121215] border-l border-[#222226] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#222226] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400 fill-current" />
            <span className="font-display font-bold text-lg text-white">Saved Silhouettes</span>
            <span className="bg-[#1f1f24] text-[#a1a1aa] text-xs px-2 py-0.5 rounded font-mono">
              {wishlistProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 text-[#a1a1aa] hover:text-white rounded-md hover:bg-[#1c1c20]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#18181b] border border-[#27272f] flex items-center justify-center mx-auto text-[#71717a]">
                <Heart className="w-5 h-5" />
              </div>
              <p className="text-sm text-[#a1a1aa]">You haven't saved any tees yet.</p>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-white underline underline-offset-4"
              >
                Browse Current Drops
              </button>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="flex gap-4 p-3 rounded-xl bg-[#18181b] border border-[#222226] relative"
              >
                <div 
                  onClick={() => { onSelectProduct(p); onClose(); }}
                  className="w-18 h-20 bg-[#121215] rounded-lg overflow-hidden border border-[#2b2b32] shrink-0 cursor-pointer"
                >
                  <img
                    src={p.primaryImage}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 
                        onClick={() => { onSelectProduct(p); onClose(); }}
                        className="font-semibold text-white text-xs leading-snug line-clamp-1 pr-2 cursor-pointer hover:underline"
                      >
                        {p.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(p)}
                        className="text-[#71717a] hover:text-rose-400 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#71717a] mt-0.5">
                      <span>{p.fit}</span>
                      <span> · </span>
                      <span className="font-mono-numbers">{p.gsm} GSM</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-white text-xs font-mono-numbers">
                      ${p.price}
                    </span>

                    <button
                      onClick={() => { onSelectProduct(p); onClose(); }}
                      className="flex items-center gap-1.5 px-3 py-1 bg-white text-black hover:bg-[#e4e4e7] rounded-md text-xs font-semibold"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Configure</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-[#222226] bg-[#0f0f12] text-center text-xs text-[#71717a]">
          Saved pieces are stored locally on your device session.
        </div>
      </div>
    </div>
  );
};
