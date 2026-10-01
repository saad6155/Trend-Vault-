import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, ShieldCheck, Printer, ArrowLeft } from 'lucide-react';
import { CartItem, OrderReceipt } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  promoCode: string;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  promoCode,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    fullName: 'Jordan Hayes',
    email: 'jordan.hayes@example.com',
    phone: '+1 (555) 234-8900',
    address: '442 Industrial Parkway, Loft 4B',
    city: 'Brooklyn',
    state: 'NY',
    postalCode: '11201',
    country: 'United States',
    paymentMethod: 'card', // 'card' | 'cod' | 'apple'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '884',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderReceipt | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 80 ? 0 : 8;
  const total = subtotal - appliedDiscount + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const receipt: OrderReceipt = {
        orderNumber: `TV-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        items: [...items],
        subtotal,
        discount: appliedDiscount,
        shipping,
        total,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          address: `${formData.address}, ${formData.city}, ${formData.state}`,
          city: formData.city,
          postalCode: formData.postalCode,
          paymentMethod: formData.paymentMethod === 'card' ? 'Credit Card (ending 4242)' : formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Apple Pay Express',
        },
      };

      setCompletedOrder(receipt);
      setIsSubmitting(false);
      onOrderCompleted();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#121215] border border-[#27272c] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#222226] flex items-center justify-between bg-[#0f0f12]">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-white">
              {completedOrder ? 'Order Confirmed' : 'Vault Express Checkout'}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-[#a1a1aa] hover:text-white rounded-md hover:bg-[#1c1c20]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!completedOrder ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Col: Customer & Shipping Details */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                1. Shipping &amp; Dispatch Information
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-[#a1a1aa] mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#18181b] border border-[#27272f] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a1a1aa] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#18181b] border border-[#27272f] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a1a1aa] mb-1">Mobile / Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#18181b] border border-[#27272f] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-[#a1a1aa] mb-1">Delivery Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#18181b] border border-[#27272f] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a1a1aa] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#18181b] border border-[#27272f] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a1a1aa] mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#18181b] border border-[#27272f] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 border-t border-[#1f1f24] space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                  2. Select Payment Option
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'apple', label: 'Apple Pay', icon: ShieldCheck },
                    { id: 'cod', label: 'Cash on Deliv.', icon: Truck },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                        className={`p-2.5 rounded-lg border text-xs flex flex-col items-center gap-1.5 transition-all ${
                          formData.paymentMethod === m.id
                            ? 'bg-white text-black border-white font-semibold'
                            : 'bg-[#18181b] text-[#a1a1aa] border-[#27272f] hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="p-3 bg-[#18181b] rounded-lg border border-[#27272f] space-y-2">
                    <div>
                      <label className="block text-[11px] text-[#71717a] mb-0.5">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        readOnly
                        className="w-full bg-[#121215] border border-[#27272f] text-white px-2.5 py-1.5 rounded text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-[#71717a] mb-0.5">Exp Date</label>
                        <input
                          type="text"
                          value={formData.cardExp}
                          readOnly
                          className="w-full bg-[#121215] border border-[#27272f] text-white px-2.5 py-1.5 rounded text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#71717a] mb-0.5">CVC</label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          readOnly
                          className="w-full bg-[#121215] border border-[#27272f] text-white px-2.5 py-1.5 rounded text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Col: Order Summary & Place Order Button */}
            <div className="md:col-span-5 bg-[#0f0f12] p-5 rounded-xl border border-[#222226] flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
                  Order Summary ({items.length} items)
                </h4>

                <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 divide-y divide-[#1c1c20]">
                  {items.map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-medium text-white line-clamp-1">{item.name}</div>
                        <div className="text-[11px] text-[#71717a]">
                          Qty: {item.quantity} · Size: {item.size}
                        </div>
                      </div>
                      <span className="font-mono-numbers text-white font-semibold">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#1f1f24] space-y-1.5 text-xs text-[#a1a1aa] mt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono-numbers text-white">${subtotal}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({promoCode})</span>
                      <span className="font-mono-numbers">-${appliedDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-mono-numbers text-white">
                      {shipping === 0 ? 'FREE' : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1f1f24]">
                    <span>Total</span>
                    <span className="font-mono-numbers text-lg">${total}</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-[#e4e4e7] py-3.5 rounded-lg font-bold text-sm transition-all shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Authorization...</span>
                  ) : (
                    <span>Confirm Order · ${total}</span>
                  )}
                </button>
                <p className="text-[10px] text-center text-[#71717a] mt-2">
                  Complimentary 30-day returns. Carbon offset delivery.
                </p>
              </div>
            </div>

          </form>
        ) : (
          /* Order Confirmation Receipt Screen */
          <div className="p-6 sm:p-10 space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-1">
                ORDER CONFIRMED &amp; DISPATCH QUEUED
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Thank You, {completedOrder.customer.fullName}
              </h3>
              <p className="text-xs text-[#a1a1aa] mt-1">
                Receipt and tracking details sent to <strong className="text-white">{completedOrder.customer.email}</strong>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#18181b] border border-[#27272f] rounded-xl p-5 text-left max-w-lg mx-auto text-xs space-y-3">
              <div className="flex justify-between border-b border-[#27272f] pb-2.5">
                <div>
                  <span className="text-[#71717a] block text-[10px]">ORDER IDENTIFIER</span>
                  <span className="font-mono text-white font-bold">{completedOrder.orderNumber}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">TIMESTAMP</span>
                  <span className="font-mono text-white">{completedOrder.date}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[#71717a] text-[10px] uppercase font-semibold">Ordered Items</span>
                {completedOrder.items.map((i) => (
                  <div key={i.id} className="flex justify-between text-[#d4d4d8]">
                    <span>{i.name} (x{i.quantity}, {i.size})</span>
                    <span className="font-mono-numbers text-white">${i.price * i.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#27272f] pt-2 flex justify-between font-bold text-white">
                <span>Total Paid</span>
                <span className="font-mono-numbers">${completedOrder.total}</span>
              </div>

              <div className="text-[11px] text-[#a1a1aa] pt-2 border-t border-[#27272f]">
                <strong>Dispatch Address:</strong> {completedOrder.customer.address}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#27272f] text-white hover:bg-[#32323b] text-xs font-medium transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-white text-black hover:bg-[#e4e4e7] text-xs font-bold transition-colors"
              >
                Continue Exploring Drops
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
