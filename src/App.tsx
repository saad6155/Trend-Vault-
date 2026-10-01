import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { VaultStudio } from './components/VaultStudio';
import { LookbookSection } from './components/LookbookSection';
import { CraftSection } from './components/CraftSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Scroll
  const [currentSection, setCurrentSection] = useState('hero');

  // Modal / Drawer States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'init-1',
      productId: 'tv-01',
      name: 'Archival Heavy Distressed Tee',
      price: 58,
      color: 'Vintage Washed Black',
      size: 'L',
      quantity: 1,
      image: PRODUCTS[0].primaryImage,
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['tv-02']);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Quick toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Scroll to section handler
  const handleNavigate = (sectionId: string) => {
    setCurrentSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Add standard product to cart
  const handleAddToCart = (
    product: Product,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    color: string,
    quantity: number = 1
  ) => {
    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        color,
        size,
        quantity,
        image: product.colors.find((c) => c.name === color)?.image || product.primaryImage,
      };
      setCart([...cart, newItem]);
    }

    showToast(`Added ${quantity}x ${product.name} (${size}) to Bag`);
  };

  // Add custom studio product to cart
  const handleAddCustomToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`Added Custom Vault Tee (${item.size}) to Bag`);
    setIsCartOpen(true);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from cart
  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from saved pieces`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name}`);
        return [...prev, product.id];
      }
    });
  };

  // Proceed to Checkout
  const handleProceedToCheckout = (discount: number, promo: string) => {
    setCheckoutDiscount(discount);
    setCheckoutPromoCode(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order completed
  const handleOrderCompleted = () => {
    setCart([]);
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#ededed] flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Top Navigation */}
      <Header
        cartCount={cartTotalItems}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearchClick={() => {
          handleNavigate('collection');
          const input = document.querySelector('input[placeholder*="Search cuts"]') as HTMLInputElement;
          if (input) input.focus();
        }}
        onNavigate={handleNavigate}
        currentSection={currentSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Campaign Hero Section */}
        <Hero
          onShopClick={() => handleNavigate('collection')}
          onCustomizerClick={() => handleNavigate('customizer')}
        />

        {/* Featured Products Collection */}
        <ProductGrid
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={(product, size, color) => handleAddToCart(product, size, color, 1)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Interactive Customizer & Mockup Studio */}
        <VaultStudio onAddCustomToCart={handleAddCustomToCart} />

        {/* Lookbook Section */}
        <LookbookSection onSelectProduct={(p) => setSelectedProduct(p)} />

        {/* The Standard / Garment Craft */}
        <CraftSection />

      </main>

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        appliedDiscount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-[#0c0c0e] font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xl animate-in slide-in-from-bottom-3 duration-150 flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
