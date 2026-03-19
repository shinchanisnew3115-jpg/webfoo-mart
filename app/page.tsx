"use client";
import { useStore } from './state/useStore';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const { stores } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="bg-black min-h-screen"></div>;

  return (
    <div className="bg-black min-h-screen text-white pb-32">
      {/* HERO SECTION */}
      <div className="pt-32 px-6 pb-12 text-center lg:text-left max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
          EXPLORE <br />
          <span className="text-cyan-500 underline decoration-gold-500">STORES</span>
        </h1>
        <p className="text-[9px] font-black text-gray-500 tracking-[0.4em] uppercase mt-4 ml-1">Premium Local Marketplace</p>
      </div>

      {/* 2x2 GRID SYSTEM */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {stores.length === 0 ? (
          <div className="col-span-full py-20 bg-neutral-900/50 rounded-[3rem] border border-white/5 text-center">
            <p className="text-gray-600 font-black uppercase tracking-widest text-xs italic">No stores active right now</p>
          </div>
        ) : (
          stores.map((store) => (
            <Link key={store.id} href={`/store/${store.id}`}>
              <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-6 h-full flex flex-col items-center justify-center text-center hover:border-cyan-500/40 hover:scale-[1.02] transition-all group shadow-2xl relative overflow-hidden">
                {/* Background Accent */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-500/5 blur-2xl rounded-full group-hover:bg-cyan-500/10 transition-colors"></div>
                
                {/* Store Logo */}
                <div className="w-20 h-20 bg-black rounded-[1.8rem] flex items-center justify-center text-4xl mb-6 border border-white/10 group-hover:border-cyan-500/20 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                  {store.logo}
                </div>

                {/* Store Details */}
                <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-cyan-500 transition-colors">
                  {store.name}
                </h3>
                <span className="text-[8px] font-black text-gray-600 tracking-[0.2em] uppercase mt-2 bg-black/50 px-4 py-1.5 rounded-full border border-white/5">
                  {store.category}
                </span>

                {/* CTA Tag */}
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[7px] font-black text-gold-500 uppercase tracking-widest">VISIT STORE</span>
                    <span className="text-xs">→</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}