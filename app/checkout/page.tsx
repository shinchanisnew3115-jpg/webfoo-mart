"use client";
import { useStore } from '../state/useStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function CheckoutPage() {
  const { cart, placeOrder, clearCart } = useStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', landmark: '' });

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <div className="bg-black min-h-screen"></div>;

  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleCompleteOrder = () => {
    if (!form.name || !form.phone || !form.address) return alert("Bhai, address aur details toh bharo!");
    
    const newOrder = {
      id: `#WF-${Math.floor(Math.random() * 10000)}`,
      customer: form.name.toUpperCase(),
      phone: form.phone,
      address: form.address.toUpperCase(),
      landmark: form.landmark.toUpperCase(),
      items: cart.map(i => `${i.quantity}X ${i.name}`).join(", "),
      amount: total,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'PENDING' as const
    };

    placeOrder(newOrder);
    clearCart();
    router.push('/success');
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans pb-32">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-32 px-6 space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter">DELIVERY <span className="text-cyan-500">DETAILS</span></h1>
          <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase">ALMOST THERE, FILL THE FORM</p>
        </div>

        <div className="bg-neutral-900 border border-white/10 p-10 rounded-[4rem] space-y-6 shadow-2xl">
          <input type="text" placeholder="FULL NAME" onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm font-black text-white outline-none focus:border-cyan-500 transition-all placeholder:text-gray-800"/>
          <input type="tel" placeholder="PHONE NUMBER" onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm font-black text-white outline-none focus:border-cyan-500 transition-all placeholder:text-gray-800"/>
          <textarea placeholder="FULL ADDRESS" rows={3} onChange={(e) => setForm({...form, address: e.target.value})} className="w-full bg-black border border-white/10 rounded-3xl px-6 py-5 text-sm font-black text-white outline-none focus:border-cyan-500 transition-all placeholder:text-gray-800"></textarea>
          <input type="text" placeholder="LANDMARK (OPTIONAL)" onChange={(e) => setForm({...form, landmark: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm font-black text-white outline-none focus:border-cyan-500 transition-all placeholder:text-gray-800"/>
        </div>

        <div className="bg-neutral-900 border-2 border-gold-500/30 p-10 rounded-[4rem] space-y-6">
          <h3 className="text-[10px] font-black text-gold-500 tracking-[0.3em] uppercase border-b border-white/5 pb-4 text-center">PAYMENT METHOD</h3>
          <div className="flex items-center justify-between bg-black p-6 rounded-3xl border border-gold-500/20 shadow-inner">
            <span className="font-black uppercase tracking-widest text-sm">CASH ON DELIVERY (COD)</span>
            <div className="w-6 h-6 bg-gold-500 rounded-full border-4 border-black shadow-[0_0_15px_rgba(251,191,36,0.5)]"></div>
          </div>
          <p className="text-[9px] text-gray-500 font-black uppercase text-center tracking-widest">PAY CASH AT YOUR DOORSTEP</p>
        </div>

        <button onClick={handleCompleteOrder} className="w-full bg-gold-500 text-black font-black py-7 rounded-[2.5rem] text-sm uppercase tracking-[0.3em] hover:bg-white hover:scale-[1.02] transition-all shadow-2xl shadow-gold-500/20 active:scale-95">
          CONFIRM ORDER (₹{total})
        </button>
      </div>
    </div>
  );
}