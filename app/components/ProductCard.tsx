"use client";
import { Item, useStore } from '../state/useStore';

export default function ProductCard({ item, storeId }: { item: Item, storeId: string }) {
  const { addToCart, isLoggedIn } = useStore();

  const handleAdd = () => {
    if (!isLoggedIn) {
      alert("Pehle Login kar lo bhai! 🛒");
      return;
    }
    addToCart(item);
  };

  return (
    <div className="bg-neutral-900/60 border border-white/5 p-3 rounded-2xl flex flex-col justify-between transition-all active:scale-95 duration-75">
      {/* Product Image Placeholder or Icon */}
      <div className="w-full aspect-square bg-black rounded-xl mb-3 flex items-center justify-center text-2xl border border-white/5">
        📦
      </div>

      {/* Product Info - Super Compact Fonts */}
      <div className="space-y-1 mb-3">
        <h4 className="text-[11px] font-black uppercase tracking-tight leading-tight line-clamp-2">
          {item.name}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-black text-cyan-500">₹{item.price}</span>
          {item.discount > 0 && (
            <span className="text-[8px] font-bold text-gray-500 line-through">₹{item.price + item.discount}</span>
          )}
        </div>
      </div>

      {/* Action Button - Mobile Click Effect */}
      <button 
        onClick={handleAdd}
        disabled={item.isOutOfStock}
        className={`w-full py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
          item.isOutOfStock 
          ? 'bg-red-500/20 text-red-500 border border-red-500/20' 
          : 'bg-white text-black active:bg-cyan-500 active:text-white'
        }`}
      >
        {item.isOutOfStock ? 'Sold Out' : 'Add +'}
      </button>
    </div>
  );
}