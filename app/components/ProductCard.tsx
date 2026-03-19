"use client"

import { useState } from "react"
import { Plus, Check, Zap } from "lucide-react"
import { Item, useStore } from "../state/useStore"

export default function ProductCard({ item }: { item: Item }) {
  const { addToCart, isLoggedIn } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleAdd = () => {
    if (!isLoggedIn) {
      alert("Bhai pehle login toh kar lo! 🔑");
      return;
    }
    setIsPressed(true);
    setIsAdded(true);
    addToCart(item); // Cart logic connect kiya
    setTimeout(() => setIsPressed(false), 150);
    setTimeout(() => setIsAdded(false), 1500);
  }

  return (
    <div className="group relative bg-neutral-900 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-all active:scale-[0.95]">
      {/* Image Area */}
      <div className="relative aspect-square bg-neutral-800 flex items-center justify-center text-4xl">
        📦
        <div className="absolute top-3 right-3 bg-cyan-500/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-[8px] font-black text-black uppercase">10 MIN</span>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-4 space-y-3">
        <h3 className="text-[11px] font-black uppercase tracking-tight text-white line-clamp-2 min-h-[2.5rem]">
          {item.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-black text-white italic tracking-tighter">₹{item.price}</span>
          
          <button
            onClick={handleAdd}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 shadow-lg ${
              isAdded ? 'bg-cyan-500 text-black shadow-cyan-500/20' : 'bg-white text-black'
            } ${isPressed ? 'scale-90' : 'scale-100'}`}
          >
            {isAdded ? <Check className="w-5 h-5 stroke-[3]" /> : <Plus className="w-5 h-5 stroke-[3]" />}
          </button>
        </div>
      </div>
    </div>
  )
}