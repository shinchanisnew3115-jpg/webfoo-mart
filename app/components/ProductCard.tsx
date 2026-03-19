"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Check, Zap } from "lucide-react"
import { Item, useStore } from "../state/useStore" // Asli data connect kiya

interface ProductCardProps {
  item: Item;
  priority?: boolean;
}

export function ProductCard({ item, priority = false }: ProductCardProps) {
  const { addToCart, isLoggedIn } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Fake tag logic (kyunki hamare data mein abhi tag nahi hai)
  const tag = item.discount > 50 ? "Offers" : item.id % 5 === 0 ? "Popular" : null;

  const handleAdd = () => {
    if (!isLoggedIn) {
      alert("Bhai pehle login toh kar lo! 🔑");
      return;
    }
    
    setIsPressed(true);
    setIsAdded(true);
    
    // Asli Cart function call kiya
    addToCart(item);
    
    setTimeout(() => setIsPressed(false), 150);
    setTimeout(() => setIsAdded(false), 1200);
  }

  return (
    <div className="group relative bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
      {/* Product Image Section */}
      <div className="relative aspect-square bg-neutral-800 overflow-hidden">
        {/* Placeholder logic agar image link na ho */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-neutral-800 to-black">
          📦
        </div>
        
        {/* Tag Badge */}
        {tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 bg-cyan-500 text-black text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
              {tag === "Popular" && <Zap className="w-2.5 h-2.5 fill-current" />}
              {tag}
            </span>
          </div>
        )}

        {/* 10 MIN Delivery Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
            <span className="text-[8px] font-black text-cyan-500 tracking-tighter">
              10 MIN
            </span>
          </div>
        </div>
      </div>
      
      {/* Product Info Section */}
      <div className="p-4 space-y-3 bg-neutral-900">
        <div className="space-y-1">
          <h3 className="text-[11px] font-black uppercase tracking-tight text-white line-clamp-2 leading-tight min-h-[2rem]">
            {item.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-black text-white italic tracking-tighter">
              ₹{item.price}
            </span>
            {item.discount > 0 && (
              <span className="text-[9px] text-gray-500 line-through font-bold">
                ₹{item.price + item.discount}
              </span>
            )}
          </div>
          
          {/* Action Button */}
          <button
            onClick={handleAdd}
            disabled={item.isOutOfStock}
            className={`
              relative flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest
              transition-all duration-200 ease-out overflow-hidden
              ${item.isOutOfStock 
                ? 'bg-red-500/20 text-red-500 border border-red-500/20' 
                : isAdded 
                  ? 'bg-cyan-500 text-black w-12' 
                  : 'bg-white text-black active:bg-cyan-500'
              }
              ${isPressed ? 'scale-90' : 'scale-100'}
            `}
          >
            {item.isOutOfStock ? (
              'OUT'
            ) : isAdded ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span className="hidden xs:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}