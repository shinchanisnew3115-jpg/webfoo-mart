"use client";

import { useState } from "react"
import { Search, MapPin, Clock, ChevronDown } from "lucide-react"
import { useStore } from "./state/useStore" // Asli data connect kiya
import Navbar from "./components/Navbar"
import ProductCard from "./components/ProductCard"

const CATEGORIES = ["All", "Grocery", "Drinks", "Snacks", "Pharmacy"]

export default function Home() {
  const { stores, addToCart, currentUser } = useStore();
  const [activeCategory, setActiveCategory] = useState("All");

  // Saare stores se items nikal kar ek list banana
  const allProducts = stores.flatMap(store => 
    store.items.map(item => ({ ...item, storeName: store.name }))
  );

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      <Navbar />
      
      {/* Hero Header */}
      <header className="relative overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative max-w-md mx-auto px-5 pt-8 pb-6">
          {/* Location Row */}
          <button className="flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Deliver to</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-white truncate w-40">
                  {currentUser?.address || "Set Delivery Location"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-cyan-500 transition-colors" />
              </div>
            </div>
          </button>

          {/* Brand Title */}
          <div className="mb-6">
            <h1 className="text-4xl font-black tracking-tighter text-white leading-none">
              WEBFOO
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-4xl font-black tracking-tighter text-cyan-500 leading-none">
                MART
              </span>
              <div className="flex items-center gap-1.5 bg-cyan-500/20 rounded-full px-3 py-1.5 border border-cyan-500/30">
                <Clock className="w-3 h-3 text-cyan-500" />
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-wider">10 Min</span>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative group">
            <div className="relative flex items-center bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden focus-within:border-cyan-500/50 transition-all">
              <Search className="ml-4 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search for snacks, drinks..."
                className="flex-1 bg-transparent py-4 px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="max-w-md mx-auto px-5 py-4 overflow-x-auto">
        <div className="flex gap-2 pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all
                ${activeCategory === cat ? 'bg-white text-black' : 'bg-neutral-900 text-gray-500 border border-white/5'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Banner */}
      <div className="max-w-md mx-auto px-5 mb-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "8+", label: "Stores" },
            { value: "Instant", label: "Delivery" },
            { value: "Free", label: "Service" },
          ].map((stat) => (
            <div key={stat.label} className="bg-neutral-900 border border-white/5 rounded-2xl p-4 text-center">
              <p className="text-lg font-black text-cyan-500">{stat.value}</p>
              <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-md mx-auto px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black uppercase italic tracking-tighter text-white">Popular Now</h2>
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">See All</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              item={product}
              storeId="all"
            />
          ))}
        </div>
      </main>
    </div>
  )
}