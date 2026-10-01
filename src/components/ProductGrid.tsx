import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', color: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
  searchQuery,
  onSearchChange,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filterTabs = [
    { id: 'all', label: 'All Silhouettes' },
    { id: 'vintage', label: 'Vintage Washed' },
    { id: 'cyber', label: 'Cyber Brutalist' },
    { id: 'minimal', label: 'Minimal Core Blanks' },
    { id: 'botanical', label: 'Botanical Archive' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory = activeFilter === 'all' || product.collection === activeFilter;
        const matchesSearch =
          !searchQuery ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.fit.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'gsm-desc') return b.gsm - a.gsm;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, activeFilter, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-16 md:py-24 bg-[#0c0c0e] border-b border-[#222226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1f1f24] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1">
              <span>Current Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Drop 09 Heavyweights</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated Archival T-Shirts
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#71717a]">
            <span>Showing <strong className="text-white font-mono-numbers">{filteredProducts.length}</strong> silhouettes</span>
          </div>
        </div>

        {/* Filter Bar & Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          
          {/* Segmented Filter Buttons (Functional Buttons, No static candy pills) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#141418] border border-[#222226] rounded-xl overflow-x-auto scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#1c1c21]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Inline search input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#71717a] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search cuts, GSM, washed..."
                className="w-full bg-[#141418] border border-[#222226] text-white pl-8 pr-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#71717a] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#141418] border border-[#222226] text-white text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-white cursor-pointer"
              >
                <option value="featured">Sort: Featured Drop</option>
                <option value="gsm-desc">Heaviest GSM First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Cards Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#121215] border border-[#222226] rounded-2xl p-8 space-y-3">
            <p className="text-base text-white font-medium">No silhouettes matched your filter criteria.</p>
            <p className="text-xs text-[#71717a]">Try clearing your search query or switching category tabs.</p>
            <button
              onClick={() => { setActiveFilter('all'); onSearchChange(''); }}
              className="mt-2 px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg hover:bg-[#e4e4e7] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
