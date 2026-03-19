"use client";
import { useStore } from '../state/useStore';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { currentUser, isLoggedIn, logout } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && !isLoggedIn) router.push('/login');
  }, [isLoggedIn, router, mounted]);

  if (!mounted || !currentUser) return null;

  return (
    <div className="bg-black min-h-screen text-white pb-40">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-32 px-6 text-center lg:text-left">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">MY <span className="text-cyan-500 underline decoration-gold-500">DATA</span></h1>
          <button onClick={() => { logout(); router.push('/'); }} className="bg-red-500/10 text-red-500 border border-red-500/20 px-8 py-3 rounded-full font-black text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-90">LOGOUT</button>
        </div>

        <div className="grid gap-4">
          {[
            { label: 'Registered Name', value: currentUser.name, icon: '👤' },
            { label: 'Phone Number', value: currentUser.phone, icon: '📞' },
            { label: 'Delivery Address', value: currentUser.address || "Address not saved yet", icon: '📍' },
            { label: 'Landmark', value: currentUser.landmark || "N/A", icon: '🏙️' },
            { label: 'Pincode', value: currentUser.pincode || "N/A", icon: '📮' }
          ].map((field, idx) => (
            <div key={idx} className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-6 shadow-xl text-left group hover:border-white/10 transition-all">
              <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{field.icon}</div>
              <div>
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-1">{field.label}</p>
                <p className={`text-lg font-black uppercase tracking-tight ${field.value === "Address not saved yet" ? 'text-gray-700 italic' : 'text-white'}`}>{field.value}</p>
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => router.push('/profile/edit')} 
            className="w-full bg-gold-500 text-black p-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[11px] mt-6 shadow-2xl shadow-gold-500/20 hover:bg-white hover:scale-[1.02] active:scale-95 transition-all"
          >
            EDIT PROFILE & ADDRESS
          </button>
        </div>
      </div>
    </div>
  );
}