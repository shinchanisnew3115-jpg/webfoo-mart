"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', icon: '📊', path: '/admin' },
  { name: 'Live Orders', icon: '⚡', path: '/admin/orders' },
  { name: 'Store Control', icon: '🏪', path: '/admin/stores' },
  { name: 'Customer Data', icon: '👤', path: '/admin/customers' },
  { name: 'Approvals', icon: '✅', path: '/admin/approvals' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* --- MOBILE NAVBAR (The 3-Lines Header) --- */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-black border-b border-white/10 flex items-center justify-between px-6 z-[110] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="w-8 h-8 rounded-full border border-cyan-500/50" alt="WF" />
          <span className="font-black text-white italic tracking-tighter text-sm uppercase">WebFoo Admin</span>
        </div>
        
        {/* HAMBURGER BUTTON (3 LINES) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none bg-neutral-900 rounded-lg border border-white/5"
        >
          <div className={`h-0.5 w-5 bg-cyan-500 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`h-0.5 w-5 bg-cyan-500 transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`h-0.5 w-5 bg-cyan-500 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* --- SIDEBAR PANEL --- */}
      <aside className={`
        fixed top-0 left-0 h-screen bg-black border-r border-white/5 z-[120] transition-transform duration-500 ease-in-out
        w-72 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Desktop Branding */}
        <div className="h-24 hidden md:flex items-center gap-4 px-8 border-b border-white/5">
          <img src="/logo.png" className="w-10 h-10 rounded-full border border-cyan-500/50" alt="WF" />
          <div>
            <h2 className="text-xl font-black tracking-tighter text-white italic uppercase leading-none">Admin</h2>
            <p className="text-[10px] text-gold-500 font-bold tracking-widest uppercase mt-1">Command Space</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 space-y-2 mt-20 md:mt-4">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all border ${
                pathname === item.path 
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Admin Identity Footer */}
        <div className="absolute bottom-0 w-full p-6 border-t border-white/5 bg-neutral-950">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center bg-black text-lg">👑</div>
             <div>
               <p className="text-[10px] font-black text-white uppercase tracking-widest">Vineet Kumar</p>
               <p className="text-[9px] text-gold-500 font-bold uppercase tracking-tighter opacity-60">Master Authority</p>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
}