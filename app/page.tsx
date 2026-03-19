"use client";
import { useStore } from './state/useStore';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';

export default function Home() {
  const { stores } = useStore();

  return (
    <main className="bg-black min-h-screen text-white p-4 pb-24">
      <Navbar />
      
      <div className="mt-20 mb-6">
        <h1 className="text-xl font-black italic uppercase tracking-tighter">WebFoo <span className="text-cyan-500 text-sm not-italic">Quick</span></h1>
        <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.4em] mt-1">Products for you</p>
      </div>

      {/* 2-COLUMN PRODUCT GRID */}
      <div className="grid grid-cols-2 gap-3">
        {stores.flatMap(s => s.items).map((item) => (
          <ProductCard key={item.id} item={item} storeId="all" />
        ))}
      </div>
    </main>
  );
}