"use client"
import { useStore, Item } from "../state/useStore";

export default function ProductCard({ item }: { item: Item }) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="border border-white/10 p-4 rounded-xl bg-neutral-900">
      <div className="h-32 bg-neutral-800 rounded-lg mb-2 flex items-center justify-center text-2xl">📦</div>
      <h3 className="text-sm font-bold">{item.name}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-cyan-400 font-bold">₹{item.price}</span>
        <button 
          onClick={() => addToCart(item)}
          className="bg-white text-black px-3 py-1 rounded-lg text-xs font-bold"
        >
          Add
        </button>
      </div>
    </div>
  );
}