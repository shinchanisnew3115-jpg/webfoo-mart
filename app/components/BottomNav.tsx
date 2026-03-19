"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '../state/useStore';
import { useEffect, useState } from 'react';

export default function BottomNav() {
  const { isLoggedIn } = useStore();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || !isLoggedIn) return null; // Guest ko nahi dikhega

  const navItems = [
    { name: 'HOME', path: '/', icon: '🏠' },
    { name: 'ORDERS', path: '/orders', icon: '📦' },
    { name: 'PROFILE', path: '/profile', icon: '👤' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-neutral-900/95 backdrop-blur-2xl border-t border-white/5 px-8 py-5 flex justify-around items-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      {navItems.map((item) => (
        <Link key={item.path} href={item.path} className="flex flex-col items-center gap-1 group">
          <span className={`text-2xl transition-all group-active:scale-75 ${pathname === item.path ? 'grayscale-0 scale-110' : 'grayscale opacity-40'}`}>
            {item.icon}
          </span>
          <span className={`text-[8px] font-black tracking-[0.2em] uppercase transition-colors ${pathname === item.path ? 'text-cyan-500' : 'text-gray-600'}`}>
            {item.name}
          </span>
          {pathname === item.path && <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1 shadow-[0_0_10px_cyan]"></div>}
        </Link>
      ))}
    </div>
  );
}