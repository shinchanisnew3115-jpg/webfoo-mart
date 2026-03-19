"use client";
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/app/state/useStore';
import Navbar from '@/app/components/Navbar';
import { useState, useEffect } from 'react';

export default function StoreDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { stores, isLoggedIn, addToCart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  const store = stores.find(s => s.id === id);
  if (!mounted || !store) return <div className="bg-black min-h-screen text-white flex items-center justify-center font-black">LOADING...</div>;

  const handleAddToCart = (item: any) => {
    if (!isLoggedIn) {
      alert("Shopping ke liye Login zaroori hai bhai! 🚀");
      router.push('/login');
    } else {
      addToCart(item);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pb-40">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <div className="flex items-center gap-8 mb-12 bg-neutral-900 p-10 rounded-[3.5rem] border border-white/5 shadow-2xl">
          <div className="text-6xl bg-black w-24 h-24 flex items-center justify-center rounded-[2.5rem] border border-white/10 shadow-inner">{store.logo}</div>
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter italic">{store.name}</h1>
            <p className="text-gold-500 font-black text-[10px] tracking-[0.4em] uppercase mt-2">Certified {store.category} Partner</p>
          </div>
        </div>

        <div className="space-y-4">
          {store.items.map(item => (
            <div key={item.id} className="bg-neutral-900/40 border border-white/5 p-8 rounded-[2.5rem] flex justify-between items-center group hover:border-cyan-500/30 transition-all backdrop-blur-sm">
              <div>
                <h4 className="text-xl font-black uppercase tracking-tight group-hover:text-cyan-500 transition-colors">{item.name}</h4>
                <p className="text-2xl font-black text-white mt-1">₹{item.price}</p>
              </div>
              <button onClick={() => handleAddToCart(item)} className="bg-white text-black px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-cyan-500 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5">+ ADD</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}