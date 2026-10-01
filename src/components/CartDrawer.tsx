import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (appliedDiscount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 80;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedPromo === 'FREESHIP';
  const shipping = items.length === 0 ? 0 : (isFreeShipping ? 0 : 8);
  const total = subtotal - discountAmount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();

    if (code === 'VAULT15') {
      setAppliedPromo('VAULT15');
      setDiscountPercent(15);
      setPromoInput('');
    } else if (code === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      setDiscountPercent(0);
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try "VAULT15" or "FREESHIP"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#121215] border-l border-[#222226] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#222226] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-white">Your Shopping Bag</span>
            <span className="bg-[#1f1f24] text-[#a1a1aa] text-xs px-2 py-0.5 rounded font-mono">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close bag"
            className="p-1.5 text-[#a1a1aa] hover:text-white rounded-md hover:bg-[#1c1c20] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#18181b] px-5 py-3 border-b border-[#222226] text-xs">
          {subtotal >= freeShippingThreshold ? (
            <div className="text-emerald-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>You unlocked Complimentary Worldwide Shipping!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[#a1a1aa]">
                <span>Add <strong className="text-white">${freeShippingThreshold - subtotal}</strong> more for free shipping</span>
                <span className="font-mono">{Math.round((subtotal / freeShippingThreshold) * 100)}%</span>
              </div>
              <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#18181b] border border-[#27272f] flex items-center justify-center mx-auto text-[#71717a]">
                <Tag className="w-5 h-5" />
              </div>
              <p className="text-sm text-[#a1a1aa]">Your bag is currently empty.</p>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-white underline underline-offset-4"
              >
                Browse latest drops
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 rounded-xl bg-[#18181b] border border-[#222226] relative"
              >
                {/* Thumbnail */}
                <div className="w-18 h-20 bg-[#121215] rounded-lg overflow-hidden border border-[#2b2b32] shrink-0 flex items-center justify-center">
                  {item.isCustom ? (
                    <div className="text-center p-1 text-[9px] font-mono text-[#a1a1aa]">
                      <div className="font-bold text-white uppercase text-[8px]">CUSTOM</div>
                      <div className="text-emerald-400">STUDIO</div>
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-white text-xs leading-snug line-clamp-1 pr-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#71717a] hover:text-rose-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#71717a] mt-0.5 space-x-2">
                      <span>Size: <strong className="text-[#d4d4d8] font-mono">{item.size}</strong></span>
                      <span>·</span>
                      <span>{item.color}</span>
                    </div>

                    {item.isCustom && item.customDetails && (
                      <div className="text-[10px] text-emerald-400 font-mono mt-1">
                        Placement: {item.customDetails.placement}
                        {item.customDetails.text && ` · "${item.customDetails.text}"`}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#2b2b32] bg-[#121215] rounded-md text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-[#a1a1aa] hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono text-white text-[11px]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-[#a1a1aa] hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-white text-xs font-mono-numbers">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#222226] bg-[#0f0f12] space-y-4">
            
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code (e.g. VAULT15)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-[#18181b] border border-[#27272f] text-white px-3 py-1.5 rounded-lg text-xs font-mono uppercase focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#27272f] hover:bg-[#32323a] text-xs font-medium text-white rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="text-[11px] text-emerald-400 font-mono flex items-center justify-between">
                  <span>Code '{appliedPromo}' applied ({discountPercent}% off)</span>
                  <button 
                    type="button" 
                    onClick={() => { setAppliedPromo(null); setDiscountPercent(0); }}
                    className="text-[#71717a] hover:text-white underline text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-rose-400">{promoError}</div>
              )}
            </form>

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs text-[#a1a1aa] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-numbers text-white">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({appliedPromo})</span>
                  <span className="font-mono-numbers">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Dispatch &amp; Delivery</span>
                <span className="font-mono-numbers text-white">
                  {shipping === 0 ? 'FREE' : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1f1f24]">
                <span>Total Due</span>
                <span className="font-mono-numbers">${total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onProceedToCheckout(discountAmount, appliedPromo || '')}
              className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-[#e4e4e7] py-3.5 rounded-lg font-bold text-sm transition-all shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#71717a]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Encrypted 256-Bit Checkout · 30-Day Guarantees</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
