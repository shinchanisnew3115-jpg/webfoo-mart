"use client";
import Link from 'next/link';
import { useStore } from '../state/useStore';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { isLoggedIn, cart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[150] bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="group">
          <h1 className="text-2xl font-black uppercase tracking-tighter italic leading-none group-hover:scale-105 transition-transform">
            WEBFOO <span className="text-cyan-500 underline decoration-gold-500">MART</span>
          </h1>
          <p className="text-[7px] font-black text-gray-600 tracking-[0.5em] uppercase mt-1">Marketplace Alpha</p>
        </Link>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            /* GUEST USER: ONLY LOGIN BUTTON */
            <Link href="/login" className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-xl shadow-white/5 active:scale-90">
              <span>LOGIN</span>
              <span className="text-sm">👤</span>
            </Link>
          ) : (
            /* LOGGED IN USER: SHOW CART ICON */
            <Link href="/cart" className="relative p-3 bg-neutral-900 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all group active:scale-90">
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}