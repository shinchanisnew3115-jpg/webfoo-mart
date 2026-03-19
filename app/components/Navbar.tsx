"use client";
import Link from 'next/link';
import { useStore } from '../state/useStore';

export default function Navbar() {
  const { cart, isLoggedIn } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md border-b border-white/5 z-50 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-black italic tracking-tighter">
        WebFoo <span className="text-cyan-500">MART</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/cart" className="relative active:scale-90 transition-transform">
          <span className="text-xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black animate-bounce">
              {cartCount}
            </span>
          )}
        </Link>
        
        <Link href={isLoggedIn ? "/profile" : "/login"} className="active:scale-90 transition-transform">
          <span className="text-xl">{isLoggedIn ? "👤" : "🔑"}</span>
        </Link>
      </div>
    </nav>
  );
}