"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '../state/useStore';

export default function AdminDashboard() {
  const { stores, orders } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  // HYDRATION FIX: Ensures data is loaded from browser storage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="bg-black min-h-screen"></div>;

  return (
    <div className="bg-black min-h-screen text-white font-sans p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto space-y-14">
        
        {/* DASHBOARD HEADER */}
        <div className="border-b border-white/5 pb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            MASTER <span className="text-cyan-500">DASHBOARD</span>
          </h1>
          <p className="text-[11px] text-gold-500 font-black tracking-[0.4em] uppercase mt-3">BUSINESS OVERVIEW & ANALYTICS</p>
        </div>

        {/* LIVE METRICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-neutral-900 border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300 hover:scale-105">
            <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-6">LIVE STORES</h3>
            <p className="text-7xl font-black text-white tracking-tighter leading-none">{stores.length}</p>
            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute -bottom-6 -right-6 text-9xl opacity-10">🏪</div>
          </div>
          
          <div className="bg-neutral-900 border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group hover:border-gold-500/20 transition-all duration-300 hover:scale-105">
            <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-6">ACTIVE DISPATCH</h3>
            <p className="text-7xl font-black text-gold-500 tracking-tighter leading-none">{orders.length}</p>
            <div className="absolute inset-0 bg-gold-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute -bottom-6 -right-6 text-9xl opacity-10">📦</div>
          </div>

          <div className="bg-neutral-900 border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group hover:border-green-500/20 transition-all duration-300 hover:scale-105">
             <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-6">SYSTEM STATUS</h3>
             <p className="text-4xl font-black text-green-500 mt-6 tracking-widest uppercase">100% ONLINE ⚡</p>
          </div>
          
        </div>

        {/* QUICK NAVIGATION (BOTH STYLED WITH CYAN + 4REM CURVES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/5">
          
          {/* INVENTORY CONTROL BUTTON */}
          <Link href="/admin/stores" className="bg-cyan-500 text-black p-12 rounded-[4rem] text-center hover:bg-white hover:scale-[1.03] transition-all shadow-[0_15px_60px_rgba(6,182,212,0.3)] group">
            <h2 className="text-3xl font-black uppercase tracking-tighter">INVENTORY CONTROL</h2>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] mt-3 opacity-90 group-hover:text-cyan-500 transition-colors">ADD SHOPS & MANAGE ITEMS</p>
          </Link>
          
          {/* ORDER LOGISTICS BUTTON (SYNCED STYLING) */}
          <Link href="/admin/orders" className="bg-cyan-500 text-black p-12 rounded-[4rem] text-center hover:bg-white hover:scale-[1.03] transition-all shadow-[0_15px_60px_rgba(6,182,212,0.3)] group">
            <h2 className="text-3xl font-black uppercase tracking-tighter">ORDER LOGISTICS</h2>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] mt-3 opacity-90 group-hover:text-cyan-500 transition-colors">VIEW LIVE ORDERS & DISPATCH</p>
          </Link>
        </div>

      </div>
    </div>
  );
}