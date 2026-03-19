"use client"

import { useState } from "react"
import { Search, MapPin, Clock, ChevronDown } from "lucide-react"
import { useStore } from "./state/useStore"
import Navbar from "./components/Navbar"
import ProductCard from "./components/ProductCard"

const CATEGORIES = ["All", "Drinks", "Snacks", "Food", "Health"]

export default function Home() {
  const { stores, currentUser } = useStore();
  const [activeCategory, setActiveCategory] = useState("All");

  // Saare stores ke items ko ek jagah list karna
  const allProducts = stores.flatMap(s => s.items);

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      <Navbar />
      
      {/* Naya Header jo tune diya */}
      <header className="max-w-md mx-auto px-5 pt-20 pb-6">
        <button className="flex items-center gap-2 mb-6 group">
          <MapPin className="w-4 h-4 text-cyan-500" />
          <div className="text-left">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Deliver to</p>
            <span className="text-xs font-bold truncate block w-40">
              {currentUser?.address || "Set Location in Profile"}
            </span>
          </div>
        </button>

        <div className="mb-6">
          <h1 className="text-5xl font-black tracking-tighter leading-none">WEBFOO</h1>
          <div className="flex items-center gap-3">
            <span className="text-5xl font-black tracking-tighter text-cyan-500 italic">MART</span>
            <div className="bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-500" />
              <span className="text-[10px] font-black text-cyan-500">10 MIN</span>
            </div>
          </div>
        </div>
        
        {/* Naya Search Bar */}
        <div className="relative bg-neutral-900 border border-white/10 rounded-2xl flex items-center px-4 py-4 focus-within:border-cyan-500 transition-all shadow-lg shadow-cyan-500/5">
          <Search className="w-5 h-5 text-gray-500" />
          <input placeholder="Search snacks, drinks..." className="bg-transparent flex-1 px-3 text-sm outline-none text-white" />
        </div>
      </header>

      {/* Nayi Categories Row */}
      <div className="max-w-md mx-auto px-5 mb-8 flex gap-2 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeCategory === cat ? 'bg-white text-black' : 'bg-neutral-900 text-gray-500 border border-white/5'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <main className="max-w-md mx-auto px-5">
        <div className="grid grid-cols-2 gap-4">
          {allProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  )
}